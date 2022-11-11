---
title: tanh (Function)
---

This function returns the hyperbolic tangent of the value given in
radians. It wraps the `java.lang.Math.tanh()` function.

Syntax

    <DOUBLE> math:tanh(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                                                    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic tangent value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    from InValueStream
    select math:tanh(inValue) as tanhValue;

If the `inVaue` in the input stream is given, this function calculates the hyperbolic tangent value of the same and directs the output to `OutMediationStream` stream. For example, tanh(6d) returns 0.9999877116507956.
