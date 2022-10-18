---
sidebar_position: 20
title: Kafka Python Client
---

The Kafka-Python client library is designed to function much like the official Java client, with a sprinkling of Pythonic interfaces(e.g., consumer iterators). The library consists six different APIs via classes KafkaConsumer, KafkaProducer, KafkaAdminClient, KafkaClient, BrokerConnection, and ClusterMetadata.

The KafkaProducer can be used across threads without issue, unlike the KafkaConsumer which cannot. While it is possible to use the KafkaConsumer in a thread-local manner, multiprocessing is recommended.

## Installation

The library needs Python 3.8+ installed. Find the installer at [Python.org](https://www.python.org/downloads/).

You can install the Kafka-Python library either via PyPi, using pip, or by building the library from source. For more information, refer to [pip documentation](https://pip.pypa.io/en/stable/installation/).

## Producer

You can instantiate a Producer object using a bunch of parameters.

The following example creates a Python producer for the `<c8globals or c8locals>.<my-topic>` topic and sends five messages on that topic.

```python
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
```

## Consumer

The following example creates a consumer with the `<my-subscription>` subscription name on the `<c8globals or c8locals>.<my-topic>` topic or multiple topics with global either local distribution. For example: KafkaConsumer("c8globals.topic-1", "c8locals.topic-2", bootstrap_servers=...). The listener receives incoming messages, prints the content and ID of messages that arrive.

```python
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
```
