---
title: kmToin (Function)
---

This converts the input given in kilometers into inches.

## Syntax

```sql
<DOUBLE> unitconversion:kmToin(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1  | The value that needs to be converted from kilometers into inches. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kmToin(1) AS inches;
```

This query uses the `unitconversion:kmToin()` function to convert the value of `1` kilometer into its equivalent value in inches. The conversion result is approximately `39370.08` inches.

## Example 2

```sql
CREATE STREAM InputStream (distance_km double);
CREATE STREAM OutputStream (distance_km double, distance_in double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_km, unitconversion:kmToin(distance_km) AS distance_in
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_km`, representing distance values in kilometers. Then, an output stream called `OutputStream` is defined, which will contain the original distance in kilometers as well as the converted distance in inches.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kmToin()` function to convert the `distance_km` attribute from the `InputStream` into its corresponding value in inches, and this value is assigned to the `distance_in` attribute in the `OutputStream`.

The query outputs the original distance in kilometers and the converted distance in inches for each event to the `OutputStream`.
