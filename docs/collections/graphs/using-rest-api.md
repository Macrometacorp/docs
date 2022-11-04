---
title: Using Rest API
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Today’s applications are required to be highly responsive and always online. They need to be deployed in datacenters closer to their users and can access data instantly across the globe.

## Prerequisite

A tenant account (and credentials) with Macrometa GDN.

## API Browser

Your best friend when working with REST APIs is the REST API browser available in [GDN](https://gdn.paas.macrometa.io) GUI. From there, you can execute various rest apis and see exactly what the inputs and outputs are.

![GDN API Browser](/img/gdn-api-browser.png)

## Working with Graphs

_Edge documents (edges)_ are similar to standard documents but with two additional required fields `_from` and `_to`. Values of these fields must be the handles of "from" and "to" vertex documents linked by the edge document in question. Here is an example of a valid edge document:

```json
{
  "_id": "friends/001",
  "_key": "001",
  "_rev": "_Wm3dyle--_",
  "_from": "students/john",
  "_to": "students/jane",
  "closeness": 9.5
}
```

A _graph_ consists of _vertices_ and _edges_. Edges are stored as documents in edge collections. A vertex can be a document of a document collection or of an edge collection (so edges can be used as vertices). Which collections are used within a named graph is defined via edge definitions. A `named graph` can contain more than one edge definition, at least one is needed. Graphs allow you to structure your models in line with your domain and group them logically in collections and giving you the power to query them in the same graph queries.

In SQL you commonly have the construct of a relation table to store `n:m` relations between two data tables. An `edge collection` is somewhat similar to these relation tables. `Vertex collections` resemble the data tables with the objects to connect.

While simple graph queries with fixed number of hops via the relation table may be doable in SQL with several nested joins, graph databases can handle an arbitrary number of these hops over edge collections - this is called `traversal`. Also edges in one edge collection may point to several vertex collections. Its common to have attributes attached to edges, i.e. a label naming this interconnection.

Edges have a direction, with their relations `_from` and `_to` pointing from one document to another document stored in vertex collections. In queries you can define in which directions the edge relations may be followed i.e.,

- OUTBOUND: `_from` → `_to`
- INBOUND: `_from` ← `_to`
- ANY: `_from` ↔ `_to`.

An _edge collection_**_ contains edge documents and shares its namespace with all other types of collections. You can manage edge documents via standard collection API wrappers, but using edge collection API wrappers provides additional safeguards:

- All modifications are executed in transactions.
- Edge documents are checked against the edge definitions on insert.

To create `edge collection` use same endpoint `/_fabric/{fabric_name}/_api/collection` and pass `type:3` in payload.

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
""" This file is a demo on using edge collections and graphs """
import json
import requests

# Constants

FEDERATION = "api-gdn.paas.macrometa.io"
FED_URL = f"https://{FEDERATION}"
GEO_FABRIC = "_system"
API_KEY = "my IP key" # Change to your API key
#EMAIL = "my email"
#PASSWORD = "my password"
#AUTH_TOKEN = "bearer " # Do not change

COLLECTION_NAME_1 = "teachers"
COLLECTION_NAME_2 = "lectures"
EDGE_COLL_NAME = "teach"
GRAPH_NAME = "lectureteacher"

# Create a HTTPS Session Part 1
# The following is required when accessing Macrometa with your email and password instead of an API key or JWT token
"""
URL = f"{FED_URL}/_open/auth"
payload = {
    'email':EMAIL,
    'password':PASSWORD
}
headers = {
    'content-type': 'application/json'
}

response = requests.post(URL, data = json.dumps(payload), headers = headers)
print("Response code:", response.status_code)
if response.status_code == 200:
    resp_body = json.loads(response.text)
    AUTH_TOKEN += resp_body["jwt"]
    TENANT = resp_body["tenant"]
else:
    raise Exception(f"Error while getting auth token. Code:{response.status_code},"
        f"Reason:{response.reason}")
print("Auth token:", AUTH_TOKEN)
"""

# Create a HTTPS Session Part 2
session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": "apikey " + API_KEY})

# Create Document Collections and Insert Data


url = f"{FED_URL}/_fabric/{GEO_FABRIC}/_api/collection"
payload = { 'name': COLLECTION_NAME_1 }

resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocument Collection1 Created: ",result)

payload = { 'name': COLLECTION_NAME_2 }

resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocument Collection2 Created: ",result)

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

url = f"{FED_URL}/_api/document/{COLLECTION_NAME_1}"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments Inserted: ",result)

payload = [
    {'_id': 'lectures/CSC101', 'difficulty': 'easy', '_key':'CSC101', 'firstname':'Jean'},
    {'_id': 'lectures/CSC102', 'difficulty': 'hard', '_key':'CSC102','firstname':'Jean'},
    {'_id': 'lectures/CSC103', 'difficulty': 'hard', '_key':'CSC103','firstname':'Jean'},
    {'_id': 'lectures/CSC104', 'difficulty': 'moderate', '_key':'CSC104','firstname':'Jean'}
]

url = f"{FED_URL}/_api/document/{COLLECTION_NAME_2}"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments Inserted: ",result)

# Create Edge Collection

payload = { 'name': EDGE_COLL_NAME, "type":3 }

url = f"{FED_URL}/_fabric/{GEO_FABRIC}/_api/collection"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nEdge Collection Created: ",result)

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

url = f"{FED_URL}/_api/document/{EDGE_COLL_NAME}"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments Inserted: ",result)
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

url = f"{FED_URL}/_api/graph"
resp = session.post(url,data=json.dumps(payload))
result = json.loads(resp.text)
print("\nGraph Created: ",result)

# Graph Traversal
# Set `direction` to `out` or `in` for outbound or inbound traversal.
params = {
    "vertex": "teachers/Jean",
    "direction": "out"
}

url = f"{FED_URL}/_api/edges/{EDGE_COLL_NAME}"

resp = session.get(url,params=params)
result = json.loads(resp.text)
print("\nGraph Traversal: ",result)


# Delete Graph and Collections
# Set `dropCollection` to `False` if you want to delete the graph but keep the collections.
# set dropCollection to False
params = {"dropCollections": True}

url = f"{FED_URL}/_api/graph/{GRAPH_NAME}"

resp = session.delete(url,params=params)
result = json.loads(resp.text)
print("Graph and Collections Deleted: ", result)
```

  </TabItem>
  <TabItem value="js" label="Javascript">

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
