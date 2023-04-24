---
title: getInt (Function)
---

Function retrieves the `int` value specified in the given path of the JSON element.

## Syntax

```sql
<INT> json:getInt(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing int value.  |             | STRING OBJECT   | No     | Yes   |
| path | The JSON path to fetch the int value. |             | STRING          | No     | Yes   |

## Example 1

```sql
@info(name = 'query1')
json:getInt(json,'$.age')
```

For a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getInt(json,'$.age')` searches for an integer value associated with the key `age`. In this case, it returns `23` as there is a matching integer at `$.age`.

## Example 2

```sql
@info(name = 'query1')
json:getInt(json,'$.salary')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getInt(json,'$.salary')` searches for an integer value associated with the key `salary`. In this case, it returns `null` as there is no matching element at `$.salary`.

## Example 3

```sql
@info(name = 'query1')
json:getInt(json,'$.name')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getInt(json,'$.name')` searches for an integer value associated with the key `name`. In this case, it returns `null` as there is no matching integer at `$.name`.
