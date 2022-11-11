---
title: toDegrees (Function)
---

This function converts the value given in radians to degrees. It wraps
the `java.lang.Math.toDegrees()` function.

Syntax

    <DOUBLE> math:toDegrees(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The input value in radians that should be converted to degrees. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    from InValueStream
    select math:toDegrees(inValue) as degreesValue;

The function converts the `inValue` in the input stream from radians to degrees and directs the output to `OutMediationStream` output stream. For example, toDegrees(6d) returns 343.77467707849394.
