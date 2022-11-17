---
title: cmTomm (Function)
---

This converts the input given in centimeters into millimeters.

Syntax

    <DOUBLE> unitconversion:cmTomm(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                             | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into millimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:cmTomm(1)

The centimeter value `1` is converted into millimeters as `10.0`.
