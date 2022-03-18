---
sidebar_position: 2
title: Working with Documents
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Working with Documents

## Pre-requisite

Let's assume your

* Tenant name is `nemo@nautilus.com` and
* User password is `xxxxxx`.

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
    import time

    if __name__ == '__main__':

      # Variables - URLs
      global_url = "gdn.paas.macrometa.io"
      region_urls = [
          "https://gdn-sfo2.prod.macrometa.io",
          "https://gdn-us-west1.prod.macrometa.io",
          "https://gdn-nyc1.prod.macrometa.io"
      ]

      # Variables - DB
      email = "nemo@nautilus.com"
      password = "xxxxx"
      geo_fabric = "_system"
      collection_name = "ddoslist"
      ip_address = "20.1.1.9"

      # Variables - Queries
      read_query = "FOR device in ddoslist " + "FILTER device.ip == \"" + ip_address + "\"RETURN { IP:device.ip, IsAllowed:device.action}"

      insert_query = "INSERT { \"ip\" : \"" + ip_address + "\", \"action\": \"block\", \"rule\":\"blacklistA\"} INTO ddoslist"


      # Variables - Data
      data = [
        {"ip": "10.1.1.1", "action": "block", "rule": "blacklistA"},
        {"ip": "20.1.1.2", "action": "block", "rule": "blacklistA"},
        {"ip": "30.1.1.3", "action": "block", "rule": "blacklistB"},
        {"ip": "40.1.1.4", "action": "block", "rule": "blacklistA"},
        {"ip": "50.1.1.5", "action": "block", "rule": "blacklistB"},
        {"ip": "20.1.1.3", "action": "allow", "rule": "whitelistA"},
        {"ip": "20.1.1.4", "action": "allow", "rule": "whitelistA"},
        {"ip": "30.1.1.4", "action": "allow", "rule": "whitelistB"},
        {"ip": "30.1.1.5", "action": "allow", "rule": "whitelistB"}
      ]
      pp = pprint.PrettyPrinter(indent=4)

      # Step1: Open connection to GDN. You will be routed to closest region.
      print("1. CONNECT: federation: {},  user: {}".format(global_url, email))
      client = C8Client(protocol='https', host=global_url, port=443,
                        email=email, password=password,
                        geofabric=geo_fabric)    

      # Step2: Create a collection if not exists
      print("2. CREATE_COLLECTION: region: {},  collection: {}".format(global_url, collection_name))
      if client.has_collection(collection_name):
          collection = client.collection(collection_name)
      else:
          collection = client.create_collection(collection_name)

      # Step3: Insert data into collection.
      print("3. INSERT_DDOS_DATA: in region: {}".format(global_url))
      client.insert_document(collection_name, document=data)

      # Step4: Read Data
      print("4. IS_IP_ALLOWED...from region: {}".format(global_url))
      cursor = client.execute_query(read_query)
      docs = [document for document in cursor]
      if docs == []:
        print("IP: {}, IsAllowed: {}\n".format(ip_address, "'allow'"))
      else:
        pp.pprint(docs)


      # Step5: Blacklist IP Address
      print("5. BLACKLIST the IP...from region: {}, ip: {}".format(global_url, ip_address))
      cursor = client.execute_query(insert_query)
      time.sleep(0.3)

      # Step6: Read Data from other regions.
      print("6. Check again if IP is allowed globally")
      for region_url in region_urls:
        print("\n IS_IP_ALLOWED...cheking from region: {}".format(region_url))
        clientx = C8Client(protocol='https', host=region_url, port=443, email=email, password=password,
                            geofabric=geo_fabric)
        cursorx = clientx.execute_query(read_query)
        docs = [document for document in cursorx]
        pp.pprint(docs[0])

      # Step7: Delete Data
      print("\n7. DELETE_DATA: region: {}, collection: {}".format(global_url, collection_name))
      collection.truncate()
      #fabric.delete_collection(collection_name)

  </TabItem>
  <TabItem value="js" label="Javascript">

    'use strict'

    const jsc8 = require('jsc8');

    // Variables - DB
    global_url = "https://gdn.paas.macrometa.io";
    region_urls = [
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

    await client.login("nemo@nautilus.com", "xxxx");

    //Variables
    const collection_name = "ddoslist";
    const ip_address = "20.1.1.9";

    // Variables - Queries
    const read_query = `FOR device in ddoslist FILTER device.ip == "${ip_address}" RETURN { IP:device.ip, IsAllowed:device.action}`;

    const insert_query = "INSERT { \"ip\" : \"" + ip_address + "\", \"action\": \"block\", \"rule\":\"blacklistA\"} INTO ddoslist";

    // Variables - Data
    const data = [
      {"ip": "10.1.1.1", "action": "block", "rule": "blacklistA"},
      {"ip": "20.1.1.2", "action": "block", "rule": "blacklistA"},
      {"ip": "30.1.1.3", "action": "block", "rule": "blacklistB"},
      {"ip": "40.1.1.4", "action": "block", "rule": "blacklistA"},
      {"ip": "50.1.1.5", "action": "block", "rule": "blacklistB"},
      {"ip": "20.1.1.3", "action": "allow", "rule": "whitelistA"},
      {"ip": "20.1.1.4", "action": "allow", "rule": "whitelistA"},
      {"ip": "30.1.1.4", "action": "allow", "rule": "whitelistB"},
      {"ip": "30.1.1.5", "action": "allow", "rule": "whitelistB"}
    ];

    async function createCollection() {
      console.log("\n 2. CREATE_COLLECTION");

      try{
          console.log(`Creating the collection ${collection_name}...`);
          const exists_coll = await client.hasCollection(collection_name);
          if (exists_coll === false) {
            await client.createCollection(collection_name);
          }
      } catch (e) {
        await console.log("Collection creation did not succeed due to " + e);
      }
    }

    async function insertData() {
      console.log(`\n 3. INSERT_DATA in region ${global_url}`);
      await client.insertDocumentMany(collection_name, docs);
    }

    async function readData(){
      console.log(`\n 4. READ_DATA in region ${global_url}`);
      console.log(`\n IS_IP_ALLOWED...from region: ${global_url}`);
      let result = await client.executeQuery(read_query);
      if(result.length === 0){
        console.log(`IP: ${ip_address}, IsAllowed: 'allow'`);
      }
      else{
        console.log(result);
      }

      console.log(`\n 5. BLACKLIST the IP...from region: ${global_url}, ip: ${ip_address}`);
      result = await client.executeQuery(insert_query);
    }

    async function readDataFromAllRegions(){
      console.log("\n 6. CHECK_IF_IP_ALLOWED_GLOBALLY");
      for (let i = 0; i < region_urls.length; i++) { 
          // Crete a authenticated instance with Token / Apikey
          // const regionclient = new jsc8({url: region_urls[i], token: "XXXX", fabricName: '_system'});
          // const regionclient = new jsc8({url: region_urls[i], apiKey: "XXXX", fabricName: '_system'});
          // await console.log("Authentication done!!...");

          // Or use Email & Password to Authenticate client instance
          const regionclient = new jsc8(region_urls[i]);
          await regionclient.login("nemo@nautilus.com", "xxxxxx");

          console.log(`\n 6. Ip allowed in region : ${region_urls[i]}`);
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
