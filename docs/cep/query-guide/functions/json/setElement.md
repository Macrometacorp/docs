---
title: setElement (Function)
---

Function sets JSON element into a given JSON at the specific path.

Syntax

    <OBJECT> json:setElement(<STRING|OBJECT> json, <STRING> path, <STRING|BOOL|DOUBLE|FLOAT|INT|LONG|OBJECT> json.element)
    <OBJECT> json:setElement(<STRING|OBJECT> json, <STRING> path, <STRING|BOOL|DOUBLE|FLOAT|INT|LONG|OBJECT> json.element, <STRING> key)

## Query Parameters

| Name         | Description                                                            | Default Value                                                                                           | Possible Data Types                      | Optional | Dynamic |
|--------------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------|----------|---------|
| json         | The JSON to which a JSON element needs to be added/replaced.           |                                                                                                         | STRING OBJECT                            | No       | Yes     |
| path         | The JSON path where the JSON element should be added/replaced.         |                                                                                                         | STRING                                   | No       | Yes     |
| json.element | The JSON element being added.                                          |                                                                                                         | STRING BOOL DOUBLE FLOAT INT LONG OBJECT | No       | Yes     |
| key          | The key to be used to refer the newly added element in the input JSON. | Assumes the element is added to a JSON array, or the element selected by the JSON path will be updated. | STRING                                   | Yes      | Yes     |

## Example 1

    json:setElement(json, '$', "{'country' : 'USA'}", 'address')

If the `json` is the format `{'name' : 'John', 'married' : true}`,the function updates the `json` as `{'name' : 'John', 'married' : true, 'address' : {'country' : 'USA'}}` by adding `address` element and returns the updated JSON.

## Example 2

    json:setElement(json, '$', 40, 'age')

If the `json` is the format `{'name' : 'John', 'married' : true}`,the function updates the `json` as `{'name' : 'John', 'married' : true, 'age' : 40}` by adding `age` element and returns the updated JSON.

## Example 3

    json:setElement(json, '$', 45, 'age')

If the `json` is the format `{'name' : 'John', 'married' : true, 'age' : 40}`, the function updates the `json` as `{'name' : 'John', 'married' : true, 'age' : 45}` by replacing `age` element and returns the updated JSON.

## Example 4

    json:setElement(json, '$.items', 'book')

If the `json` is the format `{'name' : 'Stationary', 'items' : ['pen', 'pencil']}`, the function updates the `json` as `{'name' : 'John', 'items' : ['pen', 'pencil', 'book']}` by adding `book` in the items array and returns the updated JSON.

## Example 5

    json:setElement(json, '$.item', 'book')

If the `json` is the format `{'name' : 'Stationary', 'item' : 'pen'}`, the function updates the `json` as `{'name' : 'John', 'item' : 'book'}` by replacing `item` element and returns the updated JSON.

## Example 6

    json:setElement(json, '$.address', 'city', 'SF')

If the `json` is the format `{'name' : 'John', 'married' : true}`,the function will not update, but returns the original JSON as there are no valid path for `$.address`.
