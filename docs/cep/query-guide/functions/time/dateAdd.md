---
title: dateAdd (Function)
---

Adds the specified time interval to a date.

## Syntax

```sql
<STRING> time:dateAdd(<STRING> date.value, <INT> expr, <STRING> unit)
<STRING> time:dateAdd(<LONG> timestamp.in.milliseconds, <INT> expr, <STRING> unit)
<STRING> time:dateAdd(<STRING> date.value, <INT> expr, <STRING> unit, <STRING> date.format)
```

## Query Parameters

| Name      | Description     | Default Value | Possible Data Types | Optional | Dynamic |
|-----------|--------------|---------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.      | -            | STRING| Yes      | Yes     |
| expr | The amount by which the selected part of the date should be incremented. For example `2` ,`5`,`10`, etc. | | INT   | No       | Yes     |
| unit  | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. | | STRING| No  | No      |
| date.format | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`. | `yyyy-MM-dd HH:mm:ss.SSS` | STRING| Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`. | -  | LONG  | Yes      | Yes     |

## Example 1

```sql
SELECT time:dateAdd('2014-11-11 13:23:44.657', 5, 'YEAR', 'yyyy-MM-dd HH:mm:ss.SSS') AS newDate;
```

This query takes the input date value '2014-11-11 13:23:44.657', adds five years, and returns '2019-11-11 13:23:44.657'. The input date string is formatted according to 'yyyy-MM-dd HH:mm:ss.SSS', and the output is also formatted the same way.

## Example 2

```sql
SELECT time:dateAdd('2014-11-11 13:23:44.657', 5, 'YEAR') AS newDate;
```

This query takes the input date value '2014-11-11 13:23:44.657', adds five years, and returns '2019-11-11 13:23:44.657', using the default date format 'yyyy-MM-dd HH:mm:ss.SSS'.

## Example 3

```sql
SELECT time:dateAdd(1415712224000L, 1, 'HOUR') AS newTimestamp;
```

This query adds one hour to the given timestamp value '1415712224000L' and returns '1415715824000' as a long value, representing the updated timestamp.

## Example 4

```sql
CREATE STREAM InputStream (timestampStr string, format string, yearsToAdd int);
CREATE STREAM OutputStream (updatedDate string);

@info(name = 'dateAddStreamWorker')
INSERT INTO OutputStream
SELECT time:dateAdd(timestampStr, yearsToAdd, 'YEAR', format) AS updatedDate
FROM InputStream;
```

The `dateAddStreamWorker` processes events from the `InputStream`, which contains a timestamp string (`timestampStr`), its corresponding format (`format`), and the number of years to add (`yearsToAdd`). It uses the `time:dateAdd(timestampStr, yearsToAdd, 'YEAR', format)` function to add the specified number of years to the timestamp string in the specified format. The query outputs the updated date as the `updatedDate` attribute for each event to the `OutputStream`.
