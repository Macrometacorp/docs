---
title: tokenize (Stream Processor)
---

Tokenize the map and return each key, value as new attributes in events

## Syntax

```sql
map:tokenize(<OBJECT> map)
map:tokenize(<OBJECT> map, <OBJECT> ...)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------|---------------|---------------------|----------|---------|
| map  | Hash map containing key value pairs |     | OBJECT     | No       | Yes     |

## Extra Return Attributes

| Name  | Description    | Possible Types |
|-------|----------------|----------------|
| key   | Key of an entry consisted in the map     | OBJECT         |
| value | Value of an entry consisted in the map. If more than one map is given, then an Array List of values from each map is returned for the `value` attribute. | OBJECT         |

## Example 1

```sql
CREATE STREAM StockStream(symbol STRING, price FLOAT);

@info(name = 'collectSymbolPrice')
INSERT INTO TempStream
SELECT map:collect(symbol, price) AS symbolPriceMap
FROM StockStream WINDOW TUMBLING_LENGTH(2);

@info(name = 'tokenizeSymbolPrice')
INSERT INTO SymbolStream
SELECT key, value
FROM TempStream#map:tokenize(customMap);
```

In the `collectSymbolPrice` query, the `map:collect(symbol, price)` function is used to create a `symbolPriceMap` that collects symbol and price pairs from two events in the `StockStream` based on a tumbling length window of 2.

In the `tokenizeSymbolPrice` query, the `map:tokenize(customMap)` function is applied on the `TempStream` to tokenize the `symbolPriceMap` and generate two separate events in the `SymbolStream` with the key and value attributes set to the symbol names and their corresponding prices.
