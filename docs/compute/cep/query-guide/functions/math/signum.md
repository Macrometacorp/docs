---
title: signum (Function)
---

This returns +1, 0, or -1 for the given positive, zero and negative values respectively. This function wraps the `java.lang.Math.signum()` function.

## Syntax

```sql
<INT> math:signum(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1 | The value that should be checked to be positive, negative or zero. |     | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateSign')
INSERT INTO OutMediationStream
SELECT math:signum(inValue) AS sign
FROM InValueStream;
```

The `calculateSign` query processes the input stream `InValueStream`, which contains a single field `inValue`. For each event in the input stream, the query evaluates the sign of the `inValue` using the `math:signum()` function.

The `math:signum()` function returns:

- 1 if the `inValue` is positive,
- -1 if the `inValue` is negative,
- 0 if the `inValue` is zero.

The evaluated sign is aliased as `sign`, and the output stream `OutMediationStream` contains this value. This query processes the input stream events and forwards the resulting sign values to the output stream for further processing or analysis.

For example, if `inValue` is -6.32, the `sign` will be -1.
