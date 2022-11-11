---
title: log2 (Function)
---

This function returns the base 2 logarithm of `p1`.

Syntax

    <DOUBLE> math:log2(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose base 2 logarithm should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:log2(inValue) as lnValue
    from InValueStream;

If the `inValue` in the input stream is given, the function calculates the base 2 logarithm of the same and returns the value to the output stream, `OutMediationStream`. For example log2(91d) returns 6.507794640198696.
