---
title: max (Function)
---

This function returns the greater value of `p1` and `p2`.

Syntax

    <DOUBLE> math:max(<INT|LONG|FLOAT|DOUBLE> p1, <INT|LONG|FLOAT|DOUBLE> p2)

## Query Parameters

| Name | Description                                                                              | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | One of the input values to be compared in order to find the larger value of the two      |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p2   | The input value to be compared with `p1` in order to find the larger value of the two. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue1 double,inValue2 int);

    insert into OutMediationStream
    select math:max(inValue1,inValue2) as maxValue
    from InValueStream;

If two input values `inValue1`, and `inValue2` are given, the function compares them and directs the larger value to the output stream, OutMediationStream. For example, max(123.67d, 91) returns 123.67.
