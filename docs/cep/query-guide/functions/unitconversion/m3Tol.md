---
title: m3Tol (Function)
---

This converts the input given in cubic meters into liters.

## Syntax

```sql
<DOUBLE> unitconversion:m3Tol(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from meters into liters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:m3Tol(1) AS liters;
```

This query uses the `unitconversion:m3Tol()` function to convert the value of `1` cubic meter into its equivalent value in liters. The conversion result is `1,000` liters.

## Example 2

```sql
CREATE STREAM InputStream (volume_m3 double);
CREATE SINK STREAM OutputStream (volume_m3 double, volume_l double);

@info(name = 'volumeConversionQuery')
INSERT INTO OutputStream
SELECT volume_m3, unitconversion:m3Tol(volume_m3) AS volume_l
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `volume_m3`, representing volume values in cubic meters. Then, an output stream called `OutputStream` is defined, which will contain the original volume in cubic meters as well as the converted volume in liters.

The `volumeConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:m3Tol()` function to convert the `volume_m3` attribute from the `InputStream` into its corresponding value in liters, and this value is assigned to the `volume_l` attribute in the `OutputStream`.

The query outputs the original volume in cubic meters and the converted volume in liters for each event to the `OutputStream`.
