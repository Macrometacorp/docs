---
title: kmTomm (Function)
---

This converts the input given in kilometers into millimeters.

## Syntax

```sql
<DOUBLE> unitconversion:kmTomm(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into millimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kmTomm(1) AS millimeters;
```

This query uses the `unitconversion:kmTomm()` function to convert the value of `1` kilometer into its equivalent value in millimeters. The conversion result is `1,000,000` millimeters.

## Example 2

```sql
CREATE STREAM InputStream (distance_km double);
CREATE STREAM OutputStream (distance_km double, distance_mm double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_km, unitconversion:kmTomm(distance_km) AS distance_mm
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_km`, representing distance values in kilometers. Then, an output stream called `OutputStream` is defined, which will contain the original distance in kilometers as well as the converted distance in millimeters.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kmTomm()` function to convert the `distance_km` attribute from the `InputStream` into its corresponding value in millimeters, and this value is assigned to the `distance_mm` attribute in the `OutputStream`.

The query outputs the original distance in kilometers and the converted distance in millimeters for each event to the `OutputStream`.
