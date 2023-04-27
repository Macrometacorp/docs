---
title: cmToum (Function)
---

This converts the input in centimeters into micrometers.

## Syntax

```sql
<DOUBLE> unitconversion:cmToum(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into micrometers. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:cmToum(100)
```

In this example, the `unitconversion:cmToum()` function converts a value of `100` centimeters into its equivalent value in micrometers. The conversion result is `1,000,000` micrometers.

## Example 2

```sql
CREATE STREAM InputStream (length_cm double);
CREATE STREAM OutputStream (length_cm double, length_um double);

@info(name = 'lengthConversionQuery')
INSERT INTO OutputStream
SELECT length_cm, unitconversion:cmToum(length_cm) AS length_um
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `length_cm`, representing lengths in centimeters. Then, an output stream called `OutputStream` is defined, which will contain the original length in centimeters as well as the converted length in micrometers.

The `lengthConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:cmToum()` function to convert the `length_cm` attribute from the `InputStream` into its corresponding value in micrometers, and this value is assigned to the `length_um` attribute in the `OutputStream`.

The query outputs the original length in centimeters and the converted length in micrometers for each event to the `OutputStream`.
