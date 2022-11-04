---
sidebar_position: 10
title: Getting Started with Streams
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article is an introduction to using streams with [Macrometa SDKs](../sdks/index.md).

## Prerequisites

- A [Macrometa account](https://auth.paas.macrometa.io/) with sufficient permissions to create streams.
- An API key. For more information, refer to [Create API Keys](../account-management/api-keys/create-api-keys).
- Appropriate SDK installed. For more information, refer to [Install SDKs](../sdks/install-sdks.md).

## Get Started with Streams

This page guides you through creating a stream, publishing messages to it, and subscribing to the stream using the [pyC8](https://pyc8.readthedocs.io/en/latest/) and [jsC8](https://www.npmjs.com/package/jsc8) SDKs.

1. Create a new JavaScript (.js) or Python (.py) file in your favorite IDE.
2. Copy the code block below and paste it into your JavaScript or Python file. 
3. With each subsequent step, append the code block to the existing file and then run it.

If you want to skip the explanation and just run the code, then go directly to the [Full Demo File](#full-demo-file).

### Step 1. Connect to GDN

To use streams with Macrometa Global Data Network (GDN), you must first establish a connection to a local region. When this code runs, it initializes the server connection to the specified region URL. For more information about connecting to GDN, refer to [Authentication](../account-management/auth/index.md).

<Tabs groupId="operating-systems">
<TabItem value="js" label="JavaScript">

```js
const jsc8 = require("jsc8");

// Choose one of the following methods to access the GDN. API key is recommended.
// API key
const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "XXXX", fabricName: '_system'});

// JSON Web Token
// const client = new jsc8({url: "https://gdn.paas.macrometa.io", token: "XXXX", fabricName: '_system'});

// Or use email and password to authenticate client instance
// const client = new jsc8("https://gdn.paas.macrometa.io");
// Replace values with your email and password.
// await client.login("nemo@nautilus.com", "xxxxxx"); 
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

### Step 3. Create Global and Local Streams

The streams in GDN can be either local or globally geo-replicated. The code below allows you to create either or both and then get the stream details.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
async function streams() {
    try{
      await console.log("Creating local stream...");
      const stream_local = await client.createStream("testStream-local", true);

      await console.log("Creating global stream...");
      const stream_global = await client.createStream("testStream-global", false);

    } catch(e){
      await console.log("Streams could not be fetched because "+ e);
    }
}

streams();
```

</TabItem>
<TabItem value="py" label="Python">

```py
prefix_text = ""
is_local = False # If false, then the stream created below is global
demo_stream = 'streamQuickstart'
    
# Get the right prefix for the streamName
if is_local:
    prefix_text = "c8locals."
else:
    prefix_text = "c8globals."

# Create the stream if it doesn't already exist
# To create both a global and local stream, run the code twice, once with is_local = True, once False
stream_name = {"stream-id": ""}
if client.has_stream(demo_stream, local = is_local):
    print("Stream already exists")
    stream_name["stream-id"] = concat(prefix_text, demo_stream)
    print ("Old Producer =",  stream_name["stream-id"])
else:
    stream_name = client.create_stream(demo_stream, local=is_local)
    print ("New Producer =",  stream_name["stream-id"])

# Get and print stream details
print("Get streams: ", client.get_streams())
```

</TabItem>
</Tabs>  

### Step 4. Publish Messages

Example to publish documents to a stream. The stream can be either a local stream or could be a geo-replicated stream.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
async function streams() {
    try {
      await console.log("Creating local stream...");
      const stream = client.stream("my-stream", true);
      await stream.createStream();
      const producerOTP = await stream.getOtp();
      const producer = await stream.producer("gdn.paas.macrometa.io", {
        otp: producerOTP,
    });
      producer.on("open", () => {
        // If your message is an object, convert the object to a string.
        // e.g. const message = JSON.stringify({message:'Hello World'});
        const message = "Hello World";
        const payloadObj = { payload: Buffer.from(message).toString("base64") };
        producer.send(JSON.stringify(payloadObj));
      });
      producer.on("message", (msg) => {
        console.log(msg, "Sent Successfully");
      });

    } catch(e) {
      await console.log("Publishing could not be done because "+ e);
    }
}

streams()
```

</TabItem>
<TabItem value="py" label="Python">

```py
producer = client.create_stream_producer(demo_stream, local=is_local)
for i in range(10):
    msg1 = "Persistent Hello from " + "("+ str(i) +")"
    print("Stream: ", msg1)
    producer.send(msg1)
```

</TabItem>
</Tabs>  

### Step 5. Subscribe to Stream

Example to subscribe documents from a stream. The stream can be either a local stream or a geo-replicated global stream.

<Tabs groupId="operating-systems">
<TabItem value="js" label="Javascript">

```js
async function getDCList() {
  const geo_fabric = "_system"
  let dcListAll = await client.listUserFabrics();
  let dcListObject = await dcListAll.find(function(o) { return o.name === geo_fabric; });
  return dcListObject.options.dcList.split(",");
}

(async function() {
  const dcList = await getDCList();
  await console.log("dcList: ", dcList);
  await client.createStream("my-stream", true);
  
  //Here the last boolean value tells if the stream is local or global. false means that it is global.
  const consumer = await client.createStreamReader("my-stream", "my-subscription", true);
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
<TabItem value="py" label="Python">

```py
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
</Tabs>

## Full Demo File

It's time to see streams in action! 

1. Replace the contents of your .js or .py file from above with the code block below.
2. In your browser, open the GDN console and then click **Streams**.
  - Select your recently created stream (c8globals.streamQuickstart) to view the output of the message within the console.
3. Open two terminal windows and start the program in each window 
  - In one terminal, type 'r' to begin listening for messages, while in the other terminal, type 'w' to begin writing messages
  - Upon each write, you should see the message received in the second terminal window, as well as the message displayed in the GDN console output
  

<Tabs groupId="operating-systems">
<TabItem value="js" label="JavaScript">

```js
// Connect to GDN.
const jsc8 = require("jsc8");
// Choose one of the following methods to access the GDN. API key is recommended.
const client = new jsc8({url: "https://gdn.paas.macrometa.io", apiKey: "xxxxx", fabricName: '_system'});
console.log("Authentication done!!...");

// Get GeoFabric details.
async function getFabric() {
    try {
      await console.log("Getting the fabric details...");
      let result = await client.get();
  
      await console.log("result is: ", result);
    } catch(e) {
      await console.log("Fabric details could not be fetched because "+ e);
    }
}

// Create global and local streams.
async function createStreams() {
    try{
      console.log("Creating local stream...");
      await client.createStream("testStream-local", true);

      console.log("Creating global stream...");
      await client.createStream("testStream-global", false);

    } catch(e) {
      await console.log("Streams could not be created because "+ e);
    }
}

// Subscribe to stream
async function createConsumer() {
  const dcList = await getDCList();
  await console.log("dcList: ", dcList);

  try{
    console.log("Creating local stream...");
    await client.createStream("my-stream", true);
  } catch(e) {
    await console.log("Stream could not be created because "+ e);
  }

  // Here the last boolean value tells if the stream is local or global. false means that it is global.
  const consumer = await client.createStreamReader("my-stream", "my-subscription", true);

  consumer.on("message", (msg) => {
    const { payload, messageId } = JSON.parse(msg);
    
    // Received message payload
    console.log(Buffer.from(payload, "base64").toString("ascii"));

    // Send message acknowledgement
    consumer.send(JSON.stringify({ messageId }));
  });
}

// Publish messages to stream.
async function createProducer() {
    try {
      await console.log("Creating local stream...");
      const stream = client.stream("my-stream", true);
      const producerOTP = await stream.getOtp();
      const producer = await stream.producer("gdn.paas.macrometa.io", {
        otp: producerOTP,
      });
      producer.on("open", () => {
        // If your message is an object, then convert the object to a string.
        // e.g. const message = JSON.stringify({message:'Hello World'});
        const message = "Hello World";
        const payloadObj = { payload: Buffer.from(message).toString("base64") };
        producer.send(JSON.stringify(payloadObj));
      });
      producer.on("message", (msg) => {
        console.log(msg, "Sent successfully");
      });
    } catch(e) {
      await console.log("Publishing could not be done because "+ e);
    }
}

async function getDCList() {
    const geo_fabric = "_system"
    let dcListAll = await client.listUserFabrics();
    let dcListObject = await dcListAll.find(function(o) { return o.name === geo_fabric; });
    return dcListObject.options.dcList.split(",");
}

async function main() {
    await getFabric();
    await createStreams();
    await createConsumer();
    await createProducer();
};

main();
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
URL = "gdn.paas.macrometa.io"
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
        if user_input == '0':
            break
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
