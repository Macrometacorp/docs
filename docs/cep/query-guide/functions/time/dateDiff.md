---
title: dateDiff (Function)
---

Returns difference between two dates in days.

## Syntax

```sql
<LONG> time:dateDiff(<STRING> date.value1, <STRING> date.value2, <STRING> date.format1, <STRING> date.format2)
<LONG> time:dateDiff(<STRING> date.value1, <STRING> date.value2)
<LONG> time:dateDiff(<LONG> timestamp.in.milliseconds1, <LONG> timestamp.in.milliseconds2)
```

## Query Parameters

| Name   | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|--------|--------------|---------------|---------------------|----------|---------|
| date.value1  | The value of the first date parameter. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.   | -     | STRING| Yes      | Yes     |
| date.value2  | The value of the second date parameter. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. | -    | STRING| Yes      | Yes     |
| date.format1 | The format of the first date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.   | `yyyy-MM-dd HH:mm:ss.SSS` | STRING| Yes      | Yes     |
| date.format2 | The format of the second date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.   | `yyyy-MM-dd HH:mm:ss.SSS` | STRING| Yes      | Yes     |
| timestamp.in.milliseconds1 | The first date value in milliseconds from the epoch. For example, `1415712224000L`.| -   | LONG  | Yes      | Yes     |
| timestamp.in.milliseconds2 | The second date value in milliseconds from the epoch. For example, `1415712224000L`.    | -            | LONG  | Yes      | Yes     |

## Example 1

```sql
SELECT time:dateDiff('2014-11-11 13:23:44', '2014-11-9 13:23:44', 'yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd HH:mm:ss') AS dateDifference;
```

This query calculates the date difference between the given date values '2014-11-11 13:23:44' and '2014-11-9 13:23:44', formatted according to 'yyyy-MM-dd HH:mm:ss'. The returned date difference is `2`.

## Example 2

```sql
SELECT time:dateDiff('2014-11-13 13:23:44', '2014-11-9 13:23:44') AS dateDifference;
```

This query calculates the date difference between the given date values '2014-11-13 13:23:44' and '2014-11-9 13:23:44', using the default date format 'yyyy-MM-dd HH:mm:ss'. The returned date difference is `4`.

## Example 3

```sql
SELECT time:dateDiff(1415692424000L, 1412841224000L) AS dateDifference;
```

This query calculates the date difference between the given timestamp values '1415692424000L' and '1412841224000L'. The returned date difference is `33`.

## Example 4

```sql
CREATE STREAM InputStream (startDate string, endDate string, inputFormat string);
CREATE SINK STREAM OutputStream (dateDifference long);

@info(name = 'dateDiffStreamWorker')
INSERT INTO OutputStream
SELECT time:dateDiff(startDate, endDate, inputFormat, inputFormat) AS dateDifference
FROM InputStream;
```

The `dateDiffStreamWorker` processes events from the `InputStream`, which contains two date strings (`startDate` and `endDate`) and their corresponding format (`inputFormat`). It uses the `time:dateDiff(startDate, endDate, inputFormat, inputFormat)` function to calculate the date difference between the two date strings in the specified format. The query outputs the date difference as the `dateDifference` attribute for each event to the `OutputStream`.
