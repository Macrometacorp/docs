---
title: cmTokm (Function)
---

This converts the input value given in centimeters into kilometers.

## Syntax

    <DOUBLE> unitconversion:cmTokm(<INT|LONG|FLOAT|DOUBLE> p1)

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------------------------------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from centimeters into kilometers. |          | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:cmTokm(100)
```

In this example, the `unitconversion:cmTokm()` function converts a value of `100` centimeters into its equivalent value in kilometers. The conversion result is `0.001` kilometers.

## Example 2

```sql
CREATE STREAM InputStream (length_cm double);
CREATE SINK STREAM OutputStream (length_cm double, length_km double);

@info(name = 'lengthConversionQuery')
INSERT INTO OutputStream
SELECT length_cm, unitconversion:cmTokm(length_cm) AS length_km
FROM InputStream;
```

In this example, we create an input stream called `InputStream` with a single attribute, `length_cm`, representing lengths in centimeters. We then define an output stream called `OutputStream`, which will contain the original length in centimeters as well as the converted length in kilometers.

The `lengthConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:cmTokm()` function to convert the `length_cm` attribute from the `InputStream` into its corresponding value in kilometers, and this value is assigned to the `length_km` attribute in the `OutputStream`.

The query outputs the original length in centimeters and the converted length in kilometers for each event to the `OutputStream`.
