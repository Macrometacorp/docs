---
title: isNan (Function)
---

This function wraps the `java.lang.Float.isNaN()` and `java.lang.Double.isNaN()` functions and returns `true` if `p1` is NaN  (Not-a-Number), and returns `false` if otherwise.

## Syntax

```sql
<BOOL> math:isNan(<FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter which the function determines to be either NaN or a number. |               | FLOAT DOUBLE        | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue1 double, inValue2 int);

@info(name = 'checkNaN')
INSERT INTO OutMediationStream
SELECT math:isNan(inValue1) AS isNaN
FROM InValueStream;
```

The query checks if the given `inValue1` from the `InValueStream` is an undefined value (NaN). If it is, the function returns `true`. The result is directed to the output stream `OutMediationStream`. For example, `isNan(java.lang.Math.log(-12d))` returns `true`.
