---
sidebar_position: 50
title: Kafka NodeJS Client
---

The [Kafka-Node](https://www.npmjs.com/package/kafka-node) client can be used to create Kafka producers, consumers, and topics in Node.js.

:::note
We recommend using [kafkajs](https://kafka.js.org/) client instead, because `kafka-node` has not been supporting since 2019.
:::

## Installation

Install Kafka-Node using npm:

npm install kafka-node

## Create a Client

In order to interact with Kafka, needs to be created a client instance:

```js
const kafka = require('kafka-node');

const client = new kafka.KafkaClient(
    {   
        kafkaHost: '<my-gdn>.<my-paas>.macrometa.io:9093',
    	fromOffset: 'latest',
        sasl: { mechanism: 'plain', username: '<my-tenant>/<my-fabric>', password: 'token:<my-api-key>' },
        ssl: true,
        sslOptions: {
          rejectUnauthorized: false
        }
    });
```

## Create a Topic

This client requires to create a topic before running consumer.

Here is an example:

```js
client.createTopics([{topic: '<c8globals or c8locals>.<my-topic>' ,partitions: 1, replicationFactor: 1}], (error, result) => {
    ...
});
```

## Producer

This example creates a Node.js producer for the my-topic topic and sends messages to that topic:

```js
const producer = new kafka.HighLevelProducer(client);
producer.on('ready', function () {
    console.log('starting to produce');
    send();
});

function send() {
    producer.send([{ topic: argv.topic, messages: ['<my-message-value>'] }], function (err, data) {
        ...
    });
}
```

## Consumer

Kafka consumers subscribe to one or more Kafka topics and listen for incoming messages produced on that topic or multiple topics with global either local distribution. For example: `new kafka.Consumer(client, [{ topic: 'c8globals.topic-1', topic: 'c8locals.topic-2'}])`.

```js
const consumer = new kafka.Consumer(client, [{ topic: '<c8globals or c8locals>.<my-topic>', groupId: '<my-group-id>' partition: 0}], {
    autoCommit: true,
    autoCommitIntervalMs: 500
});

consumer.on("message", function (message) {
    console.log("Received a message: " + message["value"]);
});
```
