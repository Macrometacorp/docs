---
title: mTocm (Function)
---

This converts the input given in meters into centimeters.

## Syntax

```sql
<DOUBLE> unitconversion:mTocm(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into centimeters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:mTocm(1) AS centimeters;
```

This query uses the `unitconversion:mTocm()` function to convert the value of `1` meter into its equivalent value in centimeters. The conversion result is `100` centimeters.

## Example 2

```sql
CREATE STREAM InputStream (distance_m double);
CREATE SINK STREAM OutputStream (distance_m double, distance_cm double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_m, unitconversion:mTocm(distance_m) AS distance_cm
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_m`, representing distance values in meters. Then, an output stream called `OutputStream` is defined, which will contain the original distance in meters as well as the converted distance in centimeters.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:mTocm()` function to convert the `distance_m` attribute from the `InputStream` into its corresponding value in centimeters, and this value is assigned to the `distance_cm` attribute in the `OutputStream`.

The query outputs the original distance in meters and the converted distance in centimeters for each event to the `OutputStream`.
