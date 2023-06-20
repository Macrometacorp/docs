---
sidebar_position: 70
title: Query Docs Using C8QL API Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Modern applications need to be highly responsive, always online, and able to access data instantly across the globe. At the same time, they need to be deployed on datacenters close to their users. Macrometa global data network (GDN) is a real-time materialized view engine that provides instant data to applications and APIs in a simple interface.

## Prerequisites

A Macrometa GDN tenant account and credentials.

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
