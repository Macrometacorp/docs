---
title: extract (Function)
---

Function extracts a date unit from the date.

## Syntax

```sql
<INT> time:extract(<STRING> unit, <STRING> date.value)
<INT> time:extract(<STRING> unit, <STRING> date.value, <STRING> date.format)
<INT> time:extract(<STRING> unit, <STRING> date.value, <STRING> date.format, <STRING> locale)
<INT> time:extract(<LONG> timestamp.in.milliseconds, <STRING> unit)
<INT> time:extract(<LONG> timestamp.in.milliseconds, <STRING> unit, <STRING> locale)
```

## Query Parameters

| Name   | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|--------|--------------|----------------|---------------------|----------|---------|
| unit   | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. | | STRING| No       | No      |
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.      | -            | STRING| Yes      | Yes     |
| date.format | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`. | `yyyy-MM-dd HH:mm:ss.SSS` | STRING| Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.        | -            | LONG  | Yes      | Yes     |
| locale      | Represents a specific geographical, political or cultural region. For example `en_US` and `fr_FR` | Current default locale set in the Java Virtual Machine. | STRING| Yes      | No      |

## Example 1

```sql
SELECT time:extract('YEAR', '2019/11/11 13:23:44.657', 'yyyy/MM/dd HH:mm:ss.SSS') AS year;
```

This query extracts the year from the given timestamp string `'2019/11/11 13:23:44.657'` in the format `'yyyy/MM/dd HH:mm:ss.SSS'`. The output is `'2019'`.

## Example 2

```sql
SELECT time:extract('DAY', '2019-11-12 13:23:44.657') AS day;
```

This query extracts the day from the given timestamp string `'2019-11-12 13:23:44.657'`. The output is `'12'`.

## Example 3

```sql
SELECT time:extract('HOUR', 1394556804000L) AS hour;
```

This query extracts the hour from the given timestamp in milliseconds `1394556804000L`. The output is `'22'`.

## Example 4

```sql
CREATE STREAM InputStream (timestampStr string, format string);
CREATE STREAM OutputStream (extractedValue int);

@info(name = 'dayExtractorQuery')
INSERT INTO OutputStream
SELECT time:extract('DAY', timestampStr, format) AS extractedValue
FROM InputStream;
```

The `dayExtractorQuery` processes events from the `InputStream`, which contains a timestamp string (`timestampStr`) and its corresponding format (`format`). It uses the `time:extract('DAY', timestampStr, format)` function to extract the day from the timestamp string in the specified format. The query outputs the extracted day as the `extractedValue` attribute for each event to the `OutputStream`.
