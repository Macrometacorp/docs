---
title: gTomg (Function)
---

This converts the input given in grams into milligrams.

## Syntax

```sql
<DOUBLE> unitconversion:gTomg(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from grams into milligrams. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:gTomg(1)
```

In this example, the `unitconversion:gTomg()` function converts a value of `1` gram into its equivalent value in milligrams. The conversion result is `1000.0` milligrams.

## Example 2

```sql
CREATE STREAM InputStream (weight_grams double);
CREATE SINK STREAM OutputStream (weight_grams double, weight_milligrams double);

@info(name = 'weightConversionQuery')
INSERT INTO OutputStream
SELECT weight_grams, unitconversion:gTomg(weight_grams) AS weight_milligrams
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `weight_grams`, representing weights in grams. Then, an output stream called `OutputStream` is defined, which will contain the original weight in grams as well as the converted weight in milligrams.

The `weightConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:gTomg()` function to convert the `weight_grams` attribute from the `InputStream` into its corresponding value in milligrams, and this value is assigned to the `weight_milligrams` attribute in the `OutputStream`.

The query outputs the original weight in grams and the converted weight in milligrams for each event to the `OutputStream`.
