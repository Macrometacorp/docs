---
title: dateSub (Function)
---

Subtracts the specified time interval from the given date.

## Syntax

```sql
<STRING> time:dateSub(<STRING> date.value, <INT> expr, <STRING> unit)
<STRING> time:dateSub(<STRING> date.value, <INT> expr, <STRING> unit, <STRING> date.format)
<STRING> time:dateSub(<LONG> timestamp.in.milliseconds, <INT> expr, <STRING> unit)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|--------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.      | -   | STRING| Yes      | Yes     |
| expr  | The amount by which the selected part of the date should be decremented. For example `2` ,`5`,`10`, etc.       | | INT   | No       | Yes     |
| unit    | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. | | STRING| No   | No  |
| date.format | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.      | `yyyy-MM-dd HH:mm:ss.SSS` | STRING| Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.  | -       | LONG  | Yes      | Yes     |

## Example 1

```sql
SELECT time:dateSub('2019-11-11 13:23:44.657', 5, 'YEAR', 'yyyy-MM-dd HH:mm:ss.SSS') AS newDate;
```

This query subtracts five years from the given date value '2019-11-11 13:23:44.657' using the format 'yyyy-MM-dd HH:mm:ss.SSS'. The output is `'2014-11-11 13:23:44.657'`.

## Example 2

```sql
SELECT time:dateSub('2019-11-11 13:23:44.657', 5, 'YEAR') AS newDate;
```

This query subtracts five years from the given date value '2019-11-11 13:23:44.657' using the default date format 'yyyy-MM-dd HH:mm:ss.SSS'. The output is `'2014-11-11 13:23:44.657'`.

## Example 3

```sql
SELECT time:dateSub(1415715824000L, 1, 'HOUR') AS newDate;
```

This query subtracts one hour from the timestamp value '1415715824000L' (in milliseconds). The output is the new timestamp value '1415712224000' as a string.

## Example 4

```sql
CREATE STREAM InputStream (inputDate string, unit string, amount int, inputFormat string);
CREATE STREAM OutputStream (newDate string);

@info(name = 'dateSubStreamWorker')
INSERT INTO OutputStream
SELECT time:dateSub(inputDate, amount, unit, inputFormat) AS newDate
FROM InputStream;
```

The `dateSubStreamWorker` processes events from the `InputStream`, which contains a date string (`inputDate`), a unit (`unit`), an amount to subtract (`amount`), and an optional input format (`inputFormat`). It uses the `time:dateSub(inputDate, amount, unit, inputFormat)` function to subtract the specified amount in the given unit from the date string in the input format. The query outputs the new date as the `newDate` attribute for each event to the `OutputStream`.
