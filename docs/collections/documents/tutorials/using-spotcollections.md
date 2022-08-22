---
sidebar_position: 6
title: Spot Collections
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There are some use cases that call for strong consistency across all regions. For example, a financial application might need to show users' account balances. When users make a deposit, they want to see the result of this deposit reflected immediately when they view their balance (otherwise they may fear their money has been lost!). There should never appear to be more or less money in aggregate in the bank than there really is. 

When performing read operations, here you want to read the latest copy of your data in **global** order. It provides the ability to read the latest change to your data across rows, regions and continents.

:::note

Spot Collections are only available on Enterprise customer accounts.

Contact support@macrometa.com if you have any questions.

:::

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
""" This file is a demo for spot collections """
import pprint
from c8 import C8Client

# Variables Access
URL = "api-gdn.paas.macrometa.io"
API_KEY = "my API key" #Change this to my API key
API_KEY_ID = "my API key ID" #Change this to my API key ID
GEO_FABRIC = "_system"

# Variables - DB
collection_name = "accounts"
read_query_name = "read_query"
read_query = {"query": {"name": read_query_name, "value":
    "FOR account IN accounts RETURN account"}}
accounts_keys = "FOR k IN accounts RETURN k._key"
spot_gf_name = "spot"
region_urls = [
    "ap-northeast.paas.macrometa.io",
    "eu-central.paas.macrometa.io",
    "eu-west.paas.macrometa.io"
]

# Variables - Data
data = [
    {"_key": "1", "firstname": "Peter", "lastname": "Parker", "City": "NewYork"},
    {"_key": "2", "firstname": "Bruce", "lastname": "Wayne", "City": "Gotham"},
    {"_key": "3", "firstname": "Clark", "lastname": "Kent", "City": "Manhatten"},
    {"_key": "4", "firstname": "Ned", "lastname": "Stark", "City": "Winterfell"},
    {"_key": "5", "firstname": "Tywin", "lastname": "Lannister", "City": "Kings Landing"}
]
pp = pprint.PrettyPrinter(indent=4)


# Step 1: Open connection to GDN. You will be routed to closest region.
print(f"1. CONNECT: federation: {URL},  user: {API_KEY}")
client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric=GEO_FABRIC)

#print("The connection was successful:", client.get_collections())

# Step 1.5: Assign a spot region.
spot_region = client.tenant(apikey = API_KEY)
dcl = spot_region.dclist(detail=False)
fabric = spot_region.useFabric(GEO_FABRIC)

if fabric.has_fabric(spot_gf_name):
    print("Fabric", spot_gf_name, "already exists.")
else:
    fabric.create_fabric(spot_gf_name, dclist=dcl,spot_creation_type=
        fabric.SPOT_CREATION_TYPES.SPOT_REGION, spot_dc='eu-west.paas.macrometa.io')
    print("Fabric", spot_gf_name, "has been created successfully.")

client.set_database_access_level(API_KEY_ID, spot_gf_name, "rw")

#print(fabric.properties())
client = spot_region.useFabric(spot_gf_name)
#print(client.properties())

spot_region_status = client.properties().get("options", {}).get("spotDc")
if spot_region_status == "":
    print("The fabric does not have a spot region registered.")
    print("Please remove the fabric and create a new fabric with a spot region.")
    print("Stopping program.")
    exit()
else:
    print("Spot region for the fabric", spot_gf_name, "is: ", spot_region_status)
    print("Continuing...")


# Step 2: Create or assign a spot collection.
# getCollectionDetails
def isSpotCollection():
    """ This function checks if the given collection already exists and if true,
        returns the property 'isSpot' """
    for coll in client.collections():
        if coll["name"] == collection_name:
            return coll["isSpot"]

print(f"2. CREATE_COLLECTION: region: {URL},  collection: {collection_name}")
if client.has_collection(collection_name):
    if isSpotCollection():
        print(collection_name, "is a spot collection.")
        print("Continuing...")
        collection = client.collection(collection_name)
    else:
        print(collection_name, "is not a spot collection")
        print("Remove the collection and create a new one as a spot collection.")
        print("Stopping program.")
        exit()
else:
    collection = client.create_collection(collection_name, spot_collection=True)
    print(collection_name, "has been created successfully")


# Step 3: Insert data into collection.
#get_keys = client.execute_restql("accounts_keys")
print(f"3. INSERT_DATA: region: {URL}, collection: {collection_name}")
#collection.insert_many(data)
print("Data has been inserted successfully inserted (duplicating data was avoided).")



# Step 4: Create a new query worker or look for the existing one, then read data from the collection.
print(f"4. READ_DATA: region: {URL}, collection: {collection_name}")
all_saved_queries = client.get_all_restql()

query_exists = False
for i in all_saved_queries:
    if i["name"] == read_query_name:
        query_exists = True
        break

if not query_exists:
    client.save_restql(read_query)
    print("The NEW query has been saved.")
else:
    print("Query already exists.")


print(client.execute_restql(read_query_name))
#print(client.execute_query("FOR account IN accounts RETURN account"))


# Step 5: Read data from other regions.
for region_url in region_urls:
    print(f"\n5. DATA_MOBILITY: Reading from region: {region_url}")
    #clientx = C8Client(protocol='https', host=region_url, port=443, geofabric=
        #spot_gf_name, apikey= API_KEY)
    print(client.execute_restql(read_query_name))


# Step 6: Delete data.
print(f"6. DELETE_DATA: fabric: {spot_gf_name}, collection: {collection_name}")
try:
    collection.truncate()
    client.delete_collection(collection_name)
    client = spot_region.useFabric(GEO_FABRIC)
    client.delete_fabric(spot_gf_name)
    print("Spot collection and fabric have been deleted successfully.")
except Exception as e:
    print("There was an error while deleting the spot collection or fabric.")
    print("Details:", e)
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  'use strict'

  const jsc8 = require('jsc8');

  // Variables - DB
  const global_url = "https://gdn.paas.macrometa.io";
  const region_urls = [
    "https://gdn-sfo2.prod.macrometa.io",
    "https://gdn-us-west1.prod.macrometa.io",
    "https://gdn-nyc1.prod.macrometa.io"
  ];

  // Crete a authenticated instance with Token / Apikey
  // const client = new jsc8({url: global_url, token: "XXXX", fabricName: '_system'});
  // const client = new jsc8({url: global_url, apiKey: "XXXX", fabricName: '_system'});
  // await console.log("Authentication done!!...");

  // Or use Email & Password to Authenticate client instance
  const client = new jsc8(global_url);

  await client.login("nemo@nautilus.com", "xxxxxx");

  //Variables
  const collection_name = "accounts";

  const read_query = "FOR account IN accounts RETURN account";

  // Variables - Data
  const data = [
    {"firstname": "Peter", "lastname": "Parker", "City": "NewYork"},
    {"firstname": "Bruce", "lastname": "Wayne", "City": "Gotham"},
    {"firstname": "Clark", "lastname": "Kent", "City": "Manhatten"},
    {"firstname": "Ned", "lastname": "Stark", "City": "Winterfell"},
    {"firstname": "Tywin", "lastname": "Lannister", "City": "Kings Landing"},
  ];

  async function createCollection() {
    console.log("\n 2. CREATE_COLLECTION");

    try{
      console.log(`Creating the collection ${collection_name}...`);
      const exists_coll = await client.hasCollection(collection_name);
      if (exists_coll === false) {
          await client.createCollection(collection_name);
      }
    }
    catch (e) {
      await console.log("Collection creation did not succeed due to " + e);
    }
  }

  async function insertData() {
    console.log(`\n 3. INSERT_DATA in region ${global_url}`);
    await client.insertDocumentMany(collection_name, data);
  }

  async function readData(){
    console.log(`\n 4. READ_DATA in region ${global_url}`);
    let result = await client.executeQuery(read_query);
    console.log(result);
  }

  async function readDataFromAllRegions(){
    for (let i = 0; i < region_urls.length; i++) { 
        // Crete a authenticated instance with Token / Apikey
        // const regionclient = new jsc8({url: region_urls[i], token: "XXXX", fabricName: '_system'});
        // const regionclient = new jsc8({url: region_urls[i], apiKey: "XXXX", fabricName: '_system'});
        // await console.log("Authentication done!!...");

        // Or use Email & Password to Authenticate client instance
        const regionclient = new jsc8(region_urls[i]);
        await regionclient.login("nemo@nautilus.com", "xxxxxx");

        console.log(`\n 5. READ_DATA: Reading from region : ${region_urls[i]}`);
        let result = await client.executeQuery(read_query);
        console.log(result);
    }
  }

  async function deleteData(){
    console.log("\n 6. DELETE_DATA");
    await client.deleteCollection(collection_name);
  }

  (async function(){
    await createCollection();
    await insertData();
    await readData();
    await readDataFromAllRegions();
    await deleteData();
  })();
```

</TabItem>
</Tabs>  
