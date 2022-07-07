---
title: dateFormat (Function)
---

Formats the data in string or milliseconds format to the given date
format.

Syntax

    <STRING> time:dateFormat(<STRING> date.value, <STRING> date.target.format, <STRING> date.source.format)
    <STRING> time:dateFormat(<STRING> date.value, <STRING> date.target.format)
    <STRING> time:dateFormat(<LONG> timestamp.in.milliseconds, <STRING> date.target.format)

## Query Parameters

| Name                      | Description                                                                                                 | Default Value               | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                | \-                          | STRING              | Yes      | Yes     |
| date.target.format        | The format of the date into which the date value needs to be converted. For example, `yyyy/MM/dd HH:mm:ss`. |                             | STRING              | No       | Yes     |
| date.source.format        | The format input date.value.For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                         | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds from the epoch. For example, `1415712224000L`.                               | \-                          | LONG                | Yes      | Yes     |

## Example 1

    time:dateFormat('2014/11/11 13:23:44', 'mm:ss', 'yyyy/MM/dd HH:mm:ss')

Converts date based on the target date format `mm:ss` and returns
`23:44`.

## Example 2

    time:dateFormat('2014-11-11 13:23:44', 'HH:mm:ss')

Converts date based on the target date format `HH:mm:ss` and returns
`13:23:44`.

## Example 3

    time:dateFormat(1415692424000L, 'yyyy-MM-dd')

Converts date in millisecond based on the target date format
`yyyy-MM-dd` and returns `2014-11-11`.
