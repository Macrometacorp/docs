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
CREATE STREAM StockStream (symbol string, volume int, price float);
CREATE SINK STREAM Output (stockValues string);

@info(name = 'ExtractStockValues')
INSERT INTO Output
SELECT str:join(",", map:values(stockDetails)) AS stockValues
FROM StockStream#window.lengthBatch(5);
```

In this streaming data example, two streams are defined: `StockStream` for input data and `Output` for the output.

The `ExtractStockValues` query listens for batches of 5 events from the `StockStream`. Each event is a set of stock details such as `symbol`, `volume`, and `price`, which are collectively treated as a map named `stockDetails`.

The `map:values(stockDetails)` function retrieves the values of each `stockDetails` map. The `str:join(",", ...)` function then joins these values into a string, separated by commas. This string, named `stockValues`, is then inserted into the `Output` stream.

The query continuously processes batches of 5 stock detail sets, converts the values of these details into a comma-separated string, and feeds this string into the `Output` stream.
