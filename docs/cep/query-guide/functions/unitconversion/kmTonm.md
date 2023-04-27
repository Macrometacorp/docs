---
title: kmTonm (Function)
---

This converts the input given in kilometers into nanometers.

## Syntax

```sql
<DOUBLE> unitconversion:kmTonm(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into nanometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kmTonm(1) AS nanometers;
```

This query uses the `unitconversion:kmTonm()` function to convert the value of `1` kilometer into its equivalent value in nanometers. The conversion result is `1,000,000,000,000` nanometers.

## Example 2

```sql
CREATE STREAM InputStream (distance_km double);
CREATE STREAM OutputStream (distance_km double, distance_nm double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_km, unitconversion:kmTonm(distance_km) AS distance_nm
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_km`, representing distance values in kilometers. Then, an output stream called `OutputStream` is defined, which will contain the original distance in kilometers as well as the converted distance in nanometers.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kmTonm()` function to convert the `distance_km` attribute from the `InputStream` into its corresponding value in nanometers, and this value is assigned to the `distance_nm` attribute in the `OutputStream`.

The query outputs the original distance in kilometers and the converted distance in nanometers for each event to the `OutputStream`.
