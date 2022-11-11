---
sidebar_position: 40
title: KafkaJS Client
---

The KafkaJS client can be used to create Kafka producers, consumers. Full documentation [here](https://kafka.js.org/docs/getting-started).

## Installation

Install KafkaJS using:

```shell
yarn add kafkajs
```

or npm:

```shell
npm install kafkajs
```

Instantiate the KafkaJS client by pointing it towards at least one broker:

```node
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: '<my-app>',
  brokers: ['<my-gdn>.<my-paas>.macrometa.io:9093'],
  sasl: { mechanism: 'plain', username: "<my-tenant>/<my-fabric>", password: "token:<my-api-key>" },
    ssl: {
    rejectUnauthorized: false
    }
})
```

## Producer

To produce a message to a topic, create a producer using our client:

```node
const producer = kafka.producer()

await producer.connect()
await producer.send({
  topic: '<c8globals or c8locals>.<my-topic>',
  messages: [
    { value: 'Hello KafkaJS user!' },
  ],
})

await producer.disconnect()
```

## Consumer

To verify the message has been sent to the topic, create a consumer to consume the message:

```node
const consumer = kafka.consumer({ groupId: '<my-group-id>' })

await consumer.connect()
await consumer.subscribe({ topic: '<c8globals or c8locals>.<my-topic>', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    })
  }
})
```
