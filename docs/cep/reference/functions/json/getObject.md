---
title: getObject (Function)
---

Function retrieves the object specified in the given path of the JSON element.

Syntax

    <OBJECT> json:getObject(<STRING|OBJECT> json, <STRING> path)

## Query Parameters

| Name | Description                           | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing the object. |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the object.    |               | STRING              | No       | Yes     |

## Example 1

    json:getObject(json,'$.address')

If the `json` is the format `{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the function returns `{'city' : 'NY', 'country' : 'USA'}` as there is a matching object at `$.address`.

## Example 2

    json:getObject(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `23` as there is a matching object at `$.age`.

## Example 3

    json:getObject(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.
