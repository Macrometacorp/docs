---
sidebar_position: 70
title: REST API Query Doc Store Example
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
<TabItem value="py" label="API - Python">

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
READ_QUERY = "FOR doc IN @@collection FILTER doc.result > 90 RETURN doc"
COLLECTION_NAME = "api_query_tutorial"
QUERY_PARAMS = {"@collection": f"{COLLECTION_NAME}"}
INSERT_QUERY = "FOR i IN 1..100 INSERT { result: i } INTO @@collection"
UPDATE_QUERY = "FOR doc IN @@collection FILTER doc.result <= 35 " \
               "UPDATE doc._key WITH { qualified :true } IN @@collection"
DELETE_QUERY = "FOR c IN @@collection REMOVE c IN @@collection"
UPDATE_READ_QUERY = "FOR doc IN @@collection FILTER doc.result < 10 RETURN doc"

# Create a HTTPS session
print("1. Connecting to GDN")
session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Create a document collection
print(f"\n2. Creating collection {COLLECTION_NAME}")
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/collection"
payload = {
    "name": COLLECTION_NAME
}
resp = session.post(URL, data=json.dumps(payload))
resp = json.loads(resp.text)
if 'error' in resp and resp['error']:
    if resp['errorNum'] == 1207:
        print("Collection already exists.")
    else:
        print("ERROR: " + resp["errorMessage"])
else:
    print("Collection created successfully: ", resp['name'])

# Create RESTQL
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql"

print("\n3. Creating queryworkers")
# Save read query
payload = {
    "query": {
        "name": "Read",
        "parameter": QUERY_PARAMS,
        "value": READ_QUERY
    }
}

resp = session.post(URL, data=json.dumps(payload))
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Read queryworker saved successfully.")
else:
    print(resp_json)
time.sleep(1)

# Save insert query
payload = {
    "query": {
        "name": "Insert",
        "value": INSERT_QUERY,
        "parameter": QUERY_PARAMS,

    }
}

resp = session.post(URL, data=json.dumps(payload))
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Insert queryworker saved successfully.")
else:
    print(resp_json)
time.sleep(1)

# Save update query
payload = {
    "query": {
        "name": "Update",
        "value": UPDATE_QUERY,
        "parameter": QUERY_PARAMS,

    }
}

resp = session.post(URL, data=json.dumps(payload))
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Update queryworker saved successfully.")
else:
    print(resp_json)
time.sleep(1)

# Save delete query
payload = {
    "query": {
        "name": "Delete",
        "value": DELETE_QUERY,
        "parameter": QUERY_PARAMS,

    }
}
resp = session.post(URL, data=json.dumps(payload))
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Delete queryworker saved successfully.")
else:
    print(resp_json)
time.sleep(1)

# Execute insert query
print("\n4. Executing queryworker: Insert")
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/execute/Insert"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
resp_json = resp.json()
if resp_json.get("error") == False or resp_json.get("result") == []:
    print("Insert queryworker executed successfully.")
else:
    print(resp_json)
time.sleep(1)

# Execute read query
print("\n5. Executing queryworker: Read")
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/execute/Read"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Read queryworker executed successfully. Data: ")
    for doc in resp_json.get("result", []):
        print(json.dumps(doc, indent=4))
else:
    print(resp_json)
time.sleep(1)

# Execute update query
print("\n6. Executing queryworker: Update")
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/execute/Update"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
resp_json = resp.json()
if resp_json.get("error") == False or resp_json.get("result") == []:
    print("Update queryworker executed successfully.")
else:
    print(resp_json)
time.sleep(1)

# Update saved query
print("\n7. Updating queryworker: Read")
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/Read"
payload = {
    "query": {
        "parameter": QUERY_PARAMS,
        "value": UPDATE_READ_QUERY
    }
}
resp = session.put(URL, data=json.dumps(payload))
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Read queryworker updated successfully.")
else:
    print(resp_json)
time.sleep(1)

# Execute delete query
print("\n8. Executing queryworker: Delete")
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/execute/Delete"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
resp_json = resp.json()
if resp_json.get("error") == False or resp_json.get("result") == []:
    print("Delete queryworker executed successfully.")
else:
    print(resp_json)
time.sleep(1)

# Delete saved queries
print("\n9. Deleting queryworkers")
URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/Read"
resp = session.delete(URL)
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Read queryworker deleted successfully.")
else:
    print(resp_json)
time.sleep(1)

URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/Insert"
resp = session.delete(URL)
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Insert queryworker deleted successfully.")
else:
    print(resp_json)
time.sleep(1)

URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/Update"
resp = session.delete(URL)
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Update queryworker deleted successfully.")
else:
    print(resp_json)
time.sleep(1)

URL = f"{HTTP_URL}/_fabric/{FABRIC}/_api/restql/Delete"
resp = session.delete(URL)
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Delete queryworker deleted successfully.")
else:
    print(resp_json)

```

</TabItem>
<TabItem value="js" label="API - JS">

```js
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor (httpUrl, apiKey) {
    this._url = httpUrl;
    this._headers.authorization = `apikey ${apiKey}`; // apikey keyword is needed here
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

const apiKey = "XXXXX" // Use your API key here
const globalUrl = "api-play.paas.macrometa.io";
const httpUrl = `https://${globalUrl}`;
const collectionName = "api_query_tutorial";
const fabric = "_system";

const readQueryName = "Read";
const queryParams = { "@collection": collectionName };
const readQuery = "FOR doc IN @@collection FILTER doc.result > 90 RETURN doc";

const insertQueryName = "Insert";
const insertQuery = "FOR i IN 1..100 INSERT { result: i } INTO @@collection";

const updateQueryName = "Update";
const updateQuery =
  "FOR doc IN @@collection FILTER doc.result <= 35 UPDATE doc._key WITH { qualified :true } IN @@collection";

const deleteQueryName = "Delete";
const deleteQuery = "FOR c IN @@collection REMOVE c IN @@collection";

const readQueryUpdated =
  "FOR doc IN @@collection FILTER doc.result < 10 RETURN doc";

let connection;
async function saveQueryWorker (queryName, queryValue, queryParams) {
  await connection
    .req(`/_fabric/${fabric}/_api/restql`, {
      body: {
        query: {
          name: queryName,
          value: queryValue,
          parameter: queryParams
        }
      },
      method: "POST"
    })
    .then(() =>
      console.log(`${queryName} queryworker saved successfully.`)
    )
    .catch((error) => console.log(error));
}

async function runQueryWorker (queryWorkerName, params) {
  await connection
    .req(`/_fabric/${fabric}/_api/restql/execute/${queryWorkerName}`, {
      body: {
        bindVars: params
      },
      method: "POST"
    })
    .then((query) => {
      if (query.result.length === 0) {
        console.log(`${queryWorkerName} queryworker executed successfully.`)
      } else {
        console.log(`${queryWorkerName} queryworker executed successfully. Data: `, query.result)
      }
    })
    .catch((error) => console.log(error));
}

async function updateSavedQueryWorker (queryName, newQuery, queryParams) {
  await connection
    .req(`/_fabric/${fabric}/_api/restql/${queryName}`, {
      body: {
        query: {
          value: newQuery,
          parameter: queryParams
        }
      },
      method: "PUT"
    })
    .then(() =>
      console.log(`${queryName} queryworker updated successfully.`)
    )
    .catch((error) => console.log(error));
}

async function deleteQueryWorker (queryName) {
  await connection
    .req(`/_fabric/${fabric}/_api/restql/${queryName}`, {
      method: "DELETE"
    })
    .then(() => console.log(`${queryName} queryworker deleted successfully.`))
    .catch((error) => console.log(error));
}

async function createCollection (collection) {
  await connection
    .req(`/_fabric/${fabric}/_api/collection`, {
      body: { name: collection },
      method: "POST"
    })
    .then((collection) =>
      console.log("Collection created successfully: ", collection.name)
    )
    .catch((error) => {
      if (error.status === 409) {
        console.log("Collection already exists.")
      } else {
        console.log(error)
      }
    });
}

const run = async function () {
  try {
    console.log("1. Connecting to GDN")
    connection = new APIRequest(httpUrl, apiKey);

    /* ------------------------ Create collection ----------------------- */
    console.log("\n2. Creating collection " + collectionName);
    await createCollection(collectionName);

    console.log("\n3. Creating queryworkers");
    /* ------------------------ Save query worker  ----------------------- */
    await saveQueryWorker(readQueryName, readQuery, queryParams);

    /* -------------------  Insert query worker ------------------- */
    await saveQueryWorker(insertQueryName, insertQuery, queryParams);

    /* -------------------  Update query worker ------------------- */
    await saveQueryWorker(updateQueryName, updateQuery, queryParams);

    /* -------------------  Delete query worker ------------------- */
    await saveQueryWorker(deleteQueryName, deleteQuery, queryParams);

    await new Promise(r => setTimeout(r, 2000));

    /* ----------------------- Run insert query worker ---------------------- */
    console.log("\n4. Executing queryworker: " + insertQueryName);
    await runQueryWorker(insertQueryName, queryParams);

    /* ----------------------- Run read query worker ---------------------- */
    console.log("\n5. Executing queryworker: " + readQueryName);
    await runQueryWorker(readQueryName, queryParams);

    /* ----------------------- Run update query worker ---------------------- */
    console.log("\n6. Executing queryworker: " + updateQueryName);
    await runQueryWorker(updateQueryName, queryParams);

    /* ----------------------- Update saved query worker ---------------------- */
    console.log("\n7. Updating queryworker: " + readQueryName);
    await updateSavedQueryWorker(readQueryName, readQueryUpdated, queryParams);

    /* ----------------------- Run delete query worker ---------------------- */
    console.log("\n8. Executing queryworker: " + deleteQueryName);
    await runQueryWorker(deleteQueryName, queryParams);

    /* ----------------------------- Delete query workers ----------------------------- */
    console.log("\n9. Deleting queryworkers");
    await deleteQueryWorker(readQueryName);
    await deleteQueryWorker(updateQueryName);
    await deleteQueryWorker(insertQueryName);
    await deleteQueryWorker(deleteQueryName);
  } catch (e) {
    console.error(e);
  }
};

run();

```

</TabItem>
</Tabs>  
