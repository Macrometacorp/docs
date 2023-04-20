---
title: getDouble (Function)
---

Function retrieves the `double` value specified in the given path of the JSON element.

## Syntax

```sql
<DOUBLE> json:getDouble(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description        | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing double value.  |          | STRING OBJECT  | No       | Yes     |
| path | The JSON path to fetch the double value. |          | STRING         | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
json:getDouble(json,'$.salary')
```

For a JSON object like `{'name' : 'John', 'salary' : 12000.0}`, the function `json:getDouble(json,'$.salary')` searches for a double value associated with the key `salary`. In this case, it returns `12000.0` as there is a matching double value at `$.salary`.

## Example 2

```sql
@info(name = 'query1')
json:getDouble(json,'$.salary')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getDouble(json,'$.salary')` searches for a double value associated with the key `salary`. In this case, it returns `null` since there is no matching element at `$.salary`.

## Example 3

```sql
@info(name = 'query1')
json:getDouble(json,'$.name')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getDouble(json,'$.name')` searches for a double value associated with the key `name`. In this case, it returns `null` since there is no matching double at `$.name`.
