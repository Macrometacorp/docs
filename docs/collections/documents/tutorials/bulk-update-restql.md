---
sidebar_position: 3
title: Bulk Update with RestQL
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This tutorial is about using RestQL to bulk update `document` Collection data. 

:::note
If you are new to Macrometa GDN, we strongly recommend reading **[What is Macrometa](../../../what-is-macrometa.md)** of Macrometa GDN.
:::

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
<TabItem value="RA" label="Rest API">

```js
class APIRequest {
    _headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };

    constructor(url) {
        this._url = url;
    }

    login(email, password) {
        const endpoint = "/_open/auth";
        const self = this;
        return new Promise(function (resolve, reject) {
            self.req(endpoint, {
                body: { email, password },
                method: "POST"
            })
                .then(({ jwt, ...data }) => {
                    self._headers.authorization = `bearer ${jwt}`;
                    resolve(data);
                })
                .catch(reject);
        });
    }

    _handleResponse(response, resolve, reject) {
        if (response.ok) {
            resolve(response.json());
        } else {
            reject(response);
        }
    }

    req(endpoint, { body, ...options } = {}) {
        const self = this;
        return new Promise(function (resolve, reject) {
            fetch(self._url + endpoint, {
                headers: self._headers,
                body: body ? JSON.stringify(body) : undefined,
                ...options,
            }).then((response) => self._handleResponse(response, resolve, reject));
        });
    }
}

// Variables
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const federationUrl = "https://api-smoke1.eng.macrometa.io";
const fabricName = "_system";
const collectionName = "superhero" + Math.floor(1000 + Math.random() * 9000).toString();
const jamesKey = "james.kirk" + Math.floor(1000 + Math.random() * 9000).toString();
const bruceKey = "bruce.wayne" + Math.floor(1000 + Math.random() * 9000).toString();
const barryKey = "barry.allen" + Math.floor(1000 + Math.random() * 9000).toString();

const inputDocs = [
  { "_key": jamesKey, "firstname": "James", "lastname": "Kirk", "email": "james.kirk@macrometa.io", "zipcode": "12312" },
  { "_key": bruceKey, "firstname": "Bruce", "lastname": "Wayne", "email": "bruce.wayne@macrometa.io", "zipcode": "12345" }
];

const updateKeys = [jamesKey, bruceKey];
const updateKeyValue = {
  bruceKey: { key: bruceKey, zipcode: "22222" },
  jamesKey: { key: jamesKey, zipcode: "55555" }
};

// Queries
const insertData = `FOR doc in @InputDocs \
INSERT { "firstname":doc.firstname, "lastname":doc.lastname, "email":doc.email, "zipcode":doc.zipcode, "_key": doc._key } IN ${collectionName}`;

const getData = `FOR doc IN ${collectionName} RETURN doc`;

const updateData = `FOR i IN ${collectionName} \
FILTER i._key IN @updateKeys \
UPDATE i with { zipcode: (i._key == @updateKeyValue[i._key].key) ? @updateKeyValue[i._key].zipcode : i.zipcode } IN ${collectionName}`;

const updatedInsertData = `INSERT 
{ "firstname": "Barry", "lastname": "Allen", "email": "barry.allen@macrometa.io", "zipcode": "44444", "_key": @barryKey } IN ${collectionName}`;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const run = async function () {
    try {
        const connection = new APIRequest(federationUrl);

        /* -------------------- Login (nemo@nautilus.com/xxxxxxx) -------------------- */
        await connection.login(email, password);
        console.log("Login Successfully using ", email);

        /* -------------------------- Create Doc Collection ------------------------- */
        try {
            const collection = await connection.req(`/_fabric/${fabricName}/_api/collection`, {
                body: { name: collectionName },
                method: "POST"
            });
            console.log("Collection " + collectionName + " created.\n", collection);
        } catch (e) {
            if (e.status === 409) {
              console.log("Collection already exists, skipping creation");
            } else {
              console.log("Create collection failed");
              throw e;
            }
        }

        /* ------------------------ Saving a query ----------------------- */
        const saveRestQlQuery = (queryName, query, parameters) =>
            connection.req(`/_fabric/${fabricName}/_api/restql`, {
                body: {
                    query: {
                        name: queryName,
                        value: query,
                        parameter: parameters
                    }
                },
                method: "POST"
            });

        console.log("------- Save the Queries  ------");
        await saveRestQlQuery("insertData", insertData, {});
        await saveRestQlQuery("getData", getData, {});
        await saveRestQlQuery("updateData", updateData, {});

        console.log("Queries Saved Successfully");

        /* ----------------------- Executing a query ---------------------- */
        const executeRestql = (queryName, parameter) =>
            connection.req(`/_fabric/${fabricName}/_api/restql/execute/${queryName}`, {
                body: {
                    bindVars: parameter
                },
                method: "POST"
            });

        await sleep(2000);
        console.log("------- Execute the Queries  ------");

        await executeRestql("insertData", {
            InputDocs: inputDocs
        });
        console.log("Data Inserted \n");

        console.log("Get Data...");

        const dataBeforeUpdate = await executeRestql("getData");
        console.log(dataBeforeUpdate.result);
        console.log("\n");

        await executeRestql("updateData", {
            updateKeys,
            updateKeyValue
        });

        console.log("Data updated \n");

        const dataAfterUpdate = await executeRestql("getData");
        console.log(dataAfterUpdate.result);
        console.log("\n");

        /* ------------------------ Updating a query ----------------------- */
        const updateRestQlQuery = (queryName, query, parameters) =>
            connection.req(`/_fabric/${fabricName}/_api/restql/${queryName}`, {
                body: {
                    query: {
                        value: query,
                        parameter: parameters
                    }
                },
                method: "PUT"
            });

        console.log("------- Updating the insertData query  ------");
        await updateRestQlQuery("insertData", updatedInsertData, {});
        console.log("Query updated successfully");

        await sleep(2000);
        await executeRestql("insertData", {
            barryKey
        });
        console.log("New data inserted with the updated insertData query\n");

        const resultAfterUpdate = await executeRestql("getData");
        console.log(resultAfterUpdate.result);
        console.log("\n");

        const deleteRestQl = (queryName) =>
        connection.req(`/_fabric/${fabricName}/_api/restql/${queryName}`, {
            method: "DELETE"
        });

        console.log("------- Deleting the insertData, getData, and updateData queries ------");
        await deleteRestQl("insertData");
        await deleteRestQl("getData");
        await deleteRestQl("updateData");
        console.log("RestQls deleted successfully");

    } catch (e) {
        console.log("Error caught while executing RestQL demo: ");
        console.error(e);
    }
};

run();
```

</TabItem>
<TabItem value="py" label="Python">

```py
from c8 import C8Client
import time

FED_URL = "gdn.paas.macrometa.io"
GUEST_MAIL = "nemo@nautilus.com"
GUEST_PASSWORD = "xxxxxx"
GEO_FABRIC = "_system"
COLLECTION_NAME = "superhero"

inputDocs = [
    { "_key": "james.kirk@mafabriccrometa.io", "firstname": "James", "lastname": "Kirk", "email": "james.kirk@mafabriccrometa.io", "zipcode": "12312"},
    { "_key": "han.solo@macrfabricometa.io", "firstname": "Han", "lastname": "Solo", "email": "han.solo@macrfabricometa.io", "zipcode": "12311"},
    { "_key": "bruce.wayne@mfabricacrometa.io", "firstname": "Bruce", "lastname": "Wayne", "email": "bruce.wayne@mfabricacrometa.io", "zipcode": "12345" }
]
updateKeys = ["james.kirk@mafabriccrometa.io", "bruce.wayne@mfabricacrometa.io"]
updateKeyValue = {
    "bruce.wayne@mfabricacrometa.io": { "key": "bruce.wayne@mfabricacrometa.io", "zipcode": "22222" },
    "james.kirk@mafabriccrometa.io": { "key": "james.kirk@mafabriccrometa.io", "zipcode": "55555"}
}
INSERT_DATA_QUERY = (
    f"FOR doc in @InputDocs INSERT {{'firstname':doc.firstname, 'lastname':doc.lastname, 'email':doc.email, 'zipcode':doc.zipcode, '_key': doc._key}} IN {COLLECTION_NAME}"
)
GET_DATA_QUERY = "FOR doc IN superhero RETURN doc"
UPDATE_DATA_QUERY = (
    f"FOR i IN {COLLECTION_NAME} FILTER i._key IN @updateKeys UPDATE i with {{ zipcode: (i._key == @updateKeyValue[i._key].key) ? @updateKeyValue[i._key].zipcode : i.zipcode }} IN {COLLECTION_NAME}"
)
UPDATED_INSERT_QUERY = (
    f"INSERT {{'_key': 'barry.allen@macrometa.io', 'value': 'Barry Allen'}} IN {COLLECTION_NAME}"
)

INSERT_DATA = {
    "query": {
        "name": "insertRecord",
        "value": INSERT_DATA_QUERY,
    }
}
UPDATED_INSERT_DATA = {
    "query": {
        "value": UPDATED_INSERT_QUERY,
    }
}

GET_DATA = {"query": {"name": "getRecords", "value": GET_DATA_QUERY}}
UPDATE_DAT = {"query": {"name": "updateRecord", "value": UPDATE_DATA_QUERY}}

if __name__ == "__main__":
    print("\n ------- CONNECTION SETUP  ------")
    print(f"tenant: {GUEST_MAIL}, geofabric:{GEO_FABRIC}")
    client = C8Client(
        protocol="https",
        host=FED_URL,
        port=443,
        email=GUEST_MAIL,
        password=GUEST_PASSWORD,
        geofabric=GEO_FABRIC,
    )
    print("\n ------- CREATE GEO-REPLICATED COLLECTION  ------")
    if client.has_collection(COLLECTION_NAME):
        print("Collection exists")
    else:
        employees = client.create_collection(COLLECTION_NAME)

    print(f"Created collection: {COLLECTION_NAME}")

    print("\n ------- CREATE RESTQLs  ------")
    EXISTING_QUERIES = str(client.get_restqls())
    client.create_restql(INSERT_DATA)
    client.create_restql(GET_DATA)
    client.create_restql(UPDATE_DAT)
    print(f"Created RESTQLs:{EXISTING_QUERIES}")
    time.sleep(5)

    print("\n ------- EXECUTE RESTQLs ------")
    print("Insert data....")

    try:
        response = client.execute_restql(
        "insertRecord", {"bindVars": {"InputDocs": inputDocs}}
    )
    except:
        print("Failed to insert the document because it already exists")

    print("Get data....")
    response = client.execute_restql("getRecords")
    print(response)
    print("Update data....")
    try:
        response = client.execute_restql(
        "updateRecord",
        {"bindVars": {"updateKeys": updateKeys, "updateKeyValue": updateKeyValue}},
    )
    except:
        print("Failed to update the document because it already exists")
    print("Get data....")
    response = client.execute_restql("getRecords")
    print(response)

    #Updating restqls
    client.update_restql("insertRecord",UPDATED_INSERT_DATA)
    time.sleep(2)
    print("Inserting updated data....")
    try:
        response = client.execute_restql("insertRecord")
    except:
        print("Failed to insert the document because it already exists")

    #Deleting RestQls
    client.delete_restql("insertRecord")
    client.delete_restql("getRecords")
    client.delete_restql("updateRecord")
    print("\n ------- DONE  ------")
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
const jsc8 = require('jsc8');

// Create a authenticated instance with Token / Apikey
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
const client = new jsc8("https://gdn.paas.macrometa.io");

// Variables
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const collectionName = "superhero" + Math.floor(1000 + Math.random() * 9000).toString();
const jamesKey = "james.kirk" + Math.floor(1000 + Math.random() * 9000).toString();
const bruceKey = "bruce.wayne" + Math.floor(1000 + Math.random() * 9000).toString();
const barryKey = "barry.allen" + Math.floor(1000 + Math.random() * 9000).toString();

const inputDocs = [
  { "_key": jamesKey, "firstname": "James", "lastname": "Kirk", "email": "james.kirk@macrometa.io", "zipcode": "12312" },
  { "_key": bruceKey, "firstname": "Bruce", "lastname": "Wayne", "email": "bruce.wayne@macrometa.io", "zipcode": "12345" }
];

const updateKeys = [jamesKey, bruceKey];
const updateKeyValue = {
  bruceKey: { key: bruceKey, zipcode: "22222" },
  jamesKey: { key: jamesKey, zipcode: "55555" }
};

// Queries
const insertData = `FOR doc in @InputDocs \
INSERT { "firstname":doc.firstname, "lastname":doc.lastname, "email":doc.email, "zipcode":doc.zipcode, "_key": doc._key } IN ${collectionName}`;

const getData = `FOR doc IN ${collectionName} RETURN doc`;

const updateData = `FOR i IN ${collectionName} \
FILTER i._key IN @updateKeys \
UPDATE i with { zipcode: (i._key == @updateKeyValue[i._key].key) ? @updateKeyValue[i._key].zipcode : i.zipcode } IN ${collectionName}`;

const updatedInsertData = `INSERT 
{ "firstname": "Barry", "lastname": "Allen", "email": "barry.allen@macrometa.io", "zipcode": "44444", "_key": @barryKey } IN ${collectionName}`;

function errorResponseHandler (error) {
  const message = {
    "StatusCode ": error.statusCode,
    "ErrorMessage ": error.message,
    "ErrorNum ": error.errorNum
  };
  console.error(message);
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function restqldemo () {
  try {
    /* Authenticate client instance with username and password */
    console.log("------- Authenticate client instance with username AND password  ------");
    await client.login(email, password);

    /* Create collection */
    console.log("------- Create geo-replicated collection  ------");

    try {
      const collection = await client.createCollection(collectionName);
      console.log("Collection " + collectionName + " created.\n", collection);
    } catch (e) {
      if (e.statusCode === 409) {
        console.log("Collection already exists, skipping creation");
      } else {
        console.log("Create collection failed");
        throw e;
      }
    }

    /* Save queries */
    console.log("------- Saving the queries  ------");

    await client.createRestql("insertData", insertData, {});
    await client.createRestql("getData", getData, {});
    await client.createRestql("updateData", updateData, {});

    console.log("Saved Queries Successfully\n");

    /* Execute RestQl Queries */
    console.log("------- Running the queries  ------");

    await sleep(2000);
    await client.executeRestql("insertData", {
      InputDocs: inputDocs
    });

    console.log("Data Inserted \n");

    let res = await client.executeRestql("getData");

    console.log("Output of get data query:");
    console.log(res.result);
    console.log("\n");

    await client.executeRestql("updateData", {
      updateKeys,
      updateKeyValue
    });

    console.log("Data updated \n");

    res = await client.executeRestql("getData");

    console.log("Output of get data query after update:");
    console.log(res.result);
    console.log("\n");

    await client.updateRestql("insertData", updatedInsertData, {});
    await sleep(2000);

    await client.executeRestql("insertData", {
      barryKey
    });

    console.log("New Data Inserted \n");

    res = await client.executeRestql("getData");

    console.log("Output of get data query after insertion of new data:");
    console.log(res.result);
    console.log("\n");

    res = await client.getRestqls();

    console.log("List of all available query workers: ");
    console.log(res.result);

    console.log("Deleting saved queries - insertData, getData, updateData");
    await client.deleteRestql("insertData");
    await client.deleteRestql("getData");
    await client.deleteRestql("updateData");

    res = await client.getRestqls();

    console.log("List of all available query workers after deletion:");
    console.log(res.result);
  } catch (e) {
    console.log("Error caught while executing RestQl Demo: ");
    errorResponseHandler(e);
  }
}

restqldemo().then(console.log("Running queries"));
```

</TabItem>
</Tabs>  
