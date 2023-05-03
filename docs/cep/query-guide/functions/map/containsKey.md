---
title: containsKey (Function)
---

Function checks if the map contains the key.

## Syntax

```sql
<BOOL> map:containsKey(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|BOOL|STRING> key)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| map  | The map the needs to be checked on containing the key or not. |               | OBJECT  | No   | Yes   |
| key | The key to be checked. |          | INT LONG FLOAT DOUBLE BOOL STRING | No  | Yes  |

## Example 1

```sql
@info(name = 'query1')
map:containsKey(stockDetails, '1234')
```

The `map:containsKey(stockDetails, '1234')` function returns `true` if the `stockDetails` map contains the key `1234`, otherwise, it returns `false`.
