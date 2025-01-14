---
title: sqrt (Function)
---

This function returns the square-root of the given value. It wraps the `java.lang.Math.sqrt()` function.

## Syntax

```sql
<DOUBLE> math:sqrt(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value of the parameter whose square-root value should be found. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateSquareRoot')
INSERT INTO OutMediationStream
SELECT math:sqrt(inValue) AS sqrtValue
FROM InValueStream;
```

The `calculateSquareRoot` query processes the input stream `InValueStream`, which contains a single field `inValue`. For each event in the input stream, the query calculates the square-root value of the `inValue` using the `math:sqrt()` function.

The `math:sqrt()` function takes the given `inValue` and returns the corresponding square-root value.

The calculated square-root value is aliased as `sqrtValue`, and the output stream `OutMediationStream` contains this value. This query processes the input stream events and forwards the resulting square-root values to the output stream for further processing or analysis.

For example, if `inValue` is 4, the `sqrtValue` will be 2.
