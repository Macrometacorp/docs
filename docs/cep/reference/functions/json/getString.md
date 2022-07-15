---
title: getString (Function)
---

Function retrieves value specified in the given path of the JSON element as a string.

Syntax

    <STRING> json:getString(<STRING|OBJECT> json, <STRING> path)

## Query Parameters

| Name | Description                       | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the value. |               | STRING              | No       | Yes     |

## Example 1

    json:getString(json,'$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `John` as there is a matching string at `$.name`.

## Example 2

    json:getString(json,'$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `null` as there are no matching element at `$.salary`.

## Example 3

    json:getString(json,'$.age')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `23` as a string as there is a matching element at `$.age`.

## Example 4

    json:getString(json,'$.address')

If the `json` is the format `{'name' : 'John', 'address' : {'city' : 'NY', 'country' : 'USA'}}`, the function returns `{'city' : 'NY', 'country' : 'USA'}` as a string as there is a matching element at `$.address`.
