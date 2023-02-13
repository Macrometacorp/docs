---
sidebar_position: 80
title: Unsubscribe from Streams
---

This page explains how you can unsubscribe from streams in Macrometa.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python SDK">

You must [Install the Python SDK](../../sdks/install-sdks.md) before you can run this code.

```py
from c8 import C8Client

# Connect to GDN.
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "XXXXX" # Change this to your API key

# Enter the consumer/subscription name which is subscribed to more than 2 streams
CONSUMER_NAME = "testConsumer"
IS_LOCAL = False # True for local stream and false for global stream

# True if you want to delete subscription from all local streams or False if you want to delete subscription on all global streams
IS_LOCAL_STREAMS = False 

stream_name = "streamQuickstart"

client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)

if IS_LOCAL:
    stream_name = f"c8locals.{stream_name}"
else:
    stream_name = f"c8globals.{stream_name}"

type = ""
if IS_LOCAL_STREAMS:
    type = "local"
else:
    type = "global" 

# Delete subscription (remove the given subscription from a particular stream)
resp = client.delete_stream_subscription(stream=stream_name, subscription=CONSUMER_NAME, local=IS_LOCAL)
print("Subscription deleted from stream ", stream_name,   ": ", resp)

# Unsubscribe subscription (remove the given subscription from all streams (either global or local as specified by IS_LOCAL_STREAMS))
resp = client.unsubscribe(subscription=CONSUMER_NAME, local=IS_LOCAL_STREAMS)
print("Subscription unsubscribed (removed from all ", type, " streams): ", resp)
```

</TabItem>
<TabItem value="js" label="JavaScript SDK">

You must [Install the JavaScript SDK](../../sdks/install-sdks.md) before you can run this code.

```js
const jsc8 = require("jsc8");
const client = new jsc8({ url: "https://play.paas.macrometa.io", apiKey: "xxxxx", fabricName: "_system" });

const streamName = "streamQuickstart";

// Enter the consumer/subscription name which is subscribed to more than 2 streams
const consumerName = "testConsumer"
const isLocal = false // True for local stream and false for global stream

// True if you want to delete subscription from all local streams or False if you want to delete subscription on all global streams
const isLocalStreams = true

let type = ""
if (isLocalStreams) {
  type = "local"
} else {
  type = "global"
}

(async function () {
  // Delete subscription (remove the given subscription from a particular stream)
  const consumerDeleteSubsctiption = await client.deleteStreamSubscription(streamName, consumerName, isLocal)
  console.log(
    `${consumerName} subscription deleted successfully from stream ${streamName}`,
    consumerDeleteSubsctiption
  );

  // Unsubscribe subscription (remove the given subscription from all streams (either global or local as specified by isLocalStreams))
  const stream = client.getStream(" ", isLocalStreams)
  const consumerUnsubscribe = await stream.deleteSubscription(consumerName)
  console.log(
    `${consumerName} unsubscribed successfully (removed from all ${type} streams)`,
    consumerUnsubscribe
  );
})();
```

</TabItem>
<TabItem value="api-py" label="API - Python">

Use our interactive API Reference with code generation in 18 programming languages to [Remove a Subscription from All Streams](https://www.macrometa.com/docs/api#/operations/DeleteAllSubscriptions) or [Remove a Subscription from a Specific Stream](https://www.macrometa.com/docs/api#/operations/DeleteSubscription).

```py
import requests

# Constants
URL = "api-play.paas.macrometa.io"
HTTP_URL = f"https://{URL}"
FABRIC = "_system"
STREAM_NAME = "streamQuickstart"
API_KEY = "XXXXX" # Use your apikey here
AUTH_TOKEN = f"apikey {API_KEY}" # apikey keyword needs to be appended

# Enter the consumer/subscription name which is subscribed to more than 2 streams
CONSUMER_NAME = "testConsumer"
IS_GLOBAL = True # For global stream pass c8globals as prefix to stream name or c8locals if stream is local

# True if you want to delete subscription from all global streams or False if you want to delete subscription on all local streams
IS_GLOBAL_STREAMS = True 

stream_type = ""
if IS_GLOBAL:
    stream_type = "c8global"
else:
    stream_type = "c8local"

type = ""
if IS_GLOBAL_STREAMS:
    type = "global"
else:
    type = "local"

# Create HTTPS session
session = requests.session()
session.headers.update({"content-type": 'application/json'})
session.headers.update({"authorization": AUTH_TOKEN})

# Delete subscription (remove the given subscription from a particular stream)
url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/streams/{stream_type}s.{STREAM_NAME}/subscriptions/{CONSUMER_NAME}"
resp = session.delete(url)
print("Subscription deleted from stream ", STREAM_NAME,   ": ", resp.text)

# Unsubscribe subscription (remove the given subscription from all streams (either global or local as specified by IS_GLOBAL_STREAMS))
url = f"{HTTP_URL}/_fabric/{FABRIC}/_api/streams/subscription/{CONSUMER_NAME}?global={IS_GLOBAL_STREAMS}"
resp = session.delete(url)
print("Subscription unsubscribed (removed from all ", type, " streams): ", resp.text)
```

</TabItem>
<TabItem value="api-js" label="API - JS">

Use our interactive API Reference with code generation in 18 programming languages to [Remove a Subscription from All Streams](https://www.macrometa.com/docs/api#/operations/DeleteAllSubscriptions) or [Remove a Subscription from a Specific Stream](https://www.macrometa.com/docs/api#/operations/DeleteSubscription).

```js
class APIRequest {
  _headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  constructor (url, apiKey) {
    this._url = url;
    this._headers.authorization = `apikey ${apiKey}`; // apikey keyword needs to be appended
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

// Enter the consumer/subscription name which is subscribed to more than 2 streams
const consumerName = "testConsumer"
const isGlobal = true // For global stream pass c8globals as prefix to stream name or c8locals if stream is local

// True if you want to delete subscription from all global streams or False if you want to delete subscription on all local streams
const isGlobalStreams = true

let prefixText = ""
if (isGlobal) {
  prefixText = "c8globals."
} else {
  prefixText = "c8locals."
}

let type = ""
if (isGlobalStreams) {
  type = "global"
} else {
  type = "local"
}

const run = async function () {
  try {
    const connection = new APIRequest(federationUrl, apiKey);

    // Delete subscription (remove the given subscription from a particular stream)
    const consumerDeleteSubsctiption = await connection.req(
      `/_fabric/${fabric}/_api/streams/${prefixText}${stream}/subscriptions/${consumerName}`,
      {
        method: "DELETE"
      }
    );
    console.log(
      `${consumerName} subscription deleted successfully from stream ${stream}`,
      consumerDeleteSubsctiption
    );

    // Unsubscribe subscription (remove the given subscription from all streams (either global or local as specified by isGlobalStreams))
    const consumerUnsubscribe = await connection.req(
      `/_fabric/${fabric}/_api/streams/subscription/${consumerName}?global=${isGlobalStreams}`,
      {
        method: "DELETE"
      }
    );
    console.log(
      `${consumerName} unsubscribed successfully (removed from all ${type} streams)`,
      consumerUnsubscribe
    );
  } catch (e) {
    console.error(e);
  }
};
run();
```

</TabItem>
<TabItem value="cli" label="CLI">

Use the [gdnsl streams subscription](../../cli/streams-cli#gdnsl-streams-subscription) CLI commands to delete existing stream subscriptions.

</TabItem>
</Tabs>
