---
title: rand (Function)
---

This returns a stream of pseudo-random numbers when a sequence of calls are sent to the `rand()`. Optionally, it is possible to define a seed, i.e., `rand(seed)` using which the pseudo-random numbers are generated. These functions internally use the `java.util.Random` class.

## Syntax

```sql
<DOUBLE> math:rand()
<DOUBLE> math:rand(<INT|LONG> seed)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| seed | An optional seed value that will be used to generate the random number sequence. | defaultSeed   | INT LONG            | Yes      | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (symbol string, price long, volume long);

@info(name = 'generateRandomNumber')
INSERT INTO OutMediationStream
SELECT symbol, math:rand() AS randNumber
FROM InValueStream;
```

The `generateRandomNumber` query processes the input stream `InValueStream`, which contains three fields: `symbol`, `price`, and `volume`. For each event in the input stream, the query generates a random double value between 0 (inclusive) and 1 (exclusive) using the `math:rand()` function.

The random number is aliased as `randNumber`, and the output stream `OutMediationStream` contains the `symbol` and the generated `randNumber`. This query processes the input stream events and forwards the resulting random numbers along with the symbol to the output stream for further processing or analysis.
