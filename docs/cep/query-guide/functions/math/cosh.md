---
title: cosh (Function)
---

This function returns the hyperbolic cosine of `p1` which is in radians. It wraps the `java.lang.Math.cosh()` function.

Syntax

    <DOUBLE> math:cosh(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                                                 | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic cosine should be found. The input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:cosh(inValue) as cosValue
    from InValueStream;

If the `inValue` is given, the function calculates the hyperbolic cosine value for the same and directs the output to the output stream, OutMediationStream. For example, cosh (6d) returns 201.7156361224559.
