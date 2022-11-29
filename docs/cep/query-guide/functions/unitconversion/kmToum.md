---
title: kmToum (Function)
---

This converts the input given in kilometers into micrometers.

Syntax

    <DOUBLE> unitconversion:kmToum(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                            | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into micrometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:kmToum(1)

The kilometer value `1` is converted into micrometers as
`1000000000.0`.
