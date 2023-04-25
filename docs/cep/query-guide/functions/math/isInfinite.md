---
title: isInfinite (Function)
---

This function wraps the `java.lang.Float.isInfinite()` and `java.lang.Double.isInfinite()` and returns `true` if `p1` is infinitely large in magnitude and `false` if otherwise.

## Syntax

```sql
<BOOL> math:isInfinite(<FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | This is the value of the parameter that the function determines to be either infinite or finite. |               | FLOAT DOUBLE        | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue1 double, inValue2 int);

@info(name = 'checkInfinite')
INSERT INTO OutMediationStream
SELECT math:isInfinite(inValue1) AS isInfinite
FROM InValueStream;
```

The query checks if the given `inValue1` from the `InValueStream` is of infinitely large magnitude. If it is, the function returns `true`. The result is directed to the output stream `OutMediationStream`. For example, `isInfinite(java.lang.Double.POSITIVE_INFINITY)` returns `true`.
