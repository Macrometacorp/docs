---
title: kafkaMultiDC (Sink)
---

A Kafka sink publishes events processed by gdn SP to a topic with a partition for a Kafka cluster. The events can be published in the `TEXT` `XML` `JSON` or `Binary` format. If the topic is not already created in the Kafka cluster, the Kafka sink creates the default partition for the given topic. The publishing topic and partition can be a dynamic value taken from the Stream App event. To configure a sink to publish events via the Kafka transport, and using two Kafka brokers to publish events to the same topic, the `type` parameter must have `kafkaMultiDC` as its value.

Syntax

    CREATE SINK <NAME> WITH (type="kafkaMultiDC", map.type="<STRING>", bootstrap.servers="<STRING>", topic="<STRING>", sequence.id="<STRING>", key="<STRING>", partition.no="<INT>", is.binary.message="<BOOL>", optional.configuration="<STRING>")

## Query Parameters

| Name                   | Description                                                                                                                                                                                                                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| bootstrap.servers      | This parameter specifies the list of Kafka servers to which the Kafka sink must publish events. This list should be provided as a set of comma -separated values. There must be at least two servers in this list. e.g., `localhost:9092,localhost:9093`. |               | STRING              | No       | No      |
| topic                  | The topic to which the Kafka sink needs to publish events. Only one topic must be specified.                                                                                                                                                              |               | STRING              | No       | No      |
| sequence.id            | A unique identifier to identify the messages published by this sink. This ID allows receivers to identify the sink that published a specific message.                                                                                                     | null          | STRING              | Yes      | No      |
| key                    | The key contains the values that are used to maintain ordering in a Kafka partition.                                                                                                                                                                      | null          | STRING              | Yes      | No      |
| partition.no           | The partition number for the given topic. Only one partition ID can be defined. If no value is specified for this parameter, the Kafka sink publishes to the default partition of the topic (i.e., 0)                                                     | 0             | INT                 | Yes      | No      |
| is.binary.message      | In order to send the binary events via kafkaMultiDCSink, it is required to set this parameter to `true`.                                                                                                                                                  | null          | BOOL                | No       | No      |
| optional.configuration | This parameter contains all the other possible configurations that the producer is created with. e.g., `producer.type:async,batch.size:200`                                                                                                               | null          | STRING              | Yes      | No      |

## Example 1

    @App:name('TestExecutionPlan')
    CREATE STREAM FooStream (symbol string, price float, volume long);

    @info(name = 'query1')
    CREATE SINK BarStream WITH (type='kafkaMultiDC', topic='myTopic', partition.no='0', bootstrap.servers='host1:9092, host2:9092', map.type='xml') (symbol string, price float, volume long);

    insert into BarStream
    from FooStream select symbol, price, volume ;

This query publishes to the default (i.e., 0th) partition of the brokers in two data centers
