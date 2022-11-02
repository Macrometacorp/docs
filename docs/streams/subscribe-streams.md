---
sidebar_position: 70
title: Subscribe to Streams
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to publish messages to a stream in Macrometa.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

You must [Install the Python SDK](../sdks/install-sdks.md) before you can run this code.

```py
from c8 import C8Client
import json
import base64

# Connect to GDN.
URL = "gdn.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "xxxxxx" # Change this to your API key
is_local = False # For a global stream pass True and False for local stream
demo_stream = "streamQuickstart"

client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

# Create the subscriber and receive data
subscriber = client.subscribe(stream=demo_stream, local=is_local,
    subscription_name="test-subscription-1")
for i in range(10):
    print("In ",i)
    m1 = json.loads(subscriber.recv())  # Listen on stream for any receiving messages
    msg1 = base64.b64decode(m1["payload"]).decode('utf-8')
    print(F"Received message '{msg1}' id='{m1['messageId']}'") # Print the received message
    subscriber.send(json.dumps({'messageId': m1['messageId']})) # Acknowledge the received message
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

You must [Install the JavaScript SDK](../sdks/install-sdks.md) before you can run this code.

```js
// Connect to GDN.
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXXX", fabricName: "_system"});

const stream = "streamQuickstart";

(async function() {
  //Here the last boolean value tells if the stream is local or global. false means that it is global.
  const consumer = await client.createStreamReader(stream, "my-subscription", true);
  console.log(`Listening to '${stream}' stream.`)
  consumer.on("message", (msg) => {
    const { payload, messageId } = JSON.parse(msg);
    // Received message payload
    console.log(Buffer.from(payload, "base64").toString("ascii"));
    // Send message acknowledgement
    consumer.send(JSON.stringify({ messageId }));
  });

})();
```

</TabItem>
<TabItem value="api-py" label="REST API - Python">

Use our interactive API reference with code generation in 18 programming languages to [publish a message](https://macrometa.com/docs/api#/operations/PublishStreamMessage).

```py
import requests

# Constants
URL = "api-gdn.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
FABRIC = "_system"
STREAM_NAME = "streamQuickstart"
API_KEY = "XXXXX" # Use your API key here
AUTH_TOKEN = f"apikey {API_KEY}" # Append the key word for the API key

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Subscribe to stream
consumerurl = f"wss://{URL}/_ws/ws/v2/consumer/persistent/{TENANT_NAME}/{stream_type}.{FABRIC}/{stream_type}s.{STREAM_NAME}/{CONSUMER_NAME}"

def create_consumer(): 
    ws = create_connection(consumerurl, header=[f"Authorization: {AUTH_TOKEN}"])
    while True:
        msg = json.loads(ws.recv())
        if msg:
            print(f"Message received: {base64.b64decode(msg['payload']).decode('utf-8')}")
            # Acknowledge successful processing
            ws.send(json.dumps({'messageId': msg['messageId']}))
            break
    ws.close()

create_consumer()
```

</TabItem>
<TabItem value="api-js" label="REST API - JavaScript">

Use our interactive API reference with code generation in 18 programming languages to [publish a message](https://macrometa.com/docs/api#/operations/PublishStreamMessage).

```js
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor (url, apiKey) {
    this._url = url;
    this._headers.authorization = `apikey ${apiKey}`; // Append the key word for the API key
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

const apiKey = "XXXXX"; // Use your apikey here
const federationName = "api-gdn.paas.macrometa.io";
const federationUrl = `https://${federationName}`;

const stream = "streamQuickstart";
const isGlobal = true;

const run = async function () {
  const connection = new APIRequest(federationUrl, apiKey);

  /* ----------------- Publish and subscribe message to stream ---------------- */

    const region = isGlobal ? "c8global" : "c8local";
    const streamName = `${region}s.${stream}`;

    // Fetching local URL in case the stream is local
    const localDcDetails = await connection.req(`/datacenter/local`, {
      method: "GET"
    });

    const dcUrl = localDcDetails.tags.url;

    url = isGlobal
      ? url
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

    /* -------------------------- Initialize consumer -------------------------- */

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

/* -------------------------- Initialize producer -------------------------- */

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
    
run();
```

</TabItem>
</Tabs>
