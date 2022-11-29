---
title: timestampInMilliseconds (Function)
---

Returns the system time or the given time in milliseconds.

Syntax

    <LONG> time:timestampInMilliseconds()
    <LONG> time:timestampInMilliseconds(<STRING> date.value, <STRING> date.format)
    <LONG> time:timestampInMilliseconds(<STRING> date.value)

## Query Parameters

| Name        | Description                                                                                  | Default Value               | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. | Current system time         | STRING              | Yes      | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`.               | \`yyyy-MM-dd HH:mm:ss.SSS\` | STRING              | Yes      | Yes     |

## Example 1

    time:timestampInMilliseconds()

Returns the system current time in milliseconds.

## Example 2

    time:timestampInMilliseconds('2007-11-30 10:30:19', 'yyyy-MM-DD HH:MM:SS')

Converts `2007-11-30 10:30:19` in `yyyy-MM-DD HH:MM:SS` format to
milliseconds as `1170131400019`.

## Example 3

    time:timestampInMilliseconds('2007-11-30 10:30:19.000')

Converts `2007-11-30 10:30:19` in `yyyy-MM-DD HH:MM:ss.SSS` format to
milliseconds as `1196398819000`.
