---
title: cosh (Function)
---

This function returns the hyperbolic cosine of `p1` which is in radians. It wraps the `java.lang.Math.cosh()` function.

## Syntax

```sql
<DOUBLE> math:cosh(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic cosine should be found. The input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'hyperbolicCosineValues')
INSERT INTO OutMediationStream
SELECT math:cosh(inValue) AS coshValue
FROM InValueStream;
```

The query takes the input value `inValue` from the `InValueStream` and calculates the hyperbolic cosine value using the `math:cosh()` function. The result is directed to the output stream `OutMediationStream`. For example, when `inValue` is 6, the `coshValue` returned is 201.7156361224559.
