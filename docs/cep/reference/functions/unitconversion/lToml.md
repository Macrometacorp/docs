---
title: lToml (Function)
---

This converts the input given in liters into milliliters.

Syntax

    <DOUBLE> unitconversion:lToml(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from liters into milliliters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:lToml(1)

The liter value `1` is converted into milliliters as `1000.0`.
