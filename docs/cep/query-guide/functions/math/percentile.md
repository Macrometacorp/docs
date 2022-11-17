---
title: tokenize (Aggregate Function)
---

This functions returns the pth percentile value of a given argument.

Syntax

    <DOUBLE> math:percentile(<INT|LONG|FLOAT|DOUBLE> arg, <DOUBLE> p)

## Query Parameters

| Name | Description                                                                                                                  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value of the parameter whose percentile should be found.                                                                 |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p    | Estimate of the percentile to be found (pth percentile) where p is any number greater than 0 or lesser than or equal to 100. |               | DOUBLE                | No       | Yes     |

## Example 1

    CREATE STREAM InValueStream (sensorId int, temperature double);

    insert into OutMediationStream
    select math:percentile(temperature, 97.0) as percentile
    from InValueStream;

This function returns the percentile value based on the argument given. For example, math:percentile(temperature, 97.0) returns the 97th percentile value of all the temperature events.
