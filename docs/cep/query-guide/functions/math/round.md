---
title: round (Function)
---

This function returns the value of the input argument rounded off to the closest integer/long value.

Syntax

    <INT|LONG> math:round(<FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description                                                             | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| p1   | The value that should be rounded off to the closest integer/long value. |               | FLOAT DOUBLE        | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (inValue double);

    insert into OutMediationStream
    select math:round(inValue) as roundValue
    from InValueStream;

The function rounds off `inValue1` to the closest int/long value and directs the output to the output stream, `OutMediationStream`. For example, round(3252.353) returns 3252.
