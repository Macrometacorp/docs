---
title: sinh (Function)
---

This returns the hyperbolic sine of the value given in radians. This function wraps the `java.lang.Math.sinh()` function.

## Syntax

```sql
<DOUBLE> math:sinh(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic sine value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateHyperbolicSine')
INSERT INTO OutMediationStream
SELECT math:sinh(inValue) AS sinhValue
FROM InValueStream;
```

The `calculateHyperbolicSine` query processes the input stream `InValueStream`, which contains a single field `inValue`. For each event in the input stream, the query calculates the hyperbolic sine value of the `inValue` using the `math:sinh()` function.

The `math:sinh()` function takes the given `inValue` and returns the corresponding hyperbolic sine value.

The calculated hyperbolic sine value is aliased as `sinhValue`, and the output stream `OutMediationStream` contains this value. This query processes the input stream events and forwards the resulting hyperbolic sine values to the output stream for further processing or analysis.

For example, if `inValue` is 6, the `sinhValue` will be 201.71315737027922.
