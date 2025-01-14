---
title: pi (Function)
---

This function returns the `java.lang.Math.PI` constant, which is the closest value to pi, i.e., the ratio of the circumference of a circle to its diameter.

## Syntax

```sql
<DOUBLE> math:pi()
```

## Query Parameters

None

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculatePi')
INSERT INTO OutMediationStream
SELECT math:pi() AS piValue
FROM InValueStream;
```

The `calculatePi` query processes the input stream `InValueStream`, which contains a single field, `inValue`. For each event in the input stream, the query calculates the mathematical constant Pi (π) using the `math:pi()` function. The value of Pi is approximately 3.141592653589793.

The calculated Pi value is aliased as `piValue` and directed to the `OutMediationStream`. This query essentially adds a constant Pi value to each event in the input stream and forwards the result to the output stream for further processing or analysis.
