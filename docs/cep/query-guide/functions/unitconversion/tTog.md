---
title: tTog (Function)
---

This converts the input given in tonnes into grams.

Syntax

    <DOUBLE> unitconversion:tTog(<INT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that needs to be converted from Tonnes into grams. |               | INT DOUBLE          | No       | Yes     |

## Example 1

    unitconversion:tTog(1)

The tonne value `1` is converted into grams as `1000000.0`.
