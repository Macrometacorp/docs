---
title: kafkaMultiDC (Source)
---

The Kafka Multi-Datacenter(DC) source receives records from the same
topic in brokers deployed in two different kafka clusters. It filters
out all the duplicate messages and ensuresthat the events are received
in the correct order using sequential numbering. It receives events in
formats such as `TEXT`, `XML` JSON` and `Binary\`.The Kafka Source
creates the default partition `0` for a given topic, if the topic has
not yet been created in the Kafka cluster.

Syntax

    CREATE SOURCE <NAME> WITH (type="kafkaMultiDC", map.type="<STRING>", bootstrap.servers="<STRING>", topic="<STRING>", partition.no="<INT>", is.binary.message="<BOOL>", optional.configuration="<STRING>")

## Query Parameters

| Name                   | Description                                                                                                                                              | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| bootstrap.servers      | This contains the kafka server list which the kafka source listens to. This is given using comma-separated values. eg: `localhost:9092,localhost:9093` |               | STRING              | No       | No      |
| topic                  | This is the topic that the source listens to. eg: `topic_one`                                                                                         |               | STRING              | No       | No      |
| partition.no           | This is the partition number of the given topic.                                                                                                         | 0             | INT                 | Yes      | No      |
| is.binary.message      | In order to receive the binary events via the Kafka Multi-DC source, the value of this parameter needs to be set to `True`.                            | false         | BOOL                | Yes      | No      |
| optional.configuration | This contains all the other possible configurations with which the consumer can be created.eg: producer.type:async,batch.size:200                        | null          | STRING              | Yes      | No      |

## Example 1

    @App:name('TestExecutionPlan')
    CREATE STREAM BarStream (symbol string, price float, volume long);

    @info(name = 'query1')
    CREATE SOURCE FooStream WITH (type='kafkaMultiDC', topic='kafka_topic', bootstrap.servers='host1:9092,host1:9093', partition.no='1', map.type='xml') (symbol string, price float, volume long);

    insert into BarStream
    from FooStream select symbol, price, volume;

The following query listens to `kafka_topic` topic, deployed in the
broker host1:9092 and host1:9093, with partition 1. A thread is created
for each broker. The receiving xml events are mapped to a stream processor event
and sent to the FooStream.
