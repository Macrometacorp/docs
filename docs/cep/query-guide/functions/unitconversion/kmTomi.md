---
title: kmTomi (Function)
---

This converts the input given in kilometers into miles.

Syntax

    <DOUBLE> unitconversion:kmTomi(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into miles. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:kmTomi(1)

The kilometer value `1` is converted into miles as `0.621`.
