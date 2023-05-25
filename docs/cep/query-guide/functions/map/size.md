---
title: size (Function)
---

Function to return the size of the map.

## Syntax

```sql
<INT> map:size(<OBJECT> map)
```

## Query Parameters

| Name | Description    | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------|---------------|---------------------|----------|---------|
| map  | The map for which size should be returned. |               | OBJECT              | No       | Yes     |

## Example 1

```sql
map:size(stockDetails)
```

The `map:size(stockDetails)` function is employed to determine the number of key-value pairs present in the `stockDetails` map. It returns the count as an integer value.

## Example 2

```sql
CREATE STREAM StockInput (symbol string, price float, volume int);
CREATE SINK STREAM StockCount (stockDetailsSize int);

@info(name = 'CountStockDetails')
INSERT INTO StockCount
SELECT map:size(stockDetails) AS stockDetailsSize
FROM StockInput#window.lengthBatch(10);
```

In this stream processing example, two streams are defined: the `StockInput` stream, which feeds data into the system, and the `StockCount` stream, which receives the output.

The `CountStockDetails` query listens for events in batches of 10 from the `StockInput` stream. Each event consists of stock details such as `symbol`, `price`, and `volume`. The query uses the `map:size(stockDetails)` function to count the number of key-value pairs in the `stockDetails` map for each batch of events.

The count, named `stockDetailsSize`, is then inserted into the `StockCount` stream. This query continuously calculates the number of key-value pairs in the `stockDetails` map after each batch of events and sends this information to the `StockCount` stream.
