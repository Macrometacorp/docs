---
title: log (Function)
---

This function returns the logarithm of the received `number` as per the given `base`.

Syntax

    <DOUBLE> math:log(<INT|LONG|FLOAT|DOUBLE> number, <INT|LONG|FLOAT|DOUBLE> base)

## Query Parameters

| Name   | Description                                              | Default Value | Possible Data Types   | Optional | Dynamic |
|--------|----------------------------------------------------------|---------------|-----------------------|----------|---------|
| number | The value of the parameter whose base should be changed. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| base   | The base value of the ouput.                             |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (number double, base double);

    insert into OutMediationStream
    select math:log(number, base) as logValue
    from InValueStream;

If the number and the base to which it has to be converted into is given in the input stream, the function calculates the number to the base specified and directs the result to the output stream, OutMediationStream. For example, log(34, 2f) returns 5.08746284125034.
