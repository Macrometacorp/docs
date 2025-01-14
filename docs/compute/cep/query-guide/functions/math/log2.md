---
title: log2 (Function)
---

This function returns the base 2 logarithm of `p1`.

## Syntax

```sql
<DOUBLE> math:log2(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose base 2 logarithm should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateLogarithmBase2')
INSERT INTO OutMediationStream
SELECT math:log2(inValue) AS lnValue
FROM InValueStream;
```

The query calculates the base 2 logarithm of the given `inValue` from the `InValueStream` and directs the results to the output stream `OutMediationStream`. For example, `log2(91)` returns 6.507794640198696.
