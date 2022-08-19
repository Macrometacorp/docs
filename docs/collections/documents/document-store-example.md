---
title: Document Store Example
sidebar_position: 90
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page provides an example of how to create and use a document store using code.

Assume the following credentials for this example:

- Tenant name is `nemo@nautilus.com`.
- User password is `xxxxxx`.

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

## Connect to GDN

The first step in using GDN is to establish a connection to a region. When this code executes, it initializes the server connection to the **closest* region to your location.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'gdn.paas.macrometa.io'
EMAIL ='nemo@nautilus.com'
PASSWORD = 'xxxxx'
GEOFABRIC = '_system'

print("--- Connecting to C8")

client = C8Client(protocol='https', host=HOST, port=443,
                          email=EMAIL, password=PASSWORD,
                          geofabric=GEOFABRIC)
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

## Get GeoFabric Details

To get details of fabric,


<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'gdn.paas.macrometa.io'
EMAIL = 'nemo@nautilus.com'
PASSWORD = 'xxxxx'
GEOFABRIC = '_system'

print("--- Connecting to C8")

client = C8Client(protocol='https', host=HOST, port=443,
                          email=EMAIL, password=PASSWORD,
                          geofabric=GEOFABRIC)

print("Getting GeoFabric details...")
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

  // Or use Email and Password to Authenticate client instance
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

## Create Collection

We can now create collection in the fabric. To do this, first you connect to fabric and then create a collection called `employees`.

The below example shows the steps.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'gdn.paas.macrometa.io'
EMAIL = 'nemo@nautilus.com'
PASSWORD = 'xxxxx'
GEOFABRIC = '_system'
COLLECTION_NAME = 'employees'

print("--- Connecting to C8")

client = C8Client(protocol='https', host=HOST, port=443,
                          email=EMAIL, password=PASSWORD,
                          geofabric=GEOFABRIC)

print("Creating collection…")

client.create_collection(name=COLLECTION_NAME, stream=True)
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

  async function createCollection() {
    await console.log("Creating the collection employees under demoFabric...");
    let collectionDetails;
    try{
      collectionDetails = await client.createCollection('employees'); 
      await console.log("The collection details are: ", collectionDetails);
    } catch(e){
      return "Collection creation did not succeed due to " + e;
    }

    return "Collection " + collectionDetails.name + " created successfully";  
  }

  createCollection().then(console.log);
```

</TabItem>
</Tabs>  

## Create Index

Let's add a `hash_index` called emails to our collection employees. Please refer to reference guide for details on other available index types.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'gdn.paas.macrometa.io'
EMAIL = 'nemo@nautilus.com'
PASSWORD = 'xxxxx'
GEOFABRIC = '_system'
COLLECTION_NAME = 'employees'
FIELDS = ['email', 'name']

print("--- Connecting to C8")

client = C8Client(protocol='https', host=HOST, port=443,
                          email=EMAIL, password=PASSWORD,
                          geofabric=GEOFABRIC)

print("Adding hash index...")

client.add_hash_index(COLLECTION_NAME, fields=FIELDS, unique=False)      
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

  async function createIndex() {
    await console.log("Creating the index on collection employees under demoFabric...");
    let index;
    try{
      index = await client.addHashIndex("employees", ["email", "_key"]); 
      await console.log("The index details are: ", index);
    } catch(e){
      return "Index creation did not succeed due to " + e;
    }

    return "Index created successfully";  
  }

  createIndex().then(console.log);
```

</TabItem>
</Tabs>  

## Insert Documents

Let's insert documents to the employees collection as shown below.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'gdn.paas.macrometa.io'
EMAIL = 'nemo@nautilus.com'
PASSWORD = 'xxxxx'
GEOFABRIC = '_system'
COLLECTION_NAME = 'employees'
DOCS = [
    {'_key':'James', 'firstname': 'James', 'lastname':'Kirk', 'email':'james.kirk@macrometa.io'},
    {'_key': 'Han', 'firstname': 'Han', 'lastname':'Solo', 'email':'han.solo@macrometa.io'},
    {'_key': 'Bruce', 'firstname': 'Bruce', 'lastname':'Wayne', 'email':'bruce.wayne@macrometa.io'}
  ]

print("--- Connecting to C8")

client = C8Client(protocol='https', host=HOST, port=443,
                          email=EMAIL, password=PASSWORD,
                          geofabric=GEOFABRIC)

print("Inserting documents...")

client.insert_document(collection_name=COLLECTION_NAME, document=DOCS)
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

  //Variables
  const docJean = {'_key':'Jean', 
            'firstname': 'Jean', 
            'lastname':'Picard', 'email':'jean.picard@macrometa.io'};

  const docJames = {'_key':'James', 
                    'firstname': 'James', 'lastname':'Kirk', 'email':'james.kirk@macrometa.io'};

  const docHan = {'_key': 'Han', 
                  'firstname': 'Han',
                  'lastname':'Solo', 'email':'han.solo@macrometa.io'};

  const docBruce = {'_key': 'Bruce',
                    'firstname': 'Bruce', 'lastname':'Wayne', 'email':'bruce.wayne@macrometa.io'};

  const docs = [docJean, docJames, docHan, docBruce];


  async function populate() {
    await console.log("Creating the collection object to be used and populating with documents...");
    await client.insertDocumentMany("employees", docs);
    await console.log("collection populated with documents");
  }

  populate();
```

</TabItem>
</Tabs>  

## Query documents using C8QL

C8QL is C8's query language. You can execute C8QL query on our newly created collection employees to get its contents.

The query `FOR employee IN employees RETURN employee` is equivalent to SQL's SELECT query.


<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'gdn.paas.macrometa.io'
EMAIL = 'nemo@nautilus.com'
PASSWORD = 'xxxxx'
GEOFABRIC = '_system'
QUERY = 'FOR employee IN employees RETURN employee'

client = C8Client(protocol='https', host=HOST, port=443,
                          email=EMAIL, password=PASSWORD,
                          geofabric=GEOFABRIC)

cursor = client.execute_query(QUERY)
docs = [document for document in cursor]
print(f"Response from Query: {docs}")
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

  async function c8Queries() {
    
    const result = await client.executeQuery(
      "FOR employee IN employees RETURN employee"
    );
    await console.log(result);
  }

  c8Queries();
```

</TabItem>
</Tabs>  

## Get realtime updates

Example for real-time updates from a collection in fabric:
:::note
Enable the 'Stream' parameter within the collection to get real-time updates.
:::
<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'gdn.paas.macrometa.io'
EMAIL = 'nemo@nautilus.com'
PASSWORD = 'xxxxx'
GEOFABRIC = '_system'
COLLECTION_NAME = 'employees'

client = C8Client(protocol='https', host=HOST, port=443,
                          email=EMAIL, password=PASSWORD,
                          geofabric=GEOFABRIC)

def callback_fn(event):
    print(event)

client.on_change(COLLECTION_NAME, callback=callback_fn)
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

  async function callback_fn(collection){
    await console.log("Connection open on ", collection.name);
  }

  async function realTimeListener() {
    const listener = await client.onCollectionChange("employees");

    listener.on('message',(msg) => console.log("message=>", msg));
    listener.on('open',() => {
        this.callback_fn(collection);
      });
    listener.on('close',() => console.log("connection closed"));
  }

  realTimeListener();
```

</TabItem>
</Tabs>  

## Query as API

Query as API (aka RESTQL) enables developers to quickly convert saved C8QL queries into geo-distributed REST APIs. This eliminates the need for separate backend servers & containers for CRUD operations.


<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
import time
from c8 import C8Client

FED_URL = "gdn.paas.macrometa.io"
GUEST_MAIL = "nemo@nautilus.com"
GUEST_PASSWORD = "xxxxxx"
GEO_FABRIC = "_system"
COLLECTION_NAME = "person"

VALUE = "INSERT {'firstname':@firstname, 'lastname':@lastname, 'email':@email, 'zipcode':@zipcode, '_key': 'abc'} IN %s" % COLLECTION_NAME
PARAMETER = {"firstname": "", "lastname": "", "email": "", "zipcode": ""}

INSERT_DATA = {"query": {"name": "insertRecord", "parameter": PARAMETER, "value": VALUE}} 
GET_DATA = {"query": {"name": "getRecords", "value": "FOR doc IN %s RETURN doc" % COLLECTION_NAME}}
UPDATE_DATA = {"query": {"name": "updateRecord", "value": "UPDATE 'abc' WITH { \"lastname\": \"cena\" } IN %s" % COLLECTION_NAME }}
DELETE_DATA = {"query": {"name": "deleteRecord", "value": "REMOVE 'abc' IN %s" % COLLECTION_NAME}}
GET_COUNT = {"query": {"name": "countRecords", "value": "RETURN COUNT(FOR doc IN %s RETURN 1)" % COLLECTION_NAME}}

if __name__ == '__main__':

    print("\n ------- CONNECTION SETUP  ------")
    print(f"tenant: {GUEST_MAIL}, geofabric:{GEO_FABRIC}")
    client = C8Client(protocol='https', host=FED_URL, port=443,
                    email=GUEST_MAIL, password=GUEST_PASSWORD,
                    geofabric=GEO_FABRIC)    

    print("\n ------- CREATE GEO-REPLICATED COLLECTION  ------")
    if client.has_collection(COLLECTION_NAME):
        print("Collection exists")
    else:
        employees = client.create_collection(COLLECTION_NAME, stream=True)
    print(f"Created collection: {COLLECTION_NAME}")

    print("\n ------- CREATE RESTQLs  ------")
    client.create_restql(INSERT_DATA)  # name: insertRecord
    client.create_restql(GET_DATA)  # name: getRecords
    client.create_restql(UPDATE_DATA)  # name: updateRecord
    client.create_restql(DELETE_DATA)  # name: deleteRecord
    client.create_restql(GET_COUNT)  # name: countRecords
    print(f"Created RESTQLs:{client.get_restqls}")

    time.sleep(3)
    print("\n ------- EXECUTE RESTQLs ------")
    print("Insert data....")
    response = client.execute_restql(
        "insertRecord",
        {"bindVars": {"firstname": "john", "lastname": "doe",
                      "email": "john.doe@macrometa.io", "zipcode": "511037"}})
    print(response)

    print("Get data....")
    response = client.execute_restql("getRecords")
    print(response)

    print("Update data....")
    response = client.execute_restql("updateRecord")
    print(response)

    print("Get data....")
    response = client.execute_restql("getRecords")
    print(response)

    print("Count records....")
    response = client.execute_restql("countRecords")
    print(response)

    print("Delete data....")
    response = client.execute_restql("deleteRecord")
    print(response)

    print("\n ------- DELETE RESTQLs ------")
    client.delete_restql("insertRecord")
    client.delete_restql("getRecords")
    client.delete_restql("updateRecord")
    client.delete_restql("countRecords")
    client.delete_restql("deleteRecord")

    print("\n ------- DONE  ------")
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
  const jsc8 = require('jsc8');

  // Crete a authenticated instance with Token / Apikey
  // const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
  // const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
  // await console.log("Authentication done!!...");

  // Or use Email and Password to Authenticate client instance
  const client = new jsc8("https://gdn.paas.macrometa.io");

  await client.login("nemo@nautilus.com", "xxxxxx");

  //Variables
  const collection_name = "addresses" + Math.floor(1000 + Math.random() * 9000).toString();

  //Queries
  const insert_data = "INSERT {'firstname':@firstname, 'lastname':@lastname, 'email':@email, 'zipcode':@zipcode, '_key': 'abc'} IN " + collection_name;

  const get_data = "FOR doc IN " + collection_name + " RETURN doc";

  const update_data = "UPDATE 'abc' WITH {'lastname': @lastname } IN " + collection_name;

  const delete_data = "REMOVE 'abc' IN " + collection_name;

  const get_count = "RETURN COUNT(FOR doc IN " + collection_name + " RETURN 1)";


  async function restqldemo() {
    console.log("------- CREATE GEO-REPLICATED COLLECTION  ------");

    const collection = await client.createCollection(collection_name);

    console.log("Collection " + collection_name + " created.\n");

    console.log("------- SAVING THE QUERIES  ------");

    await client.createRestql("insertData", insert_data, {});
    await client.createRestql("getData", get_data, {});
    await client.createRestql("updateData", update_data, {});
    await client.createRestql("deleteData", delete_data, {});
    await client.createRestql("getCount", get_count, {});

    console.log("Saved Queries Successfully\n");

    console.log("------- EXECUTING THE QUERIES  ------");

    const bindVars = {
      "firstname": "john", "lastname": "doe",
      "email": "john.doe@macrometa.io", "zipcode": "511037"
    };

    await client.executeRestql("insertData", bindVars);

    console.log("Data Inserted \n");

    const res = await client.executeRestql("getData");

    console.log("Output of get data query:");
    console.log(res.result);
    console.log("\n");

    await client.executeRestql("updateData", { "lastname": "mathews" });

    console.log("Data updated \n");

    const data = await client.executeRestql("getData");

    console.log("Output of get data query after update:");

    console.log(data.result);

    console.log("\n");

    const count = await client.executeRestql("getCount");

    console.log("Count:");

    console.log(count.result);

    await client.executeRestql("deleteData");
  }

  restqldemo().then(console.log("Starting Execution"));
```

</TabItem>
</Tabs>  
