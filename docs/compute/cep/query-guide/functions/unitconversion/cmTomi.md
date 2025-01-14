---
title: cmTomi (Function)
---

This converts the input given in centimeters into miles.

## Syntax

```sql
<DOUBLE> unitconversion:cmTomi(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1  | The value that needs to be converted from centimeters into miles. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:cmTomi(10000)
```

In this example, the `unitconversion:cmTomi()` function converts a value of `10,000` centimeters into its equivalent value in miles. The conversion result is approximately `0.062` miles.

## Example 2

```sql
CREATE STREAM InputStream (length_cm double);
CREATE SINK STREAM OutputStream (length_cm double, length_mi double);

@info(name = 'lengthConversionQuery')
INSERT INTO OutputStream
SELECT length_cm, unitconversion:cmTomi(length_cm) AS length_mi
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `length_cm`, representing lengths in centimeters. Then, an output stream called `OutputStream` is defined, which will contain the original length in centimeters as well as the converted length in miles.

The `lengthConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:cmTomi()` function to convert the `length_cm` attribute from the `InputStream` into its corresponding value in miles, and this value is assigned to the `length_mi` attribute in the `OutputStream`.

The query outputs the original length in centimeters and the converted length in miles for each event to the `OutputStream`.
