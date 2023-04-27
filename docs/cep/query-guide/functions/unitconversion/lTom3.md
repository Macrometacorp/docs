---
title: lTom3 (Function)
---

This converts the input given in liters into cubic meters.

## Syntax

```sql
<DOUBLE> unitconversion:lTom3(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from liters into cubic meters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:lTom3(1000) AS cubic_meters;
```

This query uses the `unitconversion:lTom3()` function to convert the value of `1,000` liters into its equivalent value in cubic meters. The conversion result is `1` cubic meter.

## Example 2

```sql
CREATE STREAM InputStream (volume_l double);
CREATE STREAM OutputStream (volume_l double, volume_m3 double);

@info(name = 'volumeConversionQuery')
INSERT INTO OutputStream
SELECT volume_l, unitconversion:lTom3(volume_l) AS volume_m3
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `volume_l`, representing volume values in liters. Then, an output stream called `OutputStream` is defined, which will contain the original volume in liters as well as the converted volume in cubic meters.

The `volumeConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:lTom3()` function to convert the `volume_l` attribute from the `InputStream` into its corresponding value in cubic meters, and this value is assigned to the `volume_m3` attribute in the `OutputStream`.

The query outputs the original volume in liters and the converted volume in cubic meters for each event to the `OutputStream`.
