---
title: gToug (Function)
---

This converts the input given in grams into micrograms.

## Syntax

```sql
<DOUBLE> unitconversion:gToug(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from grams into micrograms. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:gToug(1)
```

In this example, the `unitconversion:gToug()` function converts a value of `1` gram into its equivalent value in micrograms. The conversion result is `1000000.0` micrograms.

## Example 2

```sql
CREATE STREAM InputStream (weight_grams double);
CREATE SINK STREAM OutputStream (weight_grams double, weight_micrograms double);

@info(name = 'weightConversionQuery')
INSERT INTO OutputStream
SELECT weight_grams, unitconversion:gToug(weight_grams) AS weight_micrograms
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `weight_grams`, representing weights in grams. Then, an output stream called `OutputStream` is defined, which will contain the original weight in grams as well as the converted weight in micrograms.

The `weightConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:gToug()` function to convert the `weight_grams` attribute from the `InputStream` into its corresponding value in micrograms, and this value is assigned to the `weight_micrograms` attribute in the `OutputStream`.

The query outputs the original weight in grams and the converted weight in micrograms for each event to the `OutputStream`.
