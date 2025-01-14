---
title: floor (Function)
---

This function wraps the `java.lang.Math.floor()` function and returns the largest value, i.e., closest to the positive infinity, that is less than or equal to `p1`, and is equal to a mathematical integer.

## Syntax

```sql
<DOUBLE> math:floor(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose floor value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'floorValue')
INSERT INTO OutMediationStream
SELECT math:floor(inValue) AS floorValue
FROM InValueStream;
```

The query calculates the floor value of the given `inValue` from the `InValueStream` using the `math:floor()` function, which rounds down to the nearest integer value. The result is directed to the output stream `OutMediationStream`. For example, `floor(10.23)` returns 10.0.
