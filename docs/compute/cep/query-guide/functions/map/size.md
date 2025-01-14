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
CREATE STREAM StockInput (symbol string, price float, volume int, stockDetails object);
CREATE SINK STREAM StockCount (stockDetailsSize int);

@info(name = 'CountStockDetails')
INSERT INTO StockCount
SELECT map:size(stockDetails) AS stockDetailsSize
FROM StockInput WINDOW TUMBLING_LENGTH(10);
```

In this stream processing example, the `StockInput` stream is created to provide input data to the query and includes stock details (`symbol`, `price`, `volume`) and a `stockDetails` map. The `StockCount` stream is created to collect the output.

The `CountStockDetails` query processes events from the `StockInput` stream in batches of 10, each event including a `stockDetails` map. It employs the `map:size(stockDetails)` function to calculate the number of key-value pairs present in the `stockDetails` map for each batch.

The resulting count, referred to as `stockDetailsSize`, is then inserted into the `StockCount` stream. Thus, this query continuously counts the number of key-value pairs in the `stockDetails` map after each batch of events and sends this information to the `StockCount` stream.
