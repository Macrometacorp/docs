---
title: sinh (Function)
---

This returns the hyperbolic sine of the value given in radians. This function wraps the `java.lang.Math.sinh()` function.

Syntax

    <DOUBLE> math:sinh(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                                                 | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic sine value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:sinh(inValue) as sinhValue
    from InValueStream;

This function calculates the hyperbolic sine value of `inValue` and directs the output to the output stream, `OutMediationStream`. For example, sinh(6d) returns 201.71315737027922.
