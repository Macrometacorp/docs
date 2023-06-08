---
sidebar_position: 70
title: Working With Documents API Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Modern applications need to be highly responsive, always online, and able to access data instantly across the globe. At the same time, they need to be deployed on data centers close to their users. Macrometa global data network (GDN) is a real-time materialized view engine that provides instant data to applications and APIs in a simple interface.

## Prerequisites:

A Macrometa GDN tenant account and credentials.

## Working with Documents

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
