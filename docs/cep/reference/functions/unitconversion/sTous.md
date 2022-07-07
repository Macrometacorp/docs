---
title: sTous (Function)
---

This converts the input given in seconds into microseconds.

Syntax

    <DOUBLE> unitconversion:sTous(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                          | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from seconds into microseconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:sTous(1)

The second value `1` is converted into microseconds as `1000000.0`.
