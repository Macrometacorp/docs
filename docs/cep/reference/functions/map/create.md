---
title: create (Function)
---

Function creates a map pairing the keys and their corresponding values.

Syntax

    <OBJECT> map:create()
    <OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1)
    <OBJECT> map:create(<OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> key1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> value1, <OBJECT|INT|LONG|FLOAT|DOUBLE|FLOAT|BOOL|STRING> ...)

## Query Parameters

| Name   | Description | Default Value | Possible Data Types                            | Optional | Dynamic |
|--------|-------------|---------------|------------------------------------------------|----------|---------|
| key1   | Key 1       | \-            | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |
| value1 | Value 1     | \-            | OBJECT INT LONG FLOAT DOUBLE FLOAT BOOL STRING | Yes      | Yes     |

## Example 1

    map:create(1, 'one', 2, 'two', 3, 'three')

This returns a map with keys `1`, `2`, `3` mapped with their corresponding values, `one`, `two`, `three`.

## Example 2

    map:create()

This returns an empty map.
