---
title: kmTom (Function)
---

This converts the input given in kilometers into meters.

## Syntax

```sql
<DOUBLE> unitconversion:kmTom(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1  | The value that needs to be converted from kilometers into meters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kmTom(1) AS meters;
```

This query uses the `unitconversion:kmTom()` function to convert the value of `1` kilometer into its equivalent value in meters. The conversion result is `1000.0` meters.

## Example 2

```sql
CREATE STREAM InputStream (distance_km double);
CREATE SINK STREAM OutputStream (distance_km double, distance_m double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_km, unitconversion:kmTom(distance_km) AS distance_m
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_km`, representing distance values in kilometers. Then, an output stream called `OutputStream` is defined, which will contain the original distance in kilometers as well as the converted distance in meters.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kmTom()` function to convert the `distance_km` attribute from the `InputStream` into its corresponding value in meters, and this value is assigned to the `distance_m` attribute in the `OutputStream`.

The query outputs the original distance in kilometers and the converted distance in meters for each event to the `OutputStream`.
