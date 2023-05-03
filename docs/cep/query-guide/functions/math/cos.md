---
title: cos (Function)
---

This function returns the cosine of `p1` which is in radians. It wraps the `java.lang.Math.cos()` function.

## Syntax

```sql
<DOUBLE> math:cos(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types  | Optional | Dynamic |
|------|-------------|---------------|----------------------|----------|---------|
| p1   | The value of the parameter whose cosine value should be found.The input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'cosineValues')
INSERT INTO OutMediationStream
SELECT math:cos(inValue) AS cosValue
FROM InValueStream;
```

The query takes the input value `inValue` from the `InValueStream` and calculates the cosine value using the `math:cos()` function. The result is directed to the output stream `OutMediationStream`. For example, when `inValue` is 6, the `cosValue` returned is 0.9601702866503661.
