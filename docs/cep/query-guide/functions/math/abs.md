---
title: abs (Function)
---

This function returns the absolute value of the given parameter. It wraps the `java.lang.Math.abs()` function.

## Syntax

```sql
<DOUBLE> math:abs(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types  | Optional | Dynamic |
|------|---------------|---------------|----------------------|----------|---------|
| p1   | The parameter whose absolute value is found. |      | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateAbsoluteValue')
INSERT INTO OutMediationStream
SELECT math:abs(inValue) AS absValue
FROM InValueStream;
```

The query calculates the absolute value of the `inValue` from the input stream `InValueStream` using the `math:abs()` function. Regardless of whether the `inValue` is 3 or -3, the function returns 3, because the absolute value of both 3 and -3 is 3. The result is then directed to the `OutMediationStream`.
