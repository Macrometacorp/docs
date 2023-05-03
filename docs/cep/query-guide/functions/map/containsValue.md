---
title: containsValue (Function)
---

Function checks if the map contains the value.

## Syntax

```sql
<BOOL> map:containsValue(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value)
```

## Query Parameters

| Name  | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|-------|---------------|---------------|---------------------|----------|---------|
| map   | The map the needs to be checked on containing the value or not. |               | OBJECT  | No     | Yes     |
| value | The value to be checked.    |               | INT LONG FLOAT DOUBLE BOOL STRING | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
map:containsValue(stockDetails, 'IBM')
```

The `map:containsValue(stockDetails, 'IBM')` function returns `true` if the `stockDetails` map contains the value `IBM`, otherwise, it returns `false`.
