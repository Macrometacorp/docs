---
title: gTokg (Function)
---

This converts the input given in grams into kilograms.

## Syntax

```sql
<DOUBLE> unitconversion:gTokg(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from grams into kilograms. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:gTokg(1000)
```

In this example, the `unitconversion:gTokg()` function converts a value of `1000` grams into its equivalent value in kilograms. The conversion result is `1.0` kilograms.

## Example 2

```sql
CREATE STREAM InputStream (weight_grams double);
CREATE SINK STREAM OutputStream (weight_grams double, weight_kilograms double);

@info(name = 'weightConversionQuery')
INSERT INTO OutputStream
SELECT weight_grams, unitconversion:gTokg(weight_grams) AS weight_kilograms
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `weight_grams`, representing weights in grams. Then, an output stream called `OutputStream` is defined, which will contain the original weight in grams as well as the converted weight in kilograms.

The `weightConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:gTokg()` function to convert the `weight_grams` attribute from the `InputStream` into its corresponding value in kilograms, and this value is assigned to the `weight_kilograms` attribute in the `OutputStream`.

The query outputs the original weight in grams and the converted weight in kilograms for each event to the `OutputStream`.
