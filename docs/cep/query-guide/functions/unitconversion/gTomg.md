---
title: gTomg (Function)
---

This converts the input given in grams into milligrams.

Syntax

    <DOUBLE> unitconversion:gTomg(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from grams into milligrams. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:gTomg(1)

The gram value `1` is converted into milligrams as `1000.0`.
