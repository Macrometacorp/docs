---
sidebar_position: 1
title: Quikstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start with Search

Macrometa GDN includes a fast and powerful geo-replicated full-text search engine natively integrated into its various data models-  `Key Value`, `Documents` and `Graphs`.

The search engine allows users to combine two information retrieval techniques: `boolean` and `generalized ranking retrieval`. The search results `approved` by the boolean model are `ranked by relevance` to the respective query using the Vector Space Model in conjunction with `BM25` or `TFIDF` weighting schemes.

The search engine provides following capabilities to its users:

* Complex Searches with Boolean Operators
* Relevance-Based Matching
* Phrase and Prefix Matching
* Custom Ranking and Relevance Tuning
* Configurable Analyzers & Tokenization
* Return whole documents or projections of documents.
* Combinability of search queries with multiple supported data models & access patterns
* Geo Replicated Search indexes for instant results.

## Pre-requisite

Let's assume your

* tenant name is `nemo@nautilus.com` and 
* user password is `xxxxxxx`.

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

## Connect to GDN

The first step in using GDN is to establish a connection to a local region. When this code executes, it initializes the server connection to the URL you sepcified. You can create an API key from the GUI or REST API.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client

    # Simple Way
    print("--- Connecting to C8")
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password="xxxxxx",
                            geofabric='_system')

    # OR Using token
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
    token="XXXX")

    # OR Using API Key
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
    apikey="<your-api-key>")
    
  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");

    // Simple Way
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "", fabricName: '_system'});
    // ----- OR -----
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "<your-api-key>", fabricName: '_system'});

    // To use advanced options
    const client = new jsc8("https://gdn.paas.macrometa.io"); 
  
  </TabItem>
</Tabs>  

## Create Collection

Create a Collection for saving the Key Value Pairs

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client

    key = "<your-api-key>"
    collection_name = "students"

    # Create a connection to gdn
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
    apikey=key)

    # Create a new collection if it does not exist
    if client.has_collection(collection_name):
        print("Collection exists")
    else:
        client.create_collection_kv(name=collection_name)

  </TabItem>
  <TabItem value="js" label="Javascript">

    // Add this snippet in previously created main function
    let coll = await client.getKVCollections();
    console.log("Existing Collections: ", coll.result);
    try{
        await client.createKVCollection(collectionName);
        console.log("Collection Created Successfully");
    }
    catch(e){
        console.log("Collection creation did not succeed due to " + e);
    }
  
  </TabItem>
</Tabs>  

## Insert Key Value Pairs

Insert key value pairs into the collection.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client

    key = "<your-api-key>"
    collection_name = "students"

    # Create a connection to gdn
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
    apikey=key)
    # Insert Key Value pairs
    data = [
      {
        "_key": "John",
        "value": "Science",
        "expireAt": 0
      },
      {
        "_key": "Alice",
        "value": "Maths",
        "expireAt": 0
      },
      {
        "_key": "Alex",
        "value": "Physics",
        "expireAt": 0
      },
      {
        "_key": "Monika",
        "value": "Chemistry",
        "expireAt": 0
      }
    ]

    client.insert_key_value_pair(collection_name, data)
    print("KV Pairs Inserted")
  
  </TabItem>
  <TabItem value="js" label="Javascript">

    // Insert Key Value pairs
    var data = [
      {
        "_key": "John",
        "value": "Science",
        "expireAt": 0
      },
      {
        "_key": "Alice",
        "value": "Maths",
        "expireAt": 0
      },
      {
        "_key": "Alex",
        "value": "Physics",
        "expireAt": 0
      },
      {
        "_key": "Monika",
        "value": "Chemistry",
        "expireAt": 0
      }
    ]
    try{
        await client.insertKVPairs(collectionName, data);
        console.log("Key Value pairs inserted successfully.");
    }
    catch(e){
        console.log("Key Value Pairs not inserted due to " + e);
    }
  
  </TabItem>
</Tabs>  

## TBD

### Enable Search

### Basic Querying

### Search vs Filter

### Phrase Search

### Proximity Search

### Min Match

### Analyzers

### Ranking in Search

### Relevance Tuning

### Complete Example