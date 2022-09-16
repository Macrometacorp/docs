---
title: Graph Edge Quickstart
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article is an introduction to working with documents in GDN with [pyC8](https://pyc8.readthedocs.io/en/latest/) and [jsC8](https://www.npmjs.com/package/jsc8) SDKs.

_Graphs_ enable you to group your data and perform more powerful queries across connected documents. A graph consists of _vertices_ and _edges_. Vertices are stored in collections and linked by an edge document. Edges are stored as documents in edge collections, and vertices can be a document or an edge.

The _edge definition_ determines which collections are used in a named graph. A named graph must contain at least one edge definition.

 You can turn documents into graph structures for semantic queries with nodes, edges, and properties. Graphs directly connect data items between different collections. You can use graphs to refer to documents in different tables without a nested join. Graphs can also find patterns of document connections, such as the shortest path between two vertices in a graph.

Edges in one edge collection may point to several vertex collections. You can add attributes to edges to do things like labelling connections.

Edges have a direction, with their relations `_from` and `_to` pointing from one document to another document stored in vertex collections. In queries you can define in which directions the edge relations may be followed:

- OUTBOUND: `_from` → `_to`
- INBOUND: `_from` ← `_to`
- ANY: `_from` ↔ `_to`.

## Example

For this example, assume the following credentials:

- Tenant name is `nemo@nautilus.com`.
- User password is `xxxxxx`.

### SDK Download

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

### Connect to GDN

The first step in using GDN is to establish a connection to a local region. When this code executes, it initializes the server connection to the region URL you sepcified.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    from c8 import C8Client

    EMAIL = 'nemo@nautilus.com'
    PASSWORD = 'xxxxx'
    HOST = 'gdn.paas.macrometa.io'
    GEO_FABRIC = '_system'

    print("--- Connecting to C8")

    client = C8Client(protocol='https', host=HOST, port=443,
                      email=EMAIL, password=PASSWORD,
                      geofabric=GEO_FABRIC)
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    const jsc8 = require("jsc8");

    // Simple Way
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // ----- OR -----
    const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});


    // To use advanced options
    const client = new jsc8("https://gdn.paas.macrometa.io");
```

  </TabItem>
</Tabs>  

### Get GeoFabric Details

To get details of fabric,

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    from c8 import C8Client

    EMAIL = 'nemo@nautilus.com'
    PASSWORD = 'xxxxx'
    HOST = 'gdn.paas.macrometa.io'
    GEO_FABRIC = '_system'

    print("--- Connecting to C8")

    client = C8Client(protocol='https', host=HOST, port=443,
                      email=EMAIL, password=PASSWORD,
                      geofabric=GEO_FABRIC)

    print("Get geo fabric details...")

    print(client.get_fabric_details())
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
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
```

  </TabItem>
</Tabs>  

### Create Collection

We can now create collection in the fabric. To do this, first you connect to fabric and then create a collection called `employees`.

The below example shows the steps.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    from c8 import C8Client

    EMAIL = 'nemo@nautilus.com'
    PASSWORD = 'xxxxx'
    HOST = 'gdn.paas.macrometa.io'
    GEO_FABRIC = '_system'

    print("--- Connecting to C8")

    client = C8Client(protocol='https', host=HOST, port=443,
                      email=EMAIL, password=PASSWORD,
                      geofabric=GEO_FABRIC)
                        
    client.create_collection(name='employees')
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    const jsc8 = require("jsc8");

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email and Password to Authenticate client instance
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
```

  </TabItem>
</Tabs>  

### Create Edge Collection

An **edge collection** contains edge documents and shares its namespace with all other types of collections. You can manage edge documents via standard collection API wrappers, but using edge collection API wrappers provides additional safeguards:

- All modifications are executed in transactions.
- Edge documents are checked against the edge definitions on insert.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    from c8 import C8Client

    EMAIL = 'nemo@nautilus.com'
    PASSWORD = 'xxxxx'
    HOST = 'gdn.paas.macrometa.io'
    GEO_FABRIC = '_system'

    print("--- Connecting to C8")

    client = C8Client(protocol='https', host=HOST, port=443,
                      email=EMAIL, password=PASSWORD,
                      geofabric=GEO_FABRIC)

    if client.has_graph('school'):
          print("Graph exists")
    else:
          print("Create: ", client.create_graph(graph_name='school'))
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
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
```

</TabItem>
</Tabs>  

You can manage edges via graph API wrappers also, but you must use document IDs instead of keys where applicable.

### Insert Documents

Let's insert documents to the employees collection as shown below.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    from c8 import C8Client

    EMAIL = 'nemo@nautilus.com'
    PASSWORD = 'xxxxx'
    HOST = 'gdn.paas.macrometa.io'
    GEO_FABRIC = '_system'

    print("--- Connecting to C8")

    client = C8Client(protocol='https', host=HOST, port=443,
                      email=EMAIL, password=PASSWORD,
                      geofabric=GEO_FABRIC)

    client.insert_document(collection_name='employees', document={'_key': 'Jean', 'firstname': 'Jean', 'lastname': 'Picard',
                                                              'email': 'jean.picard@macrometa.io'})

    docs = [
        {'_kefabricy': 'James', 'firstname': 'James', 'lastname': 'Kirk', 'email': 'james.kirk@mafabriccrometa.io'},
        {'_kefabricy': 'Han', 'firstname': 'Han', 'lastname': 'Solo', 'email': 'han.solo@macrfabricometa.io'},
        {'_kefabricy': 'Bruce', 'firstname': 'Bruce', 'lastname': 'Wayne', 'email': 'bruce.wayne@mfabricacrometa.io'}
    ]

    client.insert_document(collection_name='employees', document=docs)
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    const jsc8 = require("jsc8");

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email and Password to Authenticate client instance
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
```

</TabItem>
</Tabs>  

### Create Graph

A graph consists of vertices and edges. Vertices are stored as documents in vertex collections and edges stored as documents in edge collections. The collections used in a graph and their relations are specified with edge definitions.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    from c8 import C8Client

    EMAIL = 'nemo@nautilus.com'
    PASSWORD = 'xxxxx'
    HOST = 'gdn.paas.macrometa.io'
    GEO_FABRIC = '_system'

    print("--- Connecting to C8")

    client = C8Client(protocol='https', host=HOST, port=443,
                      email=EMAIL, password=PASSWORD,
                      geofabric=GEO_FABRIC)

    # List existing graphs in the fabric.
    client.get_graphs()

    # Create a new graph named "school" if it does not already exist.
    if client.has_graph('school'):
        school = client.get_graph('school')
    else:
        school = client.create_graph('school')
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    const jsc8 = require("jsc8");

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email and Password to Authenticate client instance
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
```

</TabItem>
</Tabs>  

### Graph Traversals

A graph consists of `vertices` and `edges`. Vertices are stored as documents in vertex collections and edges stored as documents in edge collections. The collections used in a graph and their relations are specified with edge definitions.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    from c8 import C8Client
    import pprint

    # Variables - Queries
    GLOBAL_URL = "gdn.paas.macrometa.io"
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    GEO_FABRIC = "_system"
    COLLECTION_PEOPLE = "CDRpeople"
    COLLECTION_CALLS = "CDRcalls"
    COLLECTION_GRAPH = "CDRgraphdocs"
    READ_PEOPLE = f"FOR person IN {COLLECTION_PEOPLE} RETURN person"
    READ_CALLS = f"FOR call IN {COLLECTION_CALLS} RETURN call"
    PERSON = "Lou Feaveer"
    GRAPH_TRAVERSAL_1 = (f"FOR c IN {COLLECTION_PEOPLE} FILTER c.full_name == \"{PERSON}\""
        f"FOR v IN 1..1 INBOUND c {COLLECTION_CALLS} RETURN v")
    GRAPH_TRAVERSAL_2 = (f"FOR c IN {COLLECTION_PEOPLE} FILTER c.full_name == \"{PERSON}\""
        f"FOR v IN 1..1 OUTBOUND c {COLLECTION_CALLS} RETURN v")

    pp = pprint.PrettyPrinter(indent=4)

    # Initialize the C8 Data Fabric client.
    # Step1: Open connection to GDN. You will be routed to closest region.
    print(f"1. CONNECT: federation: {GLOBAL_URL},  user: {EMAIL}")
    
    client = C8Client(protocol='https', host=GLOBAL_URL, port=443,
                      email=EMAIL, password=PASSWORD,
                      geofabric=GEO_FABRIC)

    # Step2: Create collections if not exists
    print(f"2a. CREATE_PEOPLE_VERTEX_COLLECTION: region: {GLOBAL_URL}, collection: {COLLECTION_PEOPLE}")

    if client.has_collection(COLLECTION_PEOPLE):
        peopleCol = client.collection(COLLECTION_PEOPLE)
    else:
        peopleCol = client.create_collection(COLLECTION_PEOPLE)

    print(f"2b. CREATE_CALLS_EDGE_COLLECTION: region: {GLOBAL_URL},  collection: {COLLECTION_CALLS}")

    if client.has_collection(COLLECTION_CALLS):
        callsCol = client.collection(COLLECTION_CALLS)
    else:
        callsCol = client.create_collection(COLLECTION_CALLS, edge=True)

    # Step3: Insert data into collections.
    print(f"3a. INSERT_PEOPLE_DATA: region: {GLOBAL_URL}, collection: {COLLECTION_PEOPLE}")

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

    print(f"3a. INSERT_CALL_RECORDS_DATA: region: {GLOBAL_URL}, collection: {COLLECTION_CALLS}")

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

    # Step4: Create a graph
    print("4. CREATE_GRAPH...CDRgraph")

    graph = client.create_graph(COLLECTION_GRAPH)
    register = graph.create_edge_definition(
    edge_collection=COLLECTION_CALLS,
    from_vertex_collections=[COLLECTION_PEOPLE],
    to_vertex_collections=[COLLECTION_PEOPLE]
    )

    # Step5: Read Data
    print(f"5a. GRAPH_TRAVERSAL: Find outbound calls TO: {PERSON}")
    cursor = client.execute_query(GRAPH_TRAVERSAL_1)
    docs = list(document for document in cursor)
    pp.pprint(docs)
    print(f"5b. GRAPH_TRAVERSAL: Find inbound calls FROM: {PERSON}")
    cursor = client.execute_query(GRAPH_TRAVERSAL_2)
    docs = list(document for document in cursor)
    pp.pprint(docs)

    # Step6: Delete Data
    print("6. DELETE_DATA...")
    client.delete_graph(COLLECTION_GRAPH, drop_collections=False)
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    const jsc8 = require('jsc8');

    // Variables - DB
    const global_url = "https://gdn.paas.macrometa.io";

    // Crete a authenticated instance with Token / Apikey
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
    // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
    // await console.log("Authentication done!!...");

    // Or use Email and Password to Authenticate client instance
    const client = new jsc8("https://gdn.paas.macrometa.io");

    await client.login("nemo@nautilus.com", "xxxxxx");

    //Variables
    const collection_people = "CDRpeople";
    const collection_calls = "CDRcalls";
    const collection_graph = "CDRgraphdocs";
    const person = "Lou Feaveer";

    let datalist = [];

    // Variables - Queries
    const read_people = "FOR person IN ${collection_people} RETURN person";
    const read_calls = "FOR call IN ${collection_calls} RETURN call";
    const graph_traversal1 = `FOR c IN ${collection_people} FILTER c.full_name == \"${person}\" FOR v IN 1..1 INBOUND c ${collection_calls} RETURN v`;
    const graph_traversal2 = `FOR c IN ${collection_people} FILTER c.full_name == \"${person}\" FOR v IN 1..1 OUTBOUND c ${collection_calls} RETURN v`;
    
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
```

  </TabItem>
</Tabs>  

##### Outbound Traversal

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    print(f"4a. GRAPH_TRAVERSAL: Find outbound calls TO: {person}")
    cursor = client.execute_query(GRAPH_TRAVERSAL_1)
    docs = list(document for document in cursor)
    pp.pprint(docs)
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    console.log(`5a. GRAPH_TRAVERSAL: Find outbound calls TO: ${person}`);
    let result = await client.executeQuery(graph_traversal1);
    console.log(result);
```

  </TabItem>
</Tabs>  

##### Inbound Traversal

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    print(f"4b. GRAPH_TRAVERSAL: Find inbound calls FROM: {person}")
    cursor = client.execute_query(GRAPH_TRAVERSAL_2)
    docs = list(document for document in cursor)
    pp.pprint(docs)
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
    console.log(`5b. GRAPH_TRAVERSAL: Find inbound calls FROM: ${person}`);
    result = await client.executeQuery(graph_traversal2);
    console.log(result);
```

  </TabItem>
</Tabs>  

### Delete Graph

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
    from c8 import C8Client

    EMAIL = 'nemo@nautilus.com'
    PASSWORD = 'xxxxx'
    HOST = 'gdn.paas.macrometa.io'
    GEO_FABRIC = '_system'

    print("--- Connecting to C8")

    client = C8Client(protocol='https', host=HOST, port=443,
                            email=EMAIL, password=PASSWORD,
                            geofabric=GEO_FABRIC)

    client.delete_graph('school')
```

  </TabItem>
  <TabItem value="js" label="Javascript">

```js
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
```

  </TabItem>
</Tabs>  
