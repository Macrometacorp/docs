---
title: tan (Function)
---

This function returns the tan of the given value in radians. It wraps the `java.lang.Math.tan()` function.

Syntax

    <DOUBLE> math:tan(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose tan value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:tan(inValue) as tanValue
    from InValueStream;

This function calculates the tan value of the `inValue` given and directs the output to the output stream, `OutMediationStream`. For example, tan(6d) returns -0.29100619138474915.
