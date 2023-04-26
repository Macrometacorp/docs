---
title: hTom (Function)
---

This converts the input given in hours into minutes.

## Syntax

```sql
<DOUBLE> unitconversion:hTom(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from hours into minutes. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:hTom(1)
```

In this example, the `unitconversion:hTom()` function converts a value of `1` hour into its equivalent value in minutes. The conversion result is `60.0` minutes.

## Example 2

```sql
CREATE STREAM InputStream (duration_hours double);
CREATE STREAM OutputStream (duration_hours double, duration_minutes double);

@info(name = 'durationConversionQuery')
INSERT INTO OutputStream
SELECT duration_hours, unitconversion:hTom(duration_hours) AS duration_minutes
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `duration_hours`, representing durations in hours. Then, an output stream called `OutputStream` is defined, which will contain the original duration in hours as well as the converted duration in minutes.

The `durationConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:hTom()` function to convert the `duration_hours` attribute from the `InputStream` into its corresponding value in minutes, and this value is assigned to the `duration_minutes` attribute in the `OutputStream`.

The query outputs the original duration in hours and the converted duration in minutes for each event to the `OutputStream`.
