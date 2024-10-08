---
title: min (Function)
---

This function returns the smaller value of `p1` and `p2`.

## Syntax

```sql
<DOUBLE> math:min(<INT|LONG|FLOAT|DOUBLE> p1, <INT|LONG|FLOAT|DOUBLE> p2)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | One of the input values that are to be compared in order to find the smaller value.    |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p2   | The input value that is to be compared with `p1` in order to find the smaller value. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue1 double, inValue2 int);

@info(name = 'findMinValue')
INSERT INTO OutMediationStream
SELECT math:min(inValue1, inValue2) AS minValue
FROM InValueStream;
```

The query compares the given input values `inValue1` and `inValue2` from `InValueStream`, and directs the smaller value to the output stream `OutMediationStream`. For example, `min(123.67d, 91)` returns 91.
