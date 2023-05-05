---
title: dToh (Function)
---

This converts the input given in days into hours.

## Syntax

```sql
<DOUBLE> unitconversion:dToh(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from days into hours. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:dToh(1)
```

In this example, the `unitconversion:dToh()` function converts a value of `1` day into its equivalent value in hours. The conversion result is `24.0` hours.

## Example 2

```sql
CREATE STREAM InputStream (duration_days double);
CREATE SINK STREAM OutputStream (duration_days double, duration_hours double);

@info(name = 'durationConversionQuery')
INSERT INTO OutputStream
SELECT duration_days, unitconversion:dToh(duration_days) AS duration_hours
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `duration_days`, representing durations in days. Then, an output stream called `OutputStream` is defined, which will contain the original duration in days as well as the converted duration in hours.

The `durationConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:dToh()` function to convert the `duration_days` attribute from the `InputStream` into its corresponding value in hours, and this value is assigned to the `duration_hours` attribute in the `OutputStream`.

The query outputs the original duration in days and the converted duration in hours for each event to the `OutputStream`.
