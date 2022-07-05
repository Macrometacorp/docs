---
title: coalesce (Function)
---

This returns the first input parameter value of the given argument, that
is not null.

Syntax

    <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> str:coalesce(<INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> arg, <INT|LONG|DOUBLE|FLOAT|STRING|BOOL|OBJECT> ...)

## Query Parameters

| Name | Description                                                                                                                           | Default Value | Possible Data Types                      | Optional | Dynamic |
|------|---------------------------------------------------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------|---------|
| arg  | It can have one or more input parameters in any data type. However, all the specified parameters are required to be of the same type. |               | INT LONG DOUBLE FLOAT STRING BOOL OBJECT | No       | Yes     |

## Example 1

    coalesce(null, "BBB", "CCC")

This returns the first input parameter that is not null. In this
example, it returns "BBB".
