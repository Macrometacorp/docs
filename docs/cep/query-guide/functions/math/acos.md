---
title: acos (Function)
---

If -1 \<= p1 \<= 1, then this function returns the arc-cosine (inverse cosine) value of p1.If the domain is invalid, it returns NULL. The value returned is in radian scale. This function wraps the `java.lang.Math.acos()` function.

## Syntax

```sql
<DOUBLE> math:acos(<FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description      | Default Value | Possible Data Types | Optional | Dynamic |
|------|------------------|---------------|---------------------|----------|---------|
| p1  | The value of the parameter whose arc-cosine (inverse cosine) value is found. |               | FLOAT DOUBLE  | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateArcCosine')
INSERT INTO OutMediationStream
SELECT math:acos(inValue) AS acosValue
FROM InValueStream;
```

The query calculates the arc-cosine value of the `inValue` from the input stream `InValueStream` using the `math:acos()` function. If the `inValue` is given, then the function computes the arc-cosine value and returns it to the output stream `OutMediationStream`. For example, `acos(0.5)` returns 1.0471975511965979.
