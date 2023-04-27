---
title: kmTomi (Function)
---

This converts the input given in kilometers into miles.

## Syntax

```sql
<DOUBLE> unitconversion:kmTomi(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into miles. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kmTomi(1) AS miles;
```

This query uses the `unitconversion:kmTomi()` function to convert the value of `1` kilometer into its equivalent value in miles. The conversion result is approximately `0.621` miles.

## Example 2

```sql
CREATE STREAM InputStream (distance_km double);
CREATE STREAM OutputStream (distance_km double, distance_mi double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_km, unitconversion:kmTomi(distance_km) AS distance_mi
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_km`, representing distance values in kilometers. Then, an output stream called `OutputStream` is defined, which will contain the original distance in kilometers as well as the converted distance in miles.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kmTomi()` function to convert the `distance_km` attribute from the `InputStream` into its corresponding value in miles, and this value is assigned to the `distance_mi` attribute in the `OutputStream`.

The query outputs the original distance in kilometers and the converted distance in miles for each event to the `OutputStream`.
