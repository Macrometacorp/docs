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
CREATE SINK STREAM Output (stockValues string);

@info(name = 'ExtractStockValues')
INSERT INTO Output
SELECT str:join(",", map:values(stockDetails)) AS stockValues
FROM StockStream WINDOW TUMBLING_LENGTH(5);
```

In this stream processing example, the `StockStream` stream is created to provide input to the query and the `Output` stream is created to collect the output.

The `StockStream` stream includes stock details (`symbol`, `volume`, `price`) and a `stockDetails` map. The `ExtractStockValues` query listens for batches of 5 events from the `StockStream`.

The `map:values(stockDetails)` function is used to retrieve the values from each `stockDetails` map. These values are then joined into a string with commas using the `str:join(",", ...)` function. This string, referred to as `stockValues`, is then inserted into the `Output` stream.

This way, the `ExtractStockValues` query continuously processes batches of 5 stock details, transforms the values of these details into a comma-separated string, and sends this string to the `Output` stream.
