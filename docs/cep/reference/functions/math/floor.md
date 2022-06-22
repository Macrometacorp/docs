---
title: floor (Function)
---

This function wraps the `java.lang.Math.floor()` function and returns the largest value, i.e., closest to the positive infinity, that is less than or equal to `p1`, and is equal to a mathematical integer.

Syntax

    <DOUBLE> math:floor(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose floor value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:floor(inValue) as floorValue
    from InValueStream;

This function calculates the floor value of the given `inValue` input and directs the output to the `OutMediationStream` output stream. For example, (10.23) returns 10.0.
