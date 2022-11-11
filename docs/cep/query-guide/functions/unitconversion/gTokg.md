---
title: gTokg (Function)
---

This converts the input given in grams into kilograms.

Syntax

    <DOUBLE> unitconversion:gTokg(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from grams into kilograms. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:gTokg(1000)

The grams value `1000` is converted into kilogram as `1.0`.
