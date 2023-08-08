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
CREATE STREAM StockInput (symbol string, price float, volume int, stockDetails object);
CREATE SINK STREAM UpdatedStockDetails (stockDetails object);

@info(name = 'RemoveStock')
INSERT INTO UpdatedStockDetails
SELECT map:remove(stockDetails, symbol) AS stockDetails
FROM StockInput;
```

In this stream worker example, two streams are created: `StockInput` and `UpdatedStockDetails`. The `StockInput` stream serves as the input, comprising of stock details such as `symbol`, `price`, `volume`, and the `stockDetails` map. 

The `RemoveStock` query processes events from the `StockInput` stream, invoking the `map:remove(stockDetails, symbol)` function. This function attempts to locate the stock symbol within the `stockDetails` map. If the symbol is present, the corresponding key-value pair is removed.

The outcome is an updated `stockDetails` map, which no longer includes the stock details corresponding to the symbol from the `StockInput` stream event. This updated map is then inserted into the `UpdatedStockDetails` stream. 

Through this mechanism, `stockDetails` in the `UpdatedStockDetails` stream evolves by removing specific stock details from `StockInput`, maintaining a dynamic map based on the incoming stream events.
