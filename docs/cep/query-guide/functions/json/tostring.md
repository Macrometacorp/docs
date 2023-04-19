---
title: toString (Function)
---

Function generates a JSON string corresponding to a given JSON object.

## Syntax

```sql
<STRING> json:toString(<OBJECT> json)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| json | A valid JSON object to generates a JSON string. |       | OBJECT  | No  | Yes  |

## Example 1

```sql
@info(name = 'query1')
json:toString(json)
```

The `json:toString(json)` function takes a JSON object as input and returns the corresponding JSON string. This is useful when you need to convert a JSON object to a JSON string format, for example, to store the data or send it as a message.
