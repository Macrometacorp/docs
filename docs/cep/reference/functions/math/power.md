---
title: power (Function)
---

This function raises the given value to a given power.

Syntax

    <DOUBLE> math:power(<INT|LONG|FLOAT|DOUBLE> value, <INT|LONG|FLOAT|DOUBLE> to.power)

## Query Parameters

| Name     | Description                                                                   | Default Value | Possible Data Types   | Optional | Dynamic |
|----------|-------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| value    | The value that should be raised to the power of `to.power` input parameter. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| to.power | The power to which the `value` input parameter should be raised.            |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue1 double, inValue2 double);

    insert into OutMediationStream
    select math:power(inValue1,inValue2) as powerValue
    from InValueStream;

This function raises the `inValue1` to the power of `inValue2` and directs the output to the output stream, `OutMediationStream`. For example, (5.6d, 3.0d) returns 175.61599999999996.
