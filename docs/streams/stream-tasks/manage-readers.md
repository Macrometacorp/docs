---
sidebar_position: 110
title: Manage Readers
---

Global Data Network (GDN) stream readers are similar to stream consumers, but there are two crucial differences between them:

- Readers allow you to specify the starting point for processing messages within a stream. In contrast, consumers always begin with the latest available unacknowledged message.
- Unlike consumers, readers do not retain data or acknowledge messages. This means that readers can access messages without affecting other consumers or the message state within the stream.

## When to Use Readers

Readers are useful in scenarios where you want to process the stream data without affecting the message acknowledgment state or when you need to start processing messages from a specific point in the stream. For example, you might use a reader for analytics, monitoring, or auditing purposes.

## Create a Reader

To create a GDN stream reader, use the `createStreamReader` method provided by the SDK. Here's an example:

```javascript
const streamName = "my-stream";
const subscriptionName = "my-sub";
const local = false; // Change this to true for local streams
const dcName = "your-datacenter-name"; // Optional

const reader = await client.createStreamReader(streamName, subscriptionName, local, dcName);
```

## Read Messages with a Reader

Once you have created a reader, you can start listening for messages by registering event listeners. The following event listeners are available:

- `open`: Triggered when the connection to the stream is established.
- `message`: Triggered when a new message is received from the stream.
- `close`: Triggered when the connection to the stream is closed.
- `error`: Triggered when an error occurs during the connection or message processing.

Here's an example of how to use event listeners with a reader:

```javascript
reader.on("open", () => {
  console.log("Connection to the stream is open.");
});

reader.on("message", (msg) => {
  console.log("Received message:", msg);
});

reader.on("close", () => {
  console.log("Connection to the stream is closed.");
});

reader.on("error", (err) => {
  console.error("Error:", err);
});
```

## Close a Reader

To close a reader and release resources, call the `close` method:

```javascript
reader.close();
```

This will also trigger the `close` event listener.

## Example

In this example, you'll learn how to create and use a GDN stream reader to process messages from a stream. This is useful when you want to analyze the messages in the stream without affecting the state of the messages or other consumers.

Suppose you are monitoring the performance of a fleet of delivery vehicles. Each vehicle sends its GPS coordinates to a GDN stream. You want to analyze the data in real-time to identify any issues and optimize routes, without affecting other consumers of the stream.

Here's an example of how to create a reader, read messages from the stream, and display them in the terminal:

```javascript
// Import required modules
const jsc8 = require("jsc8");
const readline = require("readline");

// Configure the client
const globalUrl = "https://play.paas.macrometa.io";
const apiKey = "xxxx"; // Change this to your API Key
const client = new jsc8({
  url: globalUrl,
  apiKey: apiKey,
  fabricName: "_system"
});

// Variables
const streamName = "gps-data-stream";
const subscriptionName = "vehicle-monitoring";
const isLocal = false; // Set to true for local streams, false for global streams

// Create a stream reader
async function createStreamReader() {
  console.log("Creating stream reader...");
  const reader = await client.createStreamReader(streamName, subscriptionName, isLocal);
  
  // Configure event listeners
  reader.on("open", () => {
    console.log("Connection to the stream is open.");
  });

  reader.on("message", (msg) => {
    const { payload } = JSON.parse(msg);
    const data = Buffer.from(payload, "base64").toString("ascii");
    console.log("Received message:", data);
  });

  reader.on("close", () => {
    console.log("Connection to the stream is closed.");
  });

  reader.on("error", (err) => {
    console.error("Error:", err);
  });

  // Close the reader when the user types '0'
  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  input.question("Type '0' to exit anytime:\n", (userInput) => {
    if (userInput === "0") {
      reader.close();
      input.close();
    }
  });
}

// Execute the function
(async function () {
  await createStreamReader();
})();
```

This code initializes a GDN client, creates a stream reader, and listens for messages. When messages are received, they are decoded from base64 and displayed in the terminal. The reader can be closed by typing '0' in the terminal.

When you run this code, you'll see output like the following:

```
Creating stream reader...
Connection to the stream is open.
Received message: {"vehicle_id": "A1", "latitude": 37.7749, "longitude": -122.4194}
Received message: {"vehicle_id": "B2", "latitude": 37.8049, "longitude": -122.4494}
...
```

The output shows the decoded messages from the stream, which can be used for further analysis and optimization.
