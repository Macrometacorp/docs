---
title: replaceAll (Function)
---

Function returns the updated map after replacing all the key-value pairs from another map, if keys are present.

## Syntax

```sql
<OBJECT> map:replaceAll(<OBJECT> to.map, <OBJECT> from.map)
```

## Query Parameters

| Name     | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|----------|---------------|---------------|---------------------|----------|---------|
| to.map   | The map into which the key-values need to copied. |       | OBJECT | No | Yes |
| from.map | The map from which the key-values are copied.  |         | OBJECT | No | Yes |

## Example 1

```sql
map:replaceAll(toMap, fromMap)
```

The `map:replaceAll(toMap, fromMap)` function operates on two input maps: `toMap` and `fromMap`. In the given example, `toMap` initially holds the key-value pairs (`symbol`: `gdn`), (`volume`: 100). Meanwhile, `fromMap` carries the pairs (`symbol`: `IBM`), (`price` : 12). This function performs an operation that replaces all the values in `toMap` with the corresponding values from `fromMap` when the keys match in both maps. The outcome of this example would be an updated `toMap` that holds the pairs (`symbol`: `IBM`), (`volume`: 100).

## Example 2

```sql
CREATE STREAM StockInput (symbol string, price float, volume int);
CREATE SINK STREAM UpdatedStockDetails (stockDetails object);

@info(name = 'ReplaceStockDetails')
INSERT INTO UpdatedStockDetails
SELECT map:replaceAll(stockDetails, newDetails) AS stockDetails
FROM StockInput#window.length(1)
JOIN StockDetailsTable
ON StockInput.symbol == StockDetailsTable.symbol;
```

In this stream processing example, we have two streams: the `StockInput` stream, which provides input data to the query, and the `UpdatedStockDetails` stream, which collects the output.

The query named `ReplaceStockDetails` listens for events from the `StockInput` stream, each event containing stock details like `symbol`, `price`, and `volume`. For each event, it creates a new map `newDetails` using these details, then uses the `map:replaceAll(stockDetails, newDetails)` function to replace all matching values in the `stockDetails` map with those from `newDetails`.

The updated `stockDetails` map, now with the most recent stock prices, is then inserted into the `UpdatedStockDetails` stream. This process continuously updates the `stockDetails` map with the latest stock prices from the `StockInput` stream.
