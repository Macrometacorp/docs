---
title: mToyd (Function)
---

This converts the input given in meters into yards.

## Syntax

```sql
<DOUBLE> unitconversion:mToyd(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into yards. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:mToyd(1) AS yards;
```

This query uses the `unitconversion:mToyd()` function to convert the value of `1` meter into its equivalent value in yards. The conversion result is approximately `1.093` yards.

## Example 2

```sql
CREATE STREAM InputStream (distance_m double);
CREATE STREAM OutputStream (distance_m double, distance_yd double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_m, unitconversion:mToyd(distance_m) AS distance_yd
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_m`, representing distance values in meters. Then, an output stream called `OutputStream` is defined, which will contain the original distance in meters as well as the converted distance in yards.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:mToyd()` function to convert the `distance_m` attribute from the `InputStream` into its corresponding value in yards, and this value is assigned to the `distance_yd` attribute in the `OutputStream`.

The query outputs the original distance in meters and the converted distance in yards for each event to the `OutputStream`.
