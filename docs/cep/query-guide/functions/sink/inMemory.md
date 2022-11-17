---
title: inMemory (Sink)
---

In-memory sink publishes events to In-memory sources that are subscribe to the same topic to which the sink publishes. This provides a way to connect multiple Stream Apps deployed under the same Stream Apps Manager (JVM). Here both the publisher and subscriber should have the same event schema (stream definition) for successful data transfer.

Syntax

    CREATE SINK <NAME> WITH (type="inMemory", map.type="<STRING>", topic="<STRING>")

## Query Parameters

| Name  | Description                                                         | Default Value | Possible Data Types | Optional | Dynamic |
|-------|---------------------------------------------------------------------|---------------|---------------------|----------|---------|
| topic | Event are delivered to allthe subscribers subscribed on this topic. |               | STRING              | No       | No      |

## Example 1

    CREATE SINK StocksStream WITH (type='inMemory', topic='Stocks', map.type='passThrough') (symbol string, price float, volume long);

Here the `StocksStream` uses inMemory sink to emit the Stream App events to all the inMemory sources deployed in the same JVM and subscribed to the topic `Stocks`.
