---
title: log (Sink)
---

This is a sink that can be used as a logger. This will log the output events in the output stream with user specified priority and a prefix

Syntax

    CREATE SINK <NAME> WITH (type="log", map.type="<STRING>", priority="<STRING>", prefix="<STRING>")


## Query Parameters

| Name     | Description                                                                                                                                                           | Default Value            | Possible Data Types | Optional | Dynamic |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|---------------------|----------|---------|
| priority | This will set the logger priority i.e log level. Accepted values are INFO, DEBUG, WARN, FATAL, ERROR, OFF, TRACE                                                      | INFO                     | STRING              | Yes      | No      |
| prefix   | This will be the prefix to the output message. If the output stream has event \[2,4\] and the prefix is given as "Hello" then the log will show "Hello : [2,4]" | default prefix will be : | STRING              | Yes      | No      |

## Example 1

    CREATE SINK BarStream WITH (type='log', prefix='My Log', priority='DEBUG') (symbol string, price float, volume long)

In this example BarStream uses log sink and the prefix is given as My Log. Also the priority is set to DEBUG.

## Example 2

    CREATE SINK BarStream WITH (type='log', priority='DEBUG') (symbol string, price float, volume long)

In this example BarStream uses log sink and the priority is set to DEBUG. User has not specified prefix so the default prefix will be in the form \<Stream App App Name\> : \<Stream Name\>

## Example 3

    CREATE SINK BarStream WITH (type='log', prefix='My Log') (symbol string, price float, volume long)

In this example BarStream uses log sink and the prefix is given as My Log. User has not given a priority so it will be set to default INFO.

## Example 4

    CREATE SINK BarStream WITH (type='log') (symbol string, price float, volume long)

In this example BarStream uses log sink. The user has not given prefix or priority so they will be set to their default values.
