---
title: sqrt (Function)
---

This function returns the square-root of the given value. It wraps the `java.lang.Math.sqrt()`s function.

Syntax

    <DOUBLE> math:sqrt(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose square-root value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:sqrt(inValue) as sqrtValue
    from InValueStream;

The function calculates the square-root value of the `inValue` and directs the output to the output stream, `OutMediationStream`. For example, sqrt(4d) returns 2.
