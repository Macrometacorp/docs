---
title: signum (Function)
---

This returns +1, 0, or -1 for the given positive, zero and negative values respectively. This function wraps the `java.lang.Math.signum()` function.

Syntax

    <INT> math:signum(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that should be checked to be positive, negative or zero. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:signum(inValue) as sign
    from InValueStream;

The function evaluates the `inValue` given to be positive, negative or zero and directs the result to the output stream, `OutMediationStream`. For example, signum(-6.32d) returns -1.
