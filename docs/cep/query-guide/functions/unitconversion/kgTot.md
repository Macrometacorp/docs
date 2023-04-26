---
title: kgTot (Function)
---

This converts the input given in kilograms into tonnes.

## Syntax

    <DOUBLE> unitconversion:kgTot(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description    | Default Value | Possible Data Types   | Optional | Dynamic |
|------|----------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from kilograms into tonnes. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:kgTot(1) AS tonnes;
```

This query uses the `unitconversion:kgTot()` function to convert the value of `1` kilogram into its equivalent value in tonnes. The conversion result is `0.001` tonnes.

## Example 2

```sql
CREATE STREAM InputStream (mass_kg double);
CREATE STREAM OutputStream (mass_kg double, mass_tonnes double);

@info(name = 'massConversionQuery')
INSERT INTO OutputStream
SELECT mass_kg, unitconversion:kgTot(mass_kg) AS mass_tonnes
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `mass_kg`, representing mass values in kilograms. Then, an output stream called `OutputStream` is defined, which will contain the original mass in kilograms as well as the converted mass in tonnes.

The `massConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:kgTot()` function to convert the `mass_kg` attribute from the `InputStream` into its corresponding value in tonnes, and this value is assigned to the `mass_tonnes` attribute in the `OutputStream`.

The query outputs the original mass in kilograms and the converted mass in tonnes for each event to the `OutputStream`.
