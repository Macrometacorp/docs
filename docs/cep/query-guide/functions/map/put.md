---
title: put (Function)
---

Function returns the updated map after adding the given key-value pair. If the key already exist in the map the key is updated with the new value.

## Syntax

```sql
<OBJECT> map:put(<OBJECT> map, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types  | Optional | Dynamic |
|-------|--------------|---------------|----------------------|----------|---------|
| map  | The map to which the value should be added. |               | OBJECT | No | Yes |
| key | The key to be added.  |           | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No | Yes |
| value | The value to be added.   |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No  | Yes |

## Example 1

```sql
map:put(stockDetails , 'IBM' , '200')
```

In this example, the `map:put(stockDetails, 'IBM', '200')` function updates the map named `stockDetails` by adding a new key-value pair to it. The key is `'IBM'` and the corresponding value is `'200'`. The function will return the updated map which includes the new key-value pair.

```sql
CREATE STREAM StockInput (symbol string, price float, stockDetails object);
CREATE SINK STREAM UpdatedStockDetails (updatedStockDetails object);

@info(name = 'AddNewStock')
INSERT INTO UpdatedStockDetails
SELECT map:put(stockDetails, symbol, price) AS updatedStockDetails
FROM StockInput;
```

In this stream worker, the `StockInput` stream includes an additional attribute `stockDetails`, which is a map that we will update. The `AddNewStock` query selects the output of the `map:put(stockDetails, symbol, price)` function from the `StockInput` stream.

This function updates the map `stockDetails` with each incoming event from `StockInput` by adding or updating a key-value pair to it. The key is the `symbol` of the stock, and the corresponding value is its `price`.

The updated map is then inserted into the `UpdatedStockDetails` stream. This way, the `stockDetails` map keeps updating with every incoming stock detail from the `StockInput` stream.

This stream worker assumes that you provide an initial map as an input in the `StockInput` stream. If you want to start with an empty map, you'll need to use a function that allows creating an empty map or check for null and create an empty map before using `map:put()`.
