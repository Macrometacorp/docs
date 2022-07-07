---
title: kmTom (Function)
---

This converts the input given in kilometers into meters.

Syntax

    <DOUBLE> unitconversion:kmTom(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into meters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:kmTom(1)

The kilometer value `1` is converted into meters as `1000.0`.
