---
sidebar_position: 1
title: Quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article is an introduction to using streams with [pyC8](https://pyc8.readthedocs.io/en/latest/) and [jsC8](https://www.npmjs.com/package/jsc8) SDKs.

Streams are a type of collection in GDN to capture `data-in-motion`. Messages are sent via streams by publishers to consumers who then do something with the message. Streams can be created via client SDKs (pyC8, jsC8), REST API or the web console.

Streams unifies `queuing` and `pub-sub messaging` into a unified messaging model that provides a lot of flexibility to users to consume messages in a way that is best for the use case at hand.

> producer --> stream --> subscription --> consumer

A stream is a named channel for sending messages. Each stream is backed by a `distributed append-only` log and can be `local` (at one edge location only) or `global` (across all edge locations in the Fabric).

Messages from publishers are only stored once on a stream, and can be consumed as many times as necessary by consumers. The stream is the source of truth for consumption. Although messages are only stored once on the stream, there can be different ways of consuming these messages.

Consumers are grouped together for consuming messages. Each group of consumers is a subscription on a stream. Each consumer group can have its own way of consuming the messages: exclusively, shared, or failover.

Streams provide:

- Seamless geo-replication of messages across regions
- Very low publish and end-to-end latency
- Seamless scalability to over a million topics
- Multiple subscription modes (`exclusive`, `shared`, and `failover`) for streams
- Guaranteed message delivery with persistent message storage

Streams are built on the *publish-subscribe* pattern, aka pub-sub. In this pattern, producers publish messages to streams. Consumers can then subscribe to those streams, process incoming messages, and send an acknowledgement when processing is complete.

Once a subscription has been created, all messages will be retained by Streams, even if the consumer gets disconnected Retained messages will be discarded only when a consumer acknowledges that they've been successfully processed.

Messages are the basic "unit" of Streams. They're what producers publish to streams and what consumers then consume from streams (and acknowledge when the message has been processed). Messages are the analogue of letters in a postal service system.

| Component            | Purpose                 |
| -------------------- | ------------------------|
| Value / data payload | The data carried by the message. All messages carry raw bytes. |
| Key                  | Messages can optionally be tagged with keys, which can be useful for things like streams compaction |
| Properties           | An optional key/value map of user-defined properties |
| Producer Name        | The name of the producer that produced the message (producers are automatically given default names, but you can apply your own explicitly as well) |
| Sequence ID          | Each message belongs to an ordered sequence on its stream. A message's sequence ID is its ordering in that sequence. |
| Publish Time         | The timestamp of when the message was published (automatically applied by the producer) |
| Event Time           | An optional timestamp that applications can attach to the message representing when something happened, e.g. when the message was processed. The event time of a message is 0 if none is explicitly set. |

## Credentials

Assume the following credentials:

- tenant name is `nemo@nautilus.com`.
- user password is `xxxxxx`.

## Installation

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
With Yarn or NPM

    yarn add jsc8
    (or)
    npm install jsc8

If you want to use the SDK outside of the current directory, you can also install it globally using the `--global` flag:

    npm install --global jsc8

From source,

    git clone https://github.com/macrometacorp/jsc8.git
    cd jsC8
    npm install
    npm run dist
```

</TabItem>
<TabItem value="py" label="Python">

```py
pyC8 requires Python 3.5+. Python 3.6 or higher is recommended

To install pyC8, simply run

    $ pip3 install pyC8

or, if you prefer to use conda:

    conda install -c conda-forge pyC8

or pipenv:

    pipenv install --pre pyC8

Once the installation process is finished, you can begin developing applications in Python.
```

</TabItem>
</Tabs>  

## Connect to GDN

The first step in using GDN is to establish a connection to a local region. When this code executes, it initializes the server connection to the region URL you sepcified.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
// Simple Way
const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
// ----- OR -----
const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});


// To use advanced options
const client = new jsc8("https://gdn.paas.macrometa.io");
```

</TabItem>

<TabItem value="py" label="Python">

```py
from operator import concat
import base64
import json
import warnings
from c8 import C8Client
import six
warnings.filterwarnings("ignore")

URL = "gdn.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "my API key" #Change this to my API key

print("--- Connecting to C8")
## Simple Way
client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric = GEO_FABRIC)

## To use advanced options
#client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443)
```

</TabItem>
</Tabs>  

## Get GeoFabric Details

To get details of fabric,

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Crete a authenticated instance with Token / Apikey
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
// await console.log("Authentication done!!...");

// Or use Email & Password to Authenticate client instance
const client = new jsc8("https://gdn.paas.macrometa.io");

await client.login("nemo@nautilus.com", "xxxxxx");

async function getFabric() {
  try {
    await console.log("Getting the fabric details...");
    let result = await client.get();

    await console.log("result is: ", result);
  } catch(e){
    await console.log("Fabric details could not be fetched because "+ e);
  }
}

getFabric();
```

</TabItem>

<TabItem value="py" label="Python">

```py
print("Get geo fabric details...")
print(client.get_fabric_details())
```

</TabItem>
</Tabs>  

## Create Global & Local Streams

The streams in GDN can be either a local stream or could be a geo-replicated stream.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");

// Crete a authenticated instance with Token / Apikey
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
// await console.log("Authentication done!!...");

// Or use Email & Password to Authenticate client instance
const client = new jsc8("https://gdn.paas.macrometa.io");

await client.login("nemo@nautilus.com", "xxxxxx");

async function streams() {
    try{
      await console.log("Creating local stream...");
      const stream_local = await client.createStream("testStream-local", true);

      await console.log("Creating global stream...");
      const stream_global = await client.createStream("testStream-global", false);

      // FOR ADVANCED USER
      // await console.log("Creating local stream...");
      // const stream_local = client.stream("testStream-local", true);
      // await stream.createStream();

      // await console.log("Creating global stream...");
      // const stream_global = client.stream("testStream-global", false);
      // await stream.createStream();

    } catch(e){
      await console.log("Streams could not be fetched because "+ e);
    }
}

streams();
```

</TabItem>

<TabItem value="py" label="Python">

```py
prefixText = ""
prefixBool = False
demo_stream = 'streamQuickstart'
    
# Get the right prefix for the stream
if prefixBool:
    prefixText = "c8locals."
else:
    prefixText = "c8globals."


streamName = {"stream-id": ""}
if client.has_stream(demo_stream, local = prefixBool):
    print("Stream already exists")
    streamName["stream-id"] = concat(prefixText, demo_stream)
    print ("OLD Producer =",  streamName["stream-id"])
else:
    #print(client.create_stream(demo_stream, local=prefixBool))
    streamName = client.create_stream(demo_stream, local=prefixBool)
    print ("NEW Producer =",  streamName["stream-id"])

print("Get Streams: ", client.get_streams())
```

</TabItem>
</Tabs>  

## Publish Messages

Example to publish documents to a stream. The stream can be either a local stream or could be a geo-replicated stream.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8")

// Crete a authenticated instance with Token / Apikey
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
// await console.log("Authentication done!!...");

// Or use Email & Password to Authenticate client instance
const client = new jsc8("https://gdn.paas.macrometa.io");

await client.login("nemo@nautilus.com", "xxxxxx");

async function streams() {
    try {

      await console.log("Creating local stream...");
      await client.createStream("my-stream", true);

      const stream = await client.getStream("my-stream", true);
      await stream.publishMessage("Hello World");

      /*

      // FOR ADVANCED USER
      const stream = client.stream("my-stream", true);
      await stream.createStream();

      const producerOTP = await stream.getOtp();
      const producer = await stream.producer("gdn.paas.macrometa.io", {
        otp: producerOTP,
    });
      producer.on("open", () => {
        // If you message is an object, convert the obj to string.
        // e.g. const message = JSON.stringify({message:'Hello World'});
        const message = "Hello World";
        const payloadObj = { payload: Buffer.from(message).toString("base64") };
        producer.send(JSON.stringify(payloadObj));
      });

      producer.on("message", (msg) => {
        console.log(msg, "Sent Successfully");
      });

      */

    } catch(e) {
      await console.log("Publishing could not be done because "+ e);
    }
}

streams()
```

</TabItem>

<TabItem value="py" label="Python">

```py
producer = client.create_stream_producer(demo_stream, local=prefixBool)
for i in range(10):
    msg1 = "Persistent Hello from " + "("+ str(i) +")"
    data = {
        "payload" : base64.b64encode(six.b(msg1)).decode("utf-8")
    }
    print("Stream: ", msg1)
    print(producer.send(json.dumps(data)))
```

</TabItem>
</Tabs>  

## Subscribe to Stream

Example to subscribe documents from a stream. The stream can be either a local stream or could be a geo-replicated stream.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require('jsc8');

// Crete a authenticated instance with Token / Apikey
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
// await console.log("Authentication done!!...");

// Or use Email & Password to Authenticate client instance
const client = new jsc8("https://gdn.paas.macrometa.io");

await client.login("nemo@nautilus.com", "xxxxxx");

async function getDCList() {
  let dcListAll = await client.listUserFabrics();
  let dcListObject = await dcListAll.find(function(o) { return o.name === geo_fabric; });
  return dcListObject.options.dcList.split(",");
}

(async function() {
  const dcList = await getDCList();
  await console.log("dcList: ", dcList);
  await client.createStream("my-stream", true);
  //Here the last boolean value tells if the stream is local or global. false means that it is global.
  // publishing streams
  const consumer = await client.createStreamReader("my-stream", "my-subscription", true);
  consumer.on("message", (msg) => {
    const { payload, messageId } = JSON.parse(msg);
    // logging received message payload(ASCII encoded) to decode use atob()
    console.log(payload);
    // Send message acknowledgement
    consumer.send(JSON.stringify({ messageId }));
  });

})();
```

</TabItem>

<TabItem value="py" label="Python">

```py
subscriber = client.subscribe(stream=demo_stream, local=prefixBool,
    subscription_name="test-subscription-1")
for i in range(10):
    print("In ",i)
    m1 = json.loads(subscriber.recv())  # Listen on stream for any receiving messages
    msg1 = base64.b64decode(m1["payload"])
    print(F"Received message '{msg1}' id='{m1['messageId']}'") # Print the received message
    subscriber.send(json.dumps({'messageId': m1['messageId']})) # Acknowledge the received message
```

</TabItem>
</Tabs>


## Full demo quickstart file

<Tabs groupId="operating-systems">
<TabItem value="py" label="Python"> 

```py
""" This file is a demo to send data to/from a stream """
from operator import concat
import base64
import json
import warnings
from c8 import C8Client
import six
warnings.filterwarnings("ignore")

URL = "gdn.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "my API key" # Change this to your API key
prefixText = ""
prefixBool = False
demo_stream = 'streamQuickstart'

client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric = GEO_FABRIC)

# Get the right prefix for the stream
if prefixBool:
    prefixText = "c8locals."
else:
    prefixText = "c8globals."


def createStream():
    """ This function creates a stream """
    streamName = {"stream-id": ""}
    if client.has_stream(demo_stream, local = prefixBool):
        print("Stream already exists")
        streamName["stream-id"] = concat(prefixText, demo_stream)
        print ("OLD Producer =",  streamName["stream-id"])
    else:
        #print(client.create_stream(demo_stream, local=prefixBool))
        streamName = client.create_stream(demo_stream, local=prefixBool)
        print ("NEW Producer =",  streamName["stream-id"])

# Creating the producer and sending data
def sendData():
    """ This function sends data through a stream """
    producer = client.create_stream_producer(demo_stream, local=prefixBool)
    for i in range(10):
        msg1 = "Persistent Hello from " + "("+ str(i) +")"
        data = {
            "payload" : base64.b64encode(six.b(msg1)).decode("utf-8")
        }
        print("Stream: ", msg1)
        print(producer.send(json.dumps(data)))


# Creating the subscriber and receiving data
def receiveData():
    """ This function receives data from a stream """
    subscriber = client.subscribe(stream=demo_stream, local=prefixBool,
        subscription_name="test-subscription-1")
    for i in range(10):
        print("In ",i)
        m1 = json.loads(subscriber.recv())  # Listen on stream for any receiving messages
        msg1 = base64.b64decode(m1["payload"])
        print(F"Received message '{msg1}' id='{m1['messageId']}'") # Print the received message
        subscriber.send(json.dumps({'messageId': m1['messageId']})) # Acknowledge the received message


createStream()


# Select choice
user_input = input("Type 'w' or '1' to write data. Type 'r' or '0' to read data: ")
if user_input == "w" or user_input == '1':
    sendData()
elif user_input == "r" or user_input == '0':
    receiveData()
else:
    print ("Invalid user input. Stopping program")
```

</TabItem>
</Tabs>


## Auto Reconnect streams

Write a wrapper class to keep the connection alive.
Following is an example for the wrapper class

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
/* -------------------------------------------------------------------------- */
/*                            Stream Wrapper Class                            */
/* -------------------------------------------------------------------------- */

/*
  ...
  // Consumer websocket example
  const connection = new StreamWebsocket(()=>stream.consumer(name,url))
  ...
  ...
  ...
  // Producer websocket example -
  const connection = new StreamWebsocket(()=>stream.producer(url))
  ...

*/

class StreamWebsocket {
  constructor(ws) {
    /*  Map for Websocket events */
    this._listeners = {
      error: [],
      message: [],
      open: [],
      close: [],
    };

    /* Determines connection should try to reconnect */
    this._shouldReconnect = true;

    /* Countet to keep track for the Number for Retries for the connection */
    this._retryCount = -1;

    /* Number of time it will try to reconnect if error */
    this._maxRetries = Infinity;

    /* Configuration variables for waiting before re-opening the connection */
    this._maxReconnectionDelay = 10000;
    this._minReconnectionDelay = 1000 + Math.random() * 4000;
    this._reconnectionDelayGrowFactor = 1.3;

    this._connectLock = false;
    this._ws;

    this._getConnection = ws;
    this._connect();
  }

  /* --------------------------------- Helpers -------------------------------- */

  /* Encodes a string in base-64. */
  _btoa(str) {
    return Buffer.from(str).toString("base64");
  }

  /* Method to calculate delay before re-opening the connection */
  _getNextDelay() {
    let delay = 0;

    if (this._retryCount > 0) {
      delay =
        this._minReconnectionDelay *
        Math.pow(this._reconnectionDelayGrowFactor, this._retryCount - 1);
      if (delay > this._maxReconnectionDelay) {
        delay = this._maxReconnectionDelay;
      }
    }

    return delay;
  }
  /* Method implements delay by returning a promise to resolve when delay completes   */
  _wait() {
    return new Promise((resolve) => {
      setTimeout(resolve, this._getNextDelay());
    });
  }

  /* Method triggers callback function attached to sockets events   */
  _callEventListener(event, listener) {
    if (typeof listener === 'function') {
      listener(event);
    }
  }

  /* Attaching callbacks function sockets events   */
  _addListeners() {
    if (!this._ws) {
      return;
    }

    this._ws.on("open", this._handleOpen.bind(this));
    this._ws.on("close", this._handleClose.bind(this));
    this._ws.on("message", this._handleMessage.bind(this));
    this._ws.on("error", this._handleError.bind(this));
  }

  /* Method to be triggered on websocket close  */
  _handleClose(event) {
    if (this._shouldReconnect) {
      this._connect();
    }

    this._listeners.close.forEach((listener) =>
      this._callEventListener(event, listener)
    );
  }

  /* Method to be triggered on websocket message  */
  _handleMessage(msg) {
    const parsedMsg = JSON.parse(msg);
    this._listeners.message.forEach((listener) =>
      this._callEventListener(parsedMsg, listener)
    );
  }

  /* Method to be triggered on websocket error  */
  _handleError(event) {
    this._listeners.error.forEach((listener) =>
      this._callEventListener(event, listener)
    );
  }

  /* Method to be triggered on websocket open  */
  _handleOpen(event) {
    this._listeners.open.forEach((listener) =>
      this._callEventListener(event, listener)
    );
  }

  /* Method to open a websocket connection  */
  _connect() {
    if ((this._connectLock || !this._shouldReconnect) && this._retryCount > 0) {
      return;
    }

    this._connectLock = true;

    this._wait().then(() => {
      if (this._retryCount >= this._maxRetries) {
        return;
      }
      this._ws = this._getConnection();
      this._connectLock = false;
      this._retryCount++;
      this._addListeners();
    });
  }

  /* -------------------------------------------------------------------------- */

  /* Method to attach a callback events to connection */
  on(type, cb) {
    if (this._listeners[type]) {
      this._listeners[type].push(cb);
    }
  }

  /* Method to send data to websocket */
  send(msg) {
    const msgToSend = JSON.stringify({ payload: this._btoa(msg) });
    this._ws.send(msgToSend);
  }

  /* Method to send acknowledgment to websocket */
  ack(messageId) {
    this._ws.send(JSON.stringify({ messageId }));
  }

  /* Method to close a websocket */
  close() {
    this._shouldReconnect = false;
    this._ws.close();
  }
}

module.exports = StreamWebsocket;
```

</TabItem>
</Tabs>  

Using the above wrapper we will create a producer and consumer, which has auto reconnect mechanism. Following is a sample code for how to handle keep connection alive

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
const atob = require("atob");
const StreamWebsocket = require("./streamWebsocketWrapper");

var consumer;
var producer;

(async function () {
  try {
    const client = new jsc8("URL");
    await client.login("EMAIL", "PASSWORD");

    const stream = client.stream("STREAM_NAME", "IS_GLOBAL_OR_LOCAL_BOOLEAN");

    // -------------------- CONSUMERS --------------------------

    const initConsumer = () => {
      return new Promise((resolve, reject) => {
        consumer = new StreamWebsocket(() =>
          stream.consumer("CONSUMER_NAME", "DC_NAME")
        );

        consumer.on("close", () => {
          console.log("consumer-close", new Date());
        });

        consumer.on("open", () => {
          console.log("consumer-open", new Date());
          resolve();
        });

        consumer.on("message", (msg) => {
          const payload = atob(msg.payload);
            consumer.ack(msg.messageId);
        });

        consumer.on("error", (e) => {
          console.log("error", e.message);
        });
      });
    };

    // -------------------- PRODUCERS --------------------------

    const initProducer = () => {
      producer = new StreamWebsocket(() =>
        stream.producer("DC_NAME")
      );

      producer.on("open", () => {
        console.log("producer-open", new Date());
      });

      producer.on("close", () => {
        console.log("producer-close", new Date());
      });

      producer.on("error", (e) => {
        console.log("error", e.message);
      });
    };

    // ----------------- INIT ---------------------------

    initConsumer().then(() => {
      initProducer();
    });

  } catch (e) {
    console.log(e);
  }
})();
```

</TabItem>
</Tabs>  


## Pub-Sub with Streams in Browser

Example to publish messages on a stream and subscribe to that stream to receive messages, with a simple UI

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pub-Sub demo</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Overpass+Mono&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.css"
    />
    <style rel="stylesheet">
      #console {
        font-family: "Roboto Mono", monospace !important;
      }
    </style>
  </head>

  <body class="container" style="max-width: none;">
    <div class="row">
      <div class="column column-40" style="padding: 20px; height: 100vh;">
        <h1>Pub Sub Demo</h1>

        <textarea
          rows="10"
          style="resize: vertical; height: 200px;"
          placeholder="Enter your message here..."
          id="messageBox"
          disabled
        ></textarea>
        <div style="display: flex;">
          <div style="flex-grow: 1;">
            <button onclick="init()" class="button-outline" id="startButton">
              Start
            </button>

            <button
              onclick="closeConnection()"
              class="button-clear"
              disabled
              id="closeButton"
            >
              Close
            </button>
          </div>

          <button onclick="publish()" id="publishButton" disabled>
            Publish
          </button>
        </div>
      </div>
      <div
        id="console"
        class="column column-60"
        style="padding: 20px; height: 100vh; background: black; overflow: auto;"
      ></div>
    </div>
  </body>
  <script type="text/javascript">
    /* ------------------- API MIDDLEWARE TO MANAGE API CALLS ------------------- */

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
          }).then((response) =>
            self._handleResponse(response, resolve, reject)
          );
        });
      }
    }

    /* ---------------------------- PUB-SUB TUTORIAL ---------------------------- */

    const EMAIL = "nemo@nautilus.com";
    const PASSWORD = "xxxxxx";

    const FEDERATION_NAME = "api-gdn.paas.macrometa.io";
    const FEDERATION_URL = `https://${FEDERATION_NAME}`;

    const STREAM_NAME = "api_tutorial_streams";
    const CONSUMER_NAME = "api_tutorial_streams_consumer";
    const IS_GLOBAL = true;

    /* ------------------------------ UI References ----------------------------- */

    const consoleElement = document.getElementById("console");
    const input = document.getElementById("messageBox");
    const startButton = document.getElementById("startButton");
    const closeButton = document.getElementById("closeButton");
    const publishButton = document.getElementById("publishButton");

    /* ---------------------------- Global Variables ---------------------------- */

    var consumer;
    var producer;

    /* ---------------------------- Helpers Functions --------------------------- */

    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    function getTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      // add a zero in front of numbers<10
      m = checkTime(m);
      s = checkTime(s);
      return h + ":" + m + ":" + s;
    }

    function print(msg) {
      var node = document.createElement("small");

      node.style =
        "display:block; font-weight:400;color:white;word-break:break-all;position:relative;padding-left:100px";
      var span = document.createElement("span");
      span.style = "position:absolute;left:0";

      var time = document.createTextNode(`> ${getTime()} : `);

      span.appendChild(time);

      var textnode = document.createTextNode(`${msg}`);
      node.appendChild(span);
      node.appendChild(textnode);
      consoleElement.appendChild(node);
      consoleElement.scrollTop = consoleElement.scrollHeight;
    }

    function toggleUIButtons(
      skip = { start: false, publish: false, close: false }
    ) {
      if (!skip.start) startButton.disabled = !startButton.disabled;
      if (!skip.publish) publishButton.disabled = !publishButton.disabled;
      if (!skip.close) closeButton.disabled = !closeButton.disabled;
      if (!skip.publish) input.disabled = !input.disabled;
    }

    /* -------------------------------------------------------------------------- */

    const connection = new APIRequest(FEDERATION_URL);

    const init = async function () {
      try {
        toggleUIButtons({ publish: true, close: true });

        /* -------------------- Login (nemo@nautilus.com/xxxxxx) -------------------- */

        const { tenant } = await connection.login(EMAIL, PASSWORD);

        print("Login Successfully using " + tenant);
        /* ------------------------------ Create Stream ----------------------------- */

        try {
          const stream = await connection.req(
            `/_fabric/_system/streams/${STREAM_NAME}?global=${IS_GLOBAL}`,
            {
              body: { name: STREAM_NAME },
              method: "POST",
            }
          );
          print("STREAM CREATED SUCCESSFULLY");
        } catch (e) {
          if (e.status == 409) {
            print("Stream already exists, skipping creation of stream");
          }
          else {
            print("Error while creating stream");
            throw e;
          }
        }

        /* ----------------- Publish and Subscribe message to stream ---------------- */

        const region = IS_GLOBAL ? "c8global" : "c8local";
        const streamName = `${region}s.${STREAM_NAME}`;

        // Fetching local URL in case the stream is local
        const localDcDetails = await connection.req(`/datacenter/local`, {
          method: "GET",
        });

        const dcUrl = localDcDetails.tags.url;

        const url = IS_GLOBAL
          ? FEDERATION_NAME
          : `api-${dcUrl}`;

        const otpConsumer = await connection.req(`/apid/otp`, {
          method: "POST",
        });
        const otpProducer = await connection.req(`/apid/otp`, {
          method: "POST",
        });

        const consumerUrl = `wss://${url}/_ws/ws/v2/consumer/persistent/${tenant}/${region}._system/${streamName}/${CONSUMER_NAME}?otp=${otpConsumer.otp}`;

        const producerUrl = `wss://${url}/_ws/ws/v2/producer/persistent/${tenant}/${region}._system/${streamName}?otp=${otpProducer.otp}`;

        /* -------------------------- Initalizing Consumer -------------------------- */

        const initConsumer = () => {
          return new Promise((resolve) => {
            consumer = new WebSocket(consumerUrl);

            consumer.onopen = function () {
              print("Consumer is open now for " + streamName);
              resolve();
            };

            consumer.onerror = function () {
              print(
                "Failed to establish Consumer connection for " + streamName
              );
            };

            consumer.onclose = function () {
              print("Closed Consumer connection for " + streamName);
            };

            consumer.onmessage = function (message) {
              var receivedMsg = message.data && JSON.parse(message.data);
              print(
                "------------------ Consumer Message Received -----------------"
              );
              print(atob(receivedMsg.payload));
              print(
                "--------------------------------------------------------------"
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
            print("Producer is open now for " + streamName);
          };

          producer.onclose = function (e) {
            print("Closed Producer connection for " + streamName);
          };

          producer.onerror = function (e) {
            print("Failed to establish Producer connection for " + streamName);
          };
        };

        initConsumer().then(() => {
          initProducer();
          toggleUIButtons({ start: true });
          print(
            "--------------------------------------------------------------"
          );
          print(
            "----------YOU CAN NOW START PUBLISHING YOUR MESSAGES----------"
          );
          print(
            "--------------------------------------------------------------"
          );
        });
      } catch (e) {
        console.error(e);
      }
    };

    function publish() {
      try {
        const value = input.value.trim().replace(/(\r\n|\n|\r)/gm, "");
        let msgToSend = value;

        if (value[0] === "{" && value.slice(-1) === "}") {
          msgToSend = JSON.stringify(JSON.parse(input.value));
        }

        producer.send(JSON.stringify({ payload: btoa(msgToSend) }));
        print(`Sending message....  : ${msgToSend}`);
        print(`Producer message sent`);
      } catch (e) {
        print(e);
      }
    }

    async function closeConnection() {
      toggleUIButtons();

      consumer.close();
      print("CONSUMER CLOSING...");
      producer.close();
      print("PRODUCER CLOSING...");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      /* ------------------------ Unsubscribe from stream. ------------------------ */

      await connection.req(
        `/_fabric/_system/_api/streams/unsubscribe/${CONSUMER_NAME}`,
        {
          method: "POST",
        }
      );

      print(`${CONSUMER_NAME} UNSUBSCRIBED SUCCESSFULLY`);
    }
  </script>
</html>
```
