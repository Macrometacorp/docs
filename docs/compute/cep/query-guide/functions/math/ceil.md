---
title: ceil (Function)
---

This function returns the smallest double value, i.e., the closest to the negative infinity, that is greater than or equal to the `p1` argument, and is equal to a mathematical integer. It wraps the `java.lang.Math.ceil()` method.

## Syntax

```sql
<DOUBLE> math:ceil(<FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value of the parameter whose ceiling value is found. |      | FLOAT DOUBLE | No | Yes |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'calculateCeilingValue')
INSERT INTO OutMediationStream
SELECT math:ceil(inValue) AS ceilingValue
FROM InValueStream;
```

The query takes the `inValue` from the input stream `InValueStream` and uses the `math:ceil()` function to calculate the smallest integer value that is greater than or equal to the given `inValue`. The result is directed to the output stream `OutMediationStream`. For example, when `inValue` is 423.187, the `ceilingValue` returned is 424.0.
