---
title: gToug (Function)
---

This converts the input given in grams into micrograms.

Syntax

    <DOUBLE> unitconversion:gToug(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from grams into micrograms. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:gToug(1)

The gram value `1` is converted into micrograms as `1000000.0`.
