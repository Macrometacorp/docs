---
sidebar_position: 30
title: Confluent Python client
---

The confluent-kafka Python package is a binding on top of the C client librdkafka. It comes bundled with a pre-built version of librdkafka.

## Installation

The library needs Python 3.8+ installed. You can find installer [here](https://www.python.org/downloads/).
You can install the Kafka-Python library either via PyPi, using pip, or by building the library from source. Installation [documentation](https://pip.pypa.io/en/stable/installation/) of pip.

## Producer

You can instantiate a Producer object using a bunch of parameters.

The following example creates a Python producer for the `<c8globals or c8locals>.<my-topic>` topic and sends message on that topic.

```python
from confluent_kafka import Producer

producer = Producer({'bootstrap.servers': '<my-gdn>.<my-paas>.macrometa.io:9093',
        'client.id': "confluent-client-1.7",
        'sasl.username': '<my-tenant>/<my-fabric>'
        'sasl.password': 'token:<my-api-key or my-JWT>',
        'security.protocol': 'SASL_SSL',
        'enable.ssl.certificate.verification': 'false',
        'ssl.ca.location': '<path-to-ca.cet.pem-file>',
        'sasl.mechanism': 'PLAIN'})

def acked(err, msg):
    if err is not None:
        print("Failed to deliver message: %s: %s" % (str(msg), str(err)))
    else:
        print("Message produced: %s" % (str(msg)))

producer.produce('<c8globals or c8locals>.<my-topic>', key="<my-key-1>", value="<my-value-1>", callback=acked)

# Wait up to 1 second for events. Callbacks will be invoked during
# this method call if the message is acknowledged.
producer.poll(1)
```

## Consumer

The following example creates a consumer with the `<my-subscription>` subscription name on the `<c8globals or c8locals>.<my-topic>` topic or multiple topics with global either local distribution. For example: `consumer.subscribe(["c8globals.topic-1", "c8locals.topic-2"])`. The listener receives incoming messages, prints the content and ID of messages that arrive.

```python
from confluent_kafka import Consumer, KafkaException, KafkaError

consumer = Consumer({'bootstrap.servers': '<my-gdn>.<my-paas>.macrometa.io:9093',
                     'group.id': config["group.id"],
                     'auto.offset.reset': 'earliest',
                     'sasl.username': '<my-tenant>/<my-fabric>',
                     'sasl.password': 'token:<my-api-key or my-JWT>',
                     'security.protocol': 'SASL_SSL',
                     'enable.ssl.certificate.verification': 'false',
                     'ssl.ca.location': '<path-to-ca.cet.pem-file>',
                     'sasl.mechanism': 'PLAIN'})
consumer.subscribe([<c8globals or c8locals>.<my-topic>])

while True:
    msg = consumer.poll(timeout=1.0)
    if msg is None: continue

    if msg.error():
        if msg.error().code() == KafkaError._PARTITION_EOF:
            # End of partition event
            print('topic {} in partition {} reached end at offset {}'.format(msg.topic(), msg.partition(), msg.offset()))
        elif msg.error():
            raise KafkaException(msg.error())
    else:
        print("message.offset={}, message.key={}, message.value={}".format(msg.offset(), msg.key(), msg.value()))
```
