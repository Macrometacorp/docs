---
title: getObject (Function)
---

Function retrieves the object specified in the given path of the JSON element.

## Syntax

```sql
<OBJECT> json:getObject(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description       | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing the object. |         | STRING OBJECT   | No   | Yes   |
| path | The JSON path to fetch the object.    |         | STRING          | No   | Yes   |

## Example 1

```sql
@info(name = 'query1')
json:getObject(json,'$.address')
```

Given a JSON object like `{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the function `json:getObject(json,'$.address')` searches for an object associated with the key `address`. In this example, it returns `{'city' : 'NY', 'country' : 'USA'}` as there is a matching object at `$.address`.

## Example 2

```sql
@info(name = 'query1')
json:getObject(json,'$.age')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getObject(json,'$.age')` searches for an object associated with the key `age`. In this example, it returns `23` as there is a matching object at `$.age`.

## Example 3

```sql
@info(name = 'query1')
json:getObject(json,'$.salary')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getObject(json,'$.salary')` searches for an object associated with the key `salary`. In this example, it returns `null` as there is no matching element at `$.salary`.
