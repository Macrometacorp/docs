---
sidebar_position: 80
title: C8QL Docs Queries Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../../_partials/_prerequisites-sdk-api-key.md';
import GetStarted from '../../../_partials/_get-started-steps.md';

This page demonstrates how you can use C8QL and the Macrometa SDK to run CRUD operations on document store collection records. For more information about C8QL queries, refer to [C8QL](../../../queries/c8ql/) and [Queries](../../../queries/).

## Prerequisites

<Prerequisites />

## Code Sample

<GetStarted />

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

```py
import json
import requests
from c8 import C8Client

# Define constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
GEO_FABRIC = "_system"
API_KEY = "XXXX" # Change this to your API key
AUTH_TOKEN = f"apikey {API_KEY}"

# Authenticate and log in
print("--- Connecting to GDN")

# Authenticate with API key
client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

# Create HTTPS session
session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})
url = f"{HTTP_URL}/_fabric/_system/_api/cursor"

# Insert documents to the collection
resp = session.post(url, json={
    "query": "INSERT{'name' : 'Julie', 'company' : 'ABC', '_key' : 'Julie'}" \
             "INTO testcollection"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Document inserted successfully.")

# Read from the collection
resp = session.post(url, json={
    "query": "FOR doc IN testcollection RETURN doc"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Documents retrieved successfully. Data: ")
    for doc in resp_json.get("result", []):
        print(json.dumps(doc, indent=4))

# Update documents in the collection
resp = session.post(url, json={
    "query": "FOR c IN testcollection UPDATE c WITH{'company':'XYZ'} IN testcollection"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Document updated successfully.")

# Upsert documents in the collection
resp = session.post(url, json={
    "query": "UPSERT {name: 'John'} INSERT "
             "{_key:'John', name: 'John', logins:1, updatedAt: DATE_NOW()}"
             " UPDATE {'logins': OLD.logins + 1, updatedAt: DATE_NOW()} IN testcollection"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Document upserted successfully.")

# Delete documents in the collection
resp = session.post(url, json={
    "query": "FOR c IN testcollection REMOVE c IN testcollection"
})
resp_json = resp.json()
if resp_json.get("error") == False:
    print("Documents deleted successfully.")

```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

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
  
    try {
        const connection = new APIRequest(httpUrl, apiKey);
      } catch (error) {
        console.error('Error establishing connection:', error);
      }
      
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
