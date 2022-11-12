---
title: kafka (Sink)
---

A Kafka sink publishes events processed by gdn SP to a topic with  partition for a Kafka cluster. The events can be published in the `TEXT `XML` `JSON` or `Binary` format. If the topic is not already created i the Kafka cluster, the Kafka sink creates the default partition for th given topic. The publishing topic and partition can be a dynamic valu taken from the Stream App event. To configure a sink to use the Kafk transport, the `type` parameter should have `kafka` as its value.

Syntax

    CREATE SINK <NAME> WITH (type="kafka", map.type="<STRING>", bootstrap.servers="<STRING>", topic="<STRING>", partition.no="<INT>", sequence.id="<STRING>", key="<STRING>", is.binary.message="<BOOL>", optional.configuration="<STRING>")


## Query Parameters

| Name                   | Description                                                                                                                                                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| bootstrap.servers      | This parameter specifies the list of Kafka servers to which the Kafka sink must publish events. This list should be provided as a set of comma separated values. e.g., `localhost:9092,localhost:9093`. |               | STRING              | No       | No      |
| topic                  | The topic to which the Kafka sink needs to publish events. Only one topic must be specified.                                                                                                            |               | STRING              | No       | No      |
| partition.no           | The partition number for the given topic. Only one partition ID can be defined. If no value is specified for this parameter, the Kafka sink publishes to the default partition of the topic (i.e., 0)   | 0             | INT                 | Yes      | No      |
| sequence.id            | A unique identifier to identify the messages published by this sink. This ID allows receivers to identify the sink that published a specific message.                                                   | null          | STRING              | Yes      | No      |
| key                    | The key contains the values that are used to maintain ordering in a Kafka partition.                                                                                                                    | null          | STRING              | Yes      | No      |
| is.binary.message      | In order to send the binary events via kafka sink, this parameter is set to `True`.                                                                                                                   | null          | BOOL                | No       | No      |
| optional.configuration | This parameter contains all the other possible configurations that the producer is created with. e.g., `producer.type:async,batch.size:200`                                                             | null          | STRING              | Yes      | No      |

## Example 1

    @App:name('TestExecutionPlan')
    CREATE STREAM FooStream (symbol string, price float, volume long);

    @info(name = 'query1')
    CREATE SINK BarStream WITH (type='kafka', topic='topic_with_partitions', partition.no='0', bootstrap.servers='localhost:9092', map.type='xml') (symbol string, price float, volume long);

    insert into BarStream
    from FooStream select symbol, price, volume ;

This Kafka sink configuration publishes to 0th partition of the topic named `topic_with_partitions`.

## Example 2

    @App:name('TestExecutionPlan')
    CREATE STREAM FooStream (symbol string, price float, volume long);

    @info(name = 'query1')
    CREATE SINK BarStream WITH (type='kafka', topic='{{symbol}}', partition.no='{{volume}}', bootstrap.servers='localhost:9092', map.type='xml') (symbol string, price float, volume long);

    insert into BarStream
    from FooStream select symbol, price, volume ;

This query publishes dynamic topic and partitions that are taken from the Stream App event. The value for `partition.no` is taken from the `volume` attribute, and the topic value is taken from the `symbol` attribute.