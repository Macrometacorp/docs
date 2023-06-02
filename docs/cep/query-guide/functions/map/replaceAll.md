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
CREATE STREAM StockInput (symbol string, price float, volume int, stockDetails object, newDetails object);
CREATE SINK STREAM UpdatedStockDetails (stockDetails object);

@info(name = 'ReplaceStockDetails')
INSERT INTO UpdatedStockDetails
SELECT map:replaceAll(stockDetails, newDetails) AS stockDetails
FROM StockInput;
```

In this stream worker example, the `StockInput` stream carries `symbol`, `price`, `volume`, along with two maps - `stockDetails` and `newDetails`. The `stockDetails` map represents the current state of various stock symbols and their associated details, while the `newDetails` map holds the new details that should replace the existing ones in `stockDetails`.

The `ReplaceStockDetails` query operates on events from the `StockInput` stream. It uses the `map:replaceAll(stockDetails, newDetails)` function to replace all the existing key-value pairs in the `stockDetails` map with the key-value pairs from the `newDetails` map.

The resultant `stockDetails` map, which reflects the updated stock details, is then inserted into the `UpdatedStockDetails` stream. This ensures that the `stockDetails` map is continually refreshed with the latest stock details from the `StockInput` stream.
