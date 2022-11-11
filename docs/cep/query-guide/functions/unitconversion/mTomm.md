---
title: mTomm (Function)
---

This converts the input given in meters into millimeters.

Syntax

    <DOUBLE> unitconversion:mTomm(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into millimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:mTomm(1)

The meter value `1` is converted into millimeters as `1000.0`.
