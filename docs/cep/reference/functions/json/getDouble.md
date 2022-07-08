---
title: getDouble (Function)
---

Function retrieves the `double` value specified in the given path of the JSON element.

Syntax

    <DOUBLE> json:getDouble(<STRING|OBJECT> json, <STRING> path)

## Query Parameters

| Name | Description                              | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing double value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the double value. |               | STRING              | No       | Yes     |

## Example 1

    json:getDouble(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'salary' : 12000.0}`, the function returns `12000.0` as there is a matching double at `$.salary`.

## Example 2

    json:getDouble(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

## Example 3

    json:getDouble(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching double at `$.name`.
