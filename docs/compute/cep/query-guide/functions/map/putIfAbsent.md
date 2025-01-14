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
CREATE SINK STREAM UpdatedStockData (symbol string, stockValues object);

@info(name = 'UpdateStockDetails')
INSERT INTO UpdatedStockData
SELECT symbol, map:putIfAbsent(map:create('price', price, 'volume', volume), 'price', price) AS stockValues
FROM StockInput;
```

In this example, the `StockInput` stream is created to provide input to the query, and the `UpdatedStockData` stream is created to collect the output.

The `UpdateStockDetails` query processes events from the `StockInput` stream, which contains stock details (`symbol`, `price`, and `volume`). It uses the `map:putIfAbsent(map:create('price', price, 'volume', volume), 'price', price)` function to create a map with 'price' and 'volume' keys and corresponding `price` and `volume` from the stream as values only if the 'price' key does not already exist.

The resulting map is then associated with the corresponding stock symbol and inserted into the `UpdatedStockData` stream. This way, the `UpdatedStockData` stream retains a unique set of stock details with each symbol mapped to a map of its 'price' and 'volume' from the `StockInput` stream.

In this stream worker, each event in `StockInput` generates a new map with 'price' and 'volume'. This is different from previous examples where the map was assumed to be an attribute of the stream or existed in a previous state. If you need to maintain the map across events, some form of state management or a different stream processing pattern may be necessary.
