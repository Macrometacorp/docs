---
title: acos (Function)
---

If -1 \<= p1 \<= 1, this function returns the arc-cosine (inverse cosine) value of p1.If the domain is invalid, it returns NULL. The value returned is in radian scale. This function wraps the java.lang.Math.acos() function.

Syntax

    <DOUBLE> math:acos(<FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                  | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose arc-cosine (inverse cosine) value is found. |               | FLOAT DOUBLE        | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:acos(inValue) as acosValue
    from InValueStream;

If the `inValue` in the input stream is given, the function calculates the arc-cosine value of it and returns the arc-cosine value to the output stream, OutMediationStream. For example, acos(0.5) returns 1.0471975511965979.
