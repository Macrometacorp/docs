---
title: miTokm (Function)
---

This converts the input given in miles into kilometers.

## Syntax

```sql
<DOUBLE> unitconversion:miTokm(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from miles into kilometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:miTokm(1) AS kilometers;
```

This query uses the `unitconversion:miTokm()` function to convert the value of `1` mile into its equivalent value in kilometers. The conversion result is approximately `1.6` kilometers.

## Example 2

```sql
CREATE STREAM InputStream (distance_mi double);
CREATE STREAM OutputStream (distance_mi double, distance_km double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_mi, unitconversion:miTokm(distance_mi) AS distance_km
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_mi`, representing distance values in miles. Then, an output stream called `OutputStream` is defined, which will contain the original distance in miles as well as the converted distance in kilometers.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:miTokm()` function to convert the `distance_mi` attribute from the `InputStream` into its corresponding value in kilometers, and this value is assigned to the `distance_km` attribute in the `OutputStream`.

The query outputs the original distance in miles and the converted distance in kilometers for each event to the `OutputStream`.
