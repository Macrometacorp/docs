---
sidebar_position: 10
title: Getting Started with Streams
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article is an introduction to using streams with [Macrometa SDKs](../sdks/index.md).

## Prerequisites

- Access to a Macrometa account with sufficient permissions to create streams.
- Install the appropriate SDK. For more information, refer to [Install SDKs](../sdks/install-sdks.md).

## Get Started with Streams

The basic parts of this quickstart walk you through creating a stream, publishing messages to it, and subscribing to the stream using the [pyC8](https://pyc8.readthedocs.io/en/latest/) and [jsC8](https://www.npmjs.com/package/jsc8) SDKs.

If you want to skip the explanation and just run the code, then go directly to the [Full Demo Quickstart File](#full-demo-quickstart-file).

### Step 1. Connect to GDN

The first step in using the Macrometa Global Data Network (GDN) is to establish a connection to a local region. When this code executes, it initializes the server connection to the region URL you specified. For more information about connecting to the GDN, refer to [Authentication](../account-management/auth/index.md).

<Tabs groupId="operating-systems">
<TabItem value="js" label="JavaScript">

```js
const jsc8 = require("jsc8");

// Choose one of the following methods to access the GDN. API key is recommended.
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});
// await console.log("Authentication done!!...");

// Or use email and password to authenticate client instance
const client = new jsc8("https://gdn.paas.macrometa.io");

// Replace values with your email and password.
await client.login("nemo@nautilus.com", "xxxxxx"); 
```

</TabItem>

<TabItem value="py" label="Python">

```py
# Import libraries
from operator import concat
import base64
import json
import warnings
from c8 import C8Client
import six
warnings.filterwarnings("ignore")

# Define constants
URL = "gdn.paas.macrometa.io"
GEO_FABRIC = "_system"
API_KEY = "my API key" # Change this to your API key

print("--- Connecting to GDN")

# Choose one of the following methods to access the GDN. API key is recommended.

# Authenticate with API key
client = C8Client(protocol='https', host=URL, port=443, apikey = API_KEY, geofabric = GEO_FABRIC)

# Authenticate with JWT
# client = C8Client(protocol='https', host='gdn.paas.macrometa.io', port=443, token=<your token>)
```

</TabItem>
</Tabs>  

### Step 2. Get GeoFabric Details

Get fabric details, including the name and associated regions.

<Tabs groupId="operating-systems">
<TabItem value="js" label="JavaScript">

```js
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
print("Getting fabric details...")
print(client.get_fabric_details())
```

</TabItem>
</Tabs>  

## Create Global & Local Streams

The streams in GDN can be either local or globally geo-replicated. Run the code below to create a stream.

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
prefixBool = False # If false, then the stream created below is global
demo_stream = 'streamQuickstart'
    
# Get the right prefix for the stream
if prefixBool:
    prefixText = "local."
else:
    prefixText = "global."

# Create the stream if it doesn't already exist
# To create both a global and local stream, run the code twice, once with prefixBool = True, once False
streamName = {"stream-id": ""}
if client.has_stream(demo_stream, local = prefixBool):
    print("Stream already exists")
    streamName["stream-id"] = concat(prefixText, demo_stream)
    print ("OLD Producer =",  streamName["stream-id"])
else:
    streamName = client.create_stream(demo_stream, local=prefixBool)
    print ("NEW Producer =",  streamName["stream-id"])

# Get and print stream details
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

## Full Demo Quickstart File

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
