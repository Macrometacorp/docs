---
sidebar_position: 10
title: Kafka Java Client
---

You can use Kafka Java client to create Java producer, consumer.

The Kafka consumer is _not_ thread-safe. The Kafka producer is thread-safe.

This document focuses only on the client API for producing and consuming messages on Kafka topics.


## Installation

The latest version of the Kafka Java client library is available via [Maven Central](https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients). To use the latest version, add the `kafka-clients` library to your build configuration.

## Maven

If you use Maven, then add the following information to the pom.xml file:

```
<!-- in your <properties> block -->
<kafka.version>2.8.0</kafka.version>

<!-- in your <dependencies> block -->
<dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>${kafka.version}</version>
</dependency>
```

## Kafka Properties

To connect to Kafka using client libraries, you should specify the following Kafka properties:

```java
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
```

If you use TLS authentication, then you should add or replace the following Kafka properties:

```java
props.put("security.protocol", "SASL_SSL");
props.put("ssl.truststore.location", "<path-to-file-client.truststore.jks>");
props.put("ssl.truststore.password", "<truststore-password>");
props.put("ssl.endpoint.identification.algorithm", "");
props.put("bootstrap.servers", "<my-gdn>.<my-paas>.macrometa.io:9093");
```

## Producer

In Kafka, producers write messages to topics.

Add the following Producer properties for specifying a subscription and serializers:

```java
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
```

Once you've configured Kafka Properties, you can create a Producer and send a message for a specific Kafka topic. The topic should have prefix of global either local namespace. A full topic name would match this format: `<c8globals or c8locals>.<my-topic>`.

```java
Producer<String, String> producer = new KafkaProducer<String, String>(props);
producer.send(new ProducerRecord<String, String>("<c8globals or c8locals>.<my-topic>", "<message-key-1>", "<message-value-1>"));
```

Make sure that you close your producer when you do not need it.

```java
producer.close();
```

## Consumer

In Kafka, consumers subscribe to topics and handle messages that producers publish to those topics. You can instantiate a new consumer by first instantiating a Properties object and passing it properties (as above).

Add the following Consumer properties for specifying a subscription and serializers:

```java
props.put("enable.auto.commit", "false");
props.put("group.id", <my-subscription>);
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
```

Once you've configured a Properties object, you can create a Consumer by specifying a topic or multiple topics with global either local distribution.

For example:

```java
Arrays.asList("c8globals.topic-1", "c8locals.topic-2").

KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(props);
consumer.subscribe(Arrays.asList("<c8globals or c8locals>.<my-topic>"));
```

The subscribe method automatically subscribes the consumer to the specified topic and subscription.

One way to make the consumer listen to the topic is to set up a while loop. In this example loop, the consumer listens for messages, prints the contents of any received message, and then acknowledges that the message has been processed by the `commitAsync()` method.

```java
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(100);
    for (ConsumerRecord<String, String> record : records){
        System.out.printf(">>> offset = %d, key = %s, value = %s\n",
                record.offset(), record.key(), record.value());
        
    }
    consumer.commitAsync();
}
```

Verify that you close your consumer when you do not need it.

```java
consumer.close();
```
