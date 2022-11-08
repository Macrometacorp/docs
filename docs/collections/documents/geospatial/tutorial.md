---
sidebar_position: 2
title: Geo Spatial Tutorial
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Geo Spatial Tutorial

The GeoJSON functionalities in GDN are based on Google’s S2 geospatial index. We support indexing on a subset of the GeoJSON standard, as well as simple latitude-longitude pairs (Non-GeoJSON mode).

Calculating e.g. the distance between two coordinate tuples or checking whether a coordinate pair is located inside a polygon was possible, but those functions could not benefit by using the geo index optimizations. Those operations need to be as fast as possible to prevent them from being a show stopper.

Of course, speed is not everything, so we also want to provide a broader set of geo functionality by integrating full GeoJSON support including `Polygons`, `Multi-Polygons` and other geometry primitives.

With these functionalities, one can do more complex queries and build e.g. location-aware recommendation engines by combining the graph data model with geo-location aspects or use multiple data models. 

## Pre-requisite

Let's assume your

* Tenant name is `nemo@nautilus.com` and
* User password is `xxxxx`.

## SDK download

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
  pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

  To install pyC8, simply run

      $ pip3 install pyC8

  or, if you prefer to use conda:

      conda install -c conda-forge pyC8

  or pipenv:

      pipenv install --pre pyC8

  Once the installation process is finished, you can begin developing applications in Python.
```
</TabItem>
<TabItem value="js" label="Javascript">

```js
  With Yarn or NPM

      yarn add jsc8
      (or)
      npm install jsc8

  If you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:

      npm install --global jsc8

  From source,

      git clone https://github.com/macrometacorp/jsc8.git
      cd jsC8
      npm install
      npm run dist
```
</TabItem>
</Tabs>  

## Code Sample

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
""" This file is a demo of using Geo Locations on collections """
import pprint
from c8 import C8Client

# Variables - Connection
URL = "play.paas.macrometa.io"
API_KEY = "my API key" #Change to my API key
GEO_FABRIC = "_system"


# Variables - DB
collection_transit = "transit"
collection_shops = "shops"

# Variable - Requests locations
latitude2 = 37.3972452334285 # Sunnyvale Elementary School
longitude2 = -121.99073796514953 # Sunnyvale Elementary School

# Variables - Data
shops_data = [
    { "shop": "Walgreens", "address": "San Jose, CA", "coordinate": [ 37.2333253, -121.6846349 ] },
    { "shop": "Costco", "address": "San Jose, CA", "coordinate": [ 37.4282724, -121.9066238 ] },
    { "shop":"Walmart", "address": "San Jose, CA", "coordinate":
        [ 37.3361905, -121.8905833 ] },
    { "shop": "Bed Bath & Beyond", "address": "Mountain View, CA", "coordinate":
        [ 37.4443293, -122.1598465] },
    { "shop":"Best Buy", "address": "Mountain View, CA", "coordinate":
        [ 37.35992431640625,-122.06830596923828 ] },
    { "shop": "Target", "address": "Mountain View, CA", "coordinate":
        [ 37.4443293, -122.1598465] },
    { "shop": "Walgreens", "address": "Fremont, CA", "coordinate":
        [ 37.48849288005677, -121.94342916254486 ] },
    { "shop": "Costco", "address": "Almeda, CA", "coordinate":
        [ 37.766039418486855, -122.2430211806723 ] },
    { "shop": "Sweet Greens", "address": "San Francisco, CA", "coordinate":
        [ 38.621725, -92.571271 ] }
 ]

transit_data = [
    { "bus": "CA123", "stop": "Santa Clara, CA", "coordinate": [ 37.2333253, -121.6846349 ] },
    { "bus": "CA233", "stop": "Milpitas, CA", "coordinate": [ 37.4282724, -121.9066238 ] },
    { "bus": "CA433", "stop": "San Jose, CA", "coordinate": [ 37.3361905, -121.8905833 ] },
    { "bus": "CA323", "stop": "Palo Alto, CA", "coordinate": [ 37.4443293, -122.1598465] },
    { "bus": "CA523", "stop": "Mountain View, CA", "coordinate":
        [ 37.35992431640625,-122.06830596923828 ] },
    { "bus": "CA143", "stop": "Fremont, CA", "coordinate":
        [ 37.48849288005677, -121.94342916254486 ] },
    { "bus": "CA423", "stop": "Almeda, CA", "coordinate":
        [ 37.766039418486855, -122.2430211806723 ] },
    { "bus": "CA129", "stop": "San Francisco, CA", "coordinate": [ 38.621725, -92.571271 ] }
]

pp = pprint.PrettyPrinter(indent=4)

# Step 1: Open connection to GDN. You will be routed to the closest region.
print(f"\n1. CONNECT: federation: {URL},  user: {API_KEY}")
client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric=GEO_FABRIC)

# Step 2: Create a collection and geo index if not exists.
print(f"\n2. CREATE_COLLECTION: region: {URL},  collection: {collection_shops}")
if client.has_collection(collection_shops):
    shopCol = client.collection(collection_shops)
else:
    shopCol = client.create_collection(collection_shops)
    client.add_geo_index(collection_shops, fields=["coordinate"], ordered=False)

# Step 3: Insert data into collection.
print(f"\n3. INSERT_SHOP_DATA: in region: {URL}")
#shopCol.insert_many(shops_data)
client.insert_document(collection_name=collection_shops, document=shops_data)

# Step 3a: Find shops closer to given location.
lat1 = 37.43007055731992 # McCarthy Blvd, Milpitas
long1 = -121.92344167914754 # McCarthy Blvd, Milpitas
radius = 10 * 1000 # meters
print(f"\n3a. FIND_NEAR_BY_SHOPS for request: ({lat1}, {long1})")
within_query = (f"FOR loc IN WITHIN ({collection_shops}, {lat1}, {long1}, {radius})"
    f"SORT loc._distance ASC RETURN loc")
cursor = client.execute_query(within_query)
docs = [document for document in cursor]
pp.pprint(docs)

# Step 3b: Find shop closest to given location.
print(f"\n3b. FIND_NEAREST_SHOP for request: ({lat1}, {long1})")
near_query = f"FOR loc IN NEAR ({collection_shops}, {lat1}, {long1}, 1) RETURN loc"
cursor = client.execute_query(near_query)
docs = [document for document in cursor]
pp.pprint(docs)

#-------------------------------------------------------------------#

# Step 4: Create a collection and geoindex if none exists.
print(f"\n4. CREATE_COLLECTION: region: {URL},  collection: {collection_transit}")
if client.has_collection(collection_transit):
    transitCol = client.collection(collection_transit)
else:
    transitCol = client.create_collection(collection_transit)
    client.add_geo_index(collection_transit, fields=["coordinate"], ordered=False)

# Step 5: Insert data into collection.
print(f"\n5. INSERT_TRANSIT_DATA: in region: {URL}")
client.insert_document(collection_name=collection_transit, document=transit_data)

# Step 6a: Find buses currently within given rectangular fence.
lat1 = 37.38905593900322
long1 = -122.14426630984782
lat2 = 37.332401582858324
long2 = -121.80235913612003

print(f"\n6a. FIND_BUSES available within RECTANGULAR fence: ({lat1}, {long1}, {lat2}, {long2})")
within_query = (f"FOR loc IN WITHIN_RECTANGLE("
    f"{collection_transit}, {lat1}, {long1}, {lat2}, {long2}) RETURN loc")
cursor = client.execute_query(within_query)
docs = [document for document in cursor]
pp.pprint(docs)

# Step 6b: Find shop closest to given location.
print(f"\n6b. FIND_NEAREST_BUS for given location: ({lat1}, {long1})")
near_query = f"FOR loc IN NEAR ({collection_transit}, {lat1}, {long1}, 1) RETURN loc"
cursor = client.execute_query(near_query)
docs = [document for document in cursor]
pp.pprint(docs)

#-------------------------------------------------------------------#

# Step 7: Delete data.
print(f"\n7. DELETE_DATA: region: {URL}, collections: {collection_shops}, {collection_transit}")
shopCol.truncate()
transitCol.truncate()
client.delete_collection(collection_transit)
client.delete_collection(collection_shops)
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Variables - DB
const globalUrl = "https://play.paas.macrometa.io";

// Create an authenticated instance with token or API key
// const client = new jsc8({ url: globalUrl, token: "XXXX", fabricName: '_system' });
// Step 1: Open connection to GDN. You will be routed to the closest region.
console.log(`\n1. Connect to federation: ${globalUrl}`);
const client = new jsc8({ url: globalUrl, apiKey: "XXXXX", fabricName: "_system" });
console.log("Connected: Authentication done!!...");

// Or use email and password to authenticate client instance
// const client = new jsc8(globalUrl);
// await client.login("nemo@nautilus.com", "xxxxx");

// Variables
const collectionShops = "shops";
const collectionTransit = "transit";

// Variable - Requests locations
// const latitude2 = 37.3972452334285; // Sunnyvale Elementary School
// const longitude2 = -121.99073796514953; // Sunnyvale Elementary School
let lat1, long1;

// Variables - Data
const shopsDataValue = [
  { shop: "Walgreens", address: "San Jose, CA", coordinate: [37.2333253, -121.6846349] },
  { shop: "Costco", address: "San Jose, CA", coordinate: [37.4282724, -121.9066238] },
  { shop: "Walmart", address: "San Jose, CA", coordinate: [37.3361905, -121.8905833] },
  { shop: "Bed Bath & Beyond", address: "Mountain View, CA", coordinate: [37.4443293, -122.1598465] },
  { shop: "Best Buy", address: "Mountain View, CA", coordinate: [37.35992431640625, -122.06830596923828] },
  { shop: "Target", address: "Mountain View, CA", coordinate: [37.4443293, -122.1598465] },
  { shop: "Walgreens", address: "Fremont, CA", coordinate: [37.48849288005677, -121.94342916254486] },
  { shop: "Costco", address: "Almeda, CA", coordinate: [37.766039418486855, -122.2430211806723] },
  { shop: "Sweet Greens", address: "San Francisco, CA", coordinate: [38.621725, -92.571271] }
];

const transitDataValue = [
  { bus: "CA123", stop: "Santa Clara, CA", coordinate: [37.2333253, -121.6846349] },
  { bus: "CA233", stop: "Milpitas, CA", coordinate: [37.4282724, -121.9066238] },
  { bus: "CA433", stop: "San Jose, CA", coordinate: [37.3361905, -121.8905833] },
  { bus: "CA323", stop: "Palo Alto, CA", coordinate: [37.4443293, -122.1598465] },
  { bus: "CA523", stop: "Mountain View, CA", coordinate: [37.35992431640625, -122.06830596923828] },
  { bus: "CA143", stop: "Fremont, CA", coordinate: [37.48849288005677, -121.94342916254486] },
  { bus: "CA423", stop: "Almeda, CA", coordinate: [37.766039418486855, -122.2430211806723] },
  { bus: "CA129", stop: "San Francisco, CA", coordinate: [38.621725, -92.571271] }
];

async function createCollection () {
  console.log("\n2. Create collections:");

  try {
    console.log(`Creating the collection ${collectionShops}...`);
    const existsShops = await client.hasCollection(collectionShops);
    if (!existsShops) {
      await client.createCollection(collectionShops);
      await client.addGeoIndex(collectionShops, ["coordinate"], { geoJson: false });
      console.log("Collection created and geo-indexed successfully.");
    } else {
      console.log(`Collection ${collectionShops} already exists.`);
    }

    console.log(`Creating the collection ${collectionTransit}...`);
    const existsTransit = await client.hasCollection(collectionTransit);
    if (!existsTransit) {
      await client.createCollection(collectionTransit);
      await client.addGeoIndex(collectionTransit, ["coordinate"], { geoJson: false });
      console.log("Collection created and geo-indexed successfully.");
    } else {
      console.log(`Collection ${collectionTransit} already exists.`);
    }
  } catch (e) {
    console.error("Collection creation did not succeed due to: " + e);
  }
}

async function insertData (shopsDataValue, transitDataValue) {
  try {
    console.log(`\n3a. Insert shop data in region ${globalUrl}`);
    await client.insertDocumentMany(collectionShops, shopsDataValue);
  } catch (e) {
    console.log(`Cannot insert documents to collection ${collectionShops} due to ${e}`);
  }

  try {
    console.log(`\n3b. Insert transit data in region ${globalUrl}`);
    await client.insertDocumentMany(collectionTransit, transitDataValue);
  } catch (e) {
    console.log(`Cannot insert documents to collection ${collectionTransit} due to ${e}`);
  }
}

async function findData () {
  console.log("\n4. Find data:");

  // Find shops closer to given location
  lat1 = 37.43007055731992; // McCarthy Blvd, Milpitas
  long1 = -121.92344167914754; // McCarthy Blvd, Milpitas
  const radius = 10 * 1000; // meters
  let withinQuery = `FOR loc IN WITHIN (${collectionShops}, ${lat1}, ${long1}, ${radius}) SORT loc._distance ASC RETURN loc`;
  console.log(`\n4a. Find nearby shops for request: (${lat1}, ${long1})`);
  let result = await client.executeQuery(withinQuery);
  console.log(result);

  // Find shop closest to given location
  console.log(`\n4b. Find nearest for request: (${lat1}, ${long1})`);
  let nearQuery = `FOR loc IN NEAR (${collectionShops}, ${lat1}, ${long1}, 1) RETURN loc`;
  result = await client.executeQuery(nearQuery);
  console.log(result);

  // Find buses currently within given rectangular fence
  lat1 = 37.38905593900322;
  long1 = -122.14426630984782;
  const lat2 = 37.332401582858324;
  const long2 = -121.80235913612003;

  console.log(`\n4c. Find buses available within rectangular fence: (${lat1}, ${long1}, ${lat2}, ${long2})`);

  withinQuery = `FOR loc IN WITHIN_RECTANGLE (${collectionTransit}, ${lat1}, ${long1}, ${lat2}, ${long2}) RETURN loc`;
  result = await client.executeQuery(withinQuery);
  console.log(result);

  // Find bus closest to given location
  console.log(`\n4d. Find nearest bus for given location: (${lat1}, ${long1})`);
  nearQuery = `FOR loc IN NEAR (${collectionTransit}, ${lat1}, ${long1}, 1) RETURN loc`;
  result = await client.executeQuery(nearQuery);
  console.log(result);
}

async function deleteData () {
  console.log("\n5. Delete data:");

  if (await client.hasCollection(collectionShops)) {
    await client.deleteCollection(collectionShops);
    console.log(`Collection ${collectionShops} has been deleted successfully`);
  } else {
    console.log(`Cannot delete non-existent collection ${collectionShops}`);
  }

  if (await client.hasCollection(collectionTransit)) {
    await client.deleteCollection(collectionTransit);
    console.log(`Collection ${collectionTransit} has been deleted successfully`);
  } else {
    console.log(`Cannot delete non-existent collection ${collectionTransit}`);
  }
}

(async function () {
  await createCollection();
  await insertData(shopsDataValue, transitDataValue);
  await findData();
  await deleteData();
})();
```

</TabItem>
</Tabs>  
