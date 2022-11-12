---
title: isInfinite (Function)
---

This function wraps the `java.lang.Float.isInfinite()` and `java.lang.Double.isInfinite()` and returns `true` if `p1` is infinitely large in magnitude and `false` if otherwise.

Syntax

    <BOOL> math:isInfinite(<FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | This is the value of the parameter that the function determines to be either infinite or finite. |               | FLOAT DOUBLE        | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue1 double,inValue2 int);

    insert into OutMediationStream
    select math:isInfinite(inValue1) as isInfinite
    from InValueStream;

If the value given in the `inValue` in the input stream is of infinitely large magnitude, the function returns the value, `true` and directs the result to the output stream, `OutMediationStream`. For example, isInfinite(java.lang.Double.POSITIVE\_INFINITY) returns true.
