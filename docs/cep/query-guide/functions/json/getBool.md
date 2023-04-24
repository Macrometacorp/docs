---
title: getBool (Function)
---

Function retrieves the `boolean` value specified in the given path of the JSON element.

## Syntax

```sql
<BOOL> json:getBool(<STRING|OBJECT> json, <STRING> path)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------|---------------|---------------------|----------|---------|
| json | The JSON input containing a boolean value. |        | STRING OBJECT    | No       | Yes   |
| path | The JSON path to fetch the boolean value. |          | STRING      | No       | Yes    |

## Example 1

```sql
@info(name = 'query1')
json:getBool(json,'$.married')
```

Given a JSON object like `{'name' : 'John', 'married' : true}`, the function `json:getBool(json,'$.married')` searches for the boolean value associated with the key `married` and returns it. In this case, it returns `true`.

## Example 2

```sql
@info(name = 'query1')
json:getBool(json,'$.name')
```

Given a JSON object like `{'name' : 'John', 'married' : true}`, the function `json:getBool(json,'$.name')` searches for a boolean value associated with the key `name`. However, it returns `null` because the value at `$.name` is a string, not a boolean.

## Example 3

```sql
@info(name = 'query1')
json:getBool(json,'$.foo')
```

Given a JSON object like `{'name' : 'John', 'married' : true}`, the function `json:getBool(json,'$.foo')` searches for a boolean value associated with the key `foo`. However, it returns `null` because there is no matching element at `$.foo` in the JSON object.
