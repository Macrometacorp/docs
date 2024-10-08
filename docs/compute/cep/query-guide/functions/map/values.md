---
title: values (Function)
---

Function to return the values of the map.

## Syntax

```sql
<OBJECT> map:values(<OBJECT> map)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| map  | The map from which list if values to be returned. |      | OBJECT  | No  | Yes |

## Example 1

```sql
map:values(stockDetails)
```

The `map:values(stockDetails)` function is used to retrieve a collection of all the values contained in the `stockDetails` map.

## Example 2

```sql
CREATE STREAM StockStream (symbol string, volume int, price float, stockDetails object);
CREATE SINK STREAM Output (stockValues object);

@info(name = 'ExtractStockValues')
INSERT INTO Output
SELECT map:values(stockDetails) AS stockValues
FROM StockStream WINDOW TUMBLING_LENGTH(5);
```

In this stream processing example, a `StockStream` is created with four fields - `symbol`, `volume`, `price`, and `stockDetails`. The `stockDetails` field contains a map of additional details for each stock. The `Output` sink stream is created to collect the output.

The `ExtractStockValues` query listens for batches of events from the `StockStream` and selects the `stockDetails` map from each event using the `map:values(stockDetails)` function. This map is then inserted into the `Output` stream.

The `WINDOW TUMBLING_LENGTH(5)` function is used to specify a tumbling window of 5 events, meaning that the query processes a batch of 5 events at a time. The `map:values(stockDetails)` function helps to extract and select the relevant data from the `stockDetails` map. The end result is a continuous flow of batches of stock details in the `Output` stream.
