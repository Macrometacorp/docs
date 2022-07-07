---
title: cmToum (Function)
---

This converts the input in centimeters into micrometers.

Syntax

    <DOUBLE> unitconversion:cmToum(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                             | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into micrometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:cmToum(100)

The centimeters value `100` is converted into micrometers as
`1000000.0`.
