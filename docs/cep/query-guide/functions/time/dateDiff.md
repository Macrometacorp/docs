---
title: dateDiff (Function)
---

Returns difference between two dates in days.

Syntax

    <INT> time:dateDiff(<STRING> date.value1, <STRING> date.value2, <STRING> date.format1, <STRING> date.format2)
    <INT> time:dateDiff(<STRING> date.value1, <STRING> date.value2)
    <INT> time:dateDiff(<LONG> timestamp.in.milliseconds1, <LONG> timestamp.in.milliseconds2)

## Query Parameters

| Name                       | Description                                                                                                    | Default Value               | Possible Data Types | Optional | Dynamic |
|----------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value1                | The value of the first date parameter. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.   | \-                          | STRING              | Yes      | Yes     |
| date.value2                | The value of the second date parameter. For example, `2014-11-11 13:23:44.657`, `2014-11-11` , `13:23:44.657`. | \-                          | STRING              | Yes      | Yes     |
| date.format1               | The format of the first date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                           | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |
| date.format2               | The format of the second date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                          | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds1 | The first date value in milliseconds from the epoch. For example, `1415712224000L`.                            | \-                          | LONG                | Yes      | Yes     |
| timestamp.in.milliseconds2 | The second date value in milliseconds from the epoch. For example, `1415712224000L`.                           | \-                          | LONG                | Yes      | Yes     |

## Example 1

    time:dateDiff('2014-11-11 13:23:44', '2014-11-9 13:23:44', 'yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd HH:mm:ss')

Returns the date difference between the two given dates as `2`.

## Example 2

    time:dateDiff('2014-11-13 13:23:44', '2014-11-9 13:23:44')

Returns the date difference between the two given dates as `4`.

## Example 3

    time:dateDiff(1415692424000L, 1412841224000L)

Returns the date difference between the two given dates as `33`.
