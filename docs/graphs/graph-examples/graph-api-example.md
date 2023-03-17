---
title: REST API Graph Example
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-api-key.md';
import Steps from '../../_partials/_api-example-steps.md';

This page shows you how to perform a basic graph workflow using the Macrometa API.

## Why Use the API?

An _edge collection_ contains edge documents and shares its namespace with all other types of collections. You can manage edge documents via standard collection API wrappers, but using edge collection API wrappers provides additional safeguards:

- All modifications are executed in transactions.
- Edge documents are checked against the edge definitions on insert.

To create an edge collection, use the same endpoint `/_fabric/{fabric_name}/_api/collection` and pass `type:3` in the payload.

For more information about using Macrometa APIs, refer to [APIs](../../api-docs/index.md).

## Prerequisites

<Prerequisites />

## Graph API Example

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

```py
""" This file is a demo on using edge collections and graphs """
import json
import requests

# Constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
GEO_FABRIC = "_system"
API_KEY = "my API key"  # Change to your API key

COLLECTION_NAME_1 = "teachers"
COLLECTION_NAME_2 = "lectures"
EDGE_COLL_NAME = "teach"
GRAPH_NAME = "lectureteacher"

DELETE_GRAPH = True  # Change to False if you want to keep the graph
DELETE_COLLECTIONS = True  # Change to False if you want to keep the collections

# Create a HTTPS Session
session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": "apikey " + API_KEY})

# Create Document Collections and Insert Data
url = f"{HTTP_URL}/_fabric/{GEO_FABRIC}/_api/collection"
payload = {'name': COLLECTION_NAME_1}

resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocument collection 1 created: ", result)

payload = {'name': COLLECTION_NAME_2}

resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocument collection 2 created: ", result)

payload = [
    {
        '_key': 'Jean',
        'firstname': 'Jean',
        'lastname': 'Picard',
        'email': 'jean.picard@macrometa.io'
    },
    {
        '_key': 'James',
        'firstname': 'James',
        'lastname': 'Kirk',
        'email': 'james.kirk@macrometa.io'
    },
    {
        '_key': 'Han',
        'firstname': 'Han',
        'lastname': 'Solo',
        'email': 'han.solo@macrometa.io'
    },
    {
        '_key': 'Bruce',
        'firstname': 'Bruce',
        'lastname': 'Wayne',
        'email': 'bruce.wayne@macrometa.io'
    }
]

url = f"{HTTP_URL}/_api/document/{COLLECTION_NAME_1}"
resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments inserted: ", result)

payload = [
    {'_id': 'lectures/CSC101', 'difficulty': 'easy', '_key': 'CSC101', 'firstname': 'Jean'},
    {'_id': 'lectures/CSC102', 'difficulty': 'hard', '_key': 'CSC102', 'firstname': 'Jean'},
    {'_id': 'lectures/CSC103', 'difficulty': 'hard', '_key': 'CSC103', 'firstname': 'Jean'},
    {'_id': 'lectures/CSC104', 'difficulty': 'moderate', '_key': 'CSC104', 'firstname': 'Jean'}
]

url = f"{HTTP_URL}/_api/document/{COLLECTION_NAME_2}"
resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments inserted: ", result)

# Create Edge Collection
payload = {'name': EDGE_COLL_NAME, "type": 3}

url = f"{HTTP_URL}/_fabric/{GEO_FABRIC}/_api/collection"
resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nEdge Collection created: ", result)

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
resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments inserted: ", result)

# Create a Graph
payload = {
    "edgeDefinitions": [
        {
            "collection": EDGE_COLL_NAME,
            "from": ["teachers"],
            "to": ["lectures"]
        }
    ],
    "name": GRAPH_NAME,
    "options": {}
}

url = f"{HTTP_URL}/_api/graph"
resp = session.post(url, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nGraph created: ", result)

# Graph Traversal
# Set `direction` to `out` or `in` for outbound or inbound traversal.
params = {
    "vertex": "teachers/Jean",
    "direction": "out"
}

url = f"{HTTP_URL}/_api/edges/{EDGE_COLL_NAME}"

resp = session.get(url, params=params)
result = json.loads(resp.text)
print("\nGraph traversal: ", result)

# Delete Graph and Collections
# Set `DELETE_GRAPH` and `DELETE_COLLECTIONS` to `False` if you want to keep the graph and collections.
if DELETE_GRAPH:
    params = {"dropCollections": DELETE_COLLECTIONS}

    url = f"{HTTP_URL}/_api/graph/{GRAPH_NAME}"

    resp = session.delete(url, params=params)
    result = json.loads(resp.text)
    print("Graph and Collections Deleted: ", result)
```

  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
const https = require("https");
const httpUrl = "https://api-play.paas.macrometa.io";
const geoFabric = "_system";
const apiKey = "your_api_key"; // Replace with your API key

const collectionName1 = "teachers";
const collectionName2 = "lectures";
const edgeCollName = "teach";
const graphName = "lectureteacher";

const deleteGraph = true;
const deleteCollections = true;

const headers = {
  "Content-Type": "application/json",
  Authorization: "apikey " + apiKey
};

// Function for making HTTP requests using the native https module
function httpRequest(url, options, payload) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
      let data = "";
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(JSON.parse(data));
      });
    });

    req.on("error", error => {
      reject(error);
    });

    if (payload) {
      req.write(JSON.stringify(payload));
    }

    req.end();
  });
}

// Function for creating a collection
async function createCollection(name, type = 2) {
  const url = `${httpUrl}/_fabric/${geoFabric}/_api/collection`;
  const options = {
    method: "POST",
    headers
  };
  const payload = { name, type };
  return httpRequest(url, options, payload);
}

// Function for inserting a document into a collection
async function insertDocument(collectionName, payload) {
  const url = `${httpUrl}/_api/document/${collectionName}`;
  const options = {
    method: "POST",
    headers
  };
  return httpRequest(url, options, payload);
}

// Function for creating a graph
async function createGraph(payload) {
  const url = `${httpUrl}/_api/graph`;
  const options = {
    method: "POST",
    headers
  };
  return httpRequest(url, options, payload);
}

// Function for traversing the graph
async function graphTraversal(edgeCollName, vertex, direction) {
  const url = `${httpUrl}/_api/edges/${edgeCollName}`;
  const params = new URLSearchParams({ vertex, direction });
  const options = {
    method: "GET",
    headers
  };
  return httpRequest(`${url}?${params}`, options);
}

// Function for deleting the graph and collections
async function deleteGraphAndCollections(graphName, dropCollections) {
  const url = `${httpUrl}/_api/graph/${graphName}`;
  const params = new URLSearchParams({ dropCollections });
  const options = {
    method: "DELETE",
    headers
  };
  return httpRequest(`${url}?${params}`, options);
}

// Main execution
(async () => {
  // Create document collections and insert data
  console.log("\nDocument collection 1 created:", await createCollection(collectionName1));
  console.log("\nDocument collection 2 created:", await createCollection(collectionName2));

  console.log("\nDocuments inserted:", await insertDocument(collectionName1, [
    {
      _key: "Jean",
      firstname: "Jean",
      lastname: "Picard",
      email: "jean.picard@macrometa.io"
    },
    {
      _key: "James",
      firstname: "James",
      lastname: "Kirk",
      email: "james.kirk@macrometa.io"
    },
    {
      _key: "Han",
      firstname: "Han",
      lastname: "Solo",
      email: "han.solo@macrometa.io"
    },
    {
      _key: "Bruce",
      firstname: "Bruce",
      lastname: "Wayne",
      email: "bruce.wayne@macrometa.io"
    }
  ]));

  console.log("\nDocuments inserted:", await insertDocument(collectionName2, [
  { _id: "lectures/CSC101", difficulty: "easy", _key: "CSC101", firstname: "Jean" },
  { _id: "lectures/CSC102", difficulty: "hard", _key: "CSC102", firstname: "Jean" },
  { _id: "lectures/CSC103", difficulty: "hard", _key: "CSC103", firstname: "Jean" },
  { _id: "lectures/CSC104", difficulty: "moderate", _key: "CSC104", firstname: "Jean" }
  ]));
  
  // Create edge collection
  console.log("\nEdge collection created:", await createCollection(edgeCollName, 3));
  
  console.log("\nDocuments inserted:", await insertDocument(edgeCollName, [
  {
  _key: "Jean-CSC101",
  _from: "teachers/Jean",
  _to: "lectures/CSC101",
  online: false
  },
  {
  _key: "Jean-CSC102",
  _from: "teachers/Jean",
  _to: "lectures/CSC102",
  online: true
  },
  {
  _key: "Jean-CSC103",
  _from: "teachers/Jean",
  _to: "lectures/CSC103",
  online: false
  },
  {
  _key: "Bruce-CSC101",
  _from: "teachers/Bruce",
  _to: "lectures/CSC101",
  online: true
  }
  ]));
  
  // Create a graph
  console.log("\nGraph created:", await createGraph({
  edgeDefinitions: [
  {
  collection: edgeCollName,
  from: [collectionName1],
  to: [collectionName2]
  }
  ],
  name: graphName,
  options: {}
  }));
  
  // Graph traversal
  console.log("\nGraph traversal:", await graphTraversal(edgeCollName, "teachers/Jean", "out"));
  
  // Delete graph and collections
  if (deleteGraph) {
  console.log("Graph and collections deleted:", await deleteGraphAndCollections(graphName, deleteCollections));
  }
  })();
```

  </TabItem>
</Tabs>  
