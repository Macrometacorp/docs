---
sidebar_position: 80
title: C8QL Docs Queries Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../../_partials/_prerequisites-api-key.md';
import GetStarted from '../../../_partials/_get-started-steps.md';

This page demonstrates how you can use C8QL and the Macrometa API to run CRUD operations on document store collection records. For more information about C8QL queries, refer to [C8QL](../../../queries/c8ql/) and [Queries](../../../queries/).

## Prerequisites

<Prerequisites />

## Code Sample

<GetStarted />

<Tabs groupId="operating-systems">
<TabItem value="py" label="API - Python">

```py
import json
import requests

# Define constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
GEO_FABRIC = "_system"
API_KEY = "XXXXX" # Change this to your API key
AUTH_TOKEN = f"apikey {API_KEY}"
COLLECTION = "abc"

# Authenticate and log in
print("1. Connecting to GDN")

# Create HTTPS session
session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Create collection
print(f"2. Creating collection {COLLECTION}")
url = f"{HTTP_URL}/_fabric/{GEO_FABRIC}/_api/collection"
resp = session.post(url, json={
    "name": COLLECTION
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Collection created successfully.")
elif resp_json.get("errorNum") == 1207:
    print("Collection already exists.")
else:
    print(resp_json)

# Setting cursor url
url = f"{HTTP_URL}/_fabric/{GEO_FABRIC}/_api/cursor"

# Insert documents to the collection
print(f"3. Inserting data in collection {COLLECTION}")
resp = session.post(url, json={
    "query": "INSERT{'name' : 'Julie', 'company' : 'ABC', '_key' : 'Julie'}" \
             f"INTO {COLLECTION}"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Document inserted successfully.")
else:
    print(resp_json)

# Read from the collection
print(f"4. Reading data from collection {COLLECTION}")
resp = session.post(url, json={
    "query": f"FOR doc IN {COLLECTION} RETURN doc"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Documents retrieved successfully. Data: ")
    for doc in resp_json.get("result", []):
        print(json.dumps(doc, indent=4))
else:
    print(resp_json)

# Update documents in the collection
print(f"5. Update data from collection {COLLECTION}")
resp = session.post(url, json={
    "query": f"FOR c IN {COLLECTION} UPDATE c WITH{{'company':'XYZ'}} IN {COLLECTION}"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Document updated successfully.")
else:
    print(resp_json)

# Upsert documents in the collection
print(f"6. Upsert data from collection {COLLECTION}")
resp = session.post(url, json={
    "query": "UPSERT {name: 'John'} INSERT "
             "{_key:'John', name: 'John', logins:1, updatedAt: DATE_NOW()}"
             f" UPDATE {{'logins': OLD.logins + 1, updatedAt: DATE_NOW()}} IN {COLLECTION}"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Document upserted successfully.")
else:
    print(resp_json)

# Read from the collection after upsert
print(f"7. Reading data from collection {COLLECTION}")
resp = session.post(url, json={
    "query": f"FOR doc IN {COLLECTION} RETURN doc"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Documents retrieved successfully after upsert. Data: ")
    for doc in resp_json.get("result", []):
        print(json.dumps(doc, indent=4))
else:
    print(resp_json)

# Delete documents in the collection
print(f"8. Delete data from collection {COLLECTION}")
resp = session.post(url, json={
    "query": f"FOR c IN {COLLECTION} REMOVE c IN {COLLECTION}"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Documents deleted successfully.")
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
        reject(response.json()
        .then(data => {
          if (data.errorNum === 1207) {
            console.log("Collection already exists.");
          } else {
            console.log(data); // Access the error message or relevant data in the response body
          }
        })
        .catch(error => {
          console.log(error);
        }));
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

  const apiKey = "XXXXX" // Change this to your API key
  const globalUrl = "api-play.paas.macrometa.io";
  const httpUrl = `https://${globalUrl}`;
  const collectionName = "abc";
  const geoFabric = "_system"

  const insertQuery = {
    query:
      `INSERT{'name' : 'Julie', 'company' : 'ABC', '_key' : 'Julie'} INTO ${collectionName}`
  };
  const readQuery = {
    query: `FOR doc IN ${collectionName} RETURN doc`
  };
  const updateQuery = {
    query:
      `FOR c IN ${collectionName} UPDATE c WITH{'company':'XYZ'} IN ${collectionName}`
  };
  const upsertQuery = {
    query:
      `UPSERT {name: 'John'} INSERT {_key:'John', name: 'John', logins:1, updatedAt: DATE_NOW()} UPDATE {'logins': OLD.logins + 1, updatedAt: DATE_NOW()} IN ${collectionName}`
  };

  const deleteDocumentsQuery = {
    query: `FOR c IN ${collectionName} REMOVE c IN ${collectionName}`
  };

  let connection;
  async function runningQueryFromCursor (query, logMessage) {
    await connection
      .req(`/_fabric/${geoFabric}/_api/cursor`, {
        body: query,
        method: "POST"
      })
      .then((document) => {
        if(document.result.length > 0) {
          console.log(logMessage, document.result);
          return document;
        }
        else {
          console.log(logMessage);
        }
      })
      .catch((error) => console.log(error));
  }

  async function createCollection (collection) {
    await connection
      .req(`/_fabric/${geoFabric}/_api/collection`, {
        body: { name: collection },
        method: "POST"
      })
      .then(() => console.log("Collection created successfully."))
      .catch(async (error) => {
        await error;
        if(!(error instanceof Promise)) {
          console.log(error);
        }
      });
  }

  const run = async function () {

    /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

    try {
        console.log("1. Connecting to GDN")
        connection = new APIRequest(httpUrl, apiKey);
      } catch (error) {
        console.error("Error establishing connection:", error);
      }

    /* -------------------------- Create document collection ------------------------- */
    console.log("2. Creating collection " + collectionName);
    await createCollection(collectionName);

    /* ---------------------------- Insert documents ---------------------------- */

    console.log("3. Inserting data in collection " + collectionName);
    await runningQueryFromCursor(insertQuery, "Document inserted successfully.");

    /* ---------------------------- Read documents ---------------------------- */

    console.log("4. Reading data from collection " + collectionName);
    await runningQueryFromCursor(readQuery, "Documents retrieved successfully. Data: ");

    /* ---------------------------- Update documents ---------------------------- */

    console.log("5. Update data from collection " + collectionName);
    await runningQueryFromCursor(updateQuery, "Document updated successfully.");

    /* ---------------------------- Upsert documents ---------------------------- */

    console.log("6. Upsert data from collection " + collectionName);
    await runningQueryFromCursor(upsertQuery, "Document upserted successfully.");

    /* ---------------------------- Read documents after upsert ---------------------------- */

    console.log("7. Reading data from collection " + collectionName);
    await runningQueryFromCursor(readQuery, "Documents retrieved successfully after upsert. Data: ");

    /* ---------------------------- Delete documents --------------------------- */

    console.log("8. Delete data from collection " + collectionName);
    await runningQueryFromCursor(deleteDocumentsQuery, "Documents deleted successfully.");
  };

  run()
    .then()
    .catch((error) => console.log(error));

```

</TabItem>
</Tabs>
