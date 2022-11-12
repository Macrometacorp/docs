---
title: cos (Function)
---

This function returns the cosine of `p1` which is in radians. It wraps the `java.lang.Math.cos()` function.

Syntax

    <DOUBLE> math:cos(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                                           | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose cosine value should be found.The input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:cos(inValue) as cosValue
    from InValueStream;

If the `inValue` is given, the function calculates the cosine value for the same and directs the output to the output stream, OutMediationStream. For example, cos(6d) returns 0.9601702866503661.
