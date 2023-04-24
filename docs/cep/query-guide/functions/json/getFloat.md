---
title: getFloat (Function)
---

Function retrieves the `float` value specified in the given path of the JSON element.

## Syntax

```sql
<FLOAT> json:getFloat(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing float value.  |           | STRING OBJECT  | No     | Yes   |
| path | The JSON path to fetch the float value. |           | STRING         | No     | Yes   |

## Example 1

```sql
@info(name = 'query1')
json:getFloat(json,'$.salary')
```

Given a JSON object like `{'name' : 'John', 'salary' : 12000.0}`, the function `json:getFloat(json,'$.salary')` searches for a float value associated with the key `salary`. In this case, it returns `12000` since there is a matching float at `$.salary`.

## Example 2

```sql
@info(name = 'query1')
json:getFloat(json,'$.salary')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getFloat(json,'$.salary')` searches for a float value associated with the key `salary`. In this case, it returns `null` since there is no matching element at `$.salary`.

## Example 3

```sql
@info(name = 'query1')
json:getFloat(json,'$.name')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getFloat(json,'$.name')` searches for a float value associated with the key `name`. In this case, it returns `null` since there is no matching float at `$.name`.
