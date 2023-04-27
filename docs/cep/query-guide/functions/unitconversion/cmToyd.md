---
title: cmToyd (Function)
---

This converts the input given in centimeters into yards.

## Syntax

```sql
<DOUBLE> unitconversion:cmToyd(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into yards. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:cmToyd(1)
```

In this example, the `unitconversion:cmToyd()` function converts a value of `1` centimeter into its equivalent value in yards. The conversion result is approximately `0.010936` yards.

## Example 2

```sql
CREATE STREAM InputStream (length_cm double);
CREATE STREAM OutputStream (length_cm double, length_yd double);

@info(name = 'lengthConversionQuery')
INSERT INTO OutputStream
SELECT length_cm, unitconversion:cmToyd(length_cm) AS length_yd
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `length_cm`, representing lengths in centimeters. Then, an output stream called `OutputStream` is defined, which will contain the original length in centimeters as well as the converted length in yards.

The `lengthConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:cmToyd()` function to convert the `length_cm` attribute from the `InputStream` into its corresponding value in yards, and this value is assigned to the `length_yd` attribute in the `OutputStream`.

The query outputs the original length in centimeters and the converted length in yards for each event to the `OutputStream`.
