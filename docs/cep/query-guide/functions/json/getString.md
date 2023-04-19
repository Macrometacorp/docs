---
title: getString (Function)
---

Function retrieves value specified in the given path of the JSON element as a string.

## Syntax

```sql
<STRING> json:getString(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description    | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------|---------------|---------------------|----------|---------|
| json | The JSON input containing value.  |       | STRING OBJECT    | No     | Yes   |
| path | The JSON path to fetch the value. |       | STRING           | No     | Yes   |

## Example 1

```sql
@info(name = 'query1')
json:getString(json,'$.name')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getString(json,'$.name')` searches for a string associated with the key `name`. In this example, it returns `John` as there is a matching string at `$.name`.

## Example 2

```sql
@info(name = 'query1')
json:getString(json,'$.salary')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getString(json,'$.salary')` searches for a string associated with the key `salary`. In this example, it returns `null` as there is no matching element at `$.salary`.

## Example 3

```sql
@info(name = 'query1')
json:getString(json,'$.age')
```

Given a JSON object like `{'name' : 'John', 'age' : 23}`, the function `json:getString(json,'$.age')` searches for a string associated with the key `age`. In this example, it returns `"23"` as a string, since the function can convert the numeric value at `$.age` into a string representation.

## Example 4

```sql
@info(name = 'query1')
json:getString(json,'$.address')
```

Given a JSON object like `{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the function `json:getString(json,'$.address')` searches for a string associated with the key `address`. In this example, it returns `'{"city":"NY","country":"USA"}'` as a string, since the function can convert the nested JSON object at `$.address` into a string representation.
