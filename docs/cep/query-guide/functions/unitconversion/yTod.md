---
title: yTod (Function)
---

This converts the given input in years into days.

## Syntax

```sql
<DOUBLE> unitconversion:yTod(<INT|LONG|FLOAT|DOUBLE> p1)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types   | Optional | Dynamic |
|------|-------------|---------------|-----------------------|----------|---------|
| p1   | The value that needs to be converted from years into days. |               | INT LONG FLOAT DOUBLE | No       | Yes     |

## Example 1

```sql
SELECT unitconversion:yTod(1) AS days;
```

This query uses the `unitconversion:yTod()` function to convert the value of `1` year into its equivalent value in days. The conversion result is approximately `365.2525` days.

## Example 2

```sql
CREATE STREAM InputStream (years double);
CREATE SINK STREAM OutputStream (years double, days double);

@info(name = 'timeConversionQuery')
INSERT INTO OutputStream
SELECT years, unitconversion:yTod(years) AS days
FROM InputStream;
```

In this example, an input stream called `InputStream` is created with a single attribute, `years`, representing time values in years. Then, an output stream called `OutputStream` is defined, which will contain the original time in years as well as the converted time in days.

The `timeConversionQuery` processes events from the `InputStream`. It uses the `unitconversion:yTod()` function to convert the `years` attribute from the `InputStream` into its corresponding value in days, and this value is assigned to the `days` attribute in the `OutputStream`.

The query outputs the original time in years and the converted time in days for each event to the `OutputStream`.
