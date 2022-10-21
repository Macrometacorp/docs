---
sidebar_position: 7
title: Using Rest APIs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Modern applications need to be highly responsive, always online, and able to access data instantly across the globe. At the same time, they need to be deployed on datacenters close to their users. Macrometa global data network (GDN) is a real-time materialized view engine that provides instant data to applications and APIs in a simple interface.

## Prerequisites:

A Macrometa GDN tenant account and credentials.

## API Browser

Your main tool for using REST APIs is the API reference in the [GDN](https://gdn.paas.macrometa.io) web browser interface. Use the built-in API reference to run various calls and view their input and output.

![GDN API Browser](/img/gdn-api-browser.png)

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
FEDERATION = "api-gdn.paas.macrometa.io"
FED_URL = f"https://{FEDERATION}"
COLLECTION_NAME = 'testcollection'
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxx"
AUTH_TOKEN = "bearer "
FABRIC = "_system"
URL = f"{FED_URL}/_open/auth"
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
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/datacenter/all"
dcl_resp = session.get(URL)
dcl_list = json.loads(dcl_resp.text)
regions = []
for dcl in dcl_list:
    dcl_url = dcl['tags']['url']
    regions.append(dcl_url)
print("\nList of regions: ", regions)

# Create a document collection
# Note: Create a test collection. Set "type" to 2 for documents or 3 for edges
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/collection"
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
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}"
payload = {'GPA': 3.5, 'first': 'Lola', 'last': 'Martin', '_key': 'Lola'}
resp = session.post(URL, data=json.dumps(payload))
print("\nDocument inserted: ", resp.text)

# Data can either be a single document or a list of documents
# Insert multiple documents
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}"
data = [
    {'GPA': 3.2, 'first': 'Abby', 'last': 'Page', '_key': 'Abby'},
    {'GPA': 3.6, 'first': 'John', 'last': 'Kim', '_key': 'John'},
    {'GPA': 4.0, 'first': 'Emma', 'last': 'Park', '_key': 'Emma'}
]
resp = session.post(URL, data=json.dumps(data))
print("\nMultiple documents inserted: ", resp.text)

# Read a document with its ID
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}" + "/Lola"
resp = session.get(URL)
print("\nDocument with ID Lola is: ", resp.text)

# Read multiple documents
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/simple/lookup-by-keys"
payload = {"collection": COLLECTION_NAME,
           "keys": ["Abby", "John", "Emma"]}
resp = session.put(URL, data=json.dumps(payload))
resp = json.loads(resp.text)
print("\nDocuments: ", resp["documents"])

# Update a single document with its ID
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}/John"
payload = {'GPA': 3.6, 'first': 'John', 'last': 'Andrews', '_key': 'John'}
resp = session.patch(URL, data=json.dumps(payload))
print("\nUpdated document with ID John: ", resp.text)

# Update  documents
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}"
payload = [
    {'GPA': 4.6, 'first': 'Lola', 'last': 'Martin', '_key': 'Lola'},
    {'GPA': 3.2, 'first': 'Abby', 'last': 'Stutguard', '_key': 'Abby'}
]
resp = session.patch(URL, data=json.dumps(payload))
print("\nUpdated documents: ", resp.text)

# Remove single document with its ID
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}/John"
resp = session.delete(URL)
print("\nDeleted document with ID John: ", resp.text)

# Remove a multiple document
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME}"
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
const federationUrl = "https://api-gdn.paas.macrometa.io";

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
FEDERATION = "api-gdn.paas.macrometa.io"
FED_URL = f"https://{FEDERATION}"
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxx"
AUTH_TOKEN = "bearer "


# Create HTTPS session
url = f"{FED_URL}/_open/auth"
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
url = f"{FED_URL}/_fabric/_system/_api/cursor"


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
const federationUrl = "https://api-gdn.paas.macrometa.io";

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


## Publish-Subscribe with Streams

GDN streams are a high-performance solution for server-to-server messaging. Streams are built on the *publish-subscribe* (pub-sub) pattern in which producers publish messages to streams, and consumers can subscribe to those streams, process incoming messages, and send an acknowledgment to the producer when finished.

Streams provide:

* Seamless geo-replication of messages across regions.
* Low publish and end-to-end latency.
* Seamless scalability to over a million topics.
* Multiple subscription modes (`exclusive`, `shared`, and `failover`) for streams.
* Guaranteed message delivery with persistent message storage.

### Tutorial

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
import json
import base64
import requests
from websocket import create_connection
import six

# Constants
FEDERATION = "api-gdn.paas.macrometa.io"
FED_URL = f"https://{FEDERATION}"
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxx"
FABRIC = "_system"
STREAM_NAME = "teststream"
AUTH_TOKEN = "bearer "
TENANT_NAME = ""
CONSUMER_NAME = "testconsumer"
STREAM_TYPE = "c8global"

# Create HTTPS session with auth endpoint
url = f"{FED_URL}/_open/auth"
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

# Create a stream
# Set global=true for a global stream or global=false for a local stream
url = f"{FED_URL}/_fabric/{FABRIC}/_api/streams/{STREAM_NAME}?global=true"
resp = session.post(url)
print("\nStream created: ", resp.text)

# Publish messages, Send message in body
url = f"{FED_URL}/_fabric/{FABRIC}/_api/streams/{STREAM_TYPE}s.{STREAM_NAME}/publish?global=true"
resp = session.post(url, data="Message")
print("\nStream received message: ", resp.text)

# or using web sockets
PRODUCER_URL = f"wss://{FEDERATION}/_ws/ws/v2/producer/persistent/{TENANT_NAME}/{STREAM_TYPE}.{FABRIC}/{STREAM_TYPE}s.{STREAM_NAME}"
ws = create_connection(PRODUCER_URL, header=[f"authorization: {AUTH_TOKEN}"])

payload = {
    "payload": base64.b64encode(
        six.b("Hello World")
    ).decode("utf-8")
}
ws.send(json.dumps(payload))
response = json.loads(ws.recv())

if response['result'] == 'ok':
    print('Message published successfully')
else:
    print('Failed to publish message:', response)
ws.close()

# Subscribe
CONSUMER_URL = f"wss://{FEDERATION}/_ws/ws/v2/producer/persistent/{TENANT_NAME}/{STREAM_TYPE}.{FABRIC}/{STREAM_TYPE}s.{STREAM_NAME}/{CONSUMER_NAME}"
ws = create_connection(CONSUMER_URL, header=[f"authorization: {AUTH_TOKEN}"])
while True:
    msg = json.loads(ws.recv())
    if msg:
        print(f"received: {base64.b64decode(msg['payload'])}")
        # Acknowledge successful processing
        ws.send(json.dumps({'messageId': msg['messageId']}))
        break
ws.close()

# Delete Subscription (unsubscribe)
url = f"{FED_URL}/_api/streams/subscription/{CONSUMER_NAME}"
resp = session.delete(url)
print("Subscription deleted: ", resp.text)
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
const WebSocket = require("ws");
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
const federationName = "api-gdn.paas.macrometa.io";
const federationUrl = `https://${federationName}`;

const stream = "api_tutorial_streams";
const consumerName = "api_tutorial_streams_consumer";
const isGlobal = true;

const run = async function () {
  const connection = new APIRequest(federationUrl);

  /* -------------------- Log in (nemo@nautilus.com/xxxxxxx) -------------------- */

  const { tenant } = await connection
    .login(email, password)
    .then((tenant) => {
      console.log("\n1. User authentication done!");
      return tenant;
    })
    .catch((error) => console.log(error));

  /* ------------------------------ Create stream ----------------------------- */

  try {
    await connection.req(
      `/_fabric/_system/streams/${stream}?global=${isGlobal}`,
      {
        body: { name: stream },
        method: "POST"
      }
    );
    console.log("2. Stream created successfully");
  } catch (e) {
    if (e.status === 409) {
      console.log("2. Stream already exists, skipping creation of stream");
    } else {
      console.log("2. Error while creating stream");
      throw e;
    }
  }
  console.log("3. Initiation producer and consumer")
  /* ----------------- Publish and subscribe message to stream ---------------- */

  const region = isGlobal ? "c8global" : "c8local";
  const streamName = `${region}s.${stream}`;

  // Fetch local URL in case the stream is local
  const localDcDetails = await connection
    .req(`/datacenter/local`, {
      method: "GET"
    })
    .catch((error) => console.log(error));

  const dcUrl = localDcDetails.tags.url;

  const url = isGlobal ? federationName : `api-${dcUrl}`;

  const otpConsumer = await connection
    .req(`/apid/otp`, {
      method: "POST"
    })
    .catch((error) => console.log(error));
  const otpProducer = await connection
    .req(`/apid/otp`, {
      method: "POST"
    })
    .catch((error) => console.log(error));

  const consumerUrl = `wss://${url}/_ws/ws/v2/consumer/persistent/${tenant}/${region}._system/${streamName}/${consumerName}?otp=${otpConsumer.otp}`;

  const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}?otp=${otpProducer.otp}`;

  let consumer;
  let producer;
  let producerInterval;

  /* -------------------------- Initalize consumer -------------------------- */

  const initConsumer = () => {
    return new Promise((resolve) => {
      consumer = new WebSocket(consumerUrl);

      consumer.onopen = function () {
        console.log("WebSocket:Consumer is open now for " + streamName);
        resolve();
      };

      consumer.onerror = function () {
        console.log(
          "Failed to establish WebSocket:Consumer connection for " + streamName
        );
      };

      consumer.onclose = function () {
        console.log("Closed WebSocket:Consumer connection for " + streamName);
      };

      consumer.onmessage = function (message) {
        const receivedMsg = message.data && JSON.parse(message.data);

        console.log(
          `WebSocket:Consumer message received at ${new Date()}`,
          receivedMsg
        );
        console.log(
          "Payload: ",
          Buffer.from(receivedMsg.payload, "base64").toString("ascii"),
          " At: ",
          receivedMsg.publishTime
        );

        const ackMsg = { messageId: receivedMsg.messageId };
        consumer.send(JSON.stringify(ackMsg));
      };
    });
  };

  /* -------------------------- Initalize producer -------------------------- */

  const initProducer = () => {
    producer = new WebSocket(producerUrl);

    producer.onopen = function () {
      console.log("WebSocket:Producer is open now for " + streamName);
      producerInterval = setInterval(function () {
        console.log(`WebSocket:Producer message sent at ${new Date()}`);
        producer.send(
          JSON.stringify({
            payload: Buffer.from("Hello World").toString("base64")
          })
        );
      }, 10000);
    };

    producer.onclose = function (e) {
      console.log("Closed WebSocket:Producer connection for " + streamName);
      clearInterval(producerInterval);
    };

    producer.onerror = function (e) {
      console.log(
        "Failed to establish WebSocket:Producer connection for " + streamName
      );
    };
  };

  initConsumer()
    .then(() => {
      initProducer();
    })
    .catch((error) => console.log(error));

  await new Promise((resolve) => setTimeout(resolve, 1 * 40 * 1000));

  consumer.close();
  console.log("4. Closing consumer...");
  producer.close();
  console.log("5. Closing producer...");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  /* ------------------------ Unsubscribe from stream ------------------------ */

  const consumerUnsubscribe = await connection
    .req(`/_fabric/_system/_api/streams/subscription/${consumerName}`, {
      method: "DELETE"
    })
    .catch((error) => console.log(error));

  console.log(`6. ${consumerName} unsubscribed successfully`, consumerUnsubscribe);

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
FEDERATION = "api-gdn.paas.macrometa.io"
FED_URL = f"https://{FEDERATION}"
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

URL = f"{FED_URL}/_open/auth"
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
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/collection"
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
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql"

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
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql/execute/insert"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
print("\nInsert query executed: ", resp.text)
time.sleep(1)
# Execute read query
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql/execute/" + QUERY_NAME
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
print("\nRead query executed: ", resp.text)
time.sleep(1)
# Execute update query
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql/execute/update"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
print("\nUpdate query executed: ", resp.text)
time.sleep(1)
# Update saved query
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql/" + QUERY_NAME
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
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql/execute/delete"
payload = {
    "bindVars": QUERY_PARAMS,
}
resp = session.post(URL, data=json.dumps(payload))
print("\nDelete query executed: ", resp.text)
time.sleep(1)
# Delete saved queries
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql/{QUERY_NAME}"
resp = session.delete(URL)
print("Read query deleted: ", resp.text)
time.sleep(1)
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql/insert"
resp = session.delete(URL)
print("Insert query deleted: ", resp.text)
time.sleep(1)
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql/update"
resp = session.delete(URL)
print("Update query deleted: ", resp.text)
time.sleep(1)
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/restql/delete"
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
const federationUrl = "https://api-gdn.paas.macrometa.io";
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

## Working with Graphs

*Graphs* enable you to do the following:

* Structure your data models to make them consistent with your domain.
* Group your data models into logical collections and query them.

A graph consists of *vertices* and *edges* that are all stored as documents in collections. You can store vertices in document collections or edge collections, enabling you to use an edge as a vertex. Edges can only be stored in edge collections. An *edge collection* is similar to a relation table that stores many-to-many relationships between two data tables, and a *vertex collection* is like one of the data tables with connected objects. A graph can use one or more *edge definitions* to determine which collections are used.

An edge collection contains *edge documents* and shares its namespace with all other collection types. You can manage edge documents with REST API wrappers for regular documents, but edge collection API wrappers provide the following benefits:

* Perform modifications as transactions.
* When inserting edge documents, check them against edge definitions.

Edge documents have two additional required fields:

*  `_from`
*  `_to`

Edges use these fields to point from one document to another stored in vertex collections. The values of `_from` and `_to` must match the IDs of vertex documents linked by the edge document. For example:

```json
{
"_id": "friends/001",
"_key": "001",
"_rev": "_Wm3dyle--_",
"_from": "students/john",  // This value must match the ID of the "from" document.
"_to": "students/jane",  // This value must match the ID of the "to" document.
"closeness": 9.5
}
```

In queries, you can define permissions for the direction of edge relations. For example:

* OUTBOUND: `_from` → `_to`
* INBOUND: `_from` ← `_to`
* ANY: `_from` ↔ `_to`


While simple graph queries with a fixed number of hops via the relation table may be doable in SQL with several nested joins, graph databases can handle an arbitrary number of these hops over edge collections - this is called `traversal`. Also edges in one edge collection may point to several vertex collections. It is common to have attributes attached to edges, i.e. a label naming this interconnection.

### Tutorial

To create `edge collection` use same endpoint `/_fabric/{fabric_name}/_api/collection` and pass `type:3` in payload.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
import json
import requests

# Constants

FEDERATION = "api-gdn.paas.macrometa.io"
FED_URL = f"https://{FEDERATION}"
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxx"
FABRIC = "_system"
AUTH_TOKEN = "bearer "
TENANT_NAME = ""
COLLECTION_NAME_1 = "teachers"
COLLECTION_NAME_2 = "lectures"
EDGE_COLL_NAME = "teach"
GRAPH_NAME = "lectureteacher"

# Create HTTPS session

URL = f"{FED_URL}/_open/auth"
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
    raise Exception(f"Error while getting auth token. "
                    f"Code:{response.status_code}, Reason:{response.reason}")

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Create document collections and insert data


URL = f"{FED_URL}/_fabric/{FABRIC}/_api/collection"
payload = {'name': COLLECTION_NAME_1}

resp = session.post(URL, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocument collection 1 created: ", result)

payload = {'name': COLLECTION_NAME_2}

resp = session.post(URL, data=json.dumps(payload))
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

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME_1}"
resp = session.post(URL, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments inserted: ", result)

payload = [
    {'_id': 'lectures/CSC101', 'difficulty': 'easy', '_key': 'CSC101', 'firstname': 'Jean'},
    {'_id': 'lectures/CSC102', 'difficulty': 'hard', '_key': 'CSC102', 'firstname': 'Jean'},
    {'_id': 'lectures/CSC103', 'difficulty': 'hard', '_key': 'CSC103', 'firstname': 'Jean'},
    {'_id': 'lectures/CSC104', 'difficulty': 'moderate', '_key': 'CSC104', 'firstname': 'Jean'}

]

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{COLLECTION_NAME_2}"
resp = session.post(URL, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments inserted: ", result)

# Create edge collection
payload = {'name': EDGE_COLL_NAME, "type": 3}

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/collection"
resp = session.post(URL, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nEdge collection created: ", result)
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

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/document/{EDGE_COLL_NAME}"
resp = session.post(URL, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nDocuments inserted: ", result)

# Create a graph
payload = {
    "edgeDefinitions": [
        {
            "collection": EDGE_COLL_NAME,
            "from": [
                "teachers"
            ],
            "to": [
                "lectures"
            ]
        }
    ],
    "name": GRAPH_NAME,
    "options": {}
}

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/graph"
resp = session.post(URL, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nGraph created: ", result)

# Graph traversal
# To use outbound traversal, set direction to `out`.
# To use inbound traversal, set direction to `in`.
params = {
    "vertex": "teachers/Jean",
    "direction": "out"
}

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/edges/{EDGE_COLL_NAME}"

resp = session.get(URL, params=params)
result = json.loads(resp.text)
print("\nGraph traversal: ", result)

# Delete graph and collections
# To delete the graph and save the collections, set dropCollection to `false`.
params = {"dropCollections": True}
URL = f"{FED_URL}/_fabric/{FABRIC}/_api/graph/{GRAPH_NAME}"
resp = session.delete(URL, params=params)
result = json.loads(resp.text)
print("Graph and collections deleted: ", result)
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
const federationUrl = "https://api-gdn.paas.macrometa.io";
const teacherCollection = "teachers";
const lecturesCollection = "lectures";
const teachEdge = "teach";
const lectureTracherGraph = "lectureteacher";

const teachersPayload = [
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
];

const lecturesPayload = [
  {
    _id: "lectures/CSC101",
    difficulty: "easy",
    _key: "CSC101",
    firstname: "Jean"
  },
  {
    _id: "lectures/CSC102",
    difficulty: "hard",
    _key: "CSC102",
    firstname: "Jean"
  },
  {
    _id: "lectures/CSC103",
    difficulty: "hard",
    _key: "CSC103",
    firstname: "Jean"
  },
  {
    _id: "lectures/CSC104",
    difficulty: "moderate",
    _key: "CSC104",
    firstname: "Jean"
  }
];

const edgePayload = [
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
];

const graphPayload = {
  edgeDefinitions: [
    {
      collection: teachEdge,
      from: ["teachers"],
      to: ["lectures"]
    }
  ],
  name: lectureTracherGraph,
  options: {}
};

const tranversalGraphParams = {
  vertex: "teachers/Jean",
  direction: "out"
};

const run = async function () {
  const connection = new APIRequest(federationUrl);

  /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

  await connection
    .login(email, password)
    .then(() => console.log("\n1. User authentication done!"))
    .catch((error) => error);

  /* -------------------- Create teachers collection -------------------- */
  await connection
    .req("/_fabric/_system/_api/collection", {
      body: { name: teacherCollection },
      method: "POST"
    })
    .then((collection) =>
      console.log("2. Collection " + teacherCollection + " created", collection)
    )
    .catch((error) => console.log(error));

  /* -------------------- Create lectures collection -------------------- */
  await connection
    .req("/_fabric/_system/_api/collection", {
      body: { name: lecturesCollection },
      method: "POST"
    })
    .then((collection) =>
      console.log(
        "3. Collection " + lecturesCollection + " created",
        collection
      )
    )
    .catch((error) => console.log(error));

   /* -------------------- Load data to teachers collection -------------------- */
  await connection
    .req(`/_fabric/_system/_api/document/${teacherCollection}`, {
      body: teachersPayload,
      method: "POST"
    })
    .then((collection) => console.log("4. Documents inserted", collection))
    .catch((error) => console.log(error));

   /* -------------------- Load data to lectures collection -------------------- */
  await connection
    .req(`/_fabric/_system/_api/document/${lecturesCollection}`, {
      body: lecturesPayload,
      method: "POST"
    })
    .then((collection) => console.log("5. Documents inserted", collection))
    .catch((error) => console.log(error));

  /* -------------------- Create edge collection -------------------- */
  await connection
    .req("/_fabric/_system/_api/collection", {
      body: { name: teachEdge, type: 3 },
      method: "POST"
    })
    .then((collection) =>
      console.log("6. Edge collection created successfully", collection)
    )
    .catch((error) => console.log(error));

  /* -------------------- Load data to edge collection -------------------- */
  await connection
    .req(`/_fabric/_system/_api/document/${teachEdge}`, {
      body: edgePayload,
      method: "POST"
    })
    .then((collection) =>
      console.log("7. Documents inserted in edge collection", collection)
    )
    .catch((error) => console.log(error));

  /* -------------------- Create graph -------------------- */
  await connection
    .req("/_fabric/_system/_api/graph", {
      body: graphPayload,
      method: "POST"
    })
    .then((collection) =>
      console.log("8. Graph created successfully", collection)
    )
    .catch((error) => console.log(error));

  /* -------------------- Load data graph traversal-------------------- */
  await connection
    .req(
      `/_fabric/_system/_api/edges/${teachEdge}?` +
        new URLSearchParams(tranversalGraphParams),
      {
        method: "GET"
      }
    )
    .then((collection) => console.log("9. Graph traversal", collection))
    .catch((error) => console.log(error));

  /* -------------------- Delete graph and drop collections -------------------- */
  
  await connection
    .req(
      `/_fabric/_system/_api/graph/${lectureTracherGraph}?` +
        new URLSearchParams({ dropCollections: true }),
      {
        method: "DELETE"
      }
    )
    .then((collection) => console.log("10. Graph deleted", collection))
    .catch((error) => console.log(error));
};

run()
  .then()
  .catch((error) => console.log(error));

```

</TabItem>
</Tabs>  

## Stream Processing

Macrometa Stream processing enables you to integrate streaming data into your tenant and enables you to automatically respond to events. A stream processing engine must collect and analyze data generated by business activities, then integrate or act on the data.

* Collect: Capture or receive data from various data sources.

* Analyze: Analyze data to identify interesting patterns and extract information.

* Act: Take actions based on processing results. For example, you can execute code, call an external service, or trigger a complex integration.

* Integrate: Make processed data globally available for consumers in the correct format with low latency.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python">

```py
import json
import time
import base64
import requests
from websocket import create_connection
import six

# Set constants

FEDERATION = "api-gdn.paas.macrometa.io"
FED_URL = f"https://{FEDERATION}"
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxx"
FABRIC = "_system"
AUTH_TOKEN = "bearer "
TENANT_NAME = ""
STREAM_NAME = "tutorialAppInputStream"
STREAM_APP_NAME = "stream_app_tutorial"
STREAM_APP = '''
      @App:name('stream_app_tutorial')
      @App:qlVersion("2")
      CREATE FUNCTION concatFn[javascript] return string {
          var str1 = data[0];
          var str2 = data[1];
          var str3 = data[2];
          var response = str1 + str2 + str3;
          return response;
      };
      -- Stream
      CREATE SOURCE STREAM tutorialAppInputStream (deviceID string, roomNo int, temperature double);
      -- Table
      CREATE TABLE tutorialAppOutputTable (id string, temperature double);
      @info(name='Query')
      INSERT INTO tutorialAppOutputTable
      SELECT concatFn(roomNo,'-',deviceID) as id, temperature
      FROM tutorialAppInputStream;
 '''
INPUT_DATA = [
    {
        "deviceID": "AD11",
        "roomNo": 200,
        "temperature": 18,
    },
    {"deviceID": "AD11",
     "roomNo": 201,
     "temperature": 47},
]
SELECT_QUERY = "FOR doc IN tutorialAppOutputTable return doc"

# Create HTTPS session

URL = f"{FED_URL}/_open/auth"
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
    raise Exception(f"Error while getting auth token. "
                    f"Code:{response.status_code}, Reason:{response.reason}")

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Create stream application

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/streamapps"
payload = {
    "definition": STREAM_APP,
    "regions": ["devsuccess2-us-east", "devsuccess2-us-central", "devsuccess2-ap-west"]

}

resp = session.post(URL, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nStream application created: ", result)

# Activate stream application

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/streamapps/{STREAM_APP_NAME}/active?active=true"
resp = session.patch(URL)
result = json.loads(resp.text)
print("\nStream application activated: ", result)

# Wait for all inputs and outputs to initialize
time.sleep(20)

# Publish messages to the input stream
STREAM_TYPE = "c8local"
PRODUCER_URL = f"wss://{FEDERATION}/_ws/ws/v2/producer/persistent/{TENANT_NAME}/{STREAM_TYPE}.{FABRIC}/{STREAM_TYPE}s.{STREAM_NAME}"

ws = create_connection(PRODUCER_URL, header=[f"Authorization:{AUTH_TOKEN}"])
payload = {
    "payload": base64.b64encode(
        six.b(json.dumps(INPUT_DATA[0]))
    ).decode("utf-8")
}
ws.send(json.dumps(payload))
response = json.loads(ws.recv())
if response['result'] == 'ok':
    print('Message published successfully')
else:
    print('Failed to publish message:', response)

payload = {
    "payload": base64.b64encode(
        six.b(json.dumps(INPUT_DATA[1]))
    ).decode("utf-8")
}
ws.send(json.dumps(payload))
response = json.loads(ws.recv())
if response['result'] == 'ok':
    print('Message published successfully')
else:
    print('Failed to publish message:', response)

ws.close()

# Verify results from the collection

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/cursor"
payload = {
    "id": "tutorialStreamAppQuery",
    "query": SELECT_QUERY,
    "bindVars": {},
}
resp = session.post(URL, data=json.dumps(payload))
result = json.loads(resp.text)
print("\nStream application results: ", result)

# Delete stream application

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/streamapps/{STREAM_APP_NAME}"
resp = session.delete(URL)
result = json.loads(resp.text)
print("\nStream application deleted: ", result)

# Delete stream

URL = f"{FED_URL}/_fabric/{FABRIC}/_api/streams/{STREAM_TYPE}s.{STREAM_NAME}"
resp = session.delete(URL)
result = json.loads(resp.text)
print("\nStream deleted: ", result)
```

</TabItem>
<TabItem value="js" label="Javascript">

```js
 const WebSocket = require("ws");
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
const federationName = "api-gdn.paas.macrometa.io";
const federationUrl = `https://${federationName}`;

const isGlobal = false;
const stream = `tutorialAppInputStream`;
const streamAppName = `stream_app_tutorial`;
const streamApp = `@App:name('stream_app_tutorial')
  @App:description('This application demonstrates how to use user-defined functions in a stream app')

  define function concatFn[javascript] return string {
      var str1 = data[0];
      var str2 = data[1];
      var str3 = data[2];
      var response = str1 + str2 + str3;
      return response;
  };

  -- Stream
  define stream tutorialAppInputStream (deviceID string, roomNo int, temperature double);

  -- Table
  define table tutorialAppOutputTable (ID string, temperature double);

  @info(name='Query')
  select concatFn(roomNo,'-',deviceID) as id, temperature
  from tutorialAppInputStream
  insert into tutorialAppOutputTable;`;

const run = async function () {
  try {
    const connection = new APIRequest(federationUrl);

    /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

    const { tenant } = await connection.login(email, password);

    console.log("Logged in successfully using", tenant);

    /* ---------------------------- Create stream app ---------------------------- */
    
    try {
      const app = await connection.req("/_fabric/_system/_api/streamapps", {
        body: {
          definition: streamApp,
          regions: []
        },
        method: "POST"
      });
      console.log("Stream app created successfully", app);
    } catch (e) {
      if (e.status === 409) {
        console.log(
          "Stream app already exists, skipping creation of stream app"
        );
      } else {
        console.log("Error while creating stream app");
        throw e;
      }
    }

    /* --------------------------- Activate stream app --------------------------- */

    await connection.req(
      `/_fabric/_system/_api/streamapps/${streamAppName}/active?active=true`,
      {
        method: "PATCH"
      }
    );

    console.log("Activating stream app...", streamAppName);

    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("Stream app activated successfully");

    /* ------------------ Publish messages to sample stream app ------------------ */
    
    const region = isGlobal ? "c8global" : "c8local";
    const streamName = `${region}s.${stream}`;

    // Fetch local URL in case the stream is local (which is defined in the stream app)
    const localDcDetails = await connection.req(`/datacenter/local`, {
      method: "GET"
    });

    const dcUrl = localDcDetails.tags.url;

    const url = isGlobal ? federationName : `api-${dcUrl}`;

    const otpProducer = await connection.req(`/apid/otp`, {
      method: "POST"
    });

    const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}?otp=${otpProducer.otp}`;

    /* -------------------------- Initalize producer -------------------------- */

    const producer = new WebSocket(producerUrl);

    producer.onopen = function () {
      console.log("WebSocket:Producer is open now for " + streamName);
    };

    producer.onerror = function () {
      console.log(
        "Failed to establish WebSocket:Producer connection for " + streamName
      );
    };

    producer.onclose = function () {
      console.log("Closed WebSocket:Producer connection for " + streamName);
    };

    producer.onmessage = function () {
      console.log("WebSocket:Producer message sent successfully");
    };

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const inputData = [
      {
        deviceID: "AD11",
        roomNo: 200,
        temperature: 18
      },
      { deviceID: "AD11", roomNo: 201, temperature: 47 }
    ];

    producer.send(
      JSON.stringify({
        payload: Buffer.from((JSON.stringify(inputData[0]))).toString('base64')
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 10000));

    producer.send(
      JSON.stringify({
        payload: Buffer.from((JSON.stringify(inputData[1]))).toString('base64')
      })
    );

    await new Promise((resolve) => setTimeout(resolve, 10000));

    producer.close();

    /* ----------------------------- Verify results ----------------------------- */

    const selectQuery = "FOR doc IN tutorialAppOutputTable return doc";

    const result = await connection.req(`/_fabric/_system/_api/cursor`, {
      body: {
        id: "tutorialStreamAppQuery",
        query: selectQuery,
        bindVars: {}
      },
      method: "POST"
    });

    console.log("Input data sent --->", inputData);
    console.log("Output data received --->", result.result);

    /* ---------------------------- Delete stream app ---------------------------- */
    
    const deletion = await connection.req(
      `/_fabric/_system/_api/streamapps/${streamAppName}`,
      {
        method: "DELETE"
      }
    );

    console.log("Stream app deleted successfully", deletion);
  } catch (e) {
    console.error(e);
  }
};

run();
```

</TabItem>
</Tabs>  
