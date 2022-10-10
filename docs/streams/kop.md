---
sidebar_position: 150
title: KOP
---

KoP brings the native Apache Kafka protocol support to c8streams by introducing a Kafka protocol handler on c8streams brokers. By adding the KoP protocol handler to your existing c8streams cluster, you can migrate your existing Kafka applications and services to c8streams without modifying the code. This enables Kafka applications to leverage c8streams’s powerful features

More Info: https://docs.streamnative.io/platform/v1.0.0/concepts/kop-concepts

## Supported Client

- Java Client
- Kafka-Python Client
- KafkaJS Client
- Kafka-Node Client
- Fluent-Bit Client


### Kafka Java client

You can use Kafka Java client to create Java producer, consumer. The current version of the Kafka Java client is 2.8.0.

The Kafka consumer is NOT thread-safe. The Kafka producer is thread-safe.

This document focuses only on the client API for producing and consuming messages on Kafka topics.


#### Installation

The latest version of the Kafka Java client library is available via Maven Central. To use the latest version, add the kafka-clients library to your build configuration.

Maven
If you use Maven, add the following information to the pom.xml file.

<!-- in your <properties> block -->
<kafka.version>2.8.0</kafka.version>

<!-- in your <dependencies> block -->
<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>${kafka.version}</version>
</dependency>

#### Kafka Properties

To connect to Kafka using client libraries, you should specify Kafka properties are as follows.

Properties props = new Properties();
String username = "<my-tenant>/<my-fabric>";
String password = "token:<my-api-key or my-JWT>";
String jaasTemplate = "org.apache.kafka.common.security.plain.PlainLoginModule required username=\"%s\" password=\"%s\";";
String jaasCfg = String.format(jaasTemplate, username, password);
props.put("sasl.jaas.config", jaasCfg);
props.put("sasl.mechanism", "PLAIN");
props.put("security.protocol", "SASL_PLAINTEXT");
props.put("bootstrap.servers", "<my-gdn>.<my-paas>.macrometa.io:9092");
Note: The topic/stream in GDN could be either global or local that was mentioned above in username variable.

If you use TLS authentication, then you should add or replace properties are as follows.

props.put("security.protocol", "SASL_SSL");
props.put("ssl.truststore.location", "<path-to-file-client.truststore.jks>");
props.put("ssl.truststore.password", "<truststore-password>");
props.put("ssl.endpoint.identification.algorithm", "");
props.put("bootstrap.servers", "<my-gdn>.<my-paas>.macrometa.io:9093");


#### Producer

In Kafka, producers write messages to topics.

Also, you need to add additional properties for Producer for specifying a subscription and serializers are as follows.

props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
Once you've configured Kafka Properties, you can create a Producer and sent a message for a specific Kafka topic. The topic should have prefix of global either local namespace. A full topic name: <c8globals or c8locals>.<my-topic>.

Producer<String, String> producer = new KafkaProducer<String, String>(props);
producer.send(new ProducerRecord<String, String>("<c8globals or c8locals>.<my-topic>", "<message-key-1>", "<message-value-1>"));
Make sure that you close your producer when you do not need it.

producer.close();


#### Consumer

In Kafka, consumers subscribe to topics and handle messages that producers publish to those topics. You can instantiate a new consumer by first instantiating a Properties object and passing it properties (as above).

Also, you need to add additional properties for Consumer for specifying a subscription and serializers are as follows.

props.put("enable.auto.commit", "false");
props.put("group.id", <my-subsctiption>);
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
Once you've configured a Properties object, you can create a Consumer by specifying a topic or multiple topics with global either local distribution. For example: Arrays.asList("c8globals.topic-1", "c8locals.topic-2").

KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(props);
consumer.subscribe(Arrays.asList("<c8globals or c8locals>.<my-topic>"));
The subscribe method will auto subscribe the consumer to the specified topic and subscription. One way to make the consumer listen on the topic is to set up a while loop. In this example loop, the consumer listens for messages, prints the contents of any received message, and then acknowledges that the message has been processed by commitAsync() method.

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(100);
    for (ConsumerRecord<String, String> record : records){
        System.out.printf(">>> offset = %d, key = %s, value = %s\n",
                record.offset(), record.key(), record.value());
        
    }
    consumer.commitAsync();
}
Make sure that you close your consumer when you do not need it.

consumer.close();


### Kafka-Python client

Kafka-Python client library is designed to function much like the official java client, with a sprinkling of pythonic interfaces(e.g., consumer iterators). The library consists 6 different APIS via classes KafkaConsumer, KafkaProducer, KafkaAdminClient, KafkaClient, BrokerConnection, ClusterMetadata.

The KafkaProducer can be used across threads without issue, unlike the KafkaConsumer which cannot. While it is possible to use the KafkaConsumer in a thread-local manner, multiprocessing is recommended.


#### Installation

The library needs Python 3.8+ installed. You can find installer here. You can install the Kafka-Python library either via PyPi, using pip, or by building the library from source. Installation documentation of pip.


#### Producer

You can instantiate a Producer object using a bunch of parameters.

The following example creates a Python producer for the <c8globals or c8locals>.<my-topic> topic and sends 5 messages on that topic.

import ssl
from json import dumps
from kafka import KafkaProducer

context = ssl.create_default_context()
context.check_hostname = False
context.verify_mode = ssl.CERT_NONE

producer = KafkaProducer(bootstrap_servers=['<my-gdn>.<my-paas>.macrometa.io:9093'],
                         security_protocol='SASL_SSL',
                         sasl_mechanism='PLAIN',
                         sasl_plain_username='<my-tenant>/<my-fabric>',
                         sasl_plain_password='token:<my-api-key or my-JWT>',
                         ssl_cafile=config['<path-to-ca.cert.pem-file>'],
                         ssl_context=context,
                         value_serializer=lambda x: dumps(x).encode('utf-8'))

for e in range(5):
    data = {'number' : e}
    producer.send('<c8globals or c8locals>.<my-topic>', value=data)
    print('{} added'.format(e))


#### Consumer

The following example creates a consumer with the <my-subscription> subscription name on the <c8globals or c8locals>.<my-topic> topic or multiple topics with global either local distribution. For example: KafkaConsumer("c8globals.topic-1", "c8locals.topic-2", bootstrap_servers=...). The listener receives incoming messages, prints the content and ID of messages that arrive.

import ssl
from kafka import KafkaConsumer
from json import loads

context = ssl.create_default_context()
context.check_hostname = False
context.verify_mode = ssl.CERT_NONE

consumer = KafkaConsumer(
    '<c8globals or c8locals>.<my-topic>',
    bootstrap_servers=['<my-gdn>.<my-paas>.macrometa.io:9093'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='<my-subscription>',
    security_protocol='SASL_SSL',
    sasl_mechanism='PLAIN',
    sasl_plain_username='<my-tenant>/<my-fabric>',
    sasl_plain_password='token:<my-api-key or my-JWT>',
    ssl_cafile=config['<path-to-ca.cert.pem-file>'],
    ssl_context=context,
    value_deserializer=lambda x: loads(x.decode('utf-8')))

for message in consumer:
    message = message.value
    print('{} added'.format(message))


### KafkaJS client for Node.js

The KafkaJS client can be used to create Kafka producers, consumers. Full documentation here.


#### Installation

Install KafkaJS using:

yarn add kafkajs
or npm:

npm install kafkajs

Let's start by instantiating the KafkaJS client by pointing it towards at least one broker:

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: '<my-app>',
  brokers: ['<my-gdn>.<my-paas>.macrometa.io:9093'],
  sasl: { mechanism: 'plain', username: "<my-tenant>/<my-fabric>", password: "token:<my-api-key>" },
    ssl: {
    rejectUnauthorized: false
    }
})


#### Producer

To produce a message to a topic, we'll create a producer using our client:

const producer = kafka.producer()

await producer.connect()
await producer.send({
  topic: '<c8globals or c8locals>.<my-topic>',
  messages: [
    { value: 'Hello KafkaJS user!' },
  ],
})

await producer.disconnect()


#### Consumer

To verify that our message has indeed been produced to the topic, let's create a consumer to consume our message:

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


### Kafka-Node client for Node.js

The Kafka-Node client can be used to create Kafka producers, consumers, and topics in Node.js. Full documentation here.

Note: Recommend to use kafkajs client instead, because kafka-node has not been supporting since 2019 year.


#### Installation

Install Kafka-Node using npm:

npm install kafka-node
Create a client
In order to interact with Kafka, needs to be created a client instance:

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
Create a topic
This client requires to create a topic before running consumer.

Here is an example:

client.createTopics([{topic: '<c8globals or c8locals>.<my-topic>' ,partitions: 1, replicationFactor: 1}], (error, result) => {
    ...
});


#### Producer

This example creates a Node.js producer for the my-topic topic and sends messages to that topic:

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


#### Consumer

Kafka consumers subscribe to one or more Kafka topics and listen for incoming messages produced on that topic or multiple topics with global either local distribution. For example: new kafka.Consumer(client, [{ topic: 'c8globals.topic-1', topic: 'c8locals.topic-2'}]).

Here is an example:

const consumer = new kafka.Consumer(client, [{ topic: '<c8globals or c8locals>.<my-topic>', groupId: '<my-group-id>' partition: 0}], {
    autoCommit: true,
    autoCommitIntervalMs: 500
});

consumer.on("message", function (message) {
    console.log("Received a message: " + message["value"]);
});

