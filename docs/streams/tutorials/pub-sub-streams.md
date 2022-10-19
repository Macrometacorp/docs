---
sidebar_position: 20
title: Pub-Sub with Streams
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This is about how to create geo-replicated streams and do queues and pub-sub messaging with local latencies across the globe.

## Prerequisites

- Access to a Macrometa account with sufficient permissions to create streams.
- Install the appropriate SDK. For more information, refer to [Install SDKs](../../sdks/install-sdks.md).

## Pub-Sub with Streams Code

1. Copy and paste the code block below in your favorite IDE.
1. Update constants with your values, such as the API key.
1. Run the code.
1. (Optional) Log in to the Macrometa console to view the streams.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
const jsc8 = require("jsc8");
const readline = require("readline");
const globalUrl = "https://gdn.paas.macrometa.io";

// Create an authenticated instance with an API key (recommended) or JSON web token (JWT).
const client = new jsc8({
  url: globalUrl,
  apiKey:
    "XXXX",
  fabricName: "_system"
});
// const client = new jsc8({ url: gdnUrl, token: "XXXX", fabricName: "_system" });

// Or use email and password to authenticate a client instance
// const client = new jsc8(globalUrl);
// await client.login("your@email.com", "password");

// Variables
const stream = "streamQuickstart";
let prefix_text = "";
const is_local = false; //For a global stream pass True and False for local stream

// Get the right prefix for the stream
if (is_local) {
  prefix_text = "c8locals.";
} else {
  prefix_text = "c8globals.";
}

async function getDCList () {
  const dcListAll = await client.listUserFabrics();
  const dcListObject = await dcListAll.find(function (o) {
    return o.name === "_system";
  });
  const dcList = dcListObject.options.dcList.split(",");
  console.log("dcList: ", dcList);
}

async function createMyStream () {
  let streamName = { "stream-id": "" };
  if (await client.hasStream(stream, is_local)) {
    console.log("Stream already exists");
    streamName["stream-id"] = prefix_text + stream;
    console.log(`Old Producer = ${streamName["stream-id"]}`);
  } else {
    streamName = await client.createStream(stream, is_local);
    console.log(`New Producer = ${streamName.result["stream-id"]}`);
  }
}

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

async function receiveData () {
  console.log("\n ------- Receive Messages  ------");
  const consumer = await client.createStreamReader(
    stream,
    "test-subscription-1"
  );

  consumer.on("message", (msg) => {
    const { payload, messageId } = JSON.parse(msg);
    console.log(Buffer.from(payload, "base64").toString("ascii"));
    // Send message acknowledgement
    consumer.send(JSON.stringify({ messageId }));
  });
  consumer.onclose = function () {
    console.log("Closed WebSocket:Consumer connection for " + stream);
  };
}

async function selectAction () {
  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  input.question(
    "Type 'w' or '1' to write data. Type 'r' or '0' to read data: ",
    (userInput) => {
      if (userInput === "w" || userInput === "1") {
        sendData();
      } else if (userInput === "r" || userInput === "0") {
        receiveData();
      } else {
        console.log("Invalid user input. Stopping program.");
        return false;
      }
      input.close();
    }
  );
}

(async function () {
  await getDCList();
  await createMyStream();
  await selectAction();
})();
```

</TabItem>

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
prefix_text = ""
is_local = False # For a global stream pass True and False for local stream
demo_stream = 'streamQuickstart'

client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric = GEO_FABRIC)

# Get the right prefix for the stream
if is_local:
    prefix_text = "c8locals."
else:
    prefix_text = "c8globals."

def createStream():
    """ This function creates a stream """
    streamName = {"stream-id": ""}
    if client.has_stream(demo_stream, local = is_local):
        print("Stream already exists")
        streamName["stream-id"] = concat(prefix_text, demo_stream)
        print ("Old producer =",  streamName["stream-id"])
    else:
        #print(client.create_stream(demo_stream, local=is_local))
        streamName = client.create_stream(demo_stream, local=is_local)
        print ("New producer =",  streamName["stream-id"])

# Create the producer and send data
def sendData():
    """ This function sends data through a stream """
    producer = client.create_stream_producer(demo_stream, local=is_local)
    for i in range(10):
        msg1 = "Persistent Hello from " + "("+ str(i) +")"
        data = {
            "payload" : base64.b64encode(six.b(msg1)).decode("utf-8")
        }
        print("Stream: ", msg1)
        print(producer.send(json.dumps(data)))

# Create the subscriber and receive data
def receiveData():
    """ This function receives data from a stream """
    subscriber = client.subscribe(stream=demo_stream, local=is_local,
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
