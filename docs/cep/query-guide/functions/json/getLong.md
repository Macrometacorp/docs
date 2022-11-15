---
title: getLong (Function)
---

Function retrieves the `long` value specified in the given path of the JSON element.

Syntax

    <LONG> json:getLong(<STRING|OBJECT> json, <STRING> path)

## Query Parameters

| Name | Description                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing long value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the long value. |               | STRING              | No       | Yes     |

## Example 1

    json:getLong(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `23` as there is a matching long at `$.age`.

## Example 2

    json:getLong(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

## Example 3

    json:getLong(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching long at `$.name`.
