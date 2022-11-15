---
title: sin (Function)
---

This returns the sine of the value given in radians. This function wraps
the `java.lang.Math.sin()` function.

Syntax

    <DOUBLE> math:sin(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose sine value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:sin(inValue) as sinValue
    from InValueStream;

The function calculates the sine value of the given `inValue` and directs the output to the output stream, `OutMediationStream`. For example, sin(6d) returns -0.27941549819892586.
