---
title: get (Function)
---

Function returns the value corresponding to the given key from the map.

Syntax

    <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> map:get(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key)
    <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> map:get(<OBJECT> map, <INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> default.value)

## Query Parameters

| Name          | Description                                                | Default Value | Possible Data Types                            | Optional | Dynamic |
|---------------|------------------------------------------------------------|---------------|------------------------------------------------|----------|---------|
| map           | The map from where the value should be obtained.           |               | OBJECT                                         | No       | Yes     |
| key           | The key to fetch the value.                                |               | INT LONG FLOAT DOUBLE FLOAT BOOL STRING        | No       | Yes     |
| default.value | The value to be returned if the map does not have the key. |               | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |

## Example 1

    map:get(companyMap, 1)

If the companyMap has key `1` and value `ABC` in it's set of key value pairs. The function returns `ABC`.

## Example 2

    map:get(companyMap, 2)

If the companyMap does not have any value for key `2` then the function returns `null`.

## Example 3

    map:get(companyMap, 2, 'two')

If the companyMap does not have any value for key `2` then the function returns `two`.
