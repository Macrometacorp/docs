---
title: kgToST (Function)
---

This converts the input given in kilograms into US tons.

Syntax

    <DOUBLE> unitconversion:kgToST(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into US tons. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:kgToST(1000)

The kilograms value `1000` is converted into US tons as `1.10`.
