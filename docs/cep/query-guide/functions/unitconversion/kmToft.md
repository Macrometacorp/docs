---
title: kmToft (Function)
---

This converts the input given in kilometers into feet.

## Syntax

```sql
<DOUBLE> unitconversion:kmToft(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into feet. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kmToft(1) AS feet;
```

This query uses the `unitconversion:kmToft()` function to convert the value of `1` kilometer into its equivalent value in feet. The conversion result is approximately `3280.8` feet.

## Example 2

```sql
CREATE STREAM InputStream (distance_km double);
CREATE STREAM OutputStream (distance_km double, distance_ft double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_km, unitconversion:kmToft(distance_km) AS distance_ft
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_km`, representing distance values in kilometers. Then, an output stream called `OutputStream` is defined, which will contain the original distance in kilometers as well as the converted distance in feet.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kmToft()` function to convert the `distance_km` attribute from the `InputStream` into its corresponding value in feet, and this value is assigned to the `distance_ft` attribute in the `OutputStream`.

The query outputs the original distance in kilometers and the converted distance in feet for each event to the `OutputStream`.
