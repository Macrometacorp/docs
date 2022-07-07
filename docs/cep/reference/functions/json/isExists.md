---
title: isExists (Function)
---

Function checks whether there is a JSON element present in the given path or not.

Syntax

    <BOOL> json:isExists(<STRING|OBJECT> json, <STRING> path)

## Query Parameters

| Name | Description                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------|---------------|---------------------|----------|---------|
| json | The JSON input that needs to be searched for an elements. |               | STRING OBJECT       | No       | Yes     |
| path | The JSON path to check for the element.                   |               | STRING              | No       | Yes     |

## Example 1

    json:isExists(json, '$.name')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `true` as there is an element in the given path.

## Example 2

    json:isExists(json, '$.salary')

If the `json` is the format `{'name' : 'John', 'age' : 23}`, the function returns `false` as there is no element in the given path.
