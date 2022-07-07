---
title: getInt (Function)
---

Function retrieves the `int` value specified in the given path of the JSON element.

Syntax

    <INT> json:getInt(<STRING|OBJECT> json, <STRING> path)

## Query Parameters

| Name | Description                           | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing int value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the int value. |               | STRING              | No       | Yes     |

## Example 1

    json:getInt(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `23` as there is a matching int at `$.age`.

## Example 2

    json:getInt(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

## Example 3

    json:getInt(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching int at `$.name`.
