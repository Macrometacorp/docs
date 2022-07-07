---
title: tokenize (Stream Processor)
---

Tokenize the map and return each key, value as new attributes in events

Syntax

    map:tokenize(<OBJECT> map)
    map:tokenize(<OBJECT> map, <OBJECT> ...)

## Query Parameters

| Name | Description                         | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------|---------------|---------------------|----------|---------|
| map  | Hash map containing key value pairs |               | OBJECT              | No       | Yes     |

Extra Return Attributes

| Name  | Description                                                                                                                                              | Possible Types |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| key   | Key of an entry consisted in the map                                                                                                                     | OBJECT         |
| value | Value of an entry consisted in the map. If more than one map is given, then an Array List of values from each map is returned for the `value` attribute. | OBJECT         |

## Example 1

    CREATE STREAM StockStream(symbol string, price float);

    insert into TempStream
    select map:collect(symbol, price) as symbolPriceMap
    from StockStream WINDOW TUMBLING_LENGTH(2);

    insert into SymbolStream
    select key, value
    from TempStream#map:tokenize(customMap);

Based on the length batch window, `symbolPriceMap` will collect two events, and the map will then again tokenized to give 2 events with key and values being symbol name and price respectively.
