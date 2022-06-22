---
title: ln (Function)
---

This function returns the natural logarithm (base e) of `p1`.

Syntax

    <DOUBLE> math:ln(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose natural logarithm (base e) should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:ln(inValue) as lnValue
    from InValueStream;

If the `inValue` in the input stream is given, the function calculates its natural logarithm (base e) and directs the results to the output stream, `OutMeditionStream`. For example, ln(11.453) returns 2.438251704415579.
