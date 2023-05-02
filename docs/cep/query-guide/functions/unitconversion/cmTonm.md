---
title: cmTonm (Function)
---

This converts the input given in centimeters into nanometers.

## Syntax

```sql
<DOUBLE> unitconversion:cmTonm(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1 | The value that needs to be converted from centimeters into nanometers. |     | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:cmTonm(1)
```

In this example, the `unitconversion:cmTonm()` function converts a value of `1` centimeter into its equivalent value in nanometers. The conversion result is `10,000,000` nanometers.

## Example 2

```sql
CREATE STREAM InputStream (length_cm double);
CREATE SINK STREAM OutputStream (length_cm double, length_nm double);

@info(name = 'lengthConversionQuery')
INSERT INTO OutputStream
SELECT length_cm, unitconversion:cmTonm(length_cm) AS length_nm
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `length_cm`, representing lengths in centimeters. Then, an output stream called `OutputStream` is defined, which will contain the original length in centimeters as well as the converted length in nanometers.

The `lengthConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:cmTonm()` function to convert the `length_cm` attribute from the `InputStream` into its corresponding value in nanometers, and this value is assigned to the `length_nm` attribute in the `OutputStream`.

The query outputs the original length in centimeters and the converted length in nanometers for each event to the `OutputStream`.
