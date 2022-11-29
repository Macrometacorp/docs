---
title: kmTomm (Function)
---

This converts the input given in kilometers into millimeters.

Syntax

    <DOUBLE> unitconversion:kmTomm(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into millimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:kmTomm(1)

The kilometer value `1` is converted into millimeters as `1000000.0`.
