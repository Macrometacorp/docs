---
title: kmToum (Function)
---

This converts the input given in kilometers into micrometers.

## Syntax

```sql
<DOUBLE> unitconversion:kmToum(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into micrometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kmToum(1) AS micrometers;
```

This query uses the `unitconversion:kmToum()` function to convert the value of `1` kilometer into its equivalent value in micrometers. The conversion result is `1,000,000,000` micrometers.

## Example 2

```sql
CREATE STREAM InputStream (distance_km double);
CREATE SINK STREAM OutputStream (distance_km double, distance_um double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_km, unitconversion:kmToum(distance_km) AS distance_um
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_km`, representing distance values in kilometers. Then, an output stream called `OutputStream` is defined, which will contain the original distance in kilometers as well as the converted distance in micrometers.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kmToum()` function to convert the `distance_km` attribute from the `InputStream` into its corresponding value in micrometers, and this value is assigned to the `distance_um` attribute in the `OutputStream`.

The query outputs the original distance in kilometers and the converted distance in micrometers for each event to the `OutputStream`.
