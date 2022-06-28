---
title: toRadians (Function)
---

This function converts the value given in degrees to radians. It wraps
the `java.lang.Math.toRadians()` function.

Syntax

    <DOUBLE> math:toRadians(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The input value in degrees that should be converted to radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    from InValueStream
    select math:toRadians(inValue) as radiansValue;

This function converts the input, from degrees to radians and directs the result to `OutMediationStream` output stream. For example, toRadians(6d) returns 0.10471975511965977.
