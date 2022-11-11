---
title: kgToLT (Function)
---

This converts the input given in kilograms into imperial tons.

Syntax

    <DOUBLE> unitconversion:kgToLT(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                             | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into imperial tons. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:kgToLT(1000)

The kilograms value `1000` is converted into imperial tons as
`0.9842`.
