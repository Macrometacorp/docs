---
title: mTocm (Function)
---

This converts the input given in meters into centimeters.

Syntax

    <DOUBLE> unitconversion:mTocm(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into centimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:mTocm(1)

The meter value `1` is converted to centimeters as `100.0`.
