---
title: mlTol (Function)
---

This converts the input given in milliliters into liters.

Syntax

    <DOUBLE> unitconversion:mlTol(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from milliliters into liters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:mlTol(1000)

The milliliters value `1000` is converted into liters as `1`.
