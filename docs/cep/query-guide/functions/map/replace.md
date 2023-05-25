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
CREATE STREAM StockInput (symbol string, price float, volume int);
CREATE SINK STREAM UpdatedStockDetails (stockDetails object);

@info(name = 'UpdateStockDetails')
INSERT INTO UpdatedStockDetails
SELECT map:replace(stockDetails, symbol, price) AS stockDetails
FROM StockInput;
```

In this stream processing example, the `StockInput` stream provides input data to the query, and the `UpdatedStockDetails` stream collects the output.

The query named `UpdateStockDetails` receives events from the `StockInput` stream, each of which contains stock details such as `symbol`, `price`, and `volume`. It uses the `map:replace(stockDetails, symbol, price)` function to replace the price associated with the symbol in the `stockDetails` map if the symbol is present.

The updated `stockDetails` map, now containing the replaced price for the specified stock symbol, is then inserted into the `UpdatedStockDetails` stream. Through this process, the `stockDetails` map is continually updated with current stock prices from the `StockInput` stream.
