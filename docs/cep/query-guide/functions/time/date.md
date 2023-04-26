---
title: date (Function)
---

Extracts the date part of a date or date-time and return it in `yyyy-MM-dd` format.

## Syntax

```sql
<STRING> time:date(<STRING> date.value, <STRING> date.format)
<STRING> time:date(<STRING> date.value)
```

## Query Parameters

| Name    | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|---------|---------------|---------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. |    | STRING              | No       | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`.  | `yyyy-MM-dd HH:mm:ss.SSS` | STRING              | Yes      | Yes     |

## Example 1

```sql
SELECT time:date('2014/11/11 13:23:44', 'yyyy/MM/dd HH:mm:ss') AS date;
```

This query extracts the date from the given timestamp string `'2014/11/11 13:23:44'` in the format `'yyyy/MM/dd HH:mm:ss'`. The output is `'2014-11-11'`.

## Example 2

```sql
SELECT time:date('2014-11-23 13:23:44.345') AS date;
```

This query extracts the date from the given timestamp string `'2014-11-23 13:23:44.345'`. The output is `'2014-11-23'`.

## Example 3

```sql
SELECT time:date('13:23:44', 'HH:mm:ss') AS date;
```

This query extracts the date from the given time string `'13:23:44'` in the format `'HH:mm:ss'`. Since no date information is available, the output is the Unix epoch date: `'1970-01-01'`.

## Example 4

```sql
CREATE STREAM InputStream (timestampStr string, format string);
CREATE STREAM OutputStream (extractedDate string);

@info(name = 'dateStreamWorker')
INSERT INTO OutputStream
SELECT time:date(timestampStr, format) AS extractedDate
FROM InputStream;
```

The `dateStreamWorker` processes events from the `InputStream`, which contains a timestamp string (`timestampStr`) and its corresponding format (`format`). It uses the `time:date(timestampStr, format)` function to extract the date from the timestamp string in the specified format. The query outputs the extracted date as the `extractedDate` attribute for each event to the `OutputStream`.
