---
sidebar_position: 7
title: Using Rest APIs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Modern applications need to be highly responsive, always online, and able to access data instantly across the globe. At the same time, they need to be deployed on datacenters close to their users. Macrometa global data network (GDN) is a real-time materialized view engine that provides instant data to applications and APIs in a simple interface.

## Prerequisites:

A Macrometa GDN tenant account and credentials.

## Working with Documents

A *document* is a JSON-serializable dictionary object with the following properties:

* `_key` identifies a document within a collection.
* `_id` identifies a document across all collections in a fabric with the following format: `{collection name}/{document key}`. This is also known as a *handle*.
* `_rev` indicates the latest revision of a document. GDN supports MVCC (Multiple Version Concurrency Control) and stores each document in multiple revisions. This field is automatically populated, but you can use it to validate a document against its current revision.

For example:

```json
{
"_id": "students/bruce",
"_key": "bruce",
"_rev": "_Wm3dzEi--_",
"first_name": "Bruce",
"last_name": "Wayne",
"address": {
  "street": "1007 Mountain Dr.",
  "city": "Gotham",
  "state": "NJ"
},
"is_rich": True,
"friends": ["robin", "gordon"]
}
```

### Tutorial

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
 import json
import requests

# Set constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
COLLECTION_NAME = 'testcollection'
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxx"
AUTH_TOKEN = "bearer "
FABRIC = "_system"
URL = f"{HTTP_URL}/_open/auth"
payload = {
    'email': EMAIL,
    'password': PASSWORD,

}
headers = {
    'content-type': 'application/json'
}

response = requests.post(URL, data=json.dumps(payload), headers=headers)

if response.status_code == 200:
    resp_body = json.loads(response.text)
    AUTH_TOKEN += resp_body["jwt"]
    TENANT = resp_body["tenant"]
else:
    raise Exception(f"Error while getting auth token. "
                    f"Code:{response.status_code}, Reason:{response.reason}")

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Get list of all regions
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/datacenter/all"
dcl_resp = session.get(URL)
dcl_list = json.loads(dcl_resp.text)
regions = []
for dcl in dcl_list:
    dcl_url = dcl['tags']['url']
    regions.append(dcl_url)
print("\nList of regions: ", regions)

# Create a document collection
# Note: Create a test collection. Set "type" to 2 for documents or 3 for edges
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/collection"
payload = {
    "name": COLLECTION_NAME,
    "type": 2
}
resp = session.post(URL, data=json.dumps(payload))
resp = json.loads(resp.text)
if 'error' in resp and resp['error']:
    print("ERROR: " + resp["errorMessage"])
else:
    print("\nCollection created: ", resp['name'])

# Insert a document into a collection
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}"
payload = {'GPA': 3.5, 'first': 'Lola', 'last': 'Martin', '_key': 'Lola'}
resp = session.post(URL, data=json.dumps(payload))
print("\nDocument inserted: ", resp.text)

# Data can either be a single document or a list of documents
# Insert multiple documents
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}"
data = [
    {'GPA': 3.2, 'first': 'Abby', 'last': 'Page', '_key': 'Abby'},
    {'GPA': 3.6, 'first': 'John', 'last': 'Kim', '_key': 'John'},
    {'GPA': 4.0, 'first': 'Emma', 'last': 'Park', '_key': 'Emma'}
]
resp = session.post(URL, data=json.dumps(data))
print("\nMultiple documents inserted: ", resp.text)

# Read a document with its ID
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}" + "/Lola"
resp = session.get(URL)
print("\nDocument with ID Lola is: ", resp.text)

# Read multiple documents
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/simple/lookup-by-keys"
payload = {"collection": COLLECTION_NAME,
           "keys": ["Abby", "John", "Emma"]}
resp = session.put(URL, data=json.dumps(payload))
resp = json.loads(resp.text)
print("\nDocuments: ", resp["documents"])

# Update a single document with its ID
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}/John"
payload = {'GPA': 3.6, 'first': 'John', 'last': 'Andrews', '_key': 'John'}
resp = session.patch(URL, data=json.dumps(payload))
print("\nUpdated document with ID John: ", resp.text)

# Update  documents
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}"
payload = [
    {'GPA': 4.6, 'first': 'Lola', 'last': 'Martin', '_key': 'Lola'},
    {'GPA': 3.2, 'first': 'Abby', 'last': 'Stutguard', '_key': 'Abby'}
]
resp = session.patch(URL, data=json.dumps(payload))
print("\nUpdated documents: ", resp.text)

# Remove single document with its ID
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}/John"
resp = session.delete(URL)
print("\nDeleted document with ID John: ", resp.text)

# Remove a multiple document
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}"
payload = [
    {'GPA': 4.6, 'first': 'Lola', 'last': 'Martin', '_key': 'Lola'},
    {'GPA': 3.2, 'first': 'Abby', 'last': 'Stutguard', '_key': 'Abby'},
    {'GPA': 4.0, 'first': 'Emma', 'last': 'Park', '_key': 'Emma'}
]
resp = session.delete(URL, data=json.dumps(payload))
print("\nDeleted Documents: ", resp.text)
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor (url) {
    this._url = url;
  }

  login (email, password) {
    const endpoint = "/_open/auth";

    const self = this;

    return new Promise(function (resolve, reject) {
      self
        .req(endpoint, {
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

  _handleResponse (response, resolve, reject) {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response);
    }
  }

  req (endpoint, { body, ...options } = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      fetch(self._url + endpoint, {
        headers: self._headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options
      }).then((response) => self._handleResponse(response, resolve, reject));
    });
  }
}
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const federationUrl = "https://api-play.paas.macrometa.io";

const collectionName = "api_tutorial_documents";

const run = async function () {
  const connection = new APIRequest(federationUrl);

  /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

  await connection
    .login(email, password)
    .then(() => console.log("\n1. User authentication done!"))
    .catch((error) => error);

  /* -------------------------- Create document collection ------------------------- */

  await connection
    .req("/_fabric/_system/_api/collection", {
      body: { name: collectionName },
      method: "POST"
    })
    .then((collection) =>
      console.log("2. Collection created successfully", collection)
    )
    .catch((error) => console.log(error));

  /* ---------------------------- Insert documents ---------------------------- */

  const document = await connection
    .req(`/_fabric/_system/_api/document/${collectionName}`, {
      body: { new: true },
      method: "POST"
    })
    .then((document) => {
      console.log("3. Document created successfully", document);
      return document;
    })
    .catch((error) => error);

  /* ----------------------------- Read documents ----------------------------- */

  await connection
    .req(`/_fabric/_system/_api/document/${document._id}`)
    .then((readDocument) =>
      console.log("4. Document read successfully", readDocument)
    )
    .catch((error) => console.log(error));

  /* ---------------------------- Update documents ---------------------------- */

  await connection
    .req(`/_fabric/_system/_api/document/${document._id}`, {
      method: "PATCH",
      body: { new: false }
    })
    .then((updateDocument) =>
      console.log("5. Document was updated successfully", updateDocument)
    )
    .catch((error) => console.log(error));

  /* ----------------------------- Read documents ----------------------------- */

  await connection
    .req(`/_fabric/_system/_api/document/${document._id}`)
    .then((updatedReadDocument) =>
      console.log("6. Document read successfully", updatedReadDocument)
    )
    .catch((error) => console.log(error));

  /* ------------------------------- Delete documents ------------------------------ */
  await connection
    .req(`/_fabric/_system/_api/document/${document._id}`, {
      method: "DELETE"
    })
    .then((deletedDocument) =>
      console.log("7. Document with Id " + document._id + " deleted successfully", deletedDocument)
    )
    .catch((error) => console.log(error));

  /* --------------------------- Delete collection --------------------------- */
  await connection
    .req(`/_fabric/_system/_api/collection/${collectionName}`, {
      method: "DELETE"
    })
    .then((deletedCollection) =>
      console.log("8. Collection deleted successfully", deletedCollection)
    )
    .catch((error) => console.log(error));
};

run()
  .then()
  .catch((error) => console.log(error));
```

</TabItem>
</Tabs>  

## Query using C8QL

You can use C8QL to run CRUD Operations.

### Tutorial

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
#Using C8QL
import json
import requests

# Constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxx"
AUTH_TOKEN = "bearer "


# Create HTTPS session
url = f"{HTTP_URL}/_open/auth"
payload = {
    'email': EMAIL,
    'password': PASSWORD
}
headers = {
    'content-type': 'application/json'
}

response = requests.post(url, data=json.dumps(payload), headers=headers)
if response.status_code == 200:
    resp_body = json.loads(response.text)
    AUTH_TOKEN += resp_body["jwt"]
    TENANT = resp_body["tenant"]
else:
    raise Exception(f"Error while getting auth token. "
                    f"Code:{response.status_code}, Reason:{response.reason}")

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})
url = f"{HTTP_URL}/_fabric/_system/_api/cursor"


# Insert documents to the collection
resp = session.post(url, json={
    "query": "INSERT{'name' : 'Julie', 'company' : 'ABC', '_key' : 'Julie'}" \
             "INTO testcollection"
})

# Read from the collection
resp = session.post(url, json={
    "query": "FOR doc IN testcollection RETURN doc"
})
print(resp.text)

# Update documents in the collection
resp = session.post(url, json={
    "query": "FOR c IN testcollection UPDATE c WITH{'company':'XYZ'} IN testcollection"
})
print(resp.text)
# Upsert documents in the collection
resp = session.post(url, json={
    "query": "UPSERT {name: 'John'} INSERT "
             "{_key:'John', name: 'John', logins:1, updatedAt: DATE_NOW()}"
             " UPDATE {'logins': OLD.logins + 1, updatedAt: DATE_NOW()} IN testcollection"
})
print(resp.text)
# Delete documents in the collection
resp = session.post(url, json={
    "query": "FOR c IN testcollection REMOVE c IN testcollection"
})
print(resp.text)

```  
</TabItem>
<TabItem value="js" label="Javascript">

```js
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor (url) {
    this._url = url;
  }

  login (email, password) {
    const endpoint = "/_open/auth";

    const self = this;

    return new Promise(function (resolve, reject) {
      self
        .req(endpoint, {
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

  _handleResponse (response, resolve, reject) {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response);
    }
  }

  req (endpoint, { body, ...options } = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      fetch(self._url + endpoint, {
        headers: self._headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options
      }).then((response) => self._handleResponse(response, resolve, reject));
    });
  }
}
const email = "nemo@nautilus.com";
const password = "xxxxxx";
const federationUrl = "https://api-play.paas.macrometa.io";

const insertQuery = {
  query:
    "INSERT{'name' : 'Julie', 'company' : 'ABC', '_key' : 'Julie'} INTO testcollection"
};
const readQuery = {
  query: "FOR doc IN testcollection RETURN doc"
};
const updateQuery = {
  query:
    "FOR c IN testcollection UPDATE c WITH{'company':'XYZ'} IN testcollection"
};
const upsertQuery = {
  query:
    "UPSERT {name: 'John'} INSERT {_key:'John', name: 'John', logins:1, updatedAt: DATE_NOW()} UPDATE {'logins': OLD.logins + 1, updatedAt: DATE_NOW()} IN testcollection"
};

const deleteDocumentsQuery = {
  query: "FOR c IN testcollection REMOVE c IN testcollection"
};
const collectionName = "testcollection";

const connection = new APIRequest(federationUrl);

async function runningQueryFromCursor (query) {
  await connection
    .req("/_fabric/_system/_api/cursor", {
      body: query,
      method: "POST"
    })
    .then((document) => {
      console.log("Cursor result:", document);
      return document;
    })
    .catch((error) => console.log(error));
}

async function deleteCollection (collection) {
  await connection
    .req(`/_fabric/_system/_api/collection/${collection}`, {
      method: "DELETE"
    })
    .then((document) => {
      console.log("9. Delete collection " + collection);
      return document;
    })
    .catch((error) => console.log(error));
}

async function createCollection (collection) {
  await connection
    .req("/_fabric/_system/_api/collection", {
      body: { name: collection },
      method: "POST"
    })
    .then((collection) => console.log("2. Collection created: ", collection))
    .catch((error) => console.log(error));
}

const run = async function () {
  /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

  await connection
    .login(email, password)
    .then(() => console.log("\n1. User authentication done!"))
    .catch((error) => error);

  /* -------------------------- Create document collection ------------------------- */
  
  await createCollection(collectionName);

  /* ---------------------------- Insert documents ---------------------------- */
  
  console.log("3. Inserting data in collection " + collectionName);
  await runningQueryFromCursor(insertQuery);

  /* ---------------------------- Read documents ---------------------------- */
  
  console.log("4. Reading data from collection " + collectionName);
  await runningQueryFromCursor(readQuery);

  /* ---------------------------- Update documents ---------------------------- */
  
  console.log("5. Update data from collection " + collectionName);
  await runningQueryFromCursor(updateQuery);

  /* ---------------------------- Upsert documents ---------------------------- */
  
  console.log("6. Upsert data from collection " + collectionName);
  await runningQueryFromCursor(upsertQuery);

  /* ---------------------------- Read documents ---------------------------- */
  
  console.log("7. Reading data from collection " + collectionName);
  await runningQueryFromCursor(readQuery);

  /* ---------------------------- Delete documents --------------------------- */
  
  console.log("8. Delete data from collection " + collectionName);
  await runningQueryFromCursor(deleteDocumentsQuery);

  /* ---------------------------- Delete collection ---------------------------- */
  await deleteCollection(collectionName);
};

run()
  .then()
  .catch((error) => console.log(error));
```
</TabItem>
</Tabs>

## Query as API (RestQL)

Globally distributed applications need a fast data platform that can transparently replicate data anywhere in the world, enabling users to access applications on the closest copy of their data. Additionally, these applications need both geo-replicated and local streams to handle pub-sub, ETL, and real-time updates. 

Macrometa GDN provides turnkey global distribution and transparent multi-master replication. You can run globally distributed, low-latency workloads with GDN.

### Tutorial

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
# Using RESTQL
import json
import time

import requests

# Set constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxx"
FABRIC = "_system"
AUTH_TOKEN = "bearer "
READ_QUERY = "FOR doc IN @@collection RETURN doc"
QUERY_NAME = "read"
COLLECTION_NAME = "api_query_tutorial"
QUERY_PARAMS = {"@collection": f"{COLLECTION_NAME}"}
INSERT_QUERY = "FOR i IN 1..100 INSERT { result: i } INTO @@collection"
UPDATE_QUERY = "FOR doc IN @@collection FILTER doc.result >= 35 " \
               "UPDATE doc._key WITH { qualified :true } IN @@collection"
DELETE_QUERY = "FOR c IN @@collection REMOVE c IN @@collection"
UPDATE_READ_QUERY = "FOR doc IN @@collection FILTER doc.result < 10 RETURN doc"

# Create HTTPS session

URL = f"{HTTP_URL}/_open/auth"
payload = {
    'email': EMAIL,
    'password': PASSWORD
}
headers = {
    'content-type': 'application/json'
}

response = requests.post(URL, data=json.dumps(payload), headers=headers)

if response.status_code == 200:
    resp_body = json.loads(response.text)
    AUTH_TOKEN += resp_body["jwt"]
    TENANT = resp_body["tenant"]
else:
    raise Exception(f"Error while getting auth token. Code:"
                    f"{response.status_code}, Reason:{response.reason}")

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Create a document collection
# Note: Create a test collection. Set "type" to 2 for documents or 3 for edges
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/collection"
payload = {
    "name": COLLECTION_NAME,
    "type": 2
}
resp = session.post(URL, data=json.dumps(payload))
resp = json.loads(resp.text)
if 'error' in resp and resp['error']:
    print("ERROR: " + resp["errorMessage"])
else:
    print("\nCollection created: ", resp['name'])

# Create RESTQL
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql"

# Save read query
payload = {
    "query": {
        "name": QUERY_NAME,
        "parameter": QUERY_PARAMS,
        "value": READ_QUERY
    }
}

resp = session.post(URL, data=json.dumps(payload))
print("\nRead query saved: ", resp.text)
time.sleep(1)
# Save insert query
payload = {
    "query": {
        "name": "insert",
        "value": INSERT_QUERY,
        "parameter": QUERY_PARAMS,

    }
}

resp = session.post(URL, data=json.dumps(payload))
print("\nInsert query saved: ", resp.text)
time.sleep(1)
# Save update query
payload = {
    "query": {
        "name": "update",
        "value": UPDATE_QUERY,
        "parameter": QUERY_PARAMS,

    }
}

resp = session.post(URL, data=json.dumps(payload))
print("\nUpdate query saved: ", resp.text)
time.sleep(1)
# Save delete query
payload = {
    "query": {
        "name": "delete",
        "value": DELETE_QUERY,
        "parameter": QUERY_PARAMS,

    }
}
resp = session.post(URL, data=json.dumps(payload))
print("\nDelete query saved: ", resp.text)
time.sleep(1)
# Execute insert query
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/execute/insert"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
print("\nInsert query executed: ", resp.text)
time.sleep(1)
# Execute read query
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/execute/" + QUERY_NAME
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
print("\nRead query executed: ", resp.text)
time.sleep(1)
# Execute update query
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/execute/update"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
print("\nUpdate query executed: ", resp.text)
time.sleep(1)
# Update saved query
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/" + QUERY_NAME
payload = {
    "query": {
        "parameter": QUERY_PARAMS,
        "value": UPDATE_READ_QUERY
    }
}
resp = session.put(URL, data=json.dumps(payload))
print("Query updated: ", resp.text)
time.sleep(1)
# Execute delete query
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/execute/delete"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
print("\nDelete query executed: ", resp.text)
time.sleep(1)
# Delete saved queries
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/{QUERY_NAME}"
resp = session.delete(URL)
print("Read query deleted: ", resp.text)
time.sleep(1)
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/insert"
resp = session.delete(URL)
print("Insert query deleted: ", resp.text)
time.sleep(1)
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/update"
resp = session.delete(URL)
print("Update query deleted: ", resp.text)
time.sleep(1)
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/delete"
resp = session.delete(URL)
print("Delete query deleted: ", resp.text)
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor(url) {
    this._url = url;
  }

  login (email, password) {
    const endpoint = "/_open/auth";

    const self = this;

    return new Promise(function (resolve, reject) {
      self
        .req(endpoint, {
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

  _handleResponse (response, resolve, reject) {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response);
    }
  }

  req (endpoint, { body, ...options } = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      fetch(self._url + endpoint, {
        headers: self._headers,
        body: body ? JSON.stringify(body) : undefined,
        ...options
      }).then((response) => self._handleResponse(response, resolve, reject));
    });
  }
}

const email = "nemo@nautilus.com";
const password = "xxxxxx";
const federationUrl = "https://api-play.paas.macrometa.io";
const collectionName = "api_query_tutorial";

const readQueryName = "read";
const queryParams = { "@collection": collectionName };
const readQuery = "FOR doc IN @@collection RETURN doc";

const insertQueryName = "insert";
const insertQuery = "FOR i IN 1..10 INSERT { result: i } INTO @@collection";

const updateQueryName = "update";
const updateQuery =
  "FOR doc IN @@collection FILTER doc.result >= 3 UPDATE doc._key WITH { qualified :true } IN @@collection";

const deleteQueryName = "delete";
const deleteQuery = "FOR c IN @@collection REMOVE c IN @@collection";

const readQueryUpdated =
  "FOR doc IN @@collection FILTER doc.result < 1 RETURN doc";

const connection = new APIRequest(federationUrl);

async function saveQueryWorker (queryName, queryValue, queryParams) {
  await connection
    .req("/_fabric/_system/_api/restql", {
      body: {
        query: {
          name: queryName,
          value: queryValue,
          parameter: queryParams
        }
      },
      method: "POST"
    })
    .then((query) =>
      console.log(`${queryName} query saved successfully `, query)
    )
    .catch((error) => console.log(error));
}

async function runQueryWorker (queryWorkerName, params) {
  await connection
    .req(`/_fabric/_system/_api/restql/execute/${queryWorkerName}`, {
      body: {
        bindVars: params
      },
      method: "POST"
    })
    .then((query) =>
      console.log(`${queryWorkerName} query worker results: `, query)
    )
    .catch((error) => console.log(error));
}

async function updateSavedQueryWorker (queryName, newQuery, queryParams) {
  await connection
    .req(`/_fabric/_system/_api/restql/${queryName}`, {
      body: {
        query: {
          value: newQuery,
          parameter: queryParams
        }
      },
      method: "PUT"
    })
    .then((updatedQuery) =>
      console.log(`${queryName} was modified successfully`, updatedQuery)
    )
    .catch((error) => console.log(error));
}

async function deleteQueryWorker (queryName) {
  await connection
    .req(`/_fabric/_system/_api/restql/${queryName}`, {
      method: "DELETE"
    })
    .then((query) => console.log("Query deleted successfully", query))
    .catch((error) => console.log(error));
}

async function createCollection (collection) {
  await connection
    .req("/_fabric/_system/_api/collection", {
      body: { name: collection },
      method: "POST"
    })
    .then((collection) =>
      console.log("2. Collection saved successfully", collection)
    )
    .catch((error) => console.log(error));
}

async function deleteCollection (collection) {
  await connection
    .req(`/_fabric/_system/_api/collection/${collection}`, {
      method: "DELETE"
    })
    .then((collection) =>
      console.log("Collection deleted successfully", collection)
    )
    .catch((error) => console.log(error));
}

const run = async function () {
  try {
    /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

    await connection
      .login(email, password)
      .then(() => console.log("\n1. User authentication done!"))
      .catch((error) => console.log(error));

    /* ------------------------ Create collection ----------------------- */
    await createCollection(collectionName);

    console.log("3. Saving query workers");

    /* ------------------------ Save query worker  ----------------------- */
    await saveQueryWorker(readQueryName, readQuery, queryParams);

    /* -------------------  Insert query worker ------------------- */
    await saveQueryWorker(insertQueryName, insertQuery, queryParams);

    /* -------------------  Update query worker ------------------- */
    await saveQueryWorker(updateQueryName, updateQuery, queryParams);

    /* -------------------  Delete query worker ------------------- */
    await saveQueryWorker(deleteQueryName, deleteQuery, queryParams);

    await new Promise(r => setTimeout(r, 2000));
    console.log("4. Running query workers");

    /* ----------------------- Run insert query worker ---------------------- */
    await runQueryWorker(insertQueryName, queryParams);

    /* ----------------------- Run read query worker ---------------------- */
    await runQueryWorker(readQueryName, queryParams);

    /* ----------------------- Run update query worker ---------------------- */
    await runQueryWorker(updateQueryName, queryParams);

    /* ----------------------- Run read query worker ---------------------- */
    await runQueryWorker(readQueryName, queryParams);

    /* ----------------------- Run delete query worker ---------------------- */
    await runQueryWorker(deleteQueryName, queryParams);

    /* ----------------------- Update saved query worker ---------------------- */
    await updateSavedQueryWorker(readQueryName, readQueryUpdated, queryParams);


    /* ----------------------------- Delete query workers ----------------------------- */
    console.log("5. Deleting query workers");
    await deleteQueryWorker(readQueryName);
    await deleteQueryWorker(updateQueryName);
    await deleteQueryWorker(insertQueryName);
    await deleteQueryWorker(deleteQueryName);

    console.log(`6. Deleting ${collectionName} collection`);
    await deleteCollection(collectionName);
  } catch (e) {
    console.error(e);
  }
};

run();
```

</TabItem>
</Tabs>  
