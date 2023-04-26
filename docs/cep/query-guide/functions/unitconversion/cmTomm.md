---
title: cmTomm (Function)
---

This converts the input given in centimeters into millimeters.

## Syntax

```sql
<DOUBLE> unitconversion:cmTomm(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1 | The value that needs to be converted from centimeters into millimeters. |   | INT LONG FLOAT DOUBLE | No   | Yes   |

## Example 1

```sql
unitconversion:cmTomm(1)
```

In this example, the `unitconversion:cmTomm()` function converts a value of `1` centimeter into its equivalent value in millimeters. The conversion result is `10.0` millimeters.

## Example 2

```sql
CREATE STREAM InputStream (length_cm double);
CREATE STREAM OutputStream (length_cm double, length_mm double);

@info(name = 'lengthConversionQuery')
INSERT INTO OutputStream
SELECT length_cm, unitconversion:cmTomm(length_cm) AS length_mm
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `length_cm`, representing lengths in centimeters. Then, an output stream called `OutputStream` is defined, which will contain the original length in centimeters as well as the converted length in millimeters.

The `lengthConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:cmTomm()` function to convert the `length_cm` attribute from the `InputStream` into its corresponding value in millimeters, and this value is assigned to the `length_mm` attribute in the `OutputStream`.

The query outputs the original length in centimeters and the converted length in millimeters for each event to the `OutputStream`.
