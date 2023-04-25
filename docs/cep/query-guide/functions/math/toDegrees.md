---
title: toDegrees (Function)
---

This function converts the value given in radians to degrees. It wraps
the `java.lang.Math.toDegrees()` function.

## Syntax

```sql
<DOUBLE> math:toDegrees(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The input value in radians that should be converted to degrees. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'convertToDegrees')
INSERT INTO OutMediationStream
SELECT math:toDegrees(inValue) AS degreesValue
FROM InValueStream;
```

The `convertToDegrees` query processes the input stream `InValueStream`, which contains a single field `inValue`. For each event in the input stream, the query converts the `inValue` from radians to degrees using the `math:toDegrees()` function.

The `math:toDegrees()` function takes the given `inValue` in radians and returns the corresponding value in degrees.

The calculated degree value is aliased as `degreesValue`, and the output stream `OutMediationStream` contains this value. This query processes the input stream events and forwards the resulting degree values to the output stream for further processing or analysis.

For example, if `inValue` is 6, the `degreesValue` will be approximately 343.77467707849394.
