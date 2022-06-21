---
title: create (Function)
---

Function creates a list containing all values provided.

Syntax

    <OBJECT> list:create()
    <OBJECT> list:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value1)
    <OBJECT> list:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> value1, <OBJECT|INT|LONG|FLOAT|DOUBLE|BOOL|STRING> ...)

## Query Parameters

| Name   | Description | Default Value | Possible Data Types                      | Optional | Dynamic |
|--------|-------------|---------------|------------------------------------------|----------|---------|
| value1 | Value 1     |               | OBJECT INT LONG FLOAT DOUBLE BOOL STRING | Yes      | Yes     |

## Example 1

    list:create(1, 2, 3, 4, 5, 6)

This returns a list with values `1`, `2`, `3`, `4`, `5` and `6`.

## Example 2

    list:create()

This returns an empty list.
