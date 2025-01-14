---
title: hTos (Function)
---

This converts the input given in hours into seconds.

## Syntax

```sql
<DOUBLE> unitconversion:hTos(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from hours into seconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
unitconversion:hTos(1)
```

In this example, the `unitconversion:hTos()` function converts a value of `1` hour into its equivalent value in seconds. The conversion result is `3600.0` seconds.

## Example 2

```sql
CREATE STREAM InputStream (duration_hours double);
CREATE SINK STREAM OutputStream (duration_hours double, duration_seconds double);

@info(name = 'durationConversionQuery')
INSERT INTO OutputStream
SELECT duration_hours, unitconversion:hTos(duration_hours) AS duration_seconds
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `duration_hours`, representing durations in hours. Then, an output stream called `OutputStream` is defined, which will contain the original duration in hours as well as the converted duration in seconds.

The `durationConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:hTos()` function to convert the `duration_hours` attribute from the `InputStream` into its corresponding value in seconds, and this value is assigned to the `duration_seconds` attribute in the `OutputStream`.

The query outputs the original duration in hours and the converted duration in seconds for each event to the `OutputStream`.
