---
sidebar_position: 2
title: Tutorial
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

## Driver download

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

    To install pyC8, simply run

        $ pip3 install pyC8

    or, if you prefer to use conda:

        conda install -c conda-forge pyC8

    or pipenv:

        pipenv install --pre pyC8

    Once the installation process is finished, you can begin developing applications in Python.

  </TabItem>
  <TabItem value="js" label="Javascript">

    With Yarn or NPM

        yarn add jsc8
        (or)
        npm install jsc8

    If you want to use the driver outside of the current directory, you can also install it globally using the `--global` flag:

        npm install --global jsc8

    From source,

        git clone https://github.com/macrometacorp/jsc8.git
        cd jsC8
        npm install
        npm run dist

  </TabItem>
</Tabs>  

## Code Sample

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client
    import pprint

    if __name__ == '__main__':

      # Variables - URLs
      global_url = "gdn.paas.macrometa.io"
    

      # Variables - DB
      email = "nemo@nautilus.com"
      password = "xxxx"
      geo_fabric = "_system"
      collection_transit = "transit"
      collection_shops = "shops"

      # Variable - Requests locations
      
      latitude2 = 37.3972452334285 # Sunnyvale Elementary School
      longitude2 = -121.99073796514953 # Sunnyvale Elementary School

      # Variables - Data
      shops_data = [
        { "shop": "Walgreens", "address": "San Jose, CA", "coordinate": [ 37.2333253, -121.6846349 ] },
        { "shop": "Costco", "address": "San Jose, CA", "coordinate": [ 37.4282724, -121.9066238 ] },
        { "shop":"Walmart", "address": "San Jose, CA", "coordinate": [ 37.3361905, -121.8905833 ] },
        { "shop": "Bed Bath & Beyond", "address": "Mountain View, CA", "coordinate": [ 37.4443293, -122.1598465] },
        { "shop":"Best Buy", "address": "Mountain View, CA", "coordinate": [ 37.35992431640625,-122.06830596923828 ] },
        { "shop": "Target", "address": "Mountain View, CA", "coordinate": [ 37.4443293, -122.1598465] },
        { "shop": "Walgreens", "address": "Fremont, CA", "coordinate": [ 37.48849288005677, -121.94342916254486 ] },
        { "shop": "Costco", "address": "Almeda, CA", "coordinate": [ 37.766039418486855, -122.2430211806723 ] },
        { "shop": "Sweet Greens", "address": "San Francisco, CA", "coordinate": [ 38.621725, -92.571271 ] }
      ]

      transit_data = [
        { "bus": "CA123", "stop": "Santa Clara, CA", "coordinate": [ 37.2333253, -121.6846349 ] },
        { "bus": "CA233", "stop": "Milpitas, CA", "coordinate": [ 37.4282724, -121.9066238 ] },
        { "bus": "CA433", "stop": "San Jose, CA", "coordinate": [ 37.3361905, -121.8905833 ] },
        { "bus": "CA323", "stop": "Palo Alto, CA", "coordinate": [ 37.4443293, -122.1598465] },
        { "bus": "CA523", "stop": "Mountain View, CA", "coordinate": [ 37.35992431640625,-122.06830596923828 ] },
        { "bus": "CA143", "stop": "Fremont, CA", "coordinate": [ 37.48849288005677, -121.94342916254486 ] },
        { "bus": "CA423", "stop": "Almeda, CA", "coordinate": [ 37.766039418486855, -122.2430211806723 ] },
        { "bus": "CA129", "stop": "San Francisco, CA", "coordinate": [ 38.621725, -92.571271 ] }
      ]

      pp = pprint.PrettyPrinter(indent=4)

      # Step1: Open connection to GDN. You will be routed to closest region.
      print("\n1. CONNECT: federation: {},  user: {}".format(global_url, email))
      client = C8Client(protocol='https', host=global_url, port=443,
                        email=email, password=password,
                        geofabric=geo_fabric)
      

      # Step2: Create a collection & geoindex if not exists
      print("\n2. CREATE_COLLECTION: region: {},  collection: {}".format(global_url, collection_shops))
      if client.has_collection(collection_shops):
          shopCol = client.collection(collection_shops)
      else:
          shopCol = client.create_collection(collection_shops)
          client.add_geo_index(collection_shops, fields=["coordinate"], ordered=False)

      # Step3: Insert data into collection.
      print("\n3. INSERT_SHOP_DATA: in region: {}".format(global_url))
      #shopCol.insert_many(shops_data)
      client.insert_document(collection_name=collection_shops, document=shops_data)

    # Step3a: Find shops closer to given location
      lat1 = 37.43007055731992 # McCarthy Blvd, Milpitas
      long1 = -121.92344167914754 # McCarthy Blvd, Milpitas
      radius = 10 * 1000 # meters
      print("\n3a. FIND_NEAR_BY_SHOPS for request: ({}, {})".format(lat1, long1))
      within_query = "FOR loc IN WITHIN ({}, {}, {}, {}) SORT loc._distance ASC RETURN loc".format(collection_shops, lat1, long1, radius)
      cursor = client.execute_query(within_query)
      docs = [document for document in cursor]
      pp.pprint(docs)

    # Step3b: Find shop closest to given location
      print("\n3b. FIND_NEAREST_SHOP for request: ({}, {})".format(lat1, long1))
      near_query = "FOR loc IN NEAR ({}, {}, {}, 1) RETURN loc".format(collection_shops, lat1, long1)
      cursor = client.execute_query(near_query)
      docs = [document for document in cursor]
      pp.pprint(docs)

    #-------------------------------------------------------------------#

      # Step2: Create a collection & geoindex if not exists
      print("\n4. CREATE_COLLECTION: region: {},  collection: {}".format(global_url, collection_transit))
      if client.has_collection(collection_transit):
          transitCol = client.collection(collection_transit)
      else:
          transitCol = client.create_collection(collection_transit)
          client.add_geo_index(collection_transit, fields=["coordinate"], ordered=False)

      # Step5: Insert data into collection.
      print("\n5. INSERT_TRANSIT_DATA: in region: {}".format(global_url))
      client.insert_document(collection_name=collection_transit, document=transit_data)

    # Step6a: Find buses currently within given rectangular fence
      lat1 = 37.38905593900322 
      long1 = -122.14426630984782 
      lat2 = 37.332401582858324 
      long2 = -121.80235913612003 
      
      print("\n6a. FIND_BUSES available within RECTANGULAR fence: ({}, {}, {}, {}) sorted by distance".format(lat1, long1, lat2, long2))
      within_query = "FOR loc IN WITHIN_RECTANGLE ({}, {}, {}, {}, {}) SORT loc._distance ASC RETURN loc".format(collection_transit, lat1, long1, lat2, long2)
      cursor = client.execute_query(within_query)
      docs = [document for document in cursor]
      pp.pprint(docs)

    # Step6b: Find shop closest to given location
      print("\n6b. FIND_NEAREST_BUS for given location: ({}, {})".format(lat1, long1))
      near_query = "FOR loc IN NEAR ({}, {}, {}, 1) RETURN loc".format(collection_transit, lat1, long1)
      cursor = client.execute_query(near_query)
      docs = [document for document in cursor]
      pp.pprint(docs)

    #-------------------------------------------------------------------#
    
      # # Step7: Delete Data
      print("\n7. DELETE_DATA: region: {}, collections: {}, {}".format(global_url, collection_shops, collection_transit))
      shopCol.truncate()
      transitCol.truncate()
      #client.delete_collection(collection_name)

  </TabItem>
  <TabItem value="js" label="Javascript">

    'use strict'

    const jsc8 = require('jsc8');

    // Variables - DB
    const global_url = "https://gdn.paas.macrometa.io";

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: global_url, token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: global_url, apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8(global_url);

    await client.login("nemo@nautilus.com", "xxxxx");

    //Variables
    const collection_shops = "shops";
    const collection_transit = "transit";

    // Variable - Requests locations
    const latitude2 = 37.3972452334285; // Sunnyvale Elementary School
    const longitude2 = -121.99073796514953; // Sunnyvale Elementary School

    // Variables - Data
    const shops_data = [
      { "shop": "Walgreens", "address": "San Jose, CA", "coordinate": [37.2333253, -121.6846349 ] },
      { "shop": "Costco", "address": "San Jose, CA", "coordinate": [ 37.4282724,-121.9066238 ] },
      { "shop":"Walmart", "address": "San Jose, CA", "coordinate": [ 37.3361905,-121.8905833 ] },
      { "shop": "Bed Bath & Beyond", "address": "Mountain View, CA","coordinate": [ 37.4443293, -122.1598465] },
      { "shop":"Best Buy", "address": "Mountain View, CA", "coordinate": [37.35992431640625,-122.06830596923828 ] },
      { "shop": "Target", "address": "Mountain View, CA", "coordinate": [37.4443293, -122.1598465] },
      { "shop": "Walgreens", "address": "Fremont, CA", "coordinate": [37.48849288005677, -121.94342916254486 ] },
      { "shop": "Costco", "address": "Almeda, CA", "coordinate": [37.766039418486855, -122.2430211806723 ] },
      { "shop": "Sweet Greens", "address": "San Francisco, CA", "coordinate": [38.621725, -92.571271 ] }
    ];

    const transit_data = [
      { "bus": "CA123", "stop": "Santa Clara, CA", "coordinate": [ 37.2333253,-121.6846349 ] },
      { "bus": "CA233", "stop": "Milpitas, CA", "coordinate": [ 37.4282724,-121.9066238 ] },
      { "bus": "CA433", "stop": "San Jose, CA", "coordinate": [ 37.3361905,-121.8905833 ] },
      { "bus": "CA323", "stop": "Palo Alto, CA", "coordinate": [ 37.4443293,-122.1598465] },
      { "bus": "CA523", "stop": "Mountain View, CA", "coordinate": [37.35992431640625,-122.06830596923828 ] },
      { "bus": "CA143", "stop": "Fremont, CA", "coordinate": [ 37.48849288005677 -121.94342916254486 ] },
      { "bus": "CA423", "stop": "Almeda, CA", "coordinate": [ 37.766039418486855 -122.2430211806723 ] },
      { "bus": "CA129", "stop": "San Francisco, CA", "coordinate": [ 38.621725,-92.571271 ] }
    ];

    async function createCollection() {
      console.log("\n 2. CREATE_COLLECTIONS");

      try{
        console.log("Creating the collection shops...");
          const exists_shops = await client.hasCollection(collection_shops);
          if (exists_shops === false) {
                await client.createCollection(collection_shops)
                await client.addGeoIndex(collection_shops, ['coordinate'],{geoJson : false});
          }

          console.log("Creating the collection transit...");
          const exists_transit = await client.hasCollection(collection_transit);
          if (exists_transit === false) {
                await client.createCollection(collection_transit)
                await client.addGeoIndex(collection_transit, ['coordinate'],{geoJson : false});
          }
      }
      catch (e) {
        await console.log("Collection creation did not succeed due to " + e);
      }
    }

    async function insertData(shops_data, transit_data) {
      console.log(`\n 3a. INSERT_SHOP_DATA in region ${global_url}`);
      await client.insertDocumentMany(collection_shops, shops_data);

      console.log(`\n 3b. INSERT_TRANSIT_DATA in region ${global_url}`);
      await client.insertDocumentMany(collection_transit, transit_data);
    }

    async function deleteData(){
      console.log("\n 5. DELETE_DATA");
      await client.deleteCollection(collection_shops);
      await client.deleteCollection(collection_transit);
    }

    async function findData(){
      console.log("\n 4. FIND_DATA");

      // Find shops closer to given location
      let lat1 = 37.43007055731992; // McCarthy Blvd, Milpitas
      let long1 = -121.92344167914754; // McCarthy Blvd, Milpitas
      let radius = 10 * 1000; // meters
      console.log(`\n 4a. FIND_NEAR_BY_SHOPS for request: (${lat1}, ${long1})`);
      let within_query = `FOR loc IN WITHIN (${collection_shops}, ${lat1}, ${long1}, ${radius
      }) SORT loc._distance ASC RETURN loc`;
      let result = await client.executeQuery(within_query);
      console.log(result);

      // Find shop closest to given location
      console.log(`\n 4b. FIND_NEAREST_SHOP for request: (${lat1}, ${long1})`);
      let near_query = `FOR loc IN NEAR (${collection_shops}, ${lat1}, ${long1}, 1) RETURN loc`;
      result = await client.executeQuery(near_query);
      console.log(result);
      
      // Find buses currently within given rectangular fence
      lat1 = 37.38905593900322; 
      long1 = -122.14426630984782; 
      let lat2 = 37.332401582858324; 
      let long2 = -121.80235913612003; 

      console.log(`\n 4c. FIND_BUSES available within RECTANGULAR fence: (${lat1}, ${long1}, ${lat2}, ${long2}) sorted by distance`);
      
      within_query = `FOR loc IN WITHIN_RECTANGLE (${collection_transit}, ${lat1}, ${long1}, ${lat2}, ${long2}) SORT loc._distance ASC RETURN loc`;
      result = await client.executeQuery(within_query);
      console.log(result);  

    // Find Bus closest to given location
      console.log(`\n 4d. FIND_NEAREST_BUS for given location: (${lat1}, ${long1})`);
      near_query = `FOR loc IN NEAR (${collection_transit}, ${lat1}, ${long1}, 1) RETURN loc`;
      result = await client.executeQuery(near_query);
      console.log(result); 
    }

    (async function() {
      await createCollection();
      await insertData(shops_data, transit_data);
      await findData();
      await deleteData();
    })();

  </TabItem>
</Tabs>  
