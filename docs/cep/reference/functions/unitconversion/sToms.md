---
title: sToms (Function)
---

This converts the input given in seconds into milliseconds.

Syntax

    <DOUBLE> unitconversion:sToms(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                          | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from seconds into milliseconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:sToms(1)

The second value `1` is converted into milliseconds as `1000.0`.
