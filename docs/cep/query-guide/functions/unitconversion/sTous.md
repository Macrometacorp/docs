---
title: sTous (Function)
---

This converts the input given in seconds into microseconds.

## Syntax

```sql
<DOUBLE> unitconversion:sTous(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from seconds into microseconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:sTous(1) AS microseconds;
```

This query uses the `unitconversion:sTous()` function to convert the value of `1` second into its equivalent value in microseconds. The conversion result is `1000000.0` microseconds.

## Example 2

```sql
CREATE STREAM InputStream (time_s double);
CREATE STREAM OutputStream (time_s double, time_us double);

@info(name = 'timeConversionQuery')
INSERT INTO OutputStream
SELECT time_s, unitconversion:sTous(time_s) AS time_us
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `time_s`, representing time values in seconds. Then, an output stream called `OutputStream` is defined, which will contain the original time in seconds as well as the converted time in microseconds.

The `timeConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:sTous()` function to convert the `time_s` attribute from the `InputStream` into its corresponding value in microseconds, and this value is assigned to the `time_us` attribute in the `OutputStream`.

The query outputs the original time in seconds and the converted time in microseconds for each event to the `OutputStream`.
