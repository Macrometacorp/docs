---
title: currentTimestamp (Function)
---

When no argument is provided, function returns the system current
timestamp in `yyyy-MM-dd HH:mm:ss` format, and when a timezone is
provided as an argument, it converts and return the current system time
to the given timezone format.

Syntax

    <STRING> time:currentTimestamp()
    <STRING> time:currentTimestamp(<STRING> timezone)

## Query Parameters

| Name     | Description                                                                                                                                                                                                    | Default Value   | Possible Data Types | Optional | Dynamic |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|---------------------|----------|---------|
| timezone | The timezone to which the current time need to be converted. For example, `Asia/Kolkata`, `PST`. Get the supported timezone IDs from \[here\](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html) | System timezone | STRING              | Yes      | No      |

## Example 1

    time:currentTimestamp()

Returns current system time in `yyyy-MM-dd HH:mm:ss` format, such as
`2019-03-31 14:07:00`.

## Example 2

    time:currentTimestamp('Asia/Kolkata')

Returns current system time converted to `Asia/Kolkata` timezone
`yyyy-MM-dd HH:mm:ss` format, such as `2019-03-31 19:07:00`. Get the
supported timezone IDs from
[here](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html)

## Example 3

    time:currentTimestamp('CST')

Returns current system time converted to `CST` timezone
`yyyy-MM-dd HH:mm:ss` format, such as `2019-03-31 02:07:00`. Get the
supported timezone IDs from
[here](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html)
