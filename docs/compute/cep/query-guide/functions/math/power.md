---
title: power (Function)
---

This function raises the given value to a given power.

## Syntax

```sql
<DOUBLE> math:power(<INT|LONG|FLOAT|DOUBLE> value, <INT|LONG|FLOAT|DOUBLE> to.power)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|-------|--------------|---------------|-----------------------|----------|---------|
| value    | The value that should be raised to the power of `to.power` input parameter. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| to.power | The power to which the `value` input parameter should be raised. |          | INT LONG FLOAT DOUBLE | No   | Yes   |

## Example 1

```sql
CREATE STREAM InValueStream (inValue1 double, inValue2 double);

@info(name = 'calculatePower')
INSERT INTO OutMediationStream
SELECT math:power(inValue1, inValue2) AS powerValue
FROM InValueStream;
```

The `calculatePower` query processes the input stream `InValueStream`, which contains two fields, `inValue1` and `inValue2`. For each event in the input stream, the query calculates the result of raising `inValue1` to the power of `inValue2` using the `math:power(inValue1, inValue2)` function.

The calculated power value is aliased as `powerValue` and directed to the `OutMediationStream`. This query processes the input stream events and forwards the result of the power operation to the output stream for further processing or analysis. For example, `power(5.6d, 3.0d)` returns 175.61599999999996.
