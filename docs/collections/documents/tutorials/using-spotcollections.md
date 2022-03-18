---
title: Using Spot Collections
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Spot Collections

There are some use cases that call for strong consistency across all regions. For example, a financial application might need to show users' account balances. When users make a deposit, they want to see the result of this deposit reflected immediately when they view their balance (otherwise they may fear their money has been lost!). There should never appear to be more or less money in aggregate in the bank than there really is. 

When performing read operations, here you want to read the latest copy of your data in **global** order. It provides the ability to read the latest change to your data across rows, regions and continents.

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
      region_urls = [
          "gdn-sfo2.prod.macrometa.io",
          "gdn-us-west1.prod.macrometa.io",
          "gdn-nyc1.prod.macrometa.io"
      ]

      # Variables - DB
      email = "nemo@nautilus.com"
      password = "xxxxxx"
      geo_fabric = "_system"
      collection_name = "accounts"
      read_query = "FOR account IN accounts RETURN account"

      # Variables - Data
      data = [
        {"firstname": "Peter", "lastname": "Parker", "City": "NewYork"},
        {"firstname": "Bruce", "lastname": "Wayne", "City": "Gotham"},
        {"firstname": "Clark", "lastname": "Kent", "City": "Manhatten"},
        {"firstname": "Ned", "lastname": "Stark", "City": "Winterfell"},
        {"firstname": "Tywin", "lastname": "Lannister", "City": "Kings Landing"},
      ]
      pp = pprint.PrettyPrinter(indent=4)

      # Step1: Open connection to GDN. You will be routed to closest region.
      print("1. CONNECT: federation: {},  user: {}".format(global_url, email))
      client = C8Client(protocol='https', host=global_url, port=443)
      tenant = client.tenant(email, password)
      fabric = tenant.useFabric(geo_fabric)

      # Step2: Create a collection if not exists
      print("2. CREATE_COLLECTION: region: {},  collection: {}".format(global_url, collection_name))
      if fabric.has_collection(collection_name):
          collection = fabric.collection(collection_name)
      else:
          collection = fabric.create_collection(collection_name, spot_collection=True)

      # Step3: Insert data into collection.
      print("3. INSERT_DATA: region: {}, collection: {}".format(global_url, collection_name))
      collection.insert_many(data)

      # Step4: Read Data
      print("4. READ_DATA: region: {}, collection: {}".format(global_url, collection_name))
      cursor = fabric.c8ql.execute(read_query)
      docs = [document for document in cursor]
      pp.pprint(docs)

      # Step5: Read Data from other regions.
      for region_url in region_urls:
        print("\n DATA_MOBILITY: Reading from region: {}".format(region_url))
        clientx = C8Client(protocol='https', host=region_url, port=443)
        tenantx = clientx.tenant(email, password)
        fabricx = tenantx.useFabric(geo_fabric)
        cursorx = fabricx.c8ql.execute(read_query)
        docs = [document for document in cursorx]
        pp.pprint(docs)

      # Step5: Delete Data
      print("5. DELETE_DATA: region: {}, collection: {}".format(global_url, collection_name))
      collection.truncate()
      #fabric.delete_collection(collection_name)

  </TabItem>
  <TabItem value="js" label="Javascript">

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
  </TabItem>
</Tabs>  
