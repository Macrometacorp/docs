---
title: putAll (Function)
---

Function returns the updated map after adding all the key-value pairs from another map. If there are duplicate keys, the key will be assigned new values from the map that's being copied.

## Syntax

```sql
<OBJECT> map:putAll(<OBJECT> to.map, <OBJECT> from.map)
```

## Query Parameters

| Name     | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|----------|--------------|---------------|---------------------|----------|---------|
| to.map   | The map into which the key-values need to copied. |               | OBJECT  | No       | Yes     |
| from.map | The map from which the key-values are copied.   |               | OBJECT | No       | Yes     |

## Example 1

```sql
map:putAll(toMap, fromMap)
```

In this example, the `map:putAll(toMap, fromMap)` function is used to merge two maps, `toMap` and `fromMap`. It adds all the key-value pairs from `fromMap` into `toMap`. If a key already exists in `toMap` that is also in `fromMap`, then the value in `toMap` for that key is replaced by the value from `fromMap`.

For instance, if `toMap` contains key-value pairs (`symbol`: `gdn`) and (`volume`: 100), and `fromMap` contains key-value pairs (`symbol`: `IBM`) and (`price` : 12), after the function execution, the updated `toMap` will consist of key-value pairs (`symbol`: `IBM`), (`price` : 12), and (`volume` :100).

## Example 2

```sql
CREATE STREAM StockInput (symbol string, price float, volume int, currentDetails object);
CREATE SINK STREAM MergedStockDetails (mergedDetails object);

@info(name = 'MergeStockDetails')
INSERT INTO MergedStockDetails
SELECT map:putAll(currentDetails, map:create(symbol, price, 'volume', volume)) AS mergedDetails
FROM StockInput;
```

The `MergeStockDetails` query uses the `map:putAll(currentDetails, map:create(symbol, price, 'volume', volume))` function to merge the incoming stock details with the existing `currentDetails` map. If a stock symbol already exists in `currentDetails`, its price and volume are updated.

The resulting map is then inserted into the `MergedStockDetails` stream. This way, the `currentDetails` map keeps updating with every incoming stock detail from the `StockInput` stream.

This stream worker assumes that you provide an initial map as an input in the `StockInput` stream. If you want to start with an empty map, then you'll need to use a function that allows creating an empty map or check for null and create an empty map before using `map:putAll()`.
