---
title: tTokg (Function)
---

This converts the input given in tonnes into kilograms.

## Syntax

```sql
<DOUBLE> unitconversion:tTokg(<INT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value that needs to be converted from tonnes into kilograms. |               | INT DOUBLE          | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:tTokg(1) AS kilograms;
```

This query uses the `unitconversion:tTokg()` function to convert the value of `1` tonne into its equivalent value in kilograms. The conversion result is `1000.0` kilograms.

## Example 2

```sql
CREATE STREAM InputStream (mass_t double);
CREATE SINK STREAM OutputStream (mass_t double, mass_kg double);

@info(name = 'massConversionQuery')
INSERT INTO OutputStream
SELECT mass_t, unitconversion:tTokg(mass_t) AS mass_kg
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `mass_t`, representing mass values in tonnes. Then, an output stream called `OutputStream` is defined, which will contain the original mass in tonnes as well as the converted mass in kilograms.

The `massConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:tTokg()` function to convert the `mass_t` attribute from the `InputStream` into its corresponding value in kilograms, and this value is assigned to the `mass_kg` attribute in the `OutputStream`.

The query outputs the original mass in tonnes and the converted mass in kilograms for each event to the `OutputStream`.
