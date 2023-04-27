---
title: kmToyd (Function)
---

This converts the input given in kilometers into yards.

## Syntax

```sql
<DOUBLE> unitconversion:kmToyd(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilometers into yards. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kmToyd(1) AS yards;
```

This query uses the `unitconversion:kmToyd()` function to convert the value of `1` kilometer into its equivalent value in yards. The conversion result is `1,093.6` yards.

## Example 2

```sql
CREATE STREAM InputStream (distance_km double);
CREATE STREAM OutputStream (distance_km double, distance_yd double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_km, unitconversion:kmToyd(distance_km) AS distance_yd
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_km`, representing distance values in kilometers. Then, an output stream called `OutputStream` is defined, which will contain the original distance in kilometers as well as the converted distance in yards.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kmToyd()` function to convert the `distance_km` attribute from the `InputStream` into its corresponding value in yards, and this value is assigned to the `distance_yd` attribute in the `OutputStream`.

The query outputs the original distance in kilometers and the converted distance in yards for each event to the `OutputStream`.
