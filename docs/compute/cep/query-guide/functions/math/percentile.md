---
title: percentile (Aggregate Function)
---

This functions returns the pth percentile value of a given argument.

## Syntax

```sql
<DOUBLE> math:percentile(<INT|LONG|FLOAT|DOUBLE> arg, <DOUBLE> p)
```

## Query Parameters

| Name | Description                        | Default Value | Possible Data Types   | Optional | Dynamic |
|------|------------------------------------------------|---------------|-----------------------|----------|---------|
| arg  | The value of the parameter whose percentile should be found.     |               | INT LONG FLOAT DOUBLE | No       | Yes     |
| p    | Estimate of the percentile to be found (pth percentile) where p is any number greater than 0 or lesser than or equal to 100. |               | DOUBLE                | No       | Yes     |

## Example 1

```sql
CREATE STREAM InValueStream (sensorId int, temperature double);

@info(name = 'calculatePercentile')
INSERT INTO OutMediationStream
SELECT math:percentile(temperature, 97.0) AS percentile
FROM InValueStream#window.timeBatch(60000); -- 1-minute window
```

The `calculatePercentile` query processes the input stream `InValueStream`, which contains the `sensorId` and `temperature` fields. Using a 1-minute time window (60000 milliseconds) with the `#window.timeBatch(60000)` expression, the query calculates the 97th percentile of the temperature values within this time window for the events in `InValueStream`. 

The `math:percentile(temperature, 97.0)` function is used to compute the 97th percentile value of the temperature events. The calculated percentile value is aliased as `percentile` and is directed to the `OutMediationStream`.

In summary, the `calculatePercentile` query monitors the temperature events in the `InValueStream` and computes the 97th percentile of those events within a rolling 1-minute window. The result is then sent to the `OutMediationStream` for further processing or analysis.
