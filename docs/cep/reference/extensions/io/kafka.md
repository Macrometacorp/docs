# Apache Kafka (beta)

This an extension that receives and publishes events from/to Apache Kafka.

## Features

* **[Kafka (Sink)](#kafka-sink)**

    A Kafka sink publishes events processed by GDN stream worker to a topic with a partition for a Kafka cluster. If the topic is not already created in the Kafka cluster, the Kafka sink creates the default partition for the given topic. The publishing topic and partition can be a dynamic value taken from the GDN stream worker event. 

* **[Kafka Replay Request (Sink)](#kafka-replay-request)**

    This sink is used to request replay of specific range of events on a specified partition of a topic.

* **[Kafka (Source)](#kafka-source)**

    A Kafka source receives events to be processed by GDN stream worker from a topic with a partition for a Kafka cluster. The events received can be in the `TEXT` or `JSON` format. If the topic is not already created in the Kafka cluster, the Kafka sink creates the default partition for the given topic.

* **[Kafka Replay Response (Source)](#kafka-replay-response)**

    This source is used to listen to replayed events requested from kafka-replay-request sink

## Sink

### Kafka Sink

A Kafka sink publishes events processed by GDN stream worker to a topic with a partition for a Kafka cluster.If the topic is not already created in the Kafka cluster, the Kafka sink creates the default partition for the given topic. The publishing topic and partition can be a dynamic value taken from the GDN stream worker event.

To configure a sink to use the Kafka transport, the `type` parameter should have `kafka` as its value.

Syntax:

```js
@sink(type="kafka", 
        bootstrap.servers="<STRING>", 
        topic="<STRING>", 
        partition.no="<INT>", 
        sequence.id="<STRING>", 
        key="<STRING>", 
        is.binary.message="<BOOL>", 
        optional.configuration="<STRING>", 
        @map(...)))
```

QUERY PARAMETERS:

| Name | Description |	Default Value |	Possible Data Types	| Optional | 
|------|-------------|----------------|---------------------| -------- |
| bootstrap.servers| This parameter specifies the list of Kafka servers to which the Kafka sink must publish events. This list should be provided as a set of comma separated values. e.g., localhost:9092,localhost:9093. | | STRING	| No |
| topic | The topic to which the Kafka sink needs to publish events. Only one topic must be specified.| | STRING | No |
| partition.no | The partition number for the given topic. Only one partition ID can be defined. If no value is specified for this parameter, the Kafka sink publishes to the default partition of the topic (i.e., 0). | 0 | INT | YES|
| sequence.id | A unique identifier to identify the messages published by this sink. This ID allows receivers to identify the sink that published a specific message. | null | STRING | YES|
| key | The key contains the values that are used to maintain ordering in a Kafka partition. | null | STRING | YES|
| is.binary.message | In order to send the binary events via kafka sink, this parameter is set to 'True'. | null | BOOL | NO |
| optional.configuration | This parameter contains all the other possible configurations that the producer is created with. e.g., `producer.type:async,batch.size:200`. | null | STRING | YES|

EXAMPLE 1:

```js
@App:name('TestExecutionPlan') 

define stream FooStream (symbol string, price float, volume long);

@info(name = 'query1') 
@sink(
    type='kafka',
    topic='topic_with_partitions',
    partition.no='0',
    bootstrap.servers='localhost:9092',
    @map(type='json'))
define stream BarStream (symbol string, price float, volume long);

select symbol, price, volume 
from FooStream 
insert into BarStream;
```

This Kafka sink configuration publishes to `0th` partition of the topic named `topic_with_partitions`.

EXAMPLE 2:

```js
@App:name('TestExecutionPlan') 

define stream FooStream (symbol string, price float, volume long); 

@info(name = 'query1') 
@sink(
    type='kafka',
    topic='{{symbol}}',
    partition.no='{{volume}}',
    bootstrap.servers='localhost:9092',
    @map(type='json'))
define stream BarStream (symbol string, price float, volume long);

select symbol, price, volume 
from FooStream 
insert into BarStream;
```

This query publishes dynamic topic and partitions that are taken from the GDN stream worker event. The value for `partition.no` is taken from the `volume attribute`, and the `topic` value is taken from the `symbol` attribute.

### Kafka Replay Request

This sink is used to request replay of specific range of events on a specified partition of a topic.

Syntax:

```js
@sink(type="kafka-replay-request", sink.id="<STRING>", @map(...)))
```

QUERY PARAMETERS:

| Name | Description |	Default Value |	Possible Data Types	| Optional | Dynamic |
|------|-------------|----------------|---------------------| -------- | --------|
| sink.id| a unique SINK_ID should be set. This sink id will be used to match with the appropriate kafka-replay-response source. | | STRING	| No | No |


EXAMPLE 1:

```js
@App:name('TestKafkaReplay')

@sink(type='kafka-replay-request', sink.id='1')
define stream BarStream (topicForReplay string, partitionForReplay string, startOffset string, endOffset string);

@info(name = 'query1')
@source(type='kafka-replay-response',  group.id='group', threading.option='single.thread', bootstrap.servers='localhost:9092', sink.id='1', @map(type='json'))
define stream FooStream (symbol string, amount double);

@sink(type='log')
define stream logStream(symbol string, amount double);

select * 
from FooStream 
insert into logStream;
```

In this app we can send replay request events into BarStream and observe the replayed events in the logStream.

## Source

### Kafka Source

A Kafka source receives events to be processed by GDN stream worker from a topic with a partition for a Kafka cluster. The events received can be in the `TEXT` or `JSON` format. If the topic is not already created in the Kafka cluster, the Kafka sink creates the default partition for the given topic.

Syntax:

```js
@source(type="kafka", 
        bootstrap.servers="<STRING>", 
        topic.list="<STRING>", 
        group.id="<STRING>", 
        threading.option="<STRING>", 
        partition.no.list="<STRING>", 
        seq.enabled="<BOOL>", 
        is.binary.message="<BOOL>", 
        topic.offsets.map="<STRING>", 
        enable.offsets.commit="<BOOL>", 
        enable.async.commit="<BOOL>", 
        optional.configuration="<STRING>", 
        @map(...)))
```

QUERY PARAMETERS:

| Name | Description |	Default Value |	Possible Data Types	| Optional | 
|------|-------------|----------------|---------------------| -------- |
| bootstrap.servers| This parameter specifies the list of Kafka servers to which the Kafka sink must publish events. This list should be provided as a set of comma separated values. e.g., localhost:9092,localhost:9093. | | STRING | No |
| topic.list | This specifies the list of topics to which the source must listen. This list can be provided as a set of comma-separated values. e.g., `topic_one`,`topic_two`| | STRING | No |
| group.id | This is an ID to identify the Kafka source group. The group ID ensures that sources with the same topic and partition that are in the same group do not receive the same event. |  | STRING | No|
| threading.option | This specifies whether the Kafka source is to be run on a single thread, or in multiple threads based on a condition. <br /> Possible values are as follows: <br /> `single.thread`: To run the Kafka source on a single thread. <br /> `topic.wise`: To use a separate thread per topic. <br /> `partition.wise`: To use a separate thread per partition. |  | STRING | NO|
| partition.no.list | The partition number list for the given topic. This is provided as a list of comma-separated values. e.g., `0`,`1`,`2`,.| 0 | STRING | YES |
| seq.enabled | If this parameter is set to `true`, the sequence of the events received via the source is taken into account. Therefore, each event should contain a sequence number as an attribute value to indicate the sequence.| false | BOOL | YES |
| is.binary.message | In order to receive `binary` events via the Kafka source, it is required to set this parameter to 'True'.| false | BOOL | YES|
| is.binary.message | In order to receive `binary` events via the Kafka source, it is required to set this parameter to 'True'.| false | BOOL | YES|
| topic.offsets.map	| This parameter specifies reading offsets for each topic and partition. The value for this parameter is specified in the following format: <br /> `<topic>=<offset>`,`<topic>=<offset>`, <br /> When an offset is defined for a topic, the Kafka source skips reading the message with the number specified as the offset as well as all the messages sent previous to that message. <br /> If the offset is not defined for a specific topic it reads messages from the beginning. e.g., `stocks=100`,`trades=50` reads from the `101th` message of the stocks topic, and from the `51st` message of the `trades` topic. | null | STRING | YES |
| enable.offsets.commit | This parameter specifies whether to commit offsets. <br /><br />  If the manual asynchronous offset committing is needed, `enable.offsets.commit` should be `true` and `enable.auto.commit` should be `false`. <br /> <br /> If periodical committing is needed `enable.offsets.commit` should be `true` and `enable.auto.commit` should be `true`. <br /> <br /> If committing is not needed, `enable.offsets.commit` should be `false`. <br /><br /> Note: `enable.auto.commit` is an `optional.configuration` property. If it is set to `true`, Source will periodically(default: `1000ms`. Configurable with `auto.commit.interval.ms` property as an `optional.configuration`) commit its current offset (defined as the offset of the next message to be read) for the partitions it is reading from back to Kafka.| true | BOOL | YES|
| enable.async.commit | This parameter will changes the type of the committing offsets returned on the last poll for the subscribed list of topics and partitions. <br /> When `enable.async.commit` is set to true, committing will be an asynchronous call.| true | BOOL | YES|
| optional.configuration | This parameter contains all the other possible configurations that the consumer is created with. e.g., `ssl.keystore.type:JKS`,`batch.size:200`.| null | STRING | YES|

EXAMPLE 1:

```js
@App:name('TestExecutionPlan') 
define stream BarStream (symbol string, price float, volume long); 

@info(name = 'query1') 

@source(
    type='kafka', 
    topic.list='kafka_topic,kafka_topic2', 
    group.id='test', 
    threading.option='partition.wise', 
    bootstrap.servers='localhost:9092', 
    partition.no.list='0,1', 
    @map(type='json'))
define stream FooStream (symbol string, price float, volume long);

select symbol, price, volume 
from FooStream 
insert into BarStream;

```

This kafka source configuration listens to the `kafka_topic` and `kafka_topic2` topics with 0 and 1 partitions. A thread is created for each topic and partition combination. The events are received in the json format, mapped to a GDN stream worker event, and sent to a stream named `FooStream`.

EXAMPLE 2:

```js
@App:name('TestExecutionPlan') 
define stream BarStream (symbol string, price float, volume long); 

@info(name = 'query1') 

@source(
    type='kafka', 
    topic.list='kafka_topic',
    group.id='test', 
    threading.option='single.thread',
    bootstrap.servers='localhost:9092',
    @map(type='json'))

define stream FooStream (symbol string, price float, volume long);

select symbol, price, volume
from FooStream 
insert into BarStream;
```

This Kafka source configuration listens to the `kafka_topic` topic for the default partition because no `partition.no.list` is defined. Only one thread is created for the topic. The events are received in the JSON format, mapped to a GDN stream worker event, and sent to a stream named `FooStream`.

EXAMPLE 3:

```js
@App:name('TestExecutionPlan')
@source(type='kafka',
        topic.list='trp_topic',
        partition.no.list='0',
        threading.option='single.thread',
        group.id='group',
        bootstrap.servers='localhost:9092',
        @map(type='json', 
                enclosing.element='//events',
                @attributes(symbol ='symbol', 
                            price = 'price', 
                            volume = 'volume',
                            partition = 'trp:partition',
                            topic = 'trp:topic', 
                            key = 'trp:key',
                            recordTimestamp = 'trp:record.timestamp',
                            eventTimestamp = 'trp:event.timestamp',
                            checkSum = 'trp:check.sum', 
                            topicOffset = 'trp:offset'
                        )
            )
        )

define stream FooStream (symbol string, 
                        price float, 
                        volume long, 
                        partition string,
                        topic string, 
                        key string,
                        recordTimestamp string,
                        eventTimestamp string, 
                        checkSum string,
                        topicOffset string);

select * 
from FooStream 
insert into BarStream;
```

This Kafka source configuration listens to the `trp_topic` topic for the default partition because no `partition.no.list` is defined.

Since the custom attribute mapping is enabled with `TRP` values, the GDN stream worker event will be populated with the relevant `trp` values as well.

### Kafka Replay Request

This source is used to listen to replayed events requested from `kafka-replay-request` sink.

Syntax:

```js
@source(type="kafka-replay-response", 
        bootstrap.servers="<STRING>", 
        group.id="<STRING>", 
        threading.option="<STRING>", 
        sink.id="<INT>", 
        @map(...)))
```

QUERY PARAMETERS:

| Name | Description |	Default Value |	Possible Data Types	| Optional | 
|------|-------------|----------------|---------------------| -------- |
| bootstrap.servers| This parameter specifies the list of Kafka servers to which the Kafka sink must publish events. This list should be provided as a set of comma separated values. e.g., localhost:9092,localhost:9093. | | STRING | No |
| topic.list | This specifies the list of topics to which the source must listen. This list can be provided as a set of comma-separated values. e.g., `topic_one`,`topic_two`| | STRING | No |
| group.id | This is an ID to identify the Kafka source group. The group ID ensures that sources with the same topic and partition that are in the same group do not receive the same event. |  | STRING | No|
| threading.option | This specifies whether the Kafka source is to be run on a single thread, or in multiple threads based on a condition. <br /> Possible values are as follows: <br /> `single.thread`: To run the Kafka source on a single thread. <br /> `topic.wise`: To use a separate thread per topic. <br /> `partition.wise`: To use a separate thread per partition. |  | STRING | NO|
| sink.id | a unique SINK_ID . |  | INT | No|

EXAMPLE 1:

```js
@App:name('TestKafkaReplay')

@sink(type='kafka-replay-request', sink.id='1')
define stream BarStream (topicForReplay string, partitionForReplay string, startOffset string, endOffset string);

@info(name = 'query1')
@source(type='kafka-replay-response',  group.id='group', threading.option='single.thread', bootstrap.servers='localhost:9092', sink.id='1', @map(type='json'))
define stream FooStream (symbol string, amount double);

@sink(type='log')
define stream logStream(symbol string, amount double);

select * 
from FooStream 
insert into logStream;
```

In this app we can send replay request events into BarStream and observe the replayed events in the logStream.