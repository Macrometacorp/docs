---
title: date (Function)
---

Extracts the date part of a date or date-time and return it in
`yyyy-MM-dd` format.

Syntax

    <STRING> time:date(<STRING> date.value, <STRING> date.format)
    <STRING> time:date(<STRING> date.value)

## Query Parameters

| Name        | Description                                                                                  | Default Value               | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. |                             | STRING              | No       | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`.               | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |

## Example 1

    time:date('2014/11/11 13:23:44', 'yyyy/MM/dd HH:mm:ss')

Extracts the date and returns `2014-11-11`.

## Example 2

    time:date('2014-11-23 13:23:44.345')

Extracts the date and returns `2014-11-13`.

## Example 3

    time:date('13:23:44', 'HH:mm:ss')

Extracts the date and returns `1970-01-01`.
