---
title: kgTolb (Function)
---

This converts the input given in kilograms into pounds.

## Syntax

```sql
<DOUBLE> unitconversion:kgTolb(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into pounds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:kgTolb(1)
```

In this example, the `unitconversion:kgTolb()` function converts a value of `1` kilogram into its equivalent value in pounds. The conversion result is approximately `2.2` pounds.

## Example 2

```sql
CREATE STREAM InputStream (mass_kg double);
CREATE SINK STREAM OutputStream (mass_kg double, mass_lb double);

@info(name = 'massConversionQuery')
INSERT INTO OutputStream
SELECT mass_kg, unitconversion:kgTolb(mass_kg) AS mass_lb
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `mass_kg`, representing mass values in kilograms. Then, an output stream called `OutputStream` is defined, which will contain the original mass in kilograms as well as the converted mass in pounds.

The `massConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kgTolb()` function to convert the `mass_kg` attribute from the `InputStream` into its corresponding value in pounds, and this value is assigned to the `mass_lb` attribute in the `OutputStream`.

The query outputs the original mass in kilograms and the converted mass in pounds for each event to the `OutputStream`.
