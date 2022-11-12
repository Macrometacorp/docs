---
title: isNan (Function)
---

This function wraps the `java.lang.Float.isNaN()` and `java.lang.Double.isNaN()` functions and returns `true` if `p1` is NaN  (Not-a-Number), and returns `false` if otherwise.

Syntax

    <BOOL> math:isNan(<FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                                            | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter which the function determines to be either NaN or a number. |               | FLOAT DOUBLE        | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue1 double,inValue2 int);

    insert into OutMediationStream
    select math:isNan(inValue1) as isNaN
    from InValueStream;

If the `inValue1` in the input stream has a value that is undefined, then the function considers it as an `NaN` value and directs `True` to the output stream, OutMediationStream. For example, isNan(java.lang.Math.log(-12d)) returns true.
