---
title: kgToST (Function)
---

This converts the input given in kilograms into US tons.

## Syntax

```sql
<DOUBLE> unitconversion:kgToST(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into US tons. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:kgToST(1000)
```

In this example, the `unitconversion:kgToST()` function converts a value of `1000` kilograms into its equivalent value in US short tons. The conversion result is approximately `1.10` short tons.

## Example 2

```sql
CREATE STREAM InputStream (mass_kg double);
CREATE STREAM OutputStream (mass_kg double, mass_st double);

@info(name = 'massConversionQuery')
INSERT INTO OutputStream
SELECT mass_kg, unitconversion:kgToST(mass_kg) AS mass_st
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `mass_kg`, representing mass values in kilograms. Then, an output stream called `OutputStream` is defined, which will contain the original mass in kilograms as well as the converted mass in US short tons.

The `massConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kgToST()` function to convert the `mass_kg` attribute from the `InputStream` into its corresponding value in US short tons, and this value is assigned to the `mass_st` attribute in the `OutputStream`.

The query outputs the original mass in kilograms and the converted mass in US short tons for each event to the `OutputStream`.
