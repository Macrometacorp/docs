---
title: cbrt (Function)
---

This function returns the cube-root of `p1` which is in radians. It wraps the `java.lang.Math.cbrt()` function.

## Syntax

```sql
<DOUBLE> math:cbrt(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|----------------|----------|---------|
| p1   | The value of the parameter whose cube-root should be found. Input is required to be in radians. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateCubeRoot')
INSERT INTO OutMediationStream
SELECT math:cbrt(inValue) AS cbrtValue
FROM InValueStream;
```

The query takes the `inValue` from the input stream `InValueStream` and uses the `math:cbrt()` function to calculate the cube root of the value. The result is directed to the output stream `OutMediationStream`. For example, when `inValue` is 17, the `cbrtValue` returned is 2.5712815906582356.
