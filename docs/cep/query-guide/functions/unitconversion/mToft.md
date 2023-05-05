---
title: mToft (Function)
---

This converts the input given in meters into feet.

## Syntax

```sql
<DOUBLE> unitconversion:mToft(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into feet. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:mToft(1) AS feet;
```

This query uses the `unitconversion:mToft()` function to convert the value of `1` meter into its equivalent value in feet. The conversion result is approximately `3.280` feet.

## Example 2

```sql
CREATE STREAM InputStream (distance_m double);
CREATE SINK STREAM OutputStream (distance_m double, distance_ft double);

@info(name = 'distanceConversionQuery')
INSERT INTO OutputStream
SELECT distance_m, unitconversion:mToft(distance_m) AS distance_ft
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `distance_m`, representing distance values in meters. Then, an output stream called `OutputStream` is defined, which will contain the original distance in meters as well as the converted distance in feet.

The `distanceConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:mToft()` function to convert the `distance_m` attribute from the `InputStream` into its corresponding value in feet, and this value is assigned to the `distance_ft` attribute in the `OutputStream`.

The query outputs the original distance in meters and the converted distance in feet for each event to the `OutputStream`.
