---
sidebar_position: 70
title: Subscribe to Streams
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to subscribe to a stream in Macrometa.

<Tabs groupId="operating-systems">
<TabItem value="console" label="Web Console">

View existing streams.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Streams**.

   Macrometa displays a list of streams and their attributes.

3. To see messages sent to the stream, click a stream name.

   Macrometa opens a stream viewing panel. As new messages are sent to the stream, they are displayed in the panel.

When you view a stream in the console, you will not see a backlog of messages. This screen does not persist, which means that when it is open, you will see new messages as they are sent. If you close the screen, any messages displayed will not be visible the next time that you open it.

</TabItem>
<TabItem value="py" label="Python SDK">

You must [Install the Python SDK](../../sdks/install-sdks.md) before you can run this code.

```py
import base64
import json
from c8 import C8Client

# Connect to GDN.
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "xxxxxx" # Change this to your API key
is_local = False # For a global stream pass False and True for local stream
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

You must [Install the JavaScript SDK](../../sdks/install-sdks.md) before you can run this code.

```js
const jsc8 = require("jsc8");
const client = new jsc8({ url: "https://play.paas.macrometa.io", apiKey: "xxxxx", fabricName: "_system" });

const stream = "streamQuickstart";

(async function () {
  // Here the last boolean value tells if the stream is local or global. false means that it is global.
  const consumer = await client.createStreamReader(stream, "my-subscription", false);
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

```py
import base64
import json
import requests
from websocket import create_connection

# Constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
FABRIC = "_system"
STREAM_NAME = "streamQuickstart"
API_KEY = "XXXXX" # Use your API key here
AUTH_TOKEN = f"apikey {API_KEY}" # Append the key word for the API key
TENANT_NAME = "XXXXX" # Add your tenant name here
CONSUMER_NAME = "testconsumer"
IS_GLOBAL = True # For a global stream pass True and False for local stream

stream_type = ""
if IS_GLOBAL:
    stream_type = "c8global"
else:
    stream_type = "c8local"

# Create a HTTPS session
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

```js
const WebSocket = require('ws');
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

const apiKey = "xxxxx"; // Use your apikey here
const federationName = "api-play.paas.macrometa.io";
const federationUrl = `https://${federationName}`;
const fabric = "_system"
const stream = "streamQuickstart";
const isGlobal = true;
const tenant = "xxxxx" // Use your tenant name here
const consumerName = "testConsumer";

const run = async function () {
  const connection = new APIRequest(federationUrl, apiKey);
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
  const consumerUrl = `wss://${url}/_ws/ws/v2/consumer/persistent/${tenant}/${region}.${fabric}/${streamName}/${consumerName}?otp=${otpConsumer.otp}`;
  let consumer;

  // Subscribe to stream
  const initConsumer = async function () {
    consumer = new WebSocket(consumerUrl);
    consumer.onopen = function () {
      console.log("WebSocket:Consumer is open now for " + streamName);
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
      const receivedMsg = message.data;
      console.log(
        `WebSocket:Consumer message received at ${new Date()}`,
        receivedMsg
      );
      const { payload, messageId } = JSON.parse(receivedMsg);
      console.log(Buffer.from(payload, "base64").toString("ascii"));
      // Send message acknowledgement
      consumer.send(JSON.stringify({ messageId }));
    };
  };

  await initConsumer();
  await new Promise((resolve) => setTimeout(resolve, 1 * 40 * 1000));
  console.log("CONSUMER CLOSING...");
  consumer.close();
}

run();
```

</TabItem>
</Tabs>
