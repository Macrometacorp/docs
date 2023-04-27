---
title: mlTol (Function)
---

This converts the input given in milliliters into liters.

## Syntax

```sql
<DOUBLE> unitconversion:mlTol(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from milliliters into liters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:mlTol(1000) AS liters;
```

This query uses the `unitconversion:mlTol()` function to convert the value of `1000` milliliters into its equivalent value in liters. The conversion result is `1` liter.

## Example 2

```sql
CREATE STREAM InputStream (volume_ml double);
CREATE STREAM OutputStream (volume_ml double, volume_l double);

@info(name = 'volumeConversionQuery')
INSERT INTO OutputStream
SELECT volume_ml, unitconversion:mlTol(volume_ml) AS volume_l
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `volume_ml`, representing volume values in milliliters. Then, an output stream called `OutputStream` is defined, which will contain the original volume in milliliters as well as the converted volume in liters.

The `volumeConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:mlTol()` function to convert the `volume_ml` attribute from the `InputStream` into its corresponding value in liters, and this value is assigned to the `volume_l` attribute in the `OutputStream`.

The query outputs the original volume in milliliters and the converted volume in liters for each event to the `OutputStream`.
