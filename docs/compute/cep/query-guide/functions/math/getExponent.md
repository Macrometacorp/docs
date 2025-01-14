---
title: getExponent (Function)
---

This function returns the unbiased exponent that is used in the representation of `p1`. This function wraps the `java.lang.Math.getExponent()` function.

## Syntax

```sql
<INT> math:getExponent(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value of whose unbiased exponent representation should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'getExponentValue')
INSERT INTO OutMediationStream
SELECT math:getExponent(inValue) AS expValue
FROM InValueStream;
```

The query calculates the unbiased exponent of a given input, `inValue`, from the `InValueStream` using the `math:getExponent()` function. The result is directed to the output stream `OutMediationStream`. For example, `getExponent(60984.1)` returns 15.
