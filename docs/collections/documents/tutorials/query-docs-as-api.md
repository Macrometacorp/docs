---
sidebar_position: 70
title: Query Docs as API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../../_partials/_prerequisites-api-key.md';
import Steps from '../../../_partials/_api-example-steps.md';

This page shows you how to query documents stored in a document store collection using the Macrometa API. For more information about using Macrometa APIs, refer to [APIs](../../../api-docs/index.md).

## Prerequisites

<Prerequisites />

## REST API Doc Query Example

<Steps />

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
import json
import time
import requests

# Set constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
API_KEY = "XXXXX" # Use your API key here
AUTH_TOKEN = f"apikey {API_KEY}"
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

# Create a HTTPS session

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
