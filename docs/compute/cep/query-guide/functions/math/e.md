---
title: e (Function)
---

This function returns the `java.lang.Math.E` constant, which is the closest double value to e, where e is the base of the natural logarithms.

## Syntax

```sql
<DOUBLE> math:e()
```

## Query Parameters

None

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'constantEValue')
INSERT INTO OutMediationStream
SELECT math:e() AS eValue
FROM InValueStream;
```

The query calculates the mathematical constant e (approximately 2.7182818284590452354) using the `math:e()` function, regardless of the input value in the `InValueStream`. The result is directed to the output stream `OutMediationStream`.
