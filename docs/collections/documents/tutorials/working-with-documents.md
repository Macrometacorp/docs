---
sidebar_position: 2
title: Quickstart
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart - Document Collections

This page guides you through quickly getting started with document collections.

## Pre-requisite

Let's assume your

* Tenant name is `nemo@nautilus.com` and
* User password is `xxxxxx`.

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
  from c8 import C8Client
  import pprint
  import time

  if __name__ == '__main__':

    # Variables - URLs
    GLOBAL_URL = "gdn.paas.macrometa.io"
    REGION_URLS = [
        "gdn-us-west.paas.macrometa.io",
        "gdn-us-east.paas.macrometa.io",
        "gdn-us-central.paas.macrometa.io"
        "gdn-eu-west.paas.macrometa.io",
        "gdn-eu-central.paas.macrometa.io",
        "gdn-ap-west.paas.macrometa.io",
        "gdn-ap-south.paas.macrometa.io",
        "gdn-ap-northeast.paas.macrometa.io",
        "gdn-ap-sydney.paas.macrometa.io",
    ]

    # Variables - DB
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxx"
    GEO_FABRIC = "_system"
    COLLECTION_NAME = "ddoslist"
    IP_ADDRESS = "20.1.1.9"

    # Variables - Queries
    READ_QUERY = f"FOR device in ddoslist FILTER device.ip == {IP_ADDRESS} RETURN" + "{IP:device.ip, IsAllowed:device.action}"

    INSERT_QUERY = "INSERT { \"ip\" : \"" + IP_ADDRESS + "\", \"action\": \"block\", \"rule\":\"blocklistA\"} INTO ddoslist"

    # Variables - Data
    DATA = [
      {"ip": "10.1.1.1", "action": "block", "rule": "blocklistA"},
      {"ip": "20.1.1.2", "action": "block", "rule": "blocklistA"},
      {"ip": "30.1.1.3", "action": "block", "rule": "blocklistB"},
      {"ip": "40.1.1.4", "action": "block", "rule": "blocklistA"},
      {"ip": "50.1.1.5", "action": "block", "rule": "blocklistB"},
      {"ip": "20.1.1.3", "action": "allow", "rule": "allowlistA"},
      {"ip": "20.1.1.4", "action": "allow", "rule": "allowlistA"},
      {"ip": "30.1.1.4", "action": "allow", "rule": "allowlistB"},
      {"ip": "30.1.1.5", "action": "allow", "rule": "allowlistB"}
    ]
    pp = pprint.PrettyPrinter(indent=4)

    # Step 1: Open connection to GDN. You will be routed to closest region.
    print(f"1. CONNECT: federation: {GLOBAL_URL},  user: {EMAIL}")
    client = C8Client(protocol = 'https', host = GLOBAL_URL, port = 443,
                      email = EMAIL, password = PASSWORD,
                      geofabric = GEO_FABRIC)

    # Step 2: Create a collection if not exists
    print(f"2. CREATE_COLLECTION: region: {GLOBAL_URL},  collection: {COLLECTION_NAME}")
    if client.has_collection(COLLECTION_NAME):
        collection = client.collection(COLLECTION_NAME)
    else:
        collection = client.create_collection(COLLECTION_NAME)

    # Step 3: Insert data into collection.
    print(f"3. INSERT_DDOS_DATA: in region: {GLOBAL_URL}")
    client.insert_document(COLLECTION_NAME, document = DATA)

    # Step 4: Read Data
    print(f"4. IS_IP_ALLOWED...from region: {GLOBAL_URL}")
    cursor = client.execute_query(READ_QUERY)
    docs = [document for document in cursor]
    if docs == []:
      print(f"IP: {IP_ADDRESS}" + "IsAllowed: {"'allow'"}\n")
    else:
      pp.pprint(docs)

    # Step 5: Blocklist IP Address
    print(f"5. BLOCKLIST the IP...from region: {GLOBAL_URL}, ip: {IP_ADDRESS}")
    cursor = client.execute_query(INSERT_QUERY)
    time.sleep(0.3)

    # Step 6: Read Data from other regions.
    print("6. Check again if IP is allowed globally")
    for region_url in REGION_URLS:
      print(f"\n IS_IP_ALLOWED...cheking from region: {region_url}")
      clientx = C8Client(protocol = 'https', host = region_url, port = 443, email = EMAIL, password = PASSWORD,
                          geofabric = GEO_FABRIC)
      cursorx = clientx.execute_query(READ_QUERY)
      docs = [document for document in cursorx]
      pp.pprint(docs[0])

    # Step 7: Delete Data
    print(f"\n7. DELETE_DATA: region: {GLOBAL_URL}, collection: {COLLECTION_NAME}")
    collection.truncate()
    #client.delete_collection(COLLECTION_NAME)
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
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

  const insert_query = "INSERT { \"ip\" : \"" + ip_address + "\", \"action\": \"block\", \"rule\":\"blocklistA\"} INTO ddoslist";

  // Variables - Data
  const data = [
    {"ip": "10.1.1.1", "action": "block", "rule": "blocklistA"},
    {"ip": "20.1.1.2", "action": "block", "rule": "blocklistA"},
    {"ip": "30.1.1.3", "action": "block", "rule": "blocklistB"},
    {"ip": "40.1.1.4", "action": "block", "rule": "blocklistA"},
    {"ip": "50.1.1.5", "action": "block", "rule": "blocklistB"},
    {"ip": "20.1.1.3", "action": "allow", "rule": "allowlistA"},
    {"ip": "20.1.1.4", "action": "allow", "rule": "allowlistA"},
    {"ip": "30.1.1.4", "action": "allow", "rule": "allowlistB"},
    {"ip": "30.1.1.5", "action": "allow", "rule": "allowlistB"}
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

    console.log(`\n 5. BLOCKLIST the IP...from region: ${global_url}, ip: ${ip_address}`);
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
```

</TabItem>
</Tabs>  
