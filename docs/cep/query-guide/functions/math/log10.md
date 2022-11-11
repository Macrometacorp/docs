---
title: log10 (Function)
---

This function returns the base 10 logarithm of `p1`.

Syntax

    <DOUBLE> math:log10(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                         | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose base 10 logarithm should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:log10(inValue) as lnValue
    from InValueStream;

If the `inValue` in the input stream is given, the function calculates the base 10 logarithm of the same and directs the result to the output stream, `OutMediatioStream`. For example, log10(19.234) returns 1.2840696117100832.
