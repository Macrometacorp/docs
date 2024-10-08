---
title: lToml (Function)
---

This converts the input given in liters into milliliters.

## Syntax

```sql
<DOUBLE> unitconversion:lToml(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from liters into milliliters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:lToml(1) AS milliliters;
```

This query uses the `unitconversion:lToml()` function to convert the value of `1` liter into its equivalent value in milliliters. The conversion result is `1,000` milliliters.

## Example 2

```sql
CREATE STREAM InputStream (volume_l double);
CREATE SINK STREAM OutputStream (volume_l double, volume_ml double);

@info(name = 'volumeConversionQuery')
INSERT INTO OutputStream
SELECT volume_l, unitconversion:lToml(volume_l) AS volume_ml
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `volume_l`, representing volume values in liters. Then, an output stream called `OutputStream` is defined, which will contain the original volume in liters as well as the converted volume in milliliters.

The `volumeConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:lToml()` function to convert the `volume_l` attribute from the `InputStream` into its corresponding value in milliliters, and this value is assigned to the `volume_ml` attribute in the `OutputStream`.

The query outputs the original volume in liters and the converted volume in milliliters for each event to the `OutputStream`.
