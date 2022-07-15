---
title: sTons (Function)
---

This converts the input given in seconds into nanoseconds.

Syntax

    <DOUBLE> unitconversion:sTons(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from seconds into nanoseconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:sTons(1)

The second value `1` is converted into nanoseconds as `1000000000.0`
.
