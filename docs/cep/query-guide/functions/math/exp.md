---
title: exp (Function)
---

This function returns the Euler's number `e` raised to the power of `p1`. It wraps the `java.lang.Math.exp()` function.

## Syntax

```sql
<DOUBLE> math:exp(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The power that the Euler's number e is raised to. |      | INT LONG FLOAT DOUBLE | No   | Yes   |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'exponentialValue')
INSERT INTO OutMediationStream
SELECT math:exp(inValue) AS expValue
FROM InValueStream;
```

The query calculates the exponential value of the given `inValue` from the `InValueStream` using the `math:exp()` function, which raises Euler's number `e` to the power of `inValue`. The result is directed to the output stream `OutMediationStream`. For example, `exp(10.23)` returns 27722.51006805505.
