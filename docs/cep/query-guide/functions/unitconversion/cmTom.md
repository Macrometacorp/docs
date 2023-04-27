---
title: cmTom (Function)
---

This converts the input given in centimeters into meters.

## Syntax

```sql
<DOUBLE> unitconversion:cmTom(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description   | Default Value | Possible Data Types   | Optional | Dynamic |
|------|---------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into meters. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:cmTom(100)
```

In this example, the `unitconversion:cmTom()` function converts a value of `100` centimeters into its equivalent value in meters. The conversion result is `1.0` meters.

## Example 2

```sql
CREATE STREAM InputStream (length_cm double);
CREATE STREAM OutputStream (length_cm double, length_m double);

@info(name = 'lengthConversionQuery')
INSERT INTO OutputStream
SELECT length_cm, unitconversion:cmTom(length_cm) AS length_m
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `length_cm`, representing lengths in centimeters. Then, an output stream called `OutputStream` is defined, which will contain the original length in centimeters as well as the converted length in meters.

The `lengthConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:cmTom()` function to convert the `length_cm` attribute from the `InputStream` into its corresponding value in meters, and this value is assigned to the `length_m` attribute in the `OutputStream`.

The query outputs the original length in centimeters and the converted length in meters for each event to the `OutputStream`.
