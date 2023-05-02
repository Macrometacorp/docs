---
title: sTons (Function)
---

This converts the input given in seconds into nanoseconds.

## Syntax

```sql
<DOUBLE> unitconversion:sTons(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from seconds into nanoseconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:sTons(1) AS nanoseconds;
```

This query uses the `unitconversion:sTons()` function to convert the value of `1` second into its equivalent value in nanoseconds. The conversion result is `1000000000.0` nanoseconds.

## Example 2

```sql
CREATE STREAM InputStream (time_s double);
CREATE SINK STREAM OutputStream (time_s double, time_ns double);

@info(name = 'timeConversionQuery')
INSERT INTO OutputStream
SELECT time_s, unitconversion:sTons(time_s) AS time_ns
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `time_s`, representing time values in seconds. Then, an output stream called `OutputStream` is defined, which will contain the original time in seconds as well as the converted time in nanoseconds.

The `timeConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:sTons()` function to convert the `time_s` attribute from the `InputStream` into its corresponding value in nanoseconds, and this value is assigned to the `time_ns` attribute in the `OutputStream`.

The query outputs the original time in seconds and the converted time in nanoseconds for each event to the `OutputStream`.
