---
title: round (Function)
---

This function returns the value of the input argument rounded off to the closest integer/long value.

## Syntax

```sql
<INT|LONG> math:round(<FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value that should be rounded off to the closest integer/long value. |               | FLOAT DOUBLE        | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (inValue double);

@info(name = 'roundValue')
INSERT INTO OutMediationStream
SELECT math:round(inValue) AS roundValue
FROM InValueStream;
```

The `roundValue` query processes the input stream `InValueStream`, which contains a single field `inValue`. For each event in the input stream, the query rounds off the `inValue` to the closest integer value using the `math:round()` function.

The rounded value is aliased as `roundValue`, and the output stream `OutMediationStream` contains this value. This query processes the input stream events and forwards the resulting rounded values to the output stream for further processing or analysis.

For example, if `inValue` is 3252.353, the `roundValue` will be 3252.
