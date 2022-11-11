---
title: cmTom (Function)
---

This converts the input given in centimeters into meters.

Syntax

    <DOUBLE> unitconversion:cmTom(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into meters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:cmTom(100)

The centimeters value `100` is converted into meters as `1.0`.
