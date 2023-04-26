---
title: dateFormat (Function)
---

Formats the data in string or milliseconds format to the given date format.

## Syntax

```sql
<STRING> time:dateFormat(<STRING> date.value, <STRING> date.target.format, <STRING> date.source.format)
<STRING> time:dateFormat(<STRING> date.value, <STRING> date.target.format)
<STRING> time:dateFormat(<LONG> timestamp.in.milliseconds, <STRING> date.target.format)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.  | -            | STRING| Yes      | Yes     |
| date.target.format        | The format of the date into which the date value needs to be converted. For example, `yyyy/MM/dd HH:mm:ss`. | | STRING| No       | Yes     |
| date.source.format        | The format input date.value.For example, `yyyy-MM-dd HH:mm:ss.SSS`.             | `yyyy-MM-dd HH:mm:ss.SSS` | STRING| Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds from the epoch. For example, `1415712224000L`.   | -            | LONG  | Yes      | Yes     |

## Example 1

```sql
SELECT time:dateFormat('2014/11/11 13:23:44', 'mm:ss', 'yyyy/MM/dd HH:mm:ss') AS formattedDate;
```

This query converts the date value '2014/11/11 13:23:44' from the format 'yyyy/MM/dd HH:mm:ss' to the target format 'mm:ss'. The output is `'23:44'`.

## Example 2

```sql
SELECT time:dateFormat('2014-11-11 13:23:44', 'HH:mm:ss') AS formattedDate;
```

This query converts the date value '2014-11-11 13:23:44' using the default format 'yyyy-MM-dd HH:mm:ss' to the target format 'HH:mm:ss'. The output is `'13:23:44'`.

## Example 3

```sql
SELECT time:dateFormat(1415692424000L, 'yyyy-MM-dd') AS formattedDate;
```

This query converts the timestamp value '1415692424000L' (in milliseconds) to a date string in the target format 'yyyy-MM-dd'. The output is `'2014-11-11'`.

## Example 4

```sql
CREATE STREAM InputStream (inputDate string, targetFormat string, inputFormat string);
CREATE STREAM OutputStream (formattedDate string);

@info(name = 'dateFormatStreamWorker')
INSERT INTO OutputStream
SELECT time:dateFormat(inputDate, targetFormat, inputFormat) AS formattedDate
FROM InputStream;
```

The `dateFormatStreamWorker` processes events from the `InputStream`, which contains a date string (`inputDate`), the target format (`targetFormat`), and the input format (`inputFormat`). It uses the `time:dateFormat(inputDate, targetFormat, inputFormat)` function to convert the date string from the input format to the target format. The query outputs the formatted date as the `formattedDate` attribute for each event to the `OutputStream`.
