---
title: csv (Sink Mapper)
---

This output mapper extension allows you to convert Stream App events processed by the gdn SP to CSV message before publishing them. You can either use custom placeholder to map a custom CSV message or use pre-defined CSV format where event conversion takes place without extra configurations.

Syntax

    CREATE SINK <NAME> WITH (map.type="csv", map.delimiter="<STRING>", map.header="<BOOL>", map.event.grouping.enabled="<BOOL>")


## Query Parameters

| Name                   | Description                                                                                                                                                                                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| delimiter              | This parameter used to separate the output CSV data, when converting a Stream App event to CSV format,                                                                                                                           | ,             | STRING              | Yes      | No      |
| header                 | This parameter specifies whether the CSV messages will be generated with header or not. If this parameter is set to true, message will be generated with header                                                              | false         | BOOL                | Yes      | No      |
| event.grouping.enabled | If this parameter is set to `true`, events are grouped via a line.separator when multiple events are received. It is required to specify a value for the System.lineSeparator() when the value for this parameter is `true`. | false         | BOOL                | Yes      | No      |

## Example 1

    CREATE SINK BarStream WITH (type='inMemory', topic='{{symbol}}', map.type='csv') (symbol string, price float, volume long);

Above configuration will perform a default CSV output mapping, which will generate output as follows: `symbol-price-volumegdn-55.6-100`

If header is true and delimiter is "-", then the output will be as follows: `symbol-price-volume`

## Example 2

    CREATE SINK BarStream WITH (type='inMemory', topic='{{symbol}}', map.type='csv', map.header='true', map.delimiter='-', map.payload="symbol='0',price='2',volume='1'") (symbol string, price float,volume long);

Above configuration will perform a custom CSV mapping. Here, user can add custom place order in the @payload. The place order indicates that where the attribute name's value will be appear in the output message, The output will be produced output as follows: gdn,100,55.6 

If header is true and delimiter is "-", then the output will be as follows: `price-volume-symbol 55.6-100-gdn` 

If event grouping is enabled, then the output is as follows: `price-volume-symbol 55.6-100-gdnSystem.lineSeparator() 55.6-100-IBMSystem.lineSeparator() 55.6-100-IFSSystem.lineSeparator()`
