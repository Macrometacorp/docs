---
title: asin (Function)
---

If -1 \<= p1 \<= 1, this function returns the arc-sin (inverse sine) value of p1. If the domain is invalid, then it returns `NULL`. The value returned is in radian scale. This function wraps the `java.lang.Math.asin()` function.

## Syntax

```sql
<DOUBLE> math:asin(<FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|------|---------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose arc-sin (inverse sine) value is found. |               | FLOAT DOUBLE        | No       | Yes     |

## Example

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateArcSine')
INSERT INTO OutMediationStream
SELECT math:asin(inValue) AS asinValue
FROM InValueStream;
```

The query calculates the arc-sine value of the `inValue` from the input stream `InValueStream` using the `math:asin()` function. If the `inValue` is given, then the function computes the arc-sine value and returns it to the output stream `OutMediationStream`. For example, `asin(0.5)` returns 0.5235987755982989.
