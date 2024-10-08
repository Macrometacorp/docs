---
title: kgToStone (Function)
---

This function converts the input given in kilograms into imperial stones.

## Syntax

```sql
<DOUBLE> unitconversion:kgToStone(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into imperial stones. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:kgToStone(1)
```

In this example, the `unitconversion:kgToStone()` function converts a value of `1` kilogram into its equivalent value in imperial stones. The conversion result is approximately `0.157` stones.

## Example 2

```sql
CREATE STREAM InputStream (mass_kg double);
CREATE SINK STREAM OutputStream (mass_kg double, mass_stones double);

@info(name = 'massConversionQuery')
INSERT INTO OutputStream
SELECT mass_kg, unitconversion:kgToStone(mass_kg) AS mass_stones
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `mass_kg`, representing mass values in kilograms. Then, an output stream called `OutputStream` is defined, which will contain the original mass in kilograms as well as the converted mass in imperial stones.

The `massConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kgToStone()` function to convert the `mass_kg` attribute from the `InputStream` into its corresponding value in imperial stones, and this value is assigned to the `mass_stones` attribute in the `OutputStream`.

The query outputs the original mass in kilograms and the converted mass in imperial stones for each event to the `OutputStream`.
