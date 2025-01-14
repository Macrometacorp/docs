---
title: mTomm (Function)
---

This converts the input given in meters into millimeters.

## Syntax

```sql
<DOUBLE> unitconversion:mTomm(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into millimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:mTomm(1) AS millimeters;
```

This query uses the `unitconversion:mTomm()` function to convert the value of `1` meter into its equivalent value in millimeters. The conversion result is `1000.0` millimeters.

## Example 2

```sql
CREATE STREAM InputStream (distance_m double);
CREATE SINK STREAM OutputStream (distance_m double, distance_mm double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_m, unitconversion:mTomm(distance_m) AS distance_mm
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_m`, representing distance values in meters. Then, an output stream called `OutputStream` is defined, which will contain the original distance in meters as well as the converted distance in millimeters.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:mTomm()` function to convert the `distance_m` attribute from the `InputStream` into its corresponding value in millimeters, and this value is assigned to the `distance_mm` attribute in the `OutputStream`.

The query outputs the original distance in meters and the converted distance in millimeters for each event to the `OutputStream`.
