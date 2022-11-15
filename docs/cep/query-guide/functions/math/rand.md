---
title: rand (Function)
---

This returns a stream of pseudo-random numbers when a sequence of calls are sent to the `rand()`. Optionally, it is possible to define a seed, i.e., `rand(seed)` using which the pseudo-random numbers are generated. These functions internally use the `java.util.Random` class.

Syntax

    <DOUBLE> math:rand()
    <DOUBLE> math:rand(<INT|LONG> seed)

## Query Parameters

| Name | Description                                                                      | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| seed | An optional seed value that will be used to generate the random number sequence. | defaultSeed   | INT LONG            | Yes      | Yes     |

## Example 1

    CREATE STREAM InValueStream (symbol string, price long, volume long);

    insert into OutMediationStream
    select math:oct(inValue) as octValue
    from InValueStream select symbol, math:rand() as randNumber;

In the example given above, a random double value between 0 and 1 will be generated using math:rand().
