---
sidebar_position: 1
title: Quick Start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start with Graphs

## Overview

Today’s applications are required to be highly responsive and always online. They need to be deployed in datacenters closer to their users and can access data instantly across the globe. 

Macrometa global data network (GDN) is a fully managed realtime materialzed view engine that provides access to data instantly to Apps & APIs in a simple & single interface. 

This article is an introduction to working with documents in GDN with [pyC8](https://pyc8.readthedocs.io/en/latest/) and [jsC8](https://www.npmjs.com/package/jsc8) drivers.

In the drivers, a **document** is a dictionary/object that is JSON serializable with the following properties:

* Contains the `_key` field, which identifies the document uniquely within a specific collection.
* Contains the `_id` field (also called the handle), which identifies the document uniquely across all collections within a fabric. This ID is a combination of the collection name and the document key using the format `{collection}/{key}` (see example below).
* Contains the `_rev` field. GDN supports MVCC (Multiple Version Concurrency Control) and is capable of storing each document in multiple revisions. Latest revision of a document is indicated by this field. The field is populated by GDN and is not required as input unless you want to validate a document against its current revision.

Here is an example of a valid document:

```json
    {
        '_id': 'students/bruce',
        '_key': 'bruce',
        '_rev': '_Wm3dzEi--_',
        'first_name': 'Bruce',
        'last_name': 'Wayne',
        'address': {
            'street' : '1007 Mountain Dr.',
            'city': 'Gotham',
            'state': 'NJ'
        },
        'is_rich': True,
        'friends': ['robin', 'gordon']
    }
```

**Edge documents (edges)** are similar to standard documents but with two additional required fields `_from` and `_to`. Values of these fields must be the handles of "from" and "to" vertex documents linked by the edge document in question. Here is an example of a valid edge document:

```json
    {
        '_id': 'friends/001',
        '_key': '001',
        '_rev': '_Wm3dyle--_',
        '_from': 'students/john',
        '_to': 'students/jane',
        'closeness': 9.5
    }
```

A **Graph** consists of vertices and edges. Edges are stored as documents in edge collections. A vertex can be a document of a document collection or of an edge collection (so edges can be used as vertices). Which collections are used within a named graph is defined via edge definitions. A `named graph` can contain more than one edge definition, at least one is needed. Graphs allow you to structure your models in line with your domain and group them logically in collections and giving you the power to query them in the same graph queries.

In SQL you commonly have the construct of a relation table to store `n:m` relations between two data tables. An `edge collection` is somewhat similar to these relation tables. `Vertex collections` resemble the data tables with the objects to connect. 

While simple graph queries with fixed number of hops via the relation table may be doable in SQL with several nested joins, graph databases can handle an arbitrary number of these hops over edge collections - this is called `traversal`. Also edges in one edge collection may point to several vertex collections. Its common to have attributes attached to edges, i.e. a label naming this interconnection. 

Edges have a direction, with their relations `_from` and `_to` pointing from one document to another document stored in vertex collections. In queries you can define in which directions the edge relations may be followed i.e., 

* OUTBOUND: `_from` → `_to`
* INBOUND: `_from` ← `_to`
* ANY: `_from` ↔ `_to`.

:::note
If you are new to Macrometa GDN, we strongly recommend reading **[Essentials](../../essentials/overview.md)** of Macrometa GDN.
:::

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

## Connect to GDN

The first step in using GDN is to establish a connection to a local region. When this code executes, it initializes the server connection to the region URL you sepcified.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    print("--- Connecting to C8")
    # Simple Way
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password="xxxxxx",
                            geofabric='_system')

    # To use advanced options
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443)

  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");

    // Simple Way
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // ----- OR -----
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});


    // To use advanced options
    const client = new jsc8("https://gdn.paas.macrometa.io"); 
  </TabItem>
</Tabs>  

## Get GeoFabric Details

To get details of fabric,

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password="xxxxxx",
                            geofabric='_system')
    print("Get geo fabric details...")
    print(client.get_fabric_details())

  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8("https://gdn.paas.macrometa.io");

    await client.login("nemo@nautilus.com", "xxxxxx");

    async function getFabric() {
        try{
          await console.log("Getting the fabric details...");
          let result = await client.get();

          await console.log("result is: ", result);
        } catch(e){
          await console.log("Fabric details could not be fetched because "+ e);
        }
    }

    getFabric();
  </TabItem>
</Tabs>  

## Create Collection

We can now create collection in the fabric. To do this, first you connect to fabric and then create a collection called `employees`.

The below example shows the steps.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password="xxxxxx",
                            geofabric='_system')
    client.create_collection(name='employees')

  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8("https://gdn.paas.macrometa.io");

    await client.login("nemo@nautilus.com", "xxxxxx");

    //Variables
    const collection_name = "employees";

    async function createColl() {
        try{
          console.log(`Creating the collection ${collection_name}...`);
          const exists_coll = await client.hasCollection(collection_name);
          if (exists_coll === false) {
            await client.createCollection(collection_name);
          }
        } catch(e){
          await console.log("Collection could not be created because "+ e);
        }
    }

    createColl();
  </TabItem>
</Tabs>  

## Create Edge Collection

An **edge collection** contains edge documents and shares its namespace with all other types of collections. You can manage edge documents via standard collection API wrappers, but using edge collection API wrappers provides additional safeguards:

* All modifications are executed in transactions.
* Edge documents are checked against the edge definitions on insert.


<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Simple Approach
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password="xxxxxx",
                            geofabric='_system')
    client.create_collection(name='employees')
    if client.has_graph('school'):
      print("Graph exists")
    else:
      print("Create: ", client.create_graph(graph_name='school'))

  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8("https://gdn.paas.macrometa.io");

    await client.login("nemo@nautilus.com", "xxxxxx");

    async function createEdgeColl() {
        try{
          console.log(`Creating the edge collection`);
          const exists_coll = await client.hasCollection("edgeCollection");
          if (exists_coll === false) {
            await client.createCollection("edgeCollection", { waitForSync: true }, true);
          }
        } catch(e){
          await console.log("Edge Collection could not be created because "+ e);
        }
    }

    createEdgeColl();

  </TabItem>
</Tabs>  

You can manage edges via graph API wrappers also, but you must use document IDs instead of keys where applicable.

## Insert Documents

Let's insert documents to the employees collection as shown below.


<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password="xxxxxx",
                            geofabric='_system')
    client.insert_document(collection_name='employees', document={'_key':'Jean', 'firstname': 'Jean', 'lastname':'Picard', 'email':'jean.picard@macrometa.io'})

    docs = [
      {'_kefabricy':'James', 'firstname': 'James', 'lastname':'Kirk', 'email':'james.kirk@mafabriccrometa.io'},
      {'_kefabricy': 'Han', 'firstname': 'Han', 'lastname':'Solo', 'email':'han.solo@macrfabricometa.io'},
      {'_kefabricy': 'Bruce', 'firstname': 'Bruce', 'lastname':'Wayne', 'email':'bruce.wayne@mfabricacrometa.io'}
    ]

    client.insert_document(collection_name='employees', document=docs)

  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8("https://gdn.paas.macrometa.io");

    await client.login("nemo@nautilus.com", "xxxxxx");

    async function insertDoc() {
        try{
          await client.insertDocumentMany(
            "employees",
            [{ firstname: 'Jean', lastname: 'Picard' },{ firstname: 'Bruce', lastname: 'Wayne' }]
          );
        } catch(e){
          await console.log("Document could not be inserted because "+ e);
        }
    }

    insertDoc();
  </TabItem>
</Tabs>  

## Create Graph

A graph consists of vertices and edges. Vertices are stored as documents in vertex collections and edges stored as documents in edge collections. The collections used in a graph and their relations are specified with edge definitions.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client

    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password="xxxxxx",
                            geofabric='_system')


    # List existing graphs in the fabric.
    client.get_graphs()

    # Create a new graph named "school" if it does not already exist.
    # This returns an API wrapper for "school" graph.
    iif client.has_graph('school'):
        school = client.graph('school')
    else:
        school = client.create_graph('school')

  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8("https://gdn.paas.macrometa.io");

    await client.login("nemo@nautilus.com", "xxxxxx");

    async function createGraph(){
        const info = await client.createGraph('some-graph', {
          edgeDefinitions: [{
              collection: 'edges',
              from: ['start-vertices'],
              to: ['end-vertices']
          }]
        });
    }

    createGraph();

  </TabItem>
</Tabs>  

## Graph Traversals

A graph consists of `vertices` and `edges`. Vertices are stored as documents in vertex collections and edges stored as documents in edge collections. The collections used in a graph and their relations are specified with edge definitions.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client
    import pprint

    # Variables - Queries
    global_url = "gdn.paas.macrometa.io"
    email = "nemo@nautilus.com"
    password = "xxxxxx"
    geo_fabric = "_system"
    collection_people = "CDRpeople"
    collection_calls = "CDRcalls"
    collection_cellsites = "CDRcellsites"
    collection_graph = "CDRgraphdocs"
    read_people = "FOR person IN CDRpeople RETURN person"
    read_calls = "FOR call IN CDRcalls RETURN call"
    person = "Lou Feaveer"
    graph_traversal1 = "FOR c IN CDRpeople FILTER c.full_name == \"{}\" FOR v IN 1..1 INBOUND c CDRcalls RETURN v".format(person)
    graph_traversal2 = "FOR c IN CDRpeople FILTER c.full_name == \"{}\" FOR v IN 1..1 OUTBOUND c CDRcalls RETURN v".format(person)

    pp = pprint.PrettyPrinter(indent=4)

    # Initialize the C8 Data Fabric client.
    # Step1: Open connection to GDN. You will be routed to closest region.
    print("1. CONNECT: federation: {},  user: {}".format(global_url, email))
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email=email, password=password,
                            geofabric=geo_fabric)


    # Step2: Create collections if not exists
    print("2a. CREATE_PEOPLE_VERTEX_COLLECTION: region: {},  collection: {}".format(global_url, collection_people))
    if client.has_collection(collection_people):
        peopleCol = client.collection(collection_people)
    else:
        peopleCol = client.create_collection(collection_people)

    print("2b. CREATE_CALLS_EDGE_COLLECTION: region: {},  collection: {}".format(global_url, collection_calls))
    if client.has_collection(collection_calls):
        callsCol = client.collection(collection_calls)
    else:
        callsCol = client.create_collection(collection_calls, edge=True)

    # Step3: Insert data into collections.
    print("3a. INSERT_PEOPLE_DATA: region: {}, collection: {}".format(global_url, collection_people))

    # insert documents into the collection
    docs = [
      {
        "full_name": "Kiel Dummer",
        "first_name": "Kiel",
        "last_name": "Dummer",
        "city": "Burbank",
        "state": "CA",
        "address": "40317 5th Crossing",
        "calling_nbr": "757-697-9065",
        "_key": "757-697-9065"
      },
      {
        "full_name": "Pernell Winspare",
        "first_name": "Pernell",
        "last_name": "Winspare",
        "city": "San Diego",
        "state": "CA",
        "address": "596 Packers Pass",
        "calling_nbr": "718-208-8096",
        "_key": "718-208-8096"
      },
      {
        "full_name": "Ava Kermath",
        "first_name": "Ava",
        "last_name": "Kermath",
        "city": "Berkeley",
        "state": "CA",
        "address": "2 Doe Crossing Junction",
        "calling_nbr": "765-623-5328",
        "_key": "765-623-5328"
      },
      {
        "full_name": "Tremain McGrah",
        "first_name": "Tremain",
        "last_name": "McGrah",
        "city": "Torrance",
        "state": "CA",
        "address": "079 Russell Street",
        "calling_nbr": "859-783-3227",
        "_key": "859-783-3227"
      },
      {
        "full_name": "Vidovik Boddam",
        "first_name": "Vidovik",
        "last_name": "Boddam",
        "city": "Los Angeles",
        "state": "CA",
        "address": "3 Brentwood Crossing",
        "calling_nbr": "703-265-1313",
        "_key": "703-265-1313"
      },
      {
        "full_name": "Oralie Goward",
        "first_name": "Oralie",
        "last_name": "Goward",
        "city": "Los Angeles",
        "state": "CA",
        "address": "922 Columbus Park",
        "calling_nbr": "617-815-8610",
        "_key": "617-815-8610"
      },
      {
        "full_name": "Lou Feaveer",
        "first_name": "Lou",
        "last_name": "Feaveer",
        "city": "San Jose",
        "state": "CA",
        "address": "55223 Hooker Crossing",
        "calling_nbr": "716-463-8993",
        "_key": "716-463-8993"
      },
      {
        "full_name": "Peria King",
        "first_name": "Peria",
        "last_name": "King",
        "city": "Stockton",
        "state": "CA",
        "address": "8 Troy Plaza",
        "calling_nbr": "713-707-8699",
        "_key": "713-707-8699"
      }
    ]
    peopleCol.insert_many(docs)

    print("3a. INSERT_CALL_RECORDS_DATA: region: {}, collection: {}".format(global_url, collection_calls))
    docs = [
            {
        "calling_nbr": "757-697-9065",
        "called_nbr": "716-463-8993",
        "_from": "CDRpeople/757-697-9065",
        "_to": "CDRpeople/716-463-8993",
        "call_date": "1/4/2020",
        "call_time": "13:33",
        "call_duration": 30,
        "cell_site": 4044703906
      },
      {
        "calling_nbr": "716-463-8993",
        "called_nbr": "713-707-8699",
        "_from": "CDRpeople/716-463-8993",
        "_to": "CDRpeople/713-707-8699",
        "call_date": "1/28/2020",
        "call_time": "3:02",
        "call_duration": 18,
        "cell_site": 2289973823
      },
      {
        "calling_nbr": "765-623-5328",
        "called_nbr": "713-707-8699",
        "_from": "CDRpeople/765-623-5328",
        "_to": "CDRpeople/713-707-8699",
        "call_date": "1/28/2020",
        "call_time": "3:02",
        "call_duration": 18,
        "cell_site": 2289973823
      }
        ]
    callsCol.insert_many(docs)

    #Step4: Create a graph
    print("4. CREATE_GRAPH...CDRgraph")
    graph = client.create_graph(collection_graph)
    register = graph.create_edge_definition(
            edge_collection=collection_calls,
            from_vertex_collections=[collection_people],
            to_vertex_collections=[collection_people]
        )

    # Step5: Read Data
    print("5a. GRAPH_TRAVERSAL: Find outbound calls TO: {}".format(person))
    cursor = client.execute_query(graph_traversal1)
    docs = [document for document in cursor]
    pp.pprint(docs)
    print("5b. GRAPH_TRAVERSAL: Find inbound calls FROM: {}".format(person))
    cursor = client.execute_query(graph_traversal2)
    docs = [document for document in cursor]
    pp.pprint(docs)

    # Step6: Delete Data
    print("6. DELETE_DATA...")
    #callsCol.truncate()
    #peopleCol.truncate()
    client.delete_graph(collection_graph, drop_collections=False)

  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require('jsc8');

    // Variables - DB
    const global_url = "https://gdn.paas.macrometa.io";

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8("https://gdn.paas.macrometa.io");

    await client.login("nemo@nautilus.com", "xxxxxx");

    //Variables
    const collection_people = "CDRpeople";
    const collection_calls = "CDRcalls";
    const collection_cellsites = "CDRcellsites";
    const collection_graph = "CDRgraphdocs";
    const person = "Lou Feaveer";

    let datalist = [];

    // Variables - Queries
    const read_people = "FOR person IN CDRpeople RETURN person";
    const read_calls = "FOR call IN CDRcalls RETURN call";
    const graph_traversal1 = `FOR c IN CDRpeople FILTER c.full_name == \"${person}\" FOR v IN 1..1 INBOUND c CDRcalls RETURN v`;
    const graph_traversal2 = `FOR c IN CDRpeople FILTER c.full_name == \"${person}\" FOR v IN 1..1 OUTBOUND c CDRcalls RETURN v`;
    
    async function createCollection() {
    
      console.log("\n 2. CREATE_COLLECTION");

      try{
        console.log(`Creating the collection ${collection_people}...`);
          const exists_coll = await client.hasCollection(collection_people);
          if (exists_coll === false) {
            await client.createCollection(collection_people);
          }

          console.log(`Creating the collection ${collection_calls}...`);
          const exists_coll = await client.hasCollection(collection_calls);
          if (exists_coll === false) {
            await client.createCollection(collection_calls);
          }
      }
      catch (e) {
        await console.log("Collection creation did not succeed due to " + e);
      }
    }
        
    async function insertData() {

      console.log(`\n 3a. INSERT_PEOPLE_DATA in region ${global_url}`);
      let people_data =[
        {
          "full_name": "Kiel Dummer",
          "first_name": "Kiel",
          "last_name": "Dummer",
          "city": "Burbank",
          "state": "CA",
          "address": "40317 5th Crossing",
          "calling_nbr": "757-697-9065",
          "_key": "757-697-9065"
        },
        {
          "full_name": "Pernell Winspare",
          "first_name": "Pernell",
          "last_name": "Winspare",
          "city": "San Diego",
          "state": "CA",
          "address": "596 Packers Pass",
          "calling_nbr": "718-208-8096",
          "_key": "718-208-8096"
        },
        {
          "full_name": "Ava Kermath",
          "first_name": "Ava",
          "last_name": "Kermath",
          "city": "Berkeley",
          "state": "CA",
          "address": "2 Doe Crossing Junction",
          "calling_nbr": "765-623-5328",
          "_key": "765-623-5328"
        },
        {
          "full_name": "Tremain McGrah",
          "first_name": "Tremain",
          "last_name": "McGrah",
          "city": "Torrance",
          "state": "CA",
          "address": "079 Russell Street",
          "calling_nbr": "859-783-3227",
          "_key": "859-783-3227"
        },
        {
          "full_name": "Vidovik Boddam",
          "first_name": "Vidovik",
          "last_name": "Boddam",
          "city": "Los Angeles",
          "state": "CA",
          "address": "3 Brentwood Crossing",
          "calling_nbr": "703-265-1313",
          "_key": "703-265-1313"
        },
        {
          "full_name": "Oralie Goward",
          "first_name": "Oralie",
          "last_name": "Goward",
          "city": "Los Angeles",
          "state": "CA",
          "address": "922 Columbus Park",
          "calling_nbr": "617-815-8610",
          "_key": "617-815-8610"
        },
        {
          "full_name": "Lou Feaveer",
          "first_name": "Lou",
          "last_name": "Feaveer",
          "city": "San Jose",
          "state": "CA",
          "address": "55223 Hooker Crossing",
          "calling_nbr": "716-463-8993",
          "_key": "716-463-8993"
        },
        {
          "full_name": "Peria King",
          "first_name": "Peria",
          "last_name": "King",
          "city": "Stockton",
          "state": "CA",
          "address": "8 Troy Plaza",
          "calling_nbr": "713-707-8699",
          "_key": "713-707-8699"
        }
      ]
      await client.insertDocumentMany(collection_people, people_data);

      console.log(`\n 3a. INSERT_CALL_RECORDS_DATA in region ${global_url}`);
      let callsdata = [
        {
        "calling_nbr": "757-697-9065",
        "called_nbr": "716-463-8993",
        "_from": "CDRpeople/757-697-9065",
        "_to": "CDRpeople/716-463-8993",
        "call_date": "1/4/2020",
        "call_time": "13:33",
        "call_duration": 30,
        "cell_site": 4044703906
        },
        {
          "calling_nbr": "716-463-8993",
          "called_nbr": "713-707-8699",
          "_from": "CDRpeople/716-463-8993",
          "_to": "CDRpeople/713-707-8699",
          "call_date": "1/28/2020",
          "call_time": "3:02",
          "call_duration": 18,
          "cell_site": 2289973823
        },
        {
          "calling_nbr": "765-623-5328",
          "called_nbr": "713-707-8699",
          "_from": "CDRpeople/765-623-5328",
          "_to": "CDRpeople/713-707-8699",
          "call_date": "1/28/2020",
          "call_time": "3:02",
          "call_duration": 18,
          "cell_site": 2289973823
        }
      ];
      await client.insertDocumentMany(collection_calls, callsdata);
    }

    async function createGraph(){
      console.log(`\n 4. CREATE_GRAPH region ${global_url}`);

      await client.createGraph(collection_graph, {
        edgeDefinitions: [{
          collection: collection_calls,
          from: [collection_people],
          to: [collection_people]
        }]
      });
    }


    async function readData(){
      console.log(`5a. GRAPH_TRAVERSAL: Find outbound calls TO: ${person}`);
      let result = await client.executeQuery(graph_traversal1);
      console.log(result);
      
      console.log(`5b. GRAPH_TRAVERSAL: Find inbound calls FROM: ${person}`);
      result = await client.executeQuery(graph_traversal2);
      console.log(result);
    }



    async function deleteData(){
      console.log("\ 6. DELETE_DATA");e fabric details...");
      await client.deleteGraph(collection_graph, true);e fabric details...");
      await client.deleteCollection(collection_people);e fabric details...");
      await client.deleteCollection(collection_calls);e fabric details...");
    }


    (async function(){
      await createCollection();
      await insertData();
      await createGraph();
      await readData();
      await deleteData();
    })();

  </TabItem>
</Tabs>  

#### Outbound Traversal

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Step4: Read Data
    print("4a. GRAPH_TRAVERSAL: Find outbound calls TO: {}".format(person))
    cursor = client.execute_query(graph_traversal1)
    docs = [document for document in cursor]
    pp.pprint(docs)

  </TabItem>
  <TabItem value="js" label="Javascript">

    console.log(`5a. GRAPH_TRAVERSAL: Find outbound calls TO: ${person}`);
    let result = await client.executeQuery(graph_traversal1);
    console.log(result);

  </TabItem>
</Tabs>  

#### Inbound Traversal

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    print("4b. GRAPH_TRAVERSAL: Find inbound calls FROM: {}".format(person))
    cursor = client.execute_query(graph_traversal2)
    docs = [document for document in cursor]
    pp.pprint(docs)

  </TabItem>
  <TabItem value="js" label="Javascript">

    console.log(`5b. GRAPH_TRAVERSAL: Find inbound calls FROM: ${person}`);
    result = await client.executeQuery(graph_traversal2);
    console.log(result);
  </TabItem>
</Tabs>  

## Delete Graph

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    from c8 import C8Client

    # Initialize the C8 Data Fabric client.
    client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443,
                            email='nemo@nautilus.com', password="xxxxxx",
                            geofabric='_system')

    # This returns an API wrapper for "school" graph and deletes the graph
    client.delete_graph('school')
    
  </TabItem>
  <TabItem value="js" label="Javascript">

    const jsc8 = require("jsc8");

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email & Password to Authenticate client instance
    const client = new jsc8("https://gdn.paas.macrometa.io");

    await client.login("nemo@nautilus.com", "xxxxxx");

    async function DeleteGraph(){
      await client.deleteGraph(some-graph, true);
    }

    DeleteGraph();
  </TabItem>
</Tabs>  