---
title: getBool (Function)
---

Function retrieves the `boolean` value specified in the given path of the JSON element.

Syntax

    <BOOL> json:getBool(<STRING|OBJECT> json, <STRING> path)

## Query Parameters

| Name | Description                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input containing boolean value.  |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to fetch the boolean value. |               | STRING              | No       | Yes     |

## Example 1

    json:getBool(json,'$.married')

If the `json` is the format `{'name' : 'John', 'married' : true}`, the function returns `true` as there is a matching boolean at `$.married`.

## Example 2

    json:getBool(json,'$.name')

If the `json` is the format `{'name' : 'John', 'married' : true}`, the function returns `null` as there is no matching boolean at `$.name`.

## Example 3

    json:getBool(json,'$.foo')

If the `json` is the format `{'name' : 'John', 'married' : true}`, the function returns `null` as there is no matching element at `$.foo`.
