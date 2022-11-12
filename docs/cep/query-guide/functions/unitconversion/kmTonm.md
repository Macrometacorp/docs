---
title: kmTonm (Function)
---

This converts the input given in kilometers into nanometers.

Syntax

    <DOUBLE> unitconversion:kmTonm(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                           | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into nanometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:kmTonm(1)

The kilometer value `1` is converted into nanometers as
`1000000000000.0`.
