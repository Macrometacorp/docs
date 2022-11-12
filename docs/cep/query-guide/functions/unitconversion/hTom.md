---
title: hTom (Function)
---

This converts the input given in hours into minutes.

Syntax

    <DOUBLE> unitconversion:hTom(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from hours into minutes. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:hTom(1)

The hour value `1` is converted into minutes as `60.0`.
