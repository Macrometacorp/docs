---
sidebar_position: 1
title: Using Rest API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using REST APIs

Modern applications need to be highly responsive, always online, and able to access data instantly across the globe. At the same time, they need to be deployed on datacenters close to their users. Macrometa global data network (GDN) is a real-time materialized view engine that provides instant data to applications and APIs in a simple interface.

If you are new to Macrometa GDN, start by reading the [essentials](../../../essentials/overview.md) of Macrometa GDN.

Prerequisites:

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

    import requests
    import json

    # Set constants

    FEDERATION = "api-gdn.paas.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    COLLECTION_NAME = "testcollection"
    AUTH_TOKEN = "bearer "

    # Create HTTPS session

    url = "{}/_open/auth".format(FED_URL)
    payload = {
        'email':EMAIL,
        'password':PASSWORD
        }
    headers = {
        'content-type': 'application/json'
        }

    response = requests.post(url, data = json.dumps(payload), headers = headers)

    if response.status_code == 200:
        resp_body = json.loads(response.text)
        AUTH_TOKEN += resp_body["jwt"]
        TENANT = resp_body["tenant"]
    else:
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})

    # Get list of all regions

    url = FED_URL + "/_api/datacenter/all"
    dcl_resp = session.get(url)
    dcl_list = json.loads(dcl_resp.text)
    regions = []
    for dcl in dcl_list:
        dcl_url = dcl['tags']['url']
        regions.append(dcl_url)
    print("\nList of regions: ",regions)

    # Create a document collection
	# Note: Create a test collection. Set "type" to 2 for documents or 3 for edges

    url = FED_URL + "/_api/collection"
    payload = {
        "name": COLLECTION_NAME,
        "type": 2
    }
    resp = session.post(url, data = json.dumps(payload))
    resp = json.loads(resp.text)
    if 'error' in resp and resp['error']:
        print("ERROR: " + resp["errorMessage"])
    else:
        print("\nCollection created: ", resp['name'])


    # Insert a document into a collection

    url = FED_URL + "/_api/document/" + COLLECTION_NAME
    payload = {'GPA': 3.5, 'first': 'Lola', 'last': 'Martin', '_key': 'Lola'}
    resp = session.post(url, data = json.dumps(payload))
    print("\nDocument inserted: ", resp.text)

    # Data can either be a single document or a list of documents
    # Insert multiple documents

    url = FED_URL + "/_api/document/" + COLLECTION_NAME
    data = [
        {'GPA': 3.2, 'first': 'Abby', 'last': 'Page', '_key': 'Abby'},
        {'GPA': 3.6, 'first': 'John', 'last': 'Kim', '_key': 'John'},
        {'GPA': 4.0, 'first': 'Emma', 'last': 'Park', '_key': 'Emma'}
    ]
    resp = session.post(url, data = json.dumps(data))
    print("\nMultiple documents inserted: ", resp.text)

    # Read a document with its ID

    url = FED_URL + "/_api/document/" + COLLECTION_NAME + "/Lola"
    resp = session.get(url)
    print("\nDocument with ID Lola is: ",resp.text)

    # Read multiple documents

    url = FED_URL + "/_api/simple/lookup-by-keys"
    payload = {"collection": COLLECTION_NAME,
                "keys": ["Abby", "John", "Emma"] }
    resp = session.put(url, data = json.dumps(payload))
    resp = json.loads(resp.text)
    print("\nDocuments: ", resp["documents"])

    # Update a single document with its ID
    url = FED_URL + "/_api/document/" + COLLECTION_NAME + "/John"
    payload =     {'GPA': 3.6, 'first': 'John', 'last': 'Andrews', '_key': 'John'},

    resp = session.patch(url, data = json.dumps(payload))
    print("\nUpdated document with ID Lola: ",resp.text)

    # Update  documents
    url = FED_URL + "/_api/document/" + COLLECTION_NAME
    payload = [
        {'GPA': 4.6, 'first': 'Lola', 'last': 'Martin', '_key': 'Lola'},
        {'GPA': 3.2, 'first': 'Abby', 'last': 'Stutguard', '_key': 'Abby'}
    ]
    resp = session.patch(url, data = json.dumps(payload))
    print("\nUpdated documents: ", resp.text)

    # Remove single document with its ID
    url = FED_URL + "/_api/document/" + COLLECTION_NAME + "/John"
    resp = session.delete(url)
    print("\nDeleted document with ID John: ", resp.text)


    # Remove a multiple document
    url = FED_URL + "/_api/document/" + COLLECTION_NAME
    payload = [
        {'GPA': 4.6, 'first': 'Lola', 'last': 'Martin', '_key': 'Lola'},
        {'GPA': 3.2, 'first': 'Abby', 'last': 'Stutguard', '_key': 'Abby'}
    ]
    resp = session.delete(url, data = json.dumps(payload))
    print("\nDeleted Documents: ", resp.text)

  </TabItem>
  <TabItem value="js" label="Javascript">

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
    const EMAIL = "nemo@nautilus.com";
    const PASSWORD = "xxxxxx";
    const FEDERATION_URL = "https://api-gdn.paas.macrometa.io";

    const COLLECTION_NAME = "api_tutorial_documents";

    const run = async function () {
      try {
        const connection = new APIRequest(FEDERATION_URL);

        /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

        await connection.login(EMAIL, PASSWORD);

        console.log("Logged in successfully using", EMAIL);

        /* -------------------------- Create document collection ------------------------- */

        const collection = await connection.req(
          "/_fabric/_system/_api/collection",
          {
            body: { name: COLLECTION_NAME },
            method: "POST",
          }
        );

        console.log("COLLECTION CREATED SUCCESSFULLY", collection);

        /* ---------------------------- Insert documents ---------------------------- */

        const document = await connection.req(
          `/_fabric/_system/_api/document/${COLLECTION_NAME}`,
          {
            body: { new: true },
            method: "POST",
          }
        );

        console.log("DOCUMENT CREATED SUCCESSFULLY", document);

        /* ----------------------------- Read documents ----------------------------- */

        const readDocument = await connection.req(
          `/_fabric/_system/_api/document/${document._id}`
        );

        console.log("DOCUMENT READ SUCCESSFULLY", readDocument);

        /* ---------------------------- Update documents ---------------------------- */

        const updateDocument = await connection.req(
          `/_fabric/_system/_api/document/${document._id}`,
          {
            method: "PATCH",
            body: { new: false },
          }
        );

        console.log("DOCUMENT UPDATED SUCCESSFULLY", updateDocument);

        /* ----------------------------- Read documents ----------------------------- */

        const updatedReadDocument = await connection.req(
          `/_fabric/_system/_api/document/${document._id}`
        );

        console.log("DOCUMENT UPDATED READ SUCCESSFULLY", updatedReadDocument);

        /* ------------------------------- Delete documents ------------------------------ */
        const deletedDocument = await connection.req(
          `/_fabric/_system/_api/document/${document._id}`,
          {
            method: "DELETE",
          }
        );
        console.log("DOCUMENT DELETED SUCCESSFULLY", deletedDocument);

        /* --------------------------- Delete collection. --------------------------- */
        const deletedCollection = await connection.req(
          `/_fabric/_system/_api/collection/${COLLECTION_NAME}`,
          { method: "DELETE" }
        );

        console.log("DOCUMENT DELETED SUCCESSFULLY", deletedCollection);
      } catch (e) {
        console.error(e);
      }
    };

    run();

  </TabItem>
</Tabs>  

## Query using C8QL

You can use C8QL to run CRUD Operations.

### Tutorial

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    #Using C8QL

    import requests
    import json

    FEDERATION = "api-gdn.paas.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    AUTH_TOKEN = "bearer "

    # Create HTTPS session

    url = "{}/_open/auth".format(FED_URL)
    payload = {
        'email':EMAIL,
        'password':PASSWORD
        }
    headers = {
        'content-type': 'application/json'
        }

    response = requests.post(url, data = json.dumps(payload), headers = headers)

    if response.status_code == 200:
        resp_body = json.loads(response.text)
        AUTH_TOKEN += resp_body["jwt"]
        TENANT = resp_body["tenant"]
    else:
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})



    # Insert documents to the collection
    resp = session.post(url, json={
        "query": "INSERT{'name' : 'Julie', 'company' : 'ABC', '_key' : 'Julie'}" \
                "INTO testcollection"
    })

    # Read from the collection
    resp = session.post(url, json={
        "query": "FOR doc IN testcollection RETURN doc"
    })

    # Update documents in the collection
    resp = session.post(url, json={
        "query": "FOR c IN testcollection UPDATE {'company':'XYZ'} IN testcollection"
    })

    # Delete documents in the collection
    resp = session.post(url, json={
        "query": "FOR c IN testcollection REMOVE c IN testcollection"
    })
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

    import requests
    import json
    from websocket import create_connection
    import base64
    import six

    # Constants

    FEDERATION = "api-gdn.paas.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    FABRIC = "_system"
    STREAM_NAME = "teststream"
    AUTH_TOKEN = "bearer "
    TENANT_NAME = "xxxxxx"
    CONSUMER_NAME = "testconsumer"


    # Create HTTPS session

    url = "{}/_open/auth".format(FED_URL)
    payload = {
        'email':EMAIL,
        'password':PASSWORD
        }
    headers = {
        'content-type': 'application/json'
        }

    response = requests.post(url, data = json.dumps(payload), headers = headers)

    if response.status_code == 200:
        resp_body = json.loads(response.text)
        AUTH_TOKEN += resp_body["jwt"]
        TENANT = resp_body["tenant"]
    else:
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})

    # Create a stream
	# Set global=true for a global stream or global=false for a local stream

    url = FED_URL + "/_fabric/" + FABRIC + "/streams/" + STREAM_NAME + "?global=true"
    resp = session.post(url)
    print("\nStream created: ", resp.text)

    # Publish messages
    # Send message in body
    url = FED_URL + "/_fabric/" + FABRIC + "/streams/" + STREAM_NAME + "/publish?global=true"
    resp = session.post(url)
    print("\nStream created: ", resp.text)

    # or

    stream_type = "c8local"
    producerurl = "wss://" + FEDERATION + "/_ws/ws/v2/producer/persistent/" + TENANT_NAME +\
                    "/" + stream_type + "." + FABRIC + "/" + stream_type + "s." + STREAM_NAME

    ws = create_connection(producerurl)
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

    consumerurl = "wss://" + FEDERATION + "/_ws/ws/v2/consumer/persistent/" + TENANT_NAME +\
                    "/" + stream_type + "." + FABRIC + "/" + stream_type + "s." + STREAM_NAME +\
                    "/" + CONSUMER_NAME
    ws = create_connection(consumerurl)
    while True:
        msg = json.loads(ws.recv())
        if msg:
            print("received: {}".format(base64.b64decode(msg['payload'])))
	# Acknowledge successful processing
            ws.send(json.dumps({'messageId': msg['messageId']}))
            break
    ws.close()

    # Delete subscription (unsubscribe)
    url = FED_URL + "/_api/streams/unsubscribe/" + CONSUMER_NAME
    resp = session.post(url, data = json.dumps(payload))
    print("Subsrcription deleted: ", resp.text)

  </TabItem>
  <TabItem value="js" label="Javascript">

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

    const EMAIL = "nemo@nautilus.com";
    const PASSWORD = "xxxxxx";
    const FEDERATION_NAME = "https://api-gdn.paas.macrometa.io";
    const FEDERATION_URL = `https://${FEDERATION_NAME}`;

    const STREAM_NAME = "api_tutorial_streams";
    const CONSUMER_NAME = "api_tutorial_streams_consumer";
    const IS_GLOBAL = true;

    const run = async function () {
      try {
        const connection = new APIRequest(FEDERATION_URL);

        /* -------------------- Log in (nemo@nautilus.com/xxxxxxx) -------------------- */

        const { tenant } = await connection.login(EMAIL, PASSWORD);

        console.log("Logged in successfully using", tenant);
        /* ------------------------------ Create stream ----------------------------- */

        const stream = await connection.req(
          `/_fabric/_system/streams/${STREAM_NAME}?global=${IS_GLOBAL}`,
          {
            body: { name: STREAM_NAME },
            method: "POST",
          }
        );

        console.log("STREAM CREATED SUCCESSFULLY", stream);

        /* ----------------- Publish and subscribe message to stream ---------------- */

        const region = IS_GLOBAL ? "c8global" : "c8local";
        const streamName = `${region}s.${STREAM_NAME}`;
        const url = IS_GLOBAL
          ? FEDERATION_NAME;
          : `api-${streamApp.streamApps[0].regions[0]}.prod.macrometa.io`

        const consumerUrl = `wss://${url}/_ws/ws/v2/consumer/persistent/${tenant}/${region}._system/${streamName}/${CONSUMER_NAME}`;

        const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}`;

        var consumer;
        var producer;
        var producer_interval;

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
                "Failed to establish WebSocket:Consumer connection for " +
                  streamName
              );
            };

            consumer.onclose = function () {
              console.log("Closed WebSocket:Consumer connection for " + streamName);
            };

            consumer.onmessage = function (message) {
              var receivedMsg = message.data && JSON.parse(message.data);

              console.log(
                `WebSocket:Consumer message received at ${new Date()}`,
                receivedMsg
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
            producer_interval = setInterval(function () {
              console.log(`WebSocket:Producer message sent at ${new Date()}`);
              producer.send(JSON.stringify({ payload: `test` }));
            }, 10000);
          };

          producer.onclose = function (e) {
            console.log("Closed WebSocket:Producer connection for " + streamName);
            clearInterval(producer_interval);
          };

          producer.onerror = function (e) {
            console.log(
              "Failed to establish WebSocket:Producer connection for " + streamName
            );
          };
        };

        initConsumer().then(() => {
          initProducer();
        });

        await new Promise((resolve) => setTimeout(resolve, 1 * 40 * 1000));

        consumer.close();
        console.log("CONSUMER CLOSING...");
        producer.close();
        console.log("PRODUCER CLOSING...");

        await new Promise((resolve) => setTimeout(resolve, 5000));

        /* ------------------------ Unsubscribe from stream ------------------------ */

        const consumerUnsubscribe = await connection.req(
          `/_fabric/_system/_api/streams/unsubscribe/${CONSUMER_NAME}`,
          {
            method: "POST",
          }
        );

        console.log(
          `${CONSUMER_NAME} UNSUBSCRIBED SUCCESSFULLY`,
          consumerUnsubscribe
        );

        /* ------------------------------ Delete topic ------------------------------ */
      } catch (e) {
        console.error(e);
      }
    };

    run();

  </TabItem>
</Tabs>  

## Query as API (RestQL)

Globally distributed applications need a fast data platform that can transparently replicate data anywhere in the world, enabling users to access applications on the closest copy of their data. Additionally, these applications need both geo-replicated and local streams to handle pub-sub, ETL, and real-time updates. 

Macrometa GDN provides turnkey global distribution and transparent multi-master replication. You can run globally distributed, low-latency workloads with GDN.

### Tutorial

<Tabs groupId="operating-systems">
  <TabItem value="py" label="Python">

    # Using RESTQL
    import requests
    import json

    # Set constants

    FEDERATION = "api-gdn.paas.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    FABRIC = "_system"
    AUTH_TOKEN = "bearer "
    READ_QUERY = "FOR doc IN @@collection RETURN doc"
    QUERY_NAME = "read"
    QUERY_PARAMS = {"@collection": "api_query_tutorial"}
    INSERT_QUERY =  "FOR i IN 1..100 INSERT { result: i } INTO @@collection"
    UPDATE_QUERY =  "FOR doc IN @@collection FILTER doc.result >= 35 UPDATE doc._key WITH { qualified :true } IN @@collection"
    DELETE_QUERY =  "FOR c IN @@collection REMOVE c IN @@collection"


    # Create HTTPS session

    url = "{}/_open/auth".format(FED_URL)
    payload = {
        'email':EMAIL,
        'password':PASSWORD
        }
    headers = {
        'content-type': 'application/json'
        }

    response = requests.post(url, data = json.dumps(payload), headers = headers)

    if response.status_code == 200:
        resp_body = json.loads(response.text)
        AUTH_TOKEN += resp_body["jwt"]
        TENANT = resp_body["tenant"]
    else:
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})

    # Create RESTQL
    url = FED_URL + "/_api/restql"

    # Save read query
    payload = {
      "query": {
        "name": QUERY_NAME,
        "parameter": QUERY_PARAMS,
        "value": READ_QUERY
      }
    }

    resp = session.post(url, data = json.dumps(payload))
    print("\nRead query saved: ", resp.text)

    # Save insert query
    payload = {
      "query": {
        "name": "insert",
        "value": INSERT_QUERY,
        "parameter": QUERY_PARAMS,

      }
    }

    resp = session.post(url, data = json.dumps(payload))
    print("\nInsert query saved: ", resp.text)

    # Save update query
    payload = {
      "query": {
        "name": "update",
        "value": UPDATE_QUERY,
        "parameter": QUERY_PARAMS,

      }
    }

    resp = session.post(url, data = json.dumps(payload))
    print("\nUpdate query saved: ", resp.text)

    payload = {
      "query": {
        "name": "delete",
        "value": DELETE_QUERY,
        "parameter": QUERY_PARAMS,

      }
    }

    resp = session.post(url, data = json.dumps(payload))
    print("\nDelete query saved: ", resp.text)


    # Execute saved query

    url = FED_URL + "/_api/restql/execute/insert"
    payload = {
              "bindVars": QUERY_PARAMS,
            }
    resp = session.post(url, data = json.dumps(payload))
    print("\nInsert query executed: ", resp.text)

    url = FED_URL + "/_api/restql/execute/" + QUERY_NAME
    payload = {
              "bindVars": QUERY_PARAMS,
            }
    resp = session.post(url, data = json.dumps(payload))
    print("\nRead query executed: ", resp.text)

    url = FED_URL + "/_api/restql/execute/update"
    payload = {
              "bindVars": QUERY_PARAMS,
            }
    resp = session.post(url, data = json.dumps(payload))
    print("\nUpdate query executed: ", resp.text)

    url = FED_URL + "/_api/restql/execute/delete"
    payload = {
              "bindVars": QUERY_PARAMS,
            }
    resp = session.post(url, data = json.dumps(payload))
    print("\nDelete query executed: ", resp.text)


    # Update saved query
    url = FED_URL + "/_api/restql/" + QUERY_NAME

    payload = {
      "query": {
        "parameter": QUERY_PARAMS,
        "value": READ_QUERY
      }
    }

    resp = session.put(url, data = json.dumps(payload))
    print("Query updated: ", resp.text)

    # Delete saved queries

    url = FED_URL + "/_api/restql/" + QUERY_NAME
    resp = session.delete(url)
    print("Read query deleted: ", resp.text)

    url = FED_URL + "/_api/restql/insert"
    resp = session.delete(url)
    print("Insert query deleted: ", resp.text)

    url = FED_URL + "/_api/restql/update"
    resp = session.delete(url)
    print("Update query deleted: ", resp.text)

    url = FED_URL + "/_api/restql/delete"
    resp = session.delete(url)
    print("Delete query deleted: ", resp.text)

  </TabItem>
  <TabItem value="js" label="Javascript">

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

    const EMAIL = "nemo@nautilus.com";
    const PASSWORD = "xxxxxx";
    const FEDERATION_URL = "https://api-gdn.paas.macrometa.io";

    const QUERY_NAME = "api_query_tutorial";
    const QUERY_PARAMS = { "@collection": "api_query_tutorial" };

    const run = async function () {
      try {
        const connection = new APIRequest(FEDERATION_URL);

        /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

        await connection.login(EMAIL, PASSWORD);

        console.log("Logged in successfully using", EMAIL);

        /* ------------------------ Save RestQL query (with params) ----------------------- */

        const QUERY = "FOR doc IN @@collection RETURN doc";

        const query = await connection.req("/_fabric/_system/_api/restql", {
          body: {
            query: {
              name: QUERY_NAME,
              value: QUERY,
              parameter: QUERY_PARAMS,
            },
          },
          method: "POST",
        });

        console.log("QUERY CREATED SAVED SUCCESSFULLY", query);

        /* ----------------------- Update RestQL query (with params) ---------------------- */

        const updatedQuery = await connection.req(
          `/_fabric/_system/_api/restql/${QUERY_NAME}`,
          {
            body: {
              query: {
                value: QUERY,
                parameter: QUERY_PARAMS,
              },
            },
            method: "PUT",
          }
        );

        console.log("QUERY UPDATED  SUCCESSFULLY", updatedQuery);

        /* ----------------------- Run RestQL query (with params) ---------------------- */

        const execute = () =>
          connection.req(`/_fabric/_system/_api/restql/execute/${QUERY_NAME}`, {
            body: {
              bindVars: QUERY_PARAMS,
            },
            method: "POST",
          });

        /* -------------------  Insert query using cursor (with params) ------------------- */

        const INSERT_QUERY =
          "FOR i IN 1..100 INSERT { result: i } INTO @@collection";

        await connection.req(`/_fabric/_system/_api/cursor`, {
          body: {
            id: "tutorialQuery",
            query: INSERT_QUERY,
            bindVars: QUERY_PARAMS,
          },
          method: "POST",
        });

        console.log("DOCUMENTS INSERTED SUCCESSFULLY");

        const insertResults = await execute();

        console.log("DATA AFTER INSERT", insertResults);

        /* ------------------- Update query using cursor (with params) ------------------- */
        const CURSOR_QUERY =
          "FOR doc IN @@collection FILTER doc.result >= 35 UPDATE doc._key WITH { qualified :true } IN @@collection";

        await connection.req(`/_fabric/_system/_api/cursor`, {
          body: {
            id: "tutorialQuery",
            query: CURSOR_QUERY,
            bindVars: QUERY_PARAMS,
          },
          method: "POST",
        });
        console.log("DOCUMENTS UPDATED SUCCESSFULLY");

        const updateResults = await execute();

        console.log("DATA AFTER UPDATE", updateResults);

        /* ------------------- Remove query using cursor (with params) ------------------- */

        const REMOVE_QUERY = "FOR doc IN @@collection REMOVE doc IN @@collection";

        await connection.req(`/_fabric/_system/_api/cursor`, {
          body: {
            id: "tutorialQuery",
            query: REMOVE_QUERY,
            bindVars: QUERY_PARAMS,
          },
          method: "POST",
        });

        console.log("DOCUMENTS DELETED SUCCESSFULLY");

        const removeResults = await execute();

        console.log("DATA AFTER DELETE", removeResults);

        /* ----------------------------- Delete RestQL query by name ----------------------------- */

        const deleteQuery = await connection.req(
          `/_fabric/_system/_api/restql/${QUERY_NAME}`,
          {
            method: "DELETE",
          }
        );

        console.log("QUERY DELETED  SUCCESSFULLY", deleteQuery);
      } catch (e) {
        console.error(e);
      }
    };

    run();

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

    import requests
    import json

    # Constants

    FEDERATION = "api-gdn.paas.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    FABRIC = "_system"
    AUTH_TOKEN = "bearer "
    TENANT_NAME = "xxxxxx"
    COLLECTION_NAME_1 = "teachers"
    COLLECTION_NAME_2 = "lectures"
    EDGE_COLL_NAME = "teach"
    GRAPH_NAME = "lectureteacher"


    # Create HTTPS session

    url = "{}/_open/auth".format(FED_URL)
    payload = {
        'email':EMAIL,
        'password':PASSWORD
        }
    headers = {
        'content-type': 'application/json'
        }

    response = requests.post(url, data = json.dumps(payload), headers = headers)

    if response.status_code == 200:
        resp_body = json.loads(response.text)
        AUTH_TOKEN += resp_body["jwt"]
        TENANT = resp_body["tenant"]
    else:
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})

    # Create document collections and insert data


    url = FED_URL + "/_api/collection"
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

    url = FED_URL + "/_api/document/" + COLLECTION_NAME_1
    resp = session.post(url,data=json.dumps(payload))
    result = json.loads(resp.text)
    print("\nDocuments inserted: ",result)

    payload = [
        {'_id': 'lectures/CSC101', 'difficulty': 'easy', '_key':'CSC101', 'firstname':'Jean'},
        {'_id': 'lectures/CSC102', 'difficulty': 'hard', '_key':'CSC102','firstname':'Jean'},
        {'_id': 'lectures/CSC103', 'difficulty': 'hard', '_key':'CSC103','firstname':'Jean'},
        {'_id': 'lectures/CSC104', 'difficulty': 'moderate', '_key':'CSC104','firstname':'Jean'}

    ]

    url = FED_URL + "/_api/document/" + COLLECTION_NAME_2
    resp = session.post(url,data=json.dumps(payload))
    result = json.loads(resp.text)
    print("\nDocuments inserted: ",result)

    # Create edge collection

    payload = { 'name': EDGE_COLL_NAME, "type":3 }

    url = FED_URL + "/_api/collection"
    resp = session.post(url,data=json.dumps(payload))
    result = json.loads(resp.text)
    print("\nEdge collection created: ",result)
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

    url = FED_URL + "/_api/document/" + EDGE_COLL_NAME
    resp = session.post(url,data=json.dumps(payload))
    result = json.loads(resp.text)
    print("\nDocuments inserted: ",result)

    # Create a graph

    payload ={
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

    url = FED_URL + "/_api/graph"
    resp = session.post(url,data=json.dumps(payload))
    result = json.loads(resp.text)
    print("\nGraph created: ",result)

    # Graph traversal
    # To use outbound traversal, set direction to `out`. To use inbound traversal, set direction to `in`.

    params = {
        "vertex": "Jean",
        "direction": "out"
    }

    url = FED_URL + "/_api/edges/" + EDGE_COLL_NAME

    resp = session.get(url,params=params)
    result = json.loads(resp.text)
    print("\nGraph traversal: ",result)

    # Delete graph and collections
	# To delete the graph and save the collections, set dropCollection to `false`.

    params = {"dropCollection": True}

    url = FED_URL + "/_api/graph/" + GRAPH_NAME

    resp = session.delete(url,params=params)
    result = json.loads(resp.text)
    print("Graph and collections deleted: ", result)

  </TabItem>
  <TabItem value="js" label="Javascript">

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

    import requests
    import json
    from websocket import create_connection
    import base64
    import six
    import time

    # Set constants

    FEDERATION = "api-gdn-us-west.prod.macrometa.io"
    FED_URL = "https://{}".format(FEDERATION)
    EMAIL = "nemo@nautilus.com"
    PASSWORD = "xxxxxx"
    FABRIC = "_system"
    AUTH_TOKEN = "bearer "
    TENANT_NAME = "xxxxxx"
    STREAM_NAME = "tutorialAppInputStream"
    STREAM_APP_NAME = "stream_app_tutorial"
    STREAM_APP ='''
      @App:name('stream_app_tutorial')

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
      define table tutorialAppOutputTable (id string, temperature double);

      @info(name='Query')
      select concatFn(roomNo,'-',deviceID) as id, temperature
      from tutorialAppInputStream
      insert into tutorialAppOutputTable;
    '''
    INPUT_DATA = [
          {
            "deviceID": "AD11",
            "roomNo": 200,
            "temperature": 18,
          },
          { "deviceID": "AD11",
            "roomNo": 201,
            "temperature": 47 },
        ]
    SELECT_QUERY = "FOR doc IN tutorialAppOutputTable return doc"

    # Create HTTPS session

    url = "{}/_open/auth".format(FED_URL)
    payload = {
        'email':EMAIL,
        'password':PASSWORD
        }
    headers = {
        'content-type': 'application/json'
        }

    response = requests.post(url, data = json.dumps(payload), headers = headers)

    if response.status_code == 200:
        resp_body = json.loads(response.text)
        AUTH_TOKEN += resp_body["jwt"]
        TENANT = resp_body["tenant"]
    else:
        raise Exception("Error while getting auth token. Code:{}, Reason:{}".format(response.status_code,response.reason))


    session = requests.session()
    session.headers.update({"content-type": 'application/json'})
    session.headers.update({"authorization": AUTH_TOKEN})

    # Create stream application

    url = FED_URL + "/_api/streamapps"
    payload = {
      "definition": STREAM_APP,
      "regions": ["gdn-us-west1"]
    }

    resp = session.post(url, data=json.dumps(payload))
    result = json.loads(resp.text)
    print("\nStream application created: ", result)

    # Activate stream application

    url = FED_URL + "/_api/streamapps/" + STREAM_APP_NAME + "/active?active=true"
    resp = session.patch(url)
    result = json.loads(resp.text)
    print("\nStream application activated: ", result)

    # Wait for all inputs and outputs to initialize
    time.sleep(20)

    # Publish messages to the input stream
    stream_type = "c8local"
    producerurl = "wss://" + FEDERATION + "/_ws/ws/v2/producer/persistent/" + TENANT_NAME +\
                    "/" + stream_type + "." + FABRIC + "/" + stream_type + "s." + STREAM_NAME

    ws = create_connection(producerurl)
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

    url = FED_URL + "/_api/cursor"
    payload= {
      "id": "tutorialStreamAppQuery",
      "query": SELECT_QUERY,
      "bindVars": {},
    }
    resp = session.post(url, data=json.dumps(payload))
    result = json.loads(resp.text)
    print("\nStream application results: ", result)

    # Delete stream application

    url = FED_URL + "/_api/streamapps/" + STREAM_APP_NAME
    resp = session.delete(url)
    result = json.loads(resp.text)
    print("\nStream application deleted: ", result)

  </TabItem>
  <TabItem value="js" label="Javascript">

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
    const EMAIL = "nemo@nautilus.com";
    const PASSWORD = "xxxxxx";
    const FEDERATION_NAME = "api-gdn.prod.macrometa.io";
    const FEDERATION_URL = `https://${FEDERATION_NAME}`;

    const IS_GLOBAL = true;
    const STREAM_NAME = `tutorialAppInputStream`;
    const STREAM_APP_NAME = `strean_app_tutorial`;
    const STREAM_APP = `@App:name('strean_app_tutorial')
      @App:description('This application demonstrates how to use user defined function in the stream app')

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
      define table tutorialAppOutputTable (id string, temperature double);

      @info(name='Query')
      select concatFn(roomNo,'-',deviceID) as id, temperature
      from tutorialAppInputStream
      insert into tutorialAppOutputTable;`;

    const run = async function () {
      try {
        const connection = new APIRequest(FEDERATION_URL);

        /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

        const { tenant } = await connection.login(EMAIL, PASSWORD);

        console.log("Logged in successfully using", tenant);

        /* ---------------------------- Create StreamApp ---------------------------- */
        const streamApp = await connection.req("/_fabric/_system/_api/streamapps", {
          body: {
            definition: STREAM_APP,
            regions: [],
          },
          method: "POST",
        });

        console.log("STREAM APP CREATED SUCCESSFULLY", streamApp);

        /* --------------------------- Activate StreamApp --------------------------- */

        await connection.req(
          `/_fabric/_system/_api/streamapps/${STREAM_APP_NAME}/active?active=true`,
          {
            method: "PATCH",
          }
        );

        console.log("ACTIVATING STREAM APP...", STREAM_APP_NAME);

        await new Promise((resolve) => setTimeout(resolve, 10000));

        console.log("STREAM APP ACTIVATED SUCCESSFULLY");

        /* ------------------ Publish messages to sample StreamApp ------------------ */
        const region = IS_GLOBAL ? "c8global" : "c8local";
        const streamName = `${region}s.${STREAM_NAME}`;
        const url = IS_GLOBAL
          ? FEDERATION_NAME;
          : `api-${streamApp.streamApps[0].regions[0]}.prod.macrometa.io`

        const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}`;

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

        const INPUT_DATA = [
          {
            deviceID: "AD11",
            roomNo: 200,
            temperature: 18,
          },
          { deviceID: "AD11", roomNo: 201, temperature: 47 },
        ];

        producer.send(
          JSON.stringify({
            payload: btoa(JSON.stringify(INPUT_DATA[0])),
          })
        );

        await new Promise((resolve) => setTimeout(resolve, 10000));

        producer.send(
          JSON.stringify({
            payload: btoa(JSON.stringify(INPUT_DATA[1])),
          })
        );

        await new Promise((resolve) => setTimeout(resolve, 10000));

        producer.close();

        /* ----------------------------- Verify results ----------------------------- */

        const SELECT_QUERY = "FOR doc IN tutorialAppOutputTable return doc";

        const result = await connection.req(`/_fabric/_system/_api/cursor`, {
          body: {
            id: "tutorialStreamAppQuery",
            query: SELECT_QUERY,
            bindVars: {},
          },
          method: "POST",
        });

        console.log("INPUT SENT --->", INPUT_DATA);
        console.log("OUTPUT DATA --->", result.results);

        /* ---------------------------- Delete StreamApp ---------------------------- */
        const deletion = await connection.req(
          `/_fabric/_system/_api/streamapps/${STREAM_APP_NAME}`,
          {
            method: "DELETE",
          }
        );

        console.log("STREAM APP DELETED SUCCESSFULLY", deletion);
      } catch (e) {
        console.error(e);
      }
    };

    run();
  </TabItem>
</Tabs>  
