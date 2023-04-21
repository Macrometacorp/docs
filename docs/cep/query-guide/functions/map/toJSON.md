---
title: toJSON (Function)
---

Function converts a map into a JSON object and returns the JSON as a string.

## Syntax

```sql
<STRING> map:toJSON(<OBJECT> map)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| map  | The map that needs to be converted to JSON |               | OBJECT  | No | Yes |

## Example 1

```sql
@info(name = 'query1')
map:toJSON(company)
```

The `map:toJSON(company)` function takes the `company` map, which has key-value pairs like (`symbol`:`gdn`), (`volume` : 100), and (`price`, 200), and converts it into a JSON string: `{"symbol" : "gdn", "volume" : 100 , "price" : 200}`.
