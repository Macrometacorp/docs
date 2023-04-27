---
title: mTos (Function)
---

This converts the input given in minutes into seconds.

## Syntax

```sql
<DOUBLE> unitconversion:mTos(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types   | Optional | Dynamic |
|------|--------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from minutes into seconds. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:mTos(1) AS seconds;
```

This query uses the `unitconversion:mTos()` function to convert the value of `1` minute into its equivalent value in seconds. The conversion result is `60.0` seconds.

## Example 2

```sql
CREATE STREAM InputStream (duration_min double);
CREATE STREAM OutputStream (duration_min double, duration_sec double);

@info(name = 'durationConversionQuery')
INSERT INTO OutputStream
SELECT duration_min, unitconversion:mTos(duration_min) AS duration_sec
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `duration_min`, representing duration values in minutes. Then, an output stream called `OutputStream` is defined, which will contain the original duration in minutes as well as the converted duration in seconds.

The `durationConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:mTos()` function to convert the `duration_min` attribute from the `InputStream` into its corresponding value in seconds, and this value is assigned to the `duration_sec` attribute in the `OutputStream`.

The query outputs the original duration in minutes and the converted duration in seconds for each event to the `OutputStream`.
