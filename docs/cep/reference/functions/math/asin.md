---
title: asin (Function)
---

If -1 \<= p1 \<= 1, this function returns the arc-sin (inverse sine) value of p1. If the domain is invalid, it returns NULL. The value returned is in radian scale. This function wraps the java.lang.Math.asin() function.

Syntax

    <DOUBLE> math:asin(<FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose arc-sin (inverse sine) value is found. |               | FLOAT DOUBLE        | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:asin(inValue) as asinValue
    from InValueStream;

If the `inValue` in the input stream is given, the function calculates the arc-sin value of it and returns the arc-sin value to the output stream, OutMediationStream. For example, asin(0.5) returns 0.5235987755982989.
