---
title: REST API Graph Example
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-api-key.md';
import Steps from '../../_partials/_api-example-steps.md';

This page shows you how to perform a basic graph workflow using the Macrometa API.

## Reasons to Use the API

An _edge collection_ contains edge documents and shares its namespace with all other types of collections. You can manage edge documents via standard collection API wrappers, but using edge collection API wrappers provides additional safeguards:

- All modifications are executed in transactions.
- Edge documents are checked against the edge definitions on insert.

To create an edge collection, use the same endpoint `/_fabric/{fabric_name}/_api/collection` and pass `type:3` in the payload.

For more information about using Macrometa APIs, refer to [APIs](../../api-docs/index.md).

## Prerequisites

<Prerequisites />

## Graph API Example

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python SDK">

```py
""" This file is a demo on using edge collections and graphs """
import json
import requests

# Constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
GEO_FABRIC = "_system"
API_KEY = "my API key" # Change to your API key

COLLECTION_NAME_1 = "teachers"
COLLECTION_NAME_2 = "lectures"
EDGE_COLL_NAME = "teach"
GRAPH_NAME = "lectureteacher"

# Create a HTTPS Session
session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": "apikey " + API_KEY})

# Create Document Collections and Insert Data
url = f"{HTTP_URL}/_fabric/{GEO_FABRIC}/_api/collection"
payload = { 'name': COLLECTION_NAME_1 }

resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocument collection 1 created: ",result)

payload = { 'name': COLLECTION_NAME_2 }

resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocument collection 2 created: ",result)

payload = [
    {
    '_key':'Jean',
    'firstname': 'Jean',
    'lastname':'Picard',
    'email':'jean.picard@macrometa.io'
    },
    {
    '_key':'James',
    'firstname': 'James',
    'lastname':'Kirk',
    'email':'james.kirk@macrometa.io'
    },
    {
    '_key': 'Han',
    'firstname': 'Han',
    'lastname':'Solo',
    'email':'han.solo@macrometa.io'
    },
    {
    '_key': 'Bruce',
    'firstname': 'Bruce',
    'lastname':'Wayne',
    'email':'bruce.wayne@macrometa.io'
    }
]

url = f"{HTTP_URL}/_api/document/{COLLECTION_NAME_1}"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments inserted: ",result)

payload = [
    {'_id': 'lectures/CSC101', 'difficulty': 'easy', '_key':'CSC101', 'firstname':'Jean'},
    {'_id': 'lectures/CSC102', 'difficulty': 'hard', '_key':'CSC102','firstname':'Jean'},
    {'_id': 'lectures/CSC103', 'difficulty': 'hard', '_key':'CSC103','firstname':'Jean'},
    {'_id': 'lectures/CSC104', 'difficulty': 'moderate', '_key':'CSC104','firstname':'Jean'}
]

url = f"{HTTP_URL}/_api/document/{COLLECTION_NAME_2}"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments inserted: ",result)

# Create Edge Collection
payload = { 'name': EDGE_COLL_NAME, "type":3 }

url = f"{HTTP_URL}/_fabric/{GEO_FABRIC}/_api/collection"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nEdge Collection created: ",result)

payload = [
    {
    '_key': 'Jean-CSC101',
    '_from': 'teachers/Jean',
    '_to': 'lectures/CSC101',
    'online': False
    },
    {
    '_key': 'Jean-CSC102',
    '_from': 'teachers/Jean',
    '_to': 'lectures/CSC102',
    'online': True
    },
    {
    '_key': 'Jean-CSC103',
    '_from': 'teachers/Jean',
    '_to': 'lectures/CSC103',
    'online': False
    },
    {
    '_key': 'Bruce-CSC101',
    '_from': 'teachers/Bruce',
    '_to': 'lectures/CSC101',
    'online': True
    }
]

url = f"{HTTP_URL}/_api/document/{EDGE_COLL_NAME}"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments inserted: ",result)

# Create a Graph
payload = {
    "edgeDefinitions": [
    {
    "collection": EDGE_COLL_NAME,
    "from": [ "teachers" ],
    "to": [ "lectures" ]
    }
    ],
    "name": GRAPH_NAME,
    "options": {}
}

url = f"{HTTP_URL}/_api/graph"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nGraph created: ",result)

# Graph Traversal
# Set `direction` to `out` or `in` for outbound or inbound traversal.
params = {
    "vertex": "teachers/Jean",
    "direction": "out"
}

url = f"{HTTP_URL}/_api/edges/{EDGE_COLL_NAME}"

resp = session.get(url,params=params)
result = json.loads(resp.text)
print("\nGraph traversal: ",result)

# Delete Graph and Collections
# Set `dropCollection` to `False` if you want to delete the graph but keep the collections.
params = {"dropCollections": True}

url = f"{HTTP_URL}/_api/graph/{GRAPH_NAME}"

resp = session.delete(url,params=params)
result = json.loads(resp.text)
print("Graph and Collections Deleted: ", result)
```

  </TabItem>
  <TabItem value="js" label="JavaScript SDK">

```js
    class APIRequest {
      _headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      constructor(url) {
        this._url = url;
      }

      login(email, password) {
        const endpoint = "/_open/auth";

        const self = this;

        return new Promise(function (resolve, reject) {
          self
            .req(endpoint, {
              body: { email, password },
              method: "POST",
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
    TBD
```

  </TabItem>
</Tabs>  
