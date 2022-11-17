---
title: cmTokm (Function)
---

This converts the input value given in centimeters into kilometers.

Syntax

    <DOUBLE> unitconversion:cmTokm(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into kilometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:cmTokm(100)

The centimeters value `100` is converted into kilometers as `0.001`.
