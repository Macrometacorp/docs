---
sidebar_position: 1
title: Using Rest APIs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Today’s applications are required to be highly responsive and always online. They need to be deployed in datacenters closer to their users and can access data instantly across the globe. 

Macrometa global data network (GDN) is a fully managed realtime materialzed view engine that provides access to data instantly to Apps & APIs in a simple & single interface. 

:::note
If you are new to Macrometa GDN, we strongly recommend reading **[What is Macrometa](../../what-is-macrometa.md)**.
:::
## Pre-Requiste

A tenant account (and credentials) with Macrometa GDN.

## API Browser

Your best friend when working with REST APIs is the REST API browser available in [GDN](https://gdn.paas.macrometa.io) GUI. From there, you can execute various rest apis and see exactly what the inputs and outputs are.

![GDN API Browser](/img/gdn-api-browser.png)

## Pub-Sub with Streams

**GDN streams** is a high-performance solution for server-to-server messaging.

It provides,

- Seamless geo-replication of messages across regions,
- Very low publish and end-to-end latency,
- Seamless scalability to over a million topics.
- Multiple subscription modes (`exclusive`, `shared`, and `failover`) for streams.
- Guaranteed message delivery with persistent message storage.

`Streams` are built on the _publish-subscribe_ pattern, aka pub-sub. In this pattern, producers publish messages to streams. Consumers can then subscribe to those streams, process incoming messages, and send an acknowledgement when processing is complete.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const WebSocket = require('ws');
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

const stream = "api_tutorial_streams";
const consumerName = "api_tutorial_streams_consumer";
const isGlobal = true;

const run = async function () {
  try {
    const connection = new APIRequest(federationUrl);

    /* -------------------- Log in (nemo@nautilus.com/xxxxxx) -------------------- */

    const { tenant } = await connection.login(email, password);

    console.log("Login Successfully using", tenant);
    /* ------------------------------ Create stream ----------------------------- */

    try {
      await connection.req(
        `/_fabric/_system/streams/${stream}?global=${isGlobal}`,
        {
          body: { name: stream },
          method: "POST"
        }
      );
      console.log("Stream created successfully");
    } catch (e) {
      if (e.status === 409) {
        console.log("Stream already exists, skipping creation of stream");
      } else {
        console.log("Error while creating stream");
        throw e;
      }
    }

    /* ----------------- Publish and subscribe message to stream ---------------- */

    const region = isGlobal ? "c8global" : "c8local";
    const streamName = `${region}s.${stream}`;

    // Fetching local URL in case the stream is local
    const localDcDetails = await connection.req(`/datacenter/local`, {
      method: "GET"
    });

    const dcUrl = localDcDetails.tags.url;

    const url = isGlobal
      ? federationName
      : `api-${dcUrl}`;

    const otpConsumer = await connection.req(`/apid/otp`, {
      method: "POST"
    });
    const otpProducer = await connection.req(`/apid/otp`, {
      method: "POST"
    });

    const consumerUrl = `wss://${url}/_ws/ws/v2/consumer/persistent/${tenant}/${region}._system/${streamName}/${consumerName}?otp=${otpConsumer.otp}`;

    const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}?otp=${otpProducer.otp}`;

    let consumer;
    let producer;
    let producerInterval;

    /* -------------------------- Initalizing consumer -------------------------- */

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
          const receivedMsg = message.data && JSON.parse(message.data);

          console.log(
            `WebSocket:Consumer message received at ${new Date()}`,
            receivedMsg
          );

          const ackMsg = { messageId: receivedMsg.messageId };
          consumer.send(JSON.stringify(ackMsg));
        };
      });
    };

    /* -------------------------- Initalizing Producer -------------------------- */

    const initProducer = () => {
      producer = new WebSocket(producerUrl);

      producer.onopen = function () {
        console.log("WebSocket:Producer is open now for " + streamName);
        producerInterval = setInterval(function () {
          console.log(`WebSocket:Producer message sent at ${new Date()}`);
          producer.send(JSON.stringify({ payload: `test` }));
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
      `/_fabric/_system/_api/streams/subscription/${consumerName}`,
      {
        method: "DELETE"
      }
    );
    console.log(
      `${consumerName} unsubscribed successfully`,
      consumerUnsubscribe
    );
    /* ------------------------------ Delete topic ------------------------------ */
  } catch (e) {
    console.error(e);
  }
};

run();
```

</TabItem>

<TabItem value="py" label="Python">

```py
import requests
import json
from websocket import create_connection
import base64
import six

# Constants

FEDERATION = "api-gdn.paas.macrometa.io"
FED_URL = f"https://{FEDERATION}"
EMAIL = "nemo@nautilus.com"
PASSWORD = "xxxxxx"
FABRIC = "_system"
STREAM_NAME = "teststream"
AUTH_TOKEN = "bearer "
TENANT_NAME = "xxxxxx"
CONSUMER_NAME = "testconsumer"

# Create a HTTPS Session

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
    raise Exception(f"Error while getting auth token. Code:{response.status_code}, Reason:{response.reason}")

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})


# Create a stream
# Note:- For a global stream pass global=true and global=false for local stream
url = f"{FED_URL}/_fabric/{FABRIC}/_api/streams/{STREAM_NAME}?global=true"
resp = session.post(url)
print("\nStream Created: ", resp.text)

# Publish Messages
# Send message in body
STREAM_TYPE = "c8global"

url = f"{FED_URL}/_fabric/{FABRIC}/_api/streams/{STREAM_TYPE}s.{STREAM_NAME}/publish?global=true"
resp = session.post(url, data="Hello")
print("\nMessage Posted: ", resp.text)

# or

producerurl = f"wss://{FEDERATION}/_ws/ws/v2/producer/persistent/{TENANT_NAME}/{STREAM_TYPE}.{FABRIC}/{STREAM_TYPE}s.{STREAM_NAME}"


ws = create_connection(producerurl, header=[f"Authorization: {AUTH_TOKEN}"])
payload = {
    "payload": base64.b64encode(
        six.b("Hello World")
    ).decode("utf-8")
}
ws.send(json.dumps(payload))
response = json.loads(ws.recv())
if response['result'] == 'ok':
    print("Message published successfully")
else:
    print(f"Failed to publish message: {response}")
ws.close()

# # # Subscribe

consumerurl = f"wss://{FEDERATION}/_ws/ws/v2/producer/persistent/{TENANT_NAME}/{STREAM_TYPE}.{FABRIC}/{STREAM_TYPE}s.{STREAM_NAME}/{CONSUMER_NAME}"

ws = create_connection(consumerurl, header=[f"Authorization: {AUTH_TOKEN}"])
while True:
    msg = json.loads(ws.recv())
    if msg:
        print(f"received: {base64.b64decode(msg['payload'])}")
        # Acknowledge successful processing
        ws.send(json.dumps({'messageId': msg['messageId']}))
        break
ws.close()

# Delete Subscription/ Unsubscribe
url = f"{FED_URL}/_fabric/{FABRIC}/_api/streams/{STREAM_TYPE}s.{STREAM_NAME}/subscriptions/{CONSUMER_NAME}?global=true"
resp = session.delete(url)
print("Subsrcription Deleted: ", resp.text)
```

</TabItem>
</Tabs>  
