---
title: e (Function)
---

This function returns the `java.lang.Math.E` constant, which is the closest double value to e, where e is the base of the natural logarithms.

Syntax

    <DOUBLE> math:e()

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:e() as eValue
    from InValueStream;

This function returns the constant, 2.7182818284590452354 which is then closest double value to e and directs the output to `OutMediationStream` output stream.
