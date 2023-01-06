---
sidebar_position: 100
title: Pub-Sub with Streams Example
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes how to create geo-replicated streams and set up queues and pub-sub messaging with local latencies across the globe.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create streams.
- Appropriate SDK installed. For more information, refer to [Install SDKs](../../sdks/install-sdks.md).

## Pub-Sub with Streams Code

1. Copy and paste the code block below in your favorite IDE.
1. Update constants with your values, such as the API key.
1. Run the code.
1. (Optional) Log in to the Macrometa console to view the streams.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
// Connect to GDN.
const jsc8 = require("jsc8");
const readline = require("readline");
const globalUrl = "https://play.paas.macrometa.io";
const apiKey = "xxxx"; //Change this to your API Key

// Create an authenticated instance with an API key (recommended)
const client = new jsc8({
  url: globalUrl,
  apiKey: apiKey,
  fabricName: "_system"
});

/* Authenticate via JSON Web Token (JWT)
const client = new jsc8({ url: globalUrl, token: "XXXX", fabricName: "_system" });
*/
  
/* Create an authenticated client instance via email and password
const client = new jsc8(globalUrl);
await client.login("your@email.com", "password");
*/

// Variables
const stream = "streamQuickstart";
let prefix_text = "";
const is_local = false; //For a local stream pass this variable as True, or False for a global stream

// Get the right prefix for the stream
if (is_local) {
  prefix_text = "c8locals.";
} else {
  prefix_text = "c8globals.";
}

async function createMyStream () {
  let streamName = { "stream-id": "" };
  if (await client.hasStream(stream, is_local)) {
    console.log("This stream already exists!");
    streamName["stream-id"] = prefix_text + stream;
    console.log(`Old Producer = ${streamName["stream-id"]}`);
  } else {
    streamName = await client.createStream(stream, is_local);
    console.log(`New Producer = ${streamName.result["stream-id"]}`);
  }
}

async function sendData () {
  console.log("\n ------- Publish Messages  ------");
  const producer = await client.createStreamProducer(stream, is_local);

  producer.on("open", () => {
    const input = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Repeatedly ask the user for message to be published to the stream. User can always exit by typing 0
    var recursiveUserInput = () => {
      input.question(
        "Enter your message to publish or Type 0 to exit:\n",
        (userInput) => {
          if (userInput === "0") {
            producer.close();
            return input.close();
          }

          const data = {
            payload: Buffer.from(userInput).toString("base64")
          };
          producer.send(JSON.stringify(data));
          console.log(`Message sent: ${userInput}`);
          recursiveUserInput();
        }
      );
    }
    recursiveUserInput();
  });
  producer.onclose = function () {
    console.log("Closed WebSocket:Producer connection for " + stream);
  };
}

async function receiveData () {
  console.log("\n ------- Receive Messages  ------");
  const consumer = await client.createStreamReader(
    stream,
    "test-subscription-1",
    is_local
  );
  
  // Close consumer connection when user types 0
  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  input.question(
    "Type '0' to exit anytime:\n",
    (userInput) => {
      if (userInput === "0") {
        consumer.close();
        return input.close();
      } 
    }
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
    "Type 'w' to write data. Type 'r' to read data: ",
    (userInput) => {
      if (userInput === "w") {
        sendData();
      } else if (userInput === "r") {
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
warnings.filterwarnings("ignore")

# Connect to GDN.
URL = "play.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "xxxxx" # Change this to your API key
is_local = False
prefix_text = ""
demo_stream = 'streamQuickstart'

client = C8Client(protocol='https', host=URL, port=443, apikey=API_KEY, geofabric=GEO_FABRIC)
# Get the right prefix for the stream.
if is_local:
    prefix_text = "c8locals."
else:
    prefix_text = "c8globals."

# Create global and local streams.
def createStream():
    """ This function creates a stream """
    stream_name = {"stream-id": ""}
    if client.has_stream(demo_stream, local = is_local):
        print("Stream already exists")
        stream_name["stream-id"] = concat(prefix_text, demo_stream)
        print ("Old Producer =",  stream_name["stream-id"])
    else:
        stream_name = client.create_stream(demo_stream, local=is_local)
        print ("New Producer =",  stream_name["stream-id"])

# Create the producer and publish messages.
def sendData():
    """ This function sends data through a stream """
    producer = client.create_stream_producer(demo_stream, local=is_local)
    while True:
        user_input = input("Enter your message to publish: ")
        if user_input == '0':
            break
        producer.send(user_input)


# Create the subscriber and receive data.
def receiveData():
    """ This function receives data from a stream """
    subscriber = client.subscribe(stream=demo_stream, local=is_local,
        subscription_name="test-subscription-1")
    while True:
        print("\nListening for message...")
        m1 = json.loads(subscriber.recv())  # Listen on stream for any receiving messages
        msg1 = base64.b64decode(m1["payload"]).decode('utf-8')
        print(F"Received message: '{msg1}'") 
    # Output the ID of the received message
        # print(F"Message ID:'{m1['messageId']}'")
        subscriber.send(json.dumps({'messageId': m1['messageId']})) # Acknowledge the received message

createStream()

# User enters choice.
# On one terminal use 'r' to start the subscriber to read data
# Then on another terminal use 'w' to start the producer and publish message
user_input = input("Type 'w' to write data, type 'r' read data, and type '0' to quit at any time: ")
if user_input == "w":
    sendData()
elif user_input == "r":
    receiveData()
else:
    print ("Invalid user input. Stopping program") 
```

</TabItem>
</Tabs>  
