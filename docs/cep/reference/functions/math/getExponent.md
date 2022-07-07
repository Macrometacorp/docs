---
title: getExponent (Function)
---

This function returns the unbiased exponent that is used in the representation of `p1`. This function wraps the `java.lang.Math.getExponent()` function.

Syntax

    <INT> math:getExponent(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                          | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of whose unbiased exponent representation should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:getExponent(inValue) as expValue
    from InValueStream;

This function calculates the unbiased exponent of a given input, `inValue` and directs the result to the `OutMediationStream` output stream. For example, getExponent(60984.1) returns 15.
