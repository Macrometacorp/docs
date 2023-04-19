---
title: isExists (Function)
---

Function checks whether there is a JSON element present in the given path or not.

## Syntax

```sql
<BOOL> json:isExists(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| json | The JSON input that needs to be searched for an elements. |     | STRING OBJECT  | No | Yes     |
| path | The JSON path to check for the element.  |        | STRING     | No      | Yes |

## Example 1

```sql
@info(name = 'query1')
json:isExists(json, '$.name')
```

This query, named 'query1', uses the `json:isExists` function to check if an element exists in the given JSON path. In this case, the function checks for the existence of the `$.name` element.

When the input `json` has the format `{'name' : 'John', 'age' : 23}`, the function returns `true`, as there is an element in the given path.

## Example 2

```sql
@info(name = 'query1')
json:isExists(json, '$.salary')
```

This query, named 'query1', uses the `json:isExists` function to check if an element exists in the given JSON path. In this case, the function checks for the existence of the `$.salary` element.

When the input `json` has the format `{'name' : 'John', 'age' : 23}`, the function returns `false`, as there is no element in the given path.
