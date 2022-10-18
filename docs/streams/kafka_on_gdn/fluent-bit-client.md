---
sidebar_position: 60
title: Fluent Bit Client
---

Fluent Bit is an open-source and multi-platform log processor tool that aims to be a generic Swiss knife for logs processing and distribution.

Fluent Bit works as a logging pipeline chunked into logical parts like Inputs, Parsers, Filters and Outputs. Kafka client implementation able in Output part. It means Fluent bit produces records and sends to Kafka.

Full Kafka plugin documentation can be found [here](https://docs.fluentbit.io/manual/pipeline/outputs/kafka)

The Fluent Bit Kafka plugin is built on top of `libdrkafka` [library](https://github.com/edenhill/librdkafka/).

## Installation

Following are the steps for Fluent Bit installation on Ubuntu OS. The below steps will show how to build and install Fluent Bit with correct plugins and modules.

### Prequisites

Building Fluent Bit from scratch requires installing `git` and then cloning a repository from [GitHub](https://github.com/fluent/fluent-bit) and checkout to the latest version.

```
sudo apt update
sudo apt install git
git clone https://github.com/fluent/fluent-bit.git
git checkout 1.8.0-pack-fixes
```

Building of Fluent Bit requires other Ubuntu packages.
Fluent Bit uses CMake as it build system. The suggested procedure to prepare the build system consists on the following steps:

```
sudo apt install -y build-essential
sudo apt install -y make
sudo apt install -y cmake
sudo apt install -y libsasl2-dev
sudo apt install -y bison
sudo apt install -y flex
sudo apt install -y libssl-dev
```


### Build

Change to the `build` directory inside the Fluent Bit sources and let CMake configure the project specifying where the root path is located with Kafka plugin and TLS module:

```
cd fluent-bit/build
cmake -DFLB_OUT_KAFKA=On -DFLB_TLS=On ..
make
```

### Run

This sample uses on input `dummy` plugin. It generates records that consists event time. Here is an example `{"@timestamp":1629229398.754061,"message":"dummy"}`.
Output parameter uses `kafka` plugin with name of Kafka topic and additional parameters from `libdrkafka` library.
A topic should have prefix of global either local namespace. A full topic name: `<c8globals or c8locals>.<my-topic>`.

```
bin/fluent-bit \
    -i dummy \
    -o kafka \
    -p brokers=<my-gdn>.<my-paas>.macrometa.io:9093 \
    -p topics=<c8globals or c8locals>.<my-topic> \
    -p rdkafka.security.protocol=SASL_SSL \
    -p rdkafka.enable.ssl.certificate.verification=false \
    -p rdkafka.ssl.ca.location=<path-to-ca.cert.pem-file> \
    -p rdkafka.sasl.mechanism=PLAIN \
    -p rdkafka.sasl.username=<my-tenant>/<my-fabric> \
    -p rdkafka.sasl.password=token:<my-api-key or my-JWT> \
    -p rdkafka.client.id=fluent-bit-client \
    -p rdkafka.log.connection.close=false \
    -p rdkafka.request.required.acks=1
```

Note: The full list of properties can be found [here](https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md).

### Verify

Sent messages can be verified by the consumer of any java, python, node.js Kafka client.

Example in nodejs

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
