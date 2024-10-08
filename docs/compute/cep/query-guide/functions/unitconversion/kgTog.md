---
title: kgTog (Function)
---

This converts the input given in kilograms into grams.

## Syntax

```sql
<DOUBLE> unitconversion:kgTog(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description                                                     | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-----------------------------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into grams. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:kgTog(1)
```

In this example, the `unitconversion:kgTog()` function converts a value of `1` kilogram into its equivalent value in grams. The conversion result is `1000` grams.

## Example 2

```sql
CREATE STREAM InputStream (mass_kg double);
CREATE SINK STREAM OutputStream (mass_kg double, mass_g double);

@info(name = 'massConversionQuery')
INSERT INTO OutputStream
SELECT mass_kg, unitconversion:kgTog(mass_kg) AS mass_g
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `mass_kg`, representing mass values in kilograms. Then, an output stream called `OutputStream` is defined, which will contain the original mass in kilograms as well as the converted mass in grams.

The `massConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kgTog()` function to convert the `mass_kg` attribute from the `InputStream` into its corresponding value in grams, and this value is assigned to the `mass_g` attribute in the `OutputStream`.

The query outputs the original mass in kilograms and the converted mass in grams for each event to the `OutputStream`.
