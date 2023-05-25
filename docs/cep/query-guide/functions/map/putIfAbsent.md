---
title: putIfAbsent (Function)
---

Function returns the updated map after adding the given key-value pair if key is absent.

## Syntax

```sql
<OBJECT> map:putIfAbsent(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types  | Optional | Dynamic |
|-------|-------------|---------------|----------------------|----------|---------|
| map   | The map to which the value should be added. |               | OBJECT  | No | Yes |
| key   | The key to be added.  |         | INT LONG FLOAT DOUBLE BOOL STRING | No  | Yes |
| value | The value to be added.  |       | INT LONG FLOAT DOUBLE BOOL STRING | No  | Yes |

## Example 1

```sql
map:putIfAbsent(stockDetails , 1234 , 'IBM')
```

The `map:putIfAbsent(stockDetails, 1234, 'IBM')` function checks the `stockDetails` map for the presence of the key `1234`. If the key `1234` is not present in the map, it inserts the key-value pair `1234`:`'IBM'` into the map. However, if the key `1234` already exists in the map, the map remains unchanged. The function returns the `stockDetails` map after the operation.

## Example 2

```sql
CREATE STREAM StockInput (symbol string, price float, volume int);
CREATE SINK STREAM UpdatedStockDetails (stockDetails object);

@info(name = 'UpdateStockDetails')
INSERT INTO UpdatedStockDetails
SELECT map:putIfAbsent(stockDetails, symbol, map:create('price', price, 'volume', volume)) AS stockDetails
FROM StockInput;
```

In this stream processing scenario, the `StockInput` stream is created to provide input to the query and the `UpdatedStockDetails` stream is created to collect the output.

The `UpdateStockDetails` query takes events from the `StockInput` stream, which includes stock details (`symbol`, `price`, and `volume`). It uses the `map:putIfAbsent(stockDetails, symbol, map:create('price', price, 'volume', volume))` function to add a new stock's details into the `stockDetails` map only if the stock symbol is not already present.

If a stock symbol is not in `stockDetails`, a new map is created with 'price' and 'volume' as keys and the corresponding `price` and `volume` from the stream as values. This new map is then associated with the symbol in the `stockDetails` map. However, if the symbol is already present in `stockDetails`, the map remains unchanged.

The updated `stockDetails` map is then inserted into the `UpdatedStockDetails` stream. This way, the `stockDetails` map retains a unique set of stock details from the `StockInput` stream.
