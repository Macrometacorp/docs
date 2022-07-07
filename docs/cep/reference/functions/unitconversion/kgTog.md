---
title: kgTog (Function)
---

This converts the input given in kilograms into grams.

Syntax

    <DOUBLE> unitconversion:kgTog(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into grams. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:kgTog(1)

The kilogram value `1` is converted into grams as `1000`.
