---
title: getLong (Function)
---

Function retrieves the `long` value specified in the given path of the JSON element.

## Syntax

```sql
<LONG> json:getLong(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing long value.  |        | STRING OBJECT  | No   | Yes  |
| path | The JSON path to fetch the long value. |        | STRING         | No   | Yes  |

## Example 1

```sql
@info(name = 'query1')
json:getLong(json,'$.age')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getLong(json,'$.age')` searches for a long value associated with the key `age`. In this case, it returns `23` as there is a matching long at `$.age`.

## Example 2

```sql
@info(name = 'query1')
json:getLong(json,'$.salary')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getLong(json,'$.salary')` searches for a long value associated with the key `salary`. In this case, it returns `null` as there is no matching element at `$.salary`.

## Example 3

```sql
@info(name = 'query1')
json:getLong(json,'$.name')
```

For a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getLong(json,'$.name')` searches for a long value associated with the key `name`. In this case, it returns `null` as there is no matching long at `$.name`.
