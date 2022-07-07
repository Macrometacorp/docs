---
title: dateSub (Function)
---

Subtracts the specified time interval from the given date.

Syntax

    <STRING> time:dateSub(<STRING> date.value, <INT> expr, <STRING> unit)
    <STRING> time:dateSub(<STRING> date.value, <INT> expr, <STRING> unit, <STRING> date.format)
    <STRING> time:dateSub(<LONG> timestamp.in.milliseconds, <INT> expr, <STRING> unit)

## Query Parameters

| Name                      | Description                                                                                                                                 | Default Value               | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                                                | \-                          | STRING              | Yes      | Yes     |
| expr                      | The amount by which the selected part of the date should be decremented. For example `2` ,`5 `,`10`, etc.                                   |                             | INT                 | No       | Yes     |
| unit                      | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. |                             | STRING              | No       | No      |
| date.format               | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                                              | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.                                                                              | \-                          | LONG                | Yes      | Yes     |

## Example 1

    time:dateSub('2019-11-11 13:23:44.657', 5, 'YEAR', 'yyyy-MM-dd HH:mm:ss.SSS')

Subtracts five years to the given date value and returns
`2014-11-11 13:23:44.657`.

## Example 2

    time:dateSub('2019-11-11 13:23:44.657', 5, 'YEAR')

Subtracts five years to the given date value and returns
`2014-11-11 13:23:44.657` using the default date.format
`yyyy-MM-dd HH:mm:ss.SSS`.

## Example 3

    time:dateSub( 1415715824000L, 1, 'HOUR')

Subtracts one hour and `1415712224000` as a `string`.
