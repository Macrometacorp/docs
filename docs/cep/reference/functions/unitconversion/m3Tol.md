---
title: m3Tol (Function)
---

This converts the input given in cubic meters into liters.

Syntax

    <DOUBLE> unitconversion:m3Tol(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into liters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:m3Tol(1)

The cubic meter value `1` is converted into liters as `1000.0`.
