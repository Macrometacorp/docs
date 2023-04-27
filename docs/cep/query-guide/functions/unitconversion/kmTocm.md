---
title: kmTocm (Function)
---

This converts the input given in kilometers into centimeters.

## Syntax

```sql
<DOUBLE> unitconversion:kmTocm(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into centimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kmTocm(1) AS centimeters;
```

This query uses the `unitconversion:kmTocm()` function to convert the value of `1` kilometer into its equivalent value in centimeters. The conversion result is `100000.0` centimeters.

## Example 2

```sql
CREATE STREAM InputStream (distance_km double);
CREATE STREAM OutputStream (distance_km double, distance_cm double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_km, unitconversion:kmTocm(distance_km) AS distance_cm
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_km`, representing distance values in kilometers. Then, an output stream called `OutputStream` is defined, which will contain the original distance in kilometers as well as the converted distance in centimeters.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kmTocm()` function to convert the `distance_km` attribute from the `InputStream` into its corresponding value in centimeters, and this value is assigned to the `distance_cm` attribute in the `OutputStream`.

The query outputs the original distance in kilometers and the converted distance in centimeters for each event to the `OutputStream`.
