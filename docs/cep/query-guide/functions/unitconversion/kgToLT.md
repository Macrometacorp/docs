---
title: kgToLT (Function)
---

This converts the input given in kilograms into imperial tons.

## Syntax

```sql
<DOUBLE> unitconversion:kgToLT(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into imperial tons. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:kgToLT(1000)
```

In this example, the `unitconversion:kgToLT()` function converts a value of `1000` kilograms into its equivalent value in imperial tons. The conversion result is approximately `0.9842` imperial tons.

## Example 2

```sql
CREATE STREAM InputStream (mass_kg double);
CREATE STREAM OutputStream (mass_kg double, mass_LT double);

@info(name = 'massConversionQuery')
INSERT INTO OutputStream
SELECT mass_kg, unitconversion:kgToLT(mass_kg) AS mass_LT
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `mass_kg`, representing mass values in kilograms. Then, an output stream called `OutputStream` is defined, which will contain the original mass in kilograms as well as the converted mass in imperial tons.

The `massConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kgToLT()` function to convert the `mass_kg` attribute from the `InputStream` into its corresponding value in imperial tons, and this value is assigned to the `mass_LT` attribute in the `OutputStream`.

The query outputs the original mass in kilograms and the converted mass in imperial tons for each event to the `OutputStream`.
