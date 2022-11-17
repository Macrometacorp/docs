---
title: exp (Function)
---

This function returns the Euler's number `e` raised to the power of `p1`. It wraps the `java.lang.Math.exp()` function.

Syntax

    <DOUBLE> math:exp(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The power that the Euler's number e is raised to. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:exp(inValue) as expValue
    from InValueStream;

If the `inValue` in the inputstream holds a value, this function calculates the corresponding Euler's number `e` and directs it to the output stream, OutMediationStream. For example, exp(10.23) returns 27722.51006805505.
