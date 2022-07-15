---
title: sizeOfSet (Function)
---

Returns the size of an object of type java.util.Set.

Syntax

    <INT> sizeOfSet(<OBJECT> set)

## Query Parameters

| Name | Description                                                                                                                                | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| set  | The set object. This parameter should be of type java.util.Set. A set object may be created by the `set` attribute aggregator. |               | OBJECT              | No       | Yes     |

## Example 1
    insert into initStream
    select initSet(symbol) as initialSet
    from stockStream;

    insert into distinctStockStream
    select union(initialSet) as distinctSymbols
    from initStream WINDOW TUMBLING_TIME(10 sec);

    insert into sizeStream
    select sizeOfSet(distinctSymbols) sizeOfSymbolSet
    from distinctStockStream;

The sizeStream stream will output the number of distinct stock symbols received during a sliding window of 10 seconds.