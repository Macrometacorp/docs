---
title: toRadians (Function)
---

This function converts the value given in degrees to radians. It wraps the `java.lang.Math.toRadians()` function.

## Syntax

```sql
<DOUBLE> math:toRadians(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The input value in degrees that should be converted to radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'convertToRadians')
INSERT INTO OutMediationStream
SELECT math:toRadians(inValue) AS radiansValue
FROM InValueStream;
```

The `convertToRadians` query processes the input stream `InValueStream`, which contains a single field `inValue`. For each event in the input stream, the query converts the `inValue` from degrees to radians using the `math:toRadians()` function.

The `math:toRadians()` function takes the given `inValue` in degrees and returns the corresponding value in radians.

The calculated radian value is aliased as `radiansValue`, and the output stream `OutMediationStream` contains this value. This query processes the input stream events and forwards the resulting radian values to the output stream for further processing or analysis.

For example, if `inValue` is 6, the `radiansValue` will be approximately 0.10471975511965977.
