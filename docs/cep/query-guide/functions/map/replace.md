---
title: replace (Function)
---

Function returns the updated map after replacing the given key-value pair only if key is present.

## Syntax

```sql
<OBJECT> map:replace(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| map | The map to which the key-value should be replaced. |               | OBJECT  | No   | Yes  |
| key   | The key to be replaced.  |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |
| value | The value to be replaced. |               | INT LONG FLOAT DOUBLE BOOL STRING   | No  | Yes  |

## Example 1

```sql
map:replace(stockDetails , 1234 , 'IBM')
```

The `map:replace(stockDetails, 1234, 'IBM')` function is designed to operate on the `stockDetails` map, targeting the key `1234`. If this key is present within the map, the function will replace the corresponding value with 'IBM'. The resultant updated `stockDetails` map is then returned.

## Example 2

```sql
CREATE STREAM StockInput (symbol string, price float, volume int, stockDetails object);
CREATE SINK STREAM UpdatedStockDetails (stockDetails object);

@info(name = 'UpdateStockDetails')
INSERT INTO UpdatedStockDetails
SELECT map:replace(stockDetails, symbol, price) AS stockDetails
FROM StockInput;
```

In this stream worker example, the `StockInput` stream carries `symbol`, `price`, `volume`, and a `stockDetails` map. This map represents the current state of various stock symbols and their associated prices.

The `UpdateStockDetails` query takes events from the `StockInput` stream and applies the `map:replace(stockDetails, symbol, price)` function on each event to update the `stockDetails` map. If the `symbol` from the current event exists as a key in the `stockDetails` map, then its associated value (i.e., price) gets replaced with the `price` from the current event.

The resulting `stockDetails` map, reflecting the replaced price for the symbol in question, is sent to the `UpdatedStockDetails` stream. This ensures that the `stockDetails` map is consistently updated with the latest stock prices from the `StockInput` stream.
