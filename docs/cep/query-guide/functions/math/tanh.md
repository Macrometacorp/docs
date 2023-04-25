---
title: tanh (Function)
---

This function returns the hyperbolic tangent of the value given in
radians. It wraps the `java.lang.Math.tanh()` function.

## Syntax

```sql
<DOUBLE> math:tanh(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose hyperbolic tangent value should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateHyperbolicTangent')
INSERT INTO OutMediationStream
SELECT math:tanh(inValue) AS tanhValue
FROM InValueStream;
```

The `calculateHyperbolicTangent` query processes the input stream `InValueStream`, which contains a single field `inValue`. For each event in the input stream, the query calculates the hyperbolic tangent value of the `inValue` using the `math:tanh()` function.

The `math:tanh()` function takes the given `inValue` and returns the corresponding hyperbolic tangent value.

The calculated hyperbolic tangent value is aliased as `tanhValue`, and the output stream `OutMediationStream` contains this value. This query processes the input stream events and forwards the resulting hyperbolic tangent values to the output stream for further processing or analysis.

For example, if `inValue` is 6, the `tanhValue` will be approximately 0.9999877116507956.
