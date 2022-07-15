---
title: extract (Function)
---

Function extracts a date unit from the date.

Syntax

    <INT> time:extract(<STRING> unit, <STRING> date.value)
    <INT> time:extract(<STRING> unit, <STRING> date.value, <STRING> date.format)
    <INT> time:extract(<STRING> unit, <STRING> date.value, <STRING> date.format, <STRING> locale)
    <INT> time:extract(<LONG> timestamp.in.milliseconds, <STRING> unit)
    <INT> time:extract(<LONG> timestamp.in.milliseconds, <STRING> unit, <STRING> locale)

## Query Parameters

| Name                      | Description                                                                                                                                 | Default Value                                           | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|---------------------|----------|---------|
| unit                      | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. |                                                         | STRING              | No       | No      |
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                                                | \-                                                      | STRING              | Yes      | Yes     |
| date.format               | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                                              | \`yyyy-MM-dd HH:mm:ss.SSS\`                             | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.                                                                              | \-                                                      | LONG                | Yes      | Yes     |
| locale                    | Represents a specific geographical, political or cultural region. For example `en_US` and `fr_FR`                                           | Current default locale set in the Java Virtual Machine. | STRING              | Yes      | No      |

## Example 1

    time:extract('YEAR', '2019/11/11 13:23:44.657', 'yyyy/MM/dd HH:mm:ss.SSS')

Extracts the year amount and returns `2019`.

## Example 2

    time:extract('DAY', '2019-11-12 13:23:44.657')

Extracts the day amount and returns `12`.

## Example 3

    time:extract(1394556804000L, 'HOUR')

Extracts the hour amount and returns `22`.
