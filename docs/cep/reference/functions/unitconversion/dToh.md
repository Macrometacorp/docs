---
title: dToh (Function)
---

This converts the input given in days into hours.

Syntax

    <DOUBLE> unitconversion:dToh(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from days into hours. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:dToh(1)

The day value `1` is converted into hours as `24.0`.
