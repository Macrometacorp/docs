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
    GLOBAL_URL = "play.paas.macrometa.io"
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
const jsc8 = require("jsc8");

// Variables - DB
globalUrl = "https://play.paas.macrometa.io";
regionUrls = [
  "https://gdn-us-west.paas.macrometa.io",
  "https://gdn-eu-central.paas.macrometa.io",
  "https://gdn-ap-south.paas.macrometa.io"
];

// Create an authenticated instance with a token or API key
// const client = new jsc8({url: globalUrl, token: "XXXX", fabricName: '_system'});
const thisApikey = "XXXXX";
const client = new jsc8({ url: globalUrl, apiKey: thisApikey, fabricName: "_system" });
// console.log("Authentication done!!...");

// Or use email and password to authenticate client instance
// const client = new jsc8(globalUrl);
// await client.login("nemo@nautilus.com", "xxxx");

// Variables
const collectionName = "ddoslist";
const ipAddress = "20.1.1.9";

// Variables - Queries
const readQueryValue = `FOR device in ddoslist FILTER device.ip == "${ipAddress}" RETURN { IP:device.ip, IsAllowed:device.action}`;
const insertQueryValue = `INSERT { "ip": "${ipAddress}", "action": "block", "rule": "blacklistA"} INTO ddoslist`;

// Variables - Data
const data = [
  { ip: "10.1.1.1", action: "block", rule: "blacklistA" },
  { ip: "20.1.1.2", action: "block", rule: "blacklistA" },
  { ip: "30.1.1.3", action: "block", rule: "blacklistB" },
  { ip: "40.1.1.4", action: "block", rule: "blacklistA" },
  { ip: "50.1.1.5", action: "block", rule: "blacklistB" },
  { ip: "20.1.1.3", action: "allow", rule: "whitelistA" },
  { ip: "20.1.1.4", action: "allow", rule: "whitelistA" },
  { ip: "30.1.1.4", action: "allow", rule: "whitelistB" },
  { ip: "30.1.1.5", action: "allow", rule: "whitelistB" }
];

// Step 1: Open connection to GDN. You will be routed to closest region.
console.log(`1. Connecting: federation: ${globalUrl},  user: ${thisApikey}`);

async function createCollection () {
  console.log("\n2. Create collections:");

  try {
    console.log(`Creating the collection ${collectionName}...`);
    const existsColl = await client.hasCollection(collectionName);
    if (existsColl === false) {
      await client.createCollection(collectionName);
      console.log(`Collection ${collectionName} was created successfully.`);
    } else {
      console.log(`Collection ${collectionName} alreasy exists.`);
    }
  } catch (e) {
    console.log("Collection creation did not succeed due to " + e);
  }
}

async function insertData () {
  console.log(`\n3. Inserting data in region ${globalUrl}`);
  try {
    await client.insertDocumentMany(collectionName, data);
    console.log("Data has been successfully added to the collection");
  } catch (e) {
    console.log("Data could not be inserted due to " + e);
  }
}

async function readData () {
  console.log(`\n4. reading data in region ${globalUrl}`);
  console.log(`IP is allowed from region: ${globalUrl}`);
  const result = await client.executeQuery(readQueryValue);
  console.log(result);
}

async function blacklistIP () {
  console.log(`\n5. Blacklisting the IP...from region: ${globalUrl}, ip: ${ipAddress}`);
  await client.executeQuery(insertQueryValue);
  console.log("Document added successfully");
}

async function readDataFromAllRegions () {
  console.log("\n6. Checking if the IP is allowed globally");
  try {
    for (let i = 0; i < regionUrls.length; i++) {
      // Create an authenticated instance with a token or API key
      // const regionClient = new jsc8({url: regionUrls[i], token: "XXXX", fabricName: '_system'});
      // const regionClient = new jsc8({url: regionUrls[i], apiKey: "XXXX", fabricName: '_system'});
      // console.log("Authentication done!!...");
      // Or use Email & Password to Authenticate client instance
      // const regionClient = new jsc8(regionUrls[i]);
      // await regionClient.login("nemo@nautilus.com", "xxxxxx");

      const regionClient = new jsc8({ url: regionUrls[i], apiKey: thisApikey, fabricName: "_system" });

      console.log(`\n IP is blocked in region : ${regionUrls[i]}`);
      const result = await regionClient.executeQuery(readQueryValue);
      console.log(result);
    }
  } catch (e) {
    console.log("Could not read due to " + e);
  }
}

async function deleteData () {
  console.log("\n7. Deleting the data");
  try {
    await client.deleteCollection(collectionName);
    console.log("The collection has been deleted successfully");
  } catch (e) {
    console.log("Collection could not be deleted due to " + e);
  }
}

(async function () {
  await createCollection();
  await insertData();
  await readData();
  await blacklistIP();
  await readDataFromAllRegions();
  await deleteData();
})();
```

</TabItem>
</Tabs>  
