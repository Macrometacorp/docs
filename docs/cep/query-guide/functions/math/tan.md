---
title: tan (Function)
---

This function returns the tan of the given value in radians. It wraps the `java.lang.Math.tan()` function.

## Syntax

```sql
<DOUBLE> math:tan(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose tan value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateTangent')
INSERT INTO OutMediationStream
SELECT math:tan(inValue) AS tanValue
FROM InValueStream;
```

The `calculateTangent` query processes the input stream `InValueStream`, which contains a single field `inValue`. For each event in the input stream, the query calculates the tangent value of the `inValue` using the `math:tan()` function.

The `math:tan()` function takes the given `inValue` and returns the corresponding tangent value.

The calculated tangent value is aliased as `tanValue`, and the output stream `OutMediationStream` contains this value. This query processes the input stream events and forwards the resulting tangent values to the output stream for further processing or analysis.

For example, if `inValue` is 6, the `tanValue` will be approximately -0.29100619138474915.
