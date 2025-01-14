---
title: ln (Function)
---

This function returns the natural logarithm (base e) of `p1`.

## Syntax

```sql
<DOUBLE> math:ln(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose natural logarithm (base e) should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateNaturalLogarithm')
INSERT INTO OutMediationStream
SELECT math:ln(inValue) AS lnValue
FROM InValueStream;
```

The query calculates the natural logarithm (base e) of the given `inValue` from the `InValueStream` and directs the results to the output stream `OutMediationStream`. For example, `ln(11.453)` returns 2.438251704415579.
