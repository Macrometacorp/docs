---
title: mToft (Function)
---

This converts the input given in meters into feet.

Syntax

    <DOUBLE> unitconversion:mToft(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                 | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into feet. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:mToft(1)

The meter value `1` is converted into feet as `3.280`.
