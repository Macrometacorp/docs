---
title: ceil (Function)
---

This function returns the smallest double value, i.e., the closest to the negative infinity, that is greater than or equal to the `p1` argument, and is equal to a mathematical integer. It wraps the `java.lang.Math.ceil()` method.

Syntax

    <DOUBLE> math:ceil(<FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                              | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose ceiling value is found. |               | FLOAT DOUBLE        | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:ceil(inValue) as ceilingValue
    from InValueStream;

This function calculates the ceiling value of the given `inValue` and directs the result to `OutMediationStream` output stream. For example, ceil(423.187d) returns 424.0.
