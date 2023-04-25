---
title: log10 (Function)
---

This function returns the base 10 logarithm of `p1`.

## Syntax

```sql
<DOUBLE> math:log10(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose base 10 logarithm should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateLogarithmBase10')
INSERT INTO OutMediationStream
SELECT math:log10(inValue) AS lnValue
FROM InValueStream;
```

The query calculates the base 10 logarithm of the given `inValue` from the `InValueStream` and directs the results to the output stream `OutMediationStream`. For example, `log10(19.234)` returns 1.2840696117100832.
