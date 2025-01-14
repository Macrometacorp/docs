---
title: MmTokm (Function)
---

This converts the input given in megameters into kilometers.

## Syntax

```sql
<DOUBLE> unitconversion:MmTokm(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from megameters into kilometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:MmTokm(1) AS kilometers;
```

This query uses the `unitconversion:MmTokm()` function to convert the value of `1` megameter into its equivalent value in kilometers. The conversion result is `1000` kilometers.

## Example 2

```sql
CREATE STREAM InputStream (distance_mm double);
CREATE SINK STREAM OutputStream (distance_mm double, distance_km double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_mm, unitconversion:MmTokm(distance_mm) AS distance_km
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_mm`, representing distance values in megameters. Then, an output stream called `OutputStream` is defined, which will contain the original distance in megameters as well as the converted distance in kilometers.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:MmTokm()` function to convert the `distance_mm` attribute from the `InputStream` into its corresponding value in kilometers, and this value is assigned to the `distance_km` attribute in the `OutputStream`.

The query outputs the original distance in megameters and the converted distance in kilometers for each event to the `OutputStream`.
