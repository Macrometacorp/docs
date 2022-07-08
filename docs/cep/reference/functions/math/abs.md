---
title: abs (Function)
---

This function returns the absolute value of the given parameter. It wraps the `java.lang.Math.abs()` function.

Syntax

    <DOUBLE> math:abs(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The parameter whose absolute value is found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:abs(inValue) as absValue
    from InValueStream;

Regardless of whether the `invalue` in the input stream holds a value of abs(3) or abs(-3),the function returns 3 since the absolute value of both 3 and -3 is 3. The result directed to OutMediationStream stream.
