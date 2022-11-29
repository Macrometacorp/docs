---
title: hTos (Function)
---

This converts the input given in hours into seconds.

Syntax

    <DOUBLE> unitconversion:hTos(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from hours into seconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:hTos(1)

The hour value `1` is converted into seconds as `3600.0`.
