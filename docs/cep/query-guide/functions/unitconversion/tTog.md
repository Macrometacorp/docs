---
title: tTog (Function)
---

This converts the input given in tonnes into grams.

## Syntax

```sql
<DOUBLE> unitconversion:tTog(<INT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| p1   | The value that needs to be converted from Tonnes into grams. |               | INT DOUBLE          | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:tTog(1) AS grams;
```

This query uses the `unitconversion:tTog()` function to convert the value of `1` tonne into its equivalent value in grams. The conversion result is `1000000.0` grams.

## Example 2

```sql
CREATE STREAM InputStream (mass_t double);
CREATE STREAM OutputStream (mass_t double, mass_g double);

@info(name = 'massConversionQuery')
INSERT INTO OutputStream
SELECT mass_t, unitconversion:tTog(mass_t) AS mass_g
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `mass_t`, representing mass values in tonnes. Then, an output stream called `OutputStream` is defined, which will contain the original mass in tonnes as well as the converted mass in grams.

The `massConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:tTog()` function to convert the `mass_t` attribute from the `InputStream` into its corresponding value in grams, and this value is assigned to the `mass_g` attribute in the `OutputStream`.

The query outputs the original mass in tonnes and the converted mass in grams for each event to the `OutputStream`.
