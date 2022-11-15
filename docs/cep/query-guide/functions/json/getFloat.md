---
title: getFloat (Function)
---

Function retrieves the `float` value specified in the given path of the JSON element.

Syntax

    <FLOAT> json:getFloat(<STRING|OBJECT> json, <STRING> path)

## Query Parameters

| Name | Description                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing float value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the float value. |               | STRING              | No       | Yes     |

## Example 1

    json:getFloat(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'salary' : 12000.0}`, th function returns `12000` as there is a matching float at `$.salary`.

## Example 2

    json:getFloat(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

## Example 3

    json:getFloat(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching float at `$.name`.
