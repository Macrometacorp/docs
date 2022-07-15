---
title: copySign (Function)
---

This function returns a value of an input with the received `magnitude` and `sign` of another input. It wraps the `java.lang.Math.copySign()` function.

Syntax

    <DOUBLE> math:copySign(<INT|LONG|FLOAT|DOUBLE> magnitude, <INT|LONG|FLOAT|DOUBLE> sign)

## Query Parameters

| Name      | Description                                                      | Default Value | Possible Data Types   | Optional | Dynamic |
|-----------|------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| magnitude | The magnitude of this parameter is used in the output attribute. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| sign      | The sign of this parameter is used in the output attribute.      |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue1 double, inValue2 double);

    insert into OutMediationStream
    select math:copySign(inValue1,inValue2) as copysignValue
    from InValueStream;

If two values are provided as `inValue1` and `inValue2`, the function copies the magnitude and sign of the second argument into the first one and directs the result to the output stream, OutMediatonStream. For example, copySign(5.6d, -3.0d) returns -5.6.
