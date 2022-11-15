---
title: mTos (Function)
---

This converts the input given in minutes into seconds.

Syntax

    <DOUBLE> unitconversion:mTos(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from minutes into seconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    unitconversion:mTos(1)

The minute value `1` is converted into seconds as `60.0`.
