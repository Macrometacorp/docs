---
title: remove (Function)
---

Function returns the updated map after removing the element with the specified key.

## Syntax

```sql
<OBJECT> map:remove(<OBJECT> map, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types  | Optional | Dynamic |
|------|---------------|---------------|----------------------|----------|---------|
| map  | The map that needs to be updated.   |             | OBJECT   | No  | Yes |
| key  | The key of the element that needs to removed. |         | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No | Yes  |

## Example 1

```sql
map:remove(stockDetails, 1234)
```

The `map:remove(stockDetails, 1234)` function operates on the `stockDetails` map, targeting the key `1234`. If the key `1234` exists in the `stockDetails` map, it removes the corresponding key-value pair. The updated `stockDetails` map, now without the key `1234`, is returned.

## Example 2

```sql
CREATE STREAM StockInput (symbol string, price float, volume int);
CREATE SINK STREAM UpdatedStockDetails (stockDetails object);

@info(name = 'UpdateStockDetails')
INSERT INTO UpdatedStockDetails
SELECT map:remove(stockDetails, symbol) AS stockDetails
FROM StockInput;
```

In this stream processing scenario, the `StockInput` stream is created to provide input to the query and the `UpdatedStockDetails` stream is created to collect the output.

The `UpdateStockDetails` query takes events from the `StockInput` stream, which include stock details (`symbol`, `price`, and `volume`). It uses the `map:remove(stockDetails, symbol)` function to remove a stock's details from the `stockDetails` map if the stock symbol is present.

The updated `stockDetails` map, which now does not contain the details of the stock specified in the `StockInput` stream, is then inserted into the `UpdatedStockDetails` stream. This way, the `stockDetails` map is updated by removing specific stock details from the `StockInput` stream.
