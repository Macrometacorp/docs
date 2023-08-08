---
sidebar_position: 120
title: REST APIs Streams Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Prerequisites from '../../_partials/_prerequisites-api-key.md';
import Steps from '../../_partials/_api-example-steps.md';

This page shows you how to perform a basic pub-sub streams workflow using the Macrometa API. For more information about using Macrometa APIs, refer to [APIs](../../api-docs/index.md).

## Prerequisites

<Prerequisites />

## REST API Streams Example

<Steps />

<Tabs groupId="operating-systems">
<TabItem value="js" label="JavaScript">

```js
const WebSocket = require('ws');
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor (httpUrl, apiKey) {
    this._url = httpUrl;
    this._headers.authorization = `apikey ${apiKey}`; // apikey keyword is needed here
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

const apiKey = "XXXXX" // Use your API key here
const globalUrl = "api-play.paas.macrometa.io";
const httpUrl = `https://${globalUrl}`;
const tenant = "XXXXX" // Use your tenant name here

const stream = "api_tutorial_streams";
const consumerName = "api_tutorial_streams_consumer";
const isGlobal = true;

const run = async function () {
  try {
    const connection = new APIRequest(httpUrl, apiKey);

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
      ? globalUrl
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
  } catch (e) {
    console.error(e);
  }
};

run();
```

</TabItem>
<TabItem value="py" label="Python">

```py
import base64
import json
import requests
import six
import threading
import time
from websocket import create_connection

# Constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
API_KEY = "XXXXX" # Use your API key here
AUTH_TOKEN = f"apikey {API_KEY}"
FABRIC = "_system"
STREAM_NAME = "teststream"
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

# Create a stream
url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/streams/{STREAM_NAME}?global={IS_GLOBAL}"
resp = session.post(url)
print("\nStream Created: ", resp.text)

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

# Threading is added here to open both producer and consumer connections simultaneously (not needed when using publish api)
t1 = threading.Thread(target=create_producer)
t2 = threading.Thread(target=create_consumer)
t1.start(), t2.start()
t1.join(), t2.join()

# Delete subscription
url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/streams/{stream_type}s.{STREAM_NAME}/subscriptions/{CONSUMER_NAME}?global=true"
resp = session.delete(url)
print("Subscription deleted: ", resp.text)
```

</TabItem>
</Tabs>  
