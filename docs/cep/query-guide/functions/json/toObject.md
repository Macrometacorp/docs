---
title: toObject (Function)
---

Function generate JSON object from the given JSON string.

## Syntax

```sql
<OBJECT> json:toObject(<STRING> json)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------|---------------|---------------------|----------|---------|
| json | A valid JSON string that needs to be converted to a JSON object. |       | STRING    | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
json:toJson(json)
```

The `json:toJson(json)` function takes a JSON string as input and returns the corresponding JSON object. This is useful when you need to process or manipulate a JSON string as a JSON object in your query.
