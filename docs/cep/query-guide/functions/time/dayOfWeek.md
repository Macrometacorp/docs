---
title: dayOfWeek (Function)
---

Extracts the day on which a given date falls.

## Syntax

```sql
<STRING> time:dayOfWeek(<STRING> date.value, <STRING> date.format)
<STRING> time:dayOfWeek(<STRING> date.value)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|--------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. | | STRING| No       | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`. | `yyyy-MM-dd HH:mm:ss.SSS` | STRING| Yes      | Yes     |

## Example 1

```sql
SELECT time:dayOfWeek('2014/12/11 13:23:44', 'yyyy/MM/dd HH:mm:ss') AS day;
```

This query extracts the day of the week from the given timestamp string `'2014/12/11 13:23:44'` in the format `'yyyy/MM/dd HH:mm:ss'`. The output is `'Thursday'`.

## Example 2

```sql
SELECT time:dayOfWeek('2014-11-11 13:23:44.345') AS day;
```

This query extracts the day of the week from the given timestamp string `'2014-11-11 13:23:44.345'`. The output is `'Tuesday'`.

## Example 3

```sql
SELECT time:dayOfWeek('13:23:44', 'HH:mm:ss') AS day;
```

This query extracts the day of the week from the given time string `'13:23:44'` in the format `'HH:mm:ss'`. Since no date information is available, the output is the Unix epoch day: `'Thursday'`.

## Example 4

```sql
CREATE STREAM InputStream (timestampStr string, format string);
CREATE SINK STREAM OutputStream (dayOfWeek string);

@info(name = 'dayOfWeekQuery')
INSERT INTO OutputStream
SELECT time:dayOfWeek(timestampStr, format) AS dayOfWeek
FROM InputStream;
```

The `dayOfWeekQuery` processes events from the `InputStream`, which contains a timestamp string (`timestampStr`) and its corresponding format (`format`). It uses the `time:dayOfWeek(timestampStr, format)` function to extract the day of the week from the timestamp string in the specified format. The query outputs the day of the week as the `dayOfWeek` attribute for each event to the `OutputStream`.
