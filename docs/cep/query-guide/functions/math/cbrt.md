---
title: cbrt (Function)
---

This function returns the cube-root of `p1` which is in radians. It wraps the `java.lang.Math.cbrt()` function.

Syntax

    <DOUBLE> math:cbrt(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose cube-root should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:cbrt(inValue) as cbrtValue
    from InValueStream;

If the `inValue` is given, the function calculates the cube-root value for the same and directs the output to the output stream, OutMediationStream. For example, cbrt(17d) returns 2.5712815906582356.
