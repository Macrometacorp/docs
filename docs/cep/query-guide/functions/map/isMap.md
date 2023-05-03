---
title: isMap (Function)
---

Function checks if the object is type of a map.

## Syntax

```sql
<BOOL> map:isMap(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> arg)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| arg | The argument the need to be determined whether it's a map or not. |       | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
map:isMap(stockDetails)
```

The `map:isMap(stockDetails)` function checks if the `stockDetails` object is an instance of `java.util.Map`. If the object is a map, it returns `true`, otherwise, it returns `false`.
