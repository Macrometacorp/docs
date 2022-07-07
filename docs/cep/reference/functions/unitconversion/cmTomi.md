---
title: cmTomi (Function)
---

This converts the input given in centimeters into miles.

Syntax

    <DOUBLE> unitconversion:cmTomi(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into miles. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:cmTomi(10000)

The centimeters value `10000` is converted into miles as `0.062`.
