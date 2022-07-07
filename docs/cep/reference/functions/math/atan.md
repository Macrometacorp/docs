---
title: atan (Function)
---

If a single `p1` is received, this function returns the arc-tangent (inverse tangent) value of `p1`.

If `p1` is received along with an optional `p1`, it considers them as x and y coordinates and returns the arc-tangent (inverse tangent) value. The returned value is in radian scale. This function wraps the `java.lang.Math.atan()` function.

Syntax

    <DOUBLE> math:atan(<INT|LONG|FLOAT|DOUBLE> p1)
    <DOUBLE> math:atan(<INT|LONG|FLOAT|DOUBLE> p1, <INT|LONG|FLOAT|DOUBLE> p2)

## Query Parameters

| Name | Description                                                                                                                                                                       | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose arc-tangent (inverse tangent) is found. If the optional second parameter is given this represents the x coordinate of the (x,y) coordinate pair. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p2   | This optional parameter represents the y coordinate of the (x,y) coordinate pair.                                                                                                 | 0D            | INT LONG FLOAT DOUBLE | Yes      | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue1 double, inValue2 double);

    insert into OutMediationStream
    select math:atan(inValue1, inValue2) as convertedValue
    from InValueStream;

If the `inValue1` in the input stream is given, the function calculates the arc-tangent value of it and returns the arc-tangent value to the output stream, OutMediationStream. If both the `inValue1` and `inValue2` are given, then the function considers them to be x and y coordinates respectively and returns the calculated arc-tangent value to the output stream, OutMediationStream. For example, atan(12d, 5d) returns 1.1760052070951352.
