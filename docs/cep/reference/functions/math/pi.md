---
title: pi (Function)
---

This function returns the `java.lang.Math.PI` constant, which is the closest value to pi, i.e., the ratio of the circumference of a circle to its diameter.

Syntax

    <DOUBLE> math:pi()

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:pi() as piValue
    from InValueStream;

pi() always returns 3.141592653589793.
