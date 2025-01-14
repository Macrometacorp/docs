---
sidebar_position: 60
title: Publish Messages to Streams
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page explains how to publish messages to a stream in Macrometa.

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

You must [Install the Python SDK](../../developer-hub/sdks/install-sdks.md) before you can run this code.

```py
from operator import concat
from c8 import C8Client

# Connect to GDN.
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "xxxxxx" # Change this to your API key
is_local = False # For a global stream pass True and False for local stream
demo_stream = "streamQuickstart"

client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

# Create the producer and publish messages.
def sendData():
    """ This function sends data through a stream """
    producer = client.create_stream_producer(demo_stream, local=is_local)
    while True:
        user_input = input("Enter your message to publish: ")
        if user_input == '0':
            break
        producer.send(user_input)

sendData()
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

You must [Install the JavaScript SDK](../../developer-hub/sdks/install-sdks.md) before you can run this code.

```js
// Connect to GDN.
const jsc8 = require("jsc8");
const client = new jsc8({url: "https://play.paas.macrometa.io", apiKey: "XXXXX", fabricName: "_system"});
console.log("Authentication done!!...");

const stream = "streamQuickstart";

async function sendData () {
  console.log("\n ------- Publish Messages  ------");
  const producer = await client.createStreamProducer(stream);

  producer.on("open", () => {
    for (let i = 0; i < 10; i++) {
      const msg1 = `Persistent hello from (${JSON.stringify(i)})`;
      const data = {
        payload: Buffer.from(msg1).toString("base64")
      };

      console.log(`Stream: ${msg1}`);
      producer.send(JSON.stringify(data));
    }
  });
  producer.onclose = function (e) {
    console.log("Closed WebSocket:Producer connection for " + streamName);
  };
}

sendData()
```

</TabItem>
<TabItem value="api-py" label="REST API - Python">

Use our interactive API reference with code generation in 18 programming languages to [publish a message](https://www.macrometa.com/docs/api#/operations/PublishStreamMessage).

```py
import requests

# Constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
FABRIC = "_system"
STREAM_NAME = "streamQuickstart"
API_KEY = "XXXXX" # Use your API key here
AUTH_TOKEN = f"apikey {API_KEY}" # Append the key word for the API key

session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Publish messages
# Send message in body
producerurl = f"wss://{URL}/_ws/ws/v2/producer/persistent/{TENANT_NAME}/{stream_type}.{FABRIC}/{stream_type}s.{STREAM_NAME}"

# Enter your message here
msg = "Hello World"
def create_producer():
    ws = create_connection(producerurl, header=[f"Authorization: {AUTH_TOKEN}"])
    payload = {
        "payload": base64.b64encode(
            six.b(msg)
        ).decode("utf-8")
    }
    ws.send(json.dumps(payload))
    print(f"Message sent: {msg}")
    time.sleep(3)
    response = json.loads(ws.recv())
    if response['result'] == 'ok':
        print("Received acknowledgement that message was delivered successfully")
    else:
        print(f"Failed to publish message: {response}")
    ws.close()

# Or
# Use publish message api to publish message
#url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/streams/{stream_type}s.{STREAM_NAME}/publish?global={IS_GLOBAL}"
#resp = session.post(url, data="Hello")
#print("\nMessage Posted: ", resp.text)
```

</TabItem>
<TabItem value="api-js" label="REST API - JavaScript">

Use our interactive API reference with code generation in 18 programming languages to [publish a message](https://www.macrometa.com/docs/api#/operations/PublishStreamMessage).

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
const federationName = "api-play.paas.macrometa.io";
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

run();
```

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl streams publish](../../developer-hub/cli/streams-cli#gdnsl-streams-publish) CLI command to create a document collection.

</TabItem>
</Tabs>
