---
title: sin (Function)
---

This returns the sine of the value given in radians. This function wraps
the `java.lang.Math.sin()` function.

## Syntax

```sql
<DOUBLE> math:sin(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose sine value should be found. Input is required to be in radians. |       | INT LONG FLOAT DOUBLE | No  | Yes  |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateSine')
INSERT INTO OutMediationStream
SELECT math:sin(inValue) AS sinValue
FROM InValueStream;
```

The `calculateSine` query processes the input stream `InValueStream`, which contains a single field `inValue`. For each event in the input stream, the query calculates the sine value of the `inValue` using the `math:sin()` function.

The `math:sin()` function takes the given `inValue` (representing an angle in radians) and returns the corresponding sine value.

The calculated sine value is aliased as `sinValue`, and the output stream `OutMediationStream` contains this value. This query processes the input stream events and forwards the resulting sine values to the output stream for further processing or analysis.

For example, if `inValue` is 6, the `sinValue` will be -0.27941549819892586.
