---
title: Document Collection Example
sidebar_position: 90
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page provides an example of how to create and use a document collection using code.

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

HOST = 'play.paas.macrometa.io'
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
const fabric = "_system";

const client = new jsc8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });
```

</TabItem>
</Tabs>  

## Get GeoFabric Details

To get details of fabric,


<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'play.paas.macrometa.io'
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

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const client = new jsc8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.log(message);
}

async function getFabric () {
  await client
    .login(email, password)
    .then(() => console.log("1. User authentication done!"))
    .catch((error) => messageHandler(error));

  console.log("2. Getting the details of fabric: " + fabric);
  await client
    .get()
    .then((fabricDetails) => console.log(fabricDetails))
    .catch((error) => messageHandler(error));
}

getFabric()
  .then()
  .catch((error) => messageHandler(error));
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

HOST = 'play.paas.macrometa.io'
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
const jsC8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const collectionName = "employees";
const client = new jsC8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum,
  };
  console.log(message);
}

async function createCollection () {
  await client
    .login(email, password)
    .then(() => console.log("1. User authentication done!"))
    .catch((error) => messageHandler(error));

  console.log(
    "2. Creating collection " + collectionName + " in " + fabric + " fabric"
  );
  await client
    .createCollection(collectionName, {
      stream: true,
      waitForSync: false,
      isLocal: false
    })
    .then((collectionDetails) => {
      console.log(
        "Collection " + collectionDetails.name + " created successfully"
      );
      console.log(collectionDetails);
    })
    .catch((error) => messageHandler(error));
}

createCollection()
  .then()
  .catch((error) => messageHandler(error));
```

</TabItem>
</Tabs>  

## Create Index

Let's add a `hash_index` called emails to our collection employees. Please refer to reference guide for details on other available index types.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'play.paas.macrometa.io'
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

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const collectionName = "employees";
const client = new jsc8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.log(message);
}

async function createIndex () {
  await client
    .login(email, password)
    .then(() => console.log("1. User authentication done!"))
    .catch((error) => messageHandler(error));

  console.log(
    "2. Creating index on collection " +
      collectionName +
      " in " +
      fabric +
      " Fabric"
  );
  await client
    .addHashIndex(collectionName, ["email", "_key"])
    .then((hashIndex) => {
      console.log("3. Index details: ");
      console.log(hashIndex);
    })
    .catch((error) => messageHandler(error));
}

createIndex()
  .then()
  .catch((error) => messageHandler(error));
```

</TabItem>
</Tabs>  

## Insert Documents

Let's insert documents to the employees collection as shown below.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
from c8 import C8Client

HOST = 'play.paas.macrometa.io'
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

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const collectionName = "employees";
const client = new jsc8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

// Variables
const docJean = {
  _key: "Jean",
  firstname: "Jean",
  lastname: "Picard",
  email: "jean.picard@macrometa.io"
};

const docJames = {
  _key: "James",
  firstname: "James",
  lastname: "Kirk",
  email: "james.kirk@macrometa.io"
};

const docHan = {
  _key: "Han",
  firstname: "Han",
  lastname: "Solo",
  email: "han.solo@macrometa.io"
};

const docBruce = {
  _key: "Bruce",
  firstname: "Bruce",
  lastname: "Wayne",
  email: "bruce.wayne@macrometa.io"
};

const docs = [docJean, docJames, docHan, docBruce];

function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.log(message);
}

async function insertDataInCollection () {
  await client
    .login(email, password)
    .then((e) => console.log("1. User authentication done!"))
    .catch((error) => messageHandler(error));
  console.log("2. Insert documents into collection " + collectionName);
  await client
    .insertDocumentMany(collectionName, docs)
    .then((documentsDetails) => {
      console.log(documentsDetails);
      console.log("Documents inserted into collection " + collectionName);
    })
    .catch((error) => messageHandler(error));
}

insertDataInCollection()
  .then()
  .catch((error) => messageHandler(error));
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

HOST = 'play.paas.macrometa.io'
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
const jsC8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const query = "FOR employee IN employees RETURN employee";
const client = new jsC8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.log(message);
}

async function c8Queries() {
  await client
    .login(email, password)
    .then((e) => console.log("1. User authentication done!"))
    .catch((error) => messageHandler(error));

  console.log("2. Executing query");
  await client
    .executeQuery(query)
    .then((queryResult) => console.log(queryResult))
    .catch((error) => messageHandler(error));
}

c8Queries()
  .then()
  .catch((error) => messageHandler(error));
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

HOST = 'play.paas.macrometa.io'
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
const jsC8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const collectionName = "employees";
const client = new jsC8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric,
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

function messageHandler(error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum,
  };
  console.log(message);
}

async function callback_fn(collection) {
  console.log("Connection open on ", collection.name);
}

async function realTimeListener() {
  await client
    .login(email, password)
    .then((e) => console.log("1. User authentication done!"))
    .catch((error) => messageHandler(error));

  await client
    .onCollectionChange(collectionName)
    .then((listener) => {
      listener.on("message", (msg) => console.log("message=>", msg));
      listener.on("open", () => {
        callback_fn(collectionName).then((e) => console.log(e));
      });
      listener.on("close", () => console.log("connection closed"));
    })
    .catch((error) => error);
}

realTimeListener()
  .then()
  .catch((error) => messageHandler(error));
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

HTTP_URL = "play.paas.macrometa.io"
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
    client = C8Client(protocol='https', host=HTTP_URL, port=443,
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
 const jsc8 = require("jsc8");

// Email and password to authenticate client instance
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const fabric = "_system";
const client = new jsc8({
  url: "https://play.paas.macrometa.io",
  fabricName: fabric
});

// Or use one of the following authentication methods and remove the commenting.
// Create an authenticated instance with a JWT token.
// const clientUsingJwt = new jsc8({url: "https://play.paas.macrometa.io" , token: "XXXX" , fabricName: fabric});
// Create an authenticated instance with an API key.
// const clientUsingApiKey = new jsc8({url: "https://play.paas.macrometa.io" , apiKey: "XXXX" , fabricName: fabric });

function messageHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum,
  };
  console.log(message);
}

//Variables
const collectionName = "employees";

//Queries
const insertData =
  "INSERT {'firstname':@firstname, 'lastname':@lastname, 'email':@email, 'zipcode':@zipcode, '_key': 'abc'} IN " +
  collectionName;

const getData = "FOR doc IN " + collectionName + " RETURN doc";

const updateData =
  "UPDATE 'abc' WITH {'lastname': @lastname } IN " + collectionName;

const deleteData = "REMOVE 'abc' IN " + collectionName;

const getCount = "RETURN COUNT(FOR doc IN " + collectionName + " RETURN 1)";

async function restqldemo () {
  await client
    .login(email, password)
    .then(() => console.log("\n1. User authentication done!"))
    .catch((error) => messageHandler(error));

  console.log("\n------- SAVING THE QUERIES  ------");

  await client
    .createRestql("insertData", insertData, {})
    .then((restQl) => {
      console.log("2. " + restQl.result.name + "query created.");
    })
    .catch((error) => messageHandler(error));
  await client
    .createRestql("getData", getData, {})
    .then((restQl) =>
      console.log("3. " + restQl.result.name + "query created.")
    )
    .catch((error) => messageHandler(error));
  await client
    .createRestql("updateData", updateData, {})
    .then((restQl) =>
      console.log("4. " + restQl.result.name + "query created.")
    )
    .catch((error) => messageHandler(error));
  await client
    .createRestql("deleteData", deleteData, {})
    .then((restQl) =>
      console.log("5. " + restQl.result.name + "query created.")
    )
    .catch((error) => messageHandler(error));
  await client
    .createRestql("getCount", getCount, {})
    .then((restQl) =>
      console.log("6. " + restQl.result.name + "query created.")
    )
    .catch((error) => messageHandler(error));

  console.log("\n------- RUNNING THE QUERIES  ------");

  const bindVars = {
    firstname: "john",
    lastname: "doe",
    email: "john.doe@macrometa.io",
    zipcode: "511037",
  };

  await client
    .executeRestql("insertData", bindVars)
    .then(() => console.log("\n7. Data inserted."))
    .catch((error) => messageHandler(error));

  await client
    .executeRestql("getData")
    .then((res) => {
      console.log("\n8. getData query result: ");
      console.log(res.result);
    })
    .catch((error) => messageHandler(error));

  await client
    .executeRestql("updateData", { lastname: "mathews" })
    .then(() => console.log("\n9. Data updated."))
    .catch((error) => messageHandler(error));

  await client
    .executeRestql("getData")
    .then((res) => {
      console.log("\n10. Updated getData query output: ");
      console.log(res.result);
    })
    .catch((error) => messageHandler(error));

  await client
    .executeRestql("getCount")
    .then((res) => {
      console.log("\n11. Count: " + res.result);
    })
    .catch((error) => messageHandler(error));

  await client
    .executeRestql("deleteData")
    .then(() => console.log("\n12. DeleteData query executed."))
    .catch((error) => messageHandler(error));
}

restqldemo()
  .then(console.log("Starting execution"))
  .catch((error) => messageHandler(error));
```

</TabItem>
</Tabs>  
