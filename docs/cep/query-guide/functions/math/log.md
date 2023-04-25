---
title: log (Function)
---

This function returns the logarithm of the received `number` as per the given `base`.

## Syntax

```sql
<DOUBLE> math:log(<INT|LONG|FLOAT|DOUBLE> number, <INT|LONG|FLOAT|DOUBLE> base)
```

## Query Parameters

| Name   | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|--------|-------------|---------------|-----------------------|----------|---------|
| number | The value of the parameter whose base should be changed. |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| base   | The base value of the output.                             |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (number double, base double);

@info(name = 'calculateLogarithmBase')
INSERT INTO OutMediationStream
SELECT math:log(number, base) AS logValue
FROM InValueStream;
```

The query calculates the logarithm of the given `number` with the specified `base` from the `InValueStream` and directs the results to the output stream `OutMediationStream`. For example, `log(34, 2)` returns 5.08746284125034.
