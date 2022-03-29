# Time

This extension provides time related functionality such as getting current time, current date,
manipulating/formatting dates, etc.

## Features

* **[currentDate (Function)](#currentdate)**

    Function returns the system time in `yyyy-MM-dd` format.

* **[currentTime (Function)](#currenttime)**

    Function returns system time in the `HH:mm:ss` format.

* **[currentTimestamp (Function)](#currenttimestamp)**

    When no argument is provided, function returns the system current
    timestamp in `yyyy-MM-dd HH:mm:ss` format, and when a timezone is
    provided as an argument, it converts and return the current system
    time to the given timezone format.

* **[date (Function)](#date)**

    Extracts the date part of a date or date-time and return it in
    `yyyy-MM-dd` format.

* **[dateAdd (Function)](#dateadd)**

    Adds the specified time interval to a date.

* **[dateDiff (Function)](#datediff)**

    Returns difference between two dates in days.

* **[dateFormat (Function)](#dateformat)**

    Formats the data in string or milliseconds format to the given date
    format.

* **[dateSub (Function)](#datesub)**

    Subtracts the specified time interval from the given date.

* **[dayOfWeek (Function)](#dayofweek)**

    Extracts the day on which a given date falls.

* **[extract (Function)](#extract)**

    Function extracts a date unit from the date.

* **[timestampInMilliseconds (Function)](#timestampinmilliseconds)**

    Returns the system time or the given time in milliseconds.

* **[utcTimestamp (Function)](#utctimestamp)**

    Function returns the system current time in UTC timezone with
    `yyyy-MM-dd HH:mm:ss` format.

## currentDate

Function returns the system time in `yyyy-MM-dd` format.

Syntax

    <STRING> time:currentDate()

EXAMPLE 1

    time:currentDate()

Returns the current date in the `yyyy-MM-dd` format, such as
`2019-06-21`.

## currentTime

Function returns system time in the `HH:mm:ss` format.

Syntax

    <STRING> time:currentTime()

EXAMPLE 1

    time:currentTime()

Returns the current date in the `HH:mm:ss` format, such as `15:23:24`.

## currentTimestamp

When no argument is provided, function returns the system current
timestamp in `yyyy-MM-dd HH:mm:ss` format, and when a timezone is
provided as an argument, it converts and return the current system time
to the given timezone format.

Syntax

    <STRING> time:currentTimestamp()
    <STRING> time:currentTimestamp(<STRING> timezone)

QUERY PARAMETERS

| Name     | Description                                                                                                                                                                                                    | Default Value   | Possible Data Types | Optional | Dynamic |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|---------------------|----------|---------|
| timezone | The timezone to which the current time need to be converted. For example, `Asia/Kolkata`, `PST`. Get the supported timezone IDs from [here](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html) | System timezone | STRING              | Yes      | No      |

EXAMPLE 1

    time:currentTimestamp()

Returns current system time in `yyyy-MM-dd HH:mm:ss` format, such as
`2019-03-31 14:07:00`.

EXAMPLE 2

    time:currentTimestamp('Asia/Kolkata')

Returns current system time converted to `Asia/Kolkata` timezone
`yyyy-MM-dd HH:mm:ss` format, such as `2019-03-31 19:07:00`. Get the
supported timezone IDs from
[here](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html)

EXAMPLE 3

    time:currentTimestamp('CST')

Returns current system time converted to `CST` timezone
`yyyy-MM-dd HH:mm:ss` format, such as `2019-03-31 02:07:00`. Get the
supported timezone IDs from
[here](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html)

## date

Extracts the date part of a date or date-time and return it in
`yyyy-MM-dd` format.

Syntax

    <STRING> time:date(<STRING> date.value, <STRING> date.format)
    <STRING> time:date(<STRING> date.value)

QUERY PARAMETERS

| Name        | Description                                                                                  | Default Value               | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. |                             | STRING              | No       | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`.               | `yyyy-MM-dd HH:mm:ss.SSS` | STRING              | Yes      | Yes     |

EXAMPLE 1

    time:date('2014/11/11 13:23:44', 'yyyy/MM/dd HH:mm:ss')

Extracts the date and returns `2014-11-11`.

EXAMPLE 2

    time:date('2014-11-23 13:23:44.345')

Extracts the date and returns `2014-11-13`.

EXAMPLE 3

    time:date('13:23:44', 'HH:mm:ss')

Extracts the date and returns `1970-01-01`.

## dateAdd

Adds the specified time interval to a date.

Syntax

    <STRING> time:dateAdd(<STRING> date.value, <INT> expr, <STRING> unit)
    <STRING> time:dateAdd(<LONG> timestamp.in.milliseconds, <INT> expr, <STRING> unit)
    <STRING> time:dateAdd(<STRING> date.value, <INT> expr, <STRING> unit, <STRING> date.format)

QUERY PARAMETERS

| Name                      | Description                                                                                                                                 | Default Value               | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                                                | -                          | STRING              | Yes      | Yes     |
| expr                      | The amount by which the selected part of the date should be incremented. For example `2` ,`5`,`10`, etc.                                   |                             | INT                 | No       | Yes     |
| unit                      | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. |                             | STRING              | No       | No      |
| date.format               | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                                              | `yyyy-MM-dd HH:mm:ss.SSS` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.                                                                              | -                          | LONG                | Yes      | Yes     |

EXAMPLE 1

    time:dateAdd('2014-11-11 13:23:44.657', 5, 'YEAR', 'yyyy-MM-dd HH:mm:ss.SSS')

Adds five years to the given date value and returns
`2019-11-11 13:23:44.657`.

EXAMPLE 2

    time:dateAdd('2014-11-11 13:23:44.657', 5, 'YEAR')

Adds five years to the given date value and returns
`2019-11-11 13:23:44.657` using the default date.format
`yyyy-MM-dd HH:mm:ss.SSS`.

EXAMPLE 3

    time:dateAdd( 1415712224000L, 1, 'HOUR')

Adds one hour and `1415715824000` as a `string`.

## dateDiff

Returns difference between two dates in days.

Syntax

    <INT> time:dateDiff(<STRING> date.value1, <STRING> date.value2, <STRING> date.format1, <STRING> date.format2)
    <INT> time:dateDiff(<STRING> date.value1, <STRING> date.value2)
    <INT> time:dateDiff(<LONG> timestamp.in.milliseconds1, <LONG> timestamp.in.milliseconds2)

QUERY PARAMETERS

| Name                       | Description                                                                                                    | Default Value               | Possible Data Types | Optional | Dynamic |
|----------------------------|----------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value1                | The value of the first date parameter. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.   | -                          | STRING              | Yes      | Yes     |
| date.value2                | The value of the second date parameter. For example, `2014-11-11 13:23:44.657`, `2014-11-11` , `13:23:44.657`. | -                          | STRING              | Yes      | Yes     |
| date.format1               | The format of the first date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                           | `yyyy-MM-dd HH:mm:ss.SSS` | STRING              | Yes      | Yes     |
| date.format2               | The format of the second date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                          | `yyyy-MM-dd HH:mm:ss.SSS` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds1 | The first date value in milliseconds from the epoch. For example, `1415712224000L`.                            | -                          | LONG                | Yes      | Yes     |
| timestamp.in.milliseconds2 | The second date value in milliseconds from the epoch. For example, `1415712224000L`.                           | -                          | LONG                | Yes      | Yes     |

EXAMPLE 1

    time:dateDiff('2014-11-11 13:23:44', '2014-11-9 13:23:44', 'yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd HH:mm:ss')

Returns the date difference between the two given dates as `2`.

EXAMPLE 2

    time:dateDiff('2014-11-13 13:23:44', '2014-11-9 13:23:44')

Returns the date difference between the two given dates as `4`.

EXAMPLE 3

    time:dateDiff(1415692424000L, 1412841224000L)

Returns the date difference between the two given dates as `33`.

## dateFormat

Formats the data in string or milliseconds format to the given date
format.

Syntax

    <STRING> time:dateFormat(<STRING> date.value, <STRING> date.target.format, <STRING> date.source.format)
    <STRING> time:dateFormat(<STRING> date.value, <STRING> date.target.format)
    <STRING> time:dateFormat(<LONG> timestamp.in.milliseconds, <STRING> date.target.format)

QUERY PARAMETERS

| Name                      | Description                                                                                                 | Default Value               | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                | -                          | STRING              | Yes      | Yes     |
| date.target.format        | The format of the date into which the date value needs to be converted. For example, `yyyy/MM/dd HH:mm:ss`. |                             | STRING              | No       | Yes     |
| date.source.format        | The format input date.value.For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                         | `yyyy-MM-dd HH:mm:ss.SSS` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds from the epoch. For example, `1415712224000L`.                               | -                          | LONG                | Yes      | Yes     |

EXAMPLE 1

    time:dateFormat('2014/11/11 13:23:44', 'mm:ss', 'yyyy/MM/dd HH:mm:ss')

Converts date based on the target date format `mm:ss` and returns
`23:44`.

EXAMPLE 2

    time:dateFormat('2014-11-11 13:23:44', 'HH:mm:ss')

Converts date based on the target date format `HH:mm:ss` and returns
`13:23:44`.

EXAMPLE 3

    time:dateFormat(1415692424000L, 'yyyy-MM-dd')

Converts date in millisecond based on the target date format
`yyyy-MM-dd` and returns `2014-11-11`.

## dateSub

Subtracts the specified time interval from the given date.

Syntax

    <STRING> time:dateSub(<STRING> date.value, <INT> expr, <STRING> unit)
    <STRING> time:dateSub(<STRING> date.value, <INT> expr, <STRING> unit, <STRING> date.format)
    <STRING> time:dateSub(<LONG> timestamp.in.milliseconds, <INT> expr, <STRING> unit)

QUERY PARAMETERS

| Name                      | Description                                                                                                                                 | Default Value               | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                                                | -                          | STRING              | Yes      | Yes     |
| expr                      | The amount by which the selected part of the date should be decremented. For example `2` ,`5`,`10`, etc.                                   |                             | INT                 | No       | Yes     |
| unit                      | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. |                             | STRING              | No       | No      |
| date.format               | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                                              | `yyyy-MM-dd HH:mm:ss.SSS` | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.                                                                              | -                          | LONG                | Yes      | Yes     |

EXAMPLE 1

    time:dateSub('2019-11-11 13:23:44.657', 5, 'YEAR', 'yyyy-MM-dd HH:mm:ss.SSS')

Subtracts five years to the given date value and returns
`2014-11-11 13:23:44.657`.

EXAMPLE 2

    time:dateSub('2019-11-11 13:23:44.657', 5, 'YEAR')

Subtracts five years to the given date value and returns
`2014-11-11 13:23:44.657` using the default date.format
`yyyy-MM-dd HH:mm:ss.SSS`.

EXAMPLE 3

    time:dateSub( 1415715824000L, 1, 'HOUR')

Subtracts one hour and `1415712224000` as a `string`.

## dayOfWeek

Extracts the day on which a given date falls.

Syntax

    <STRING> time:dayOfWeek(<STRING> date.value, <STRING> date.format)
    <STRING> time:dayOfWeek(<STRING> date.value)

QUERY PARAMETERS

| Name        | Description                                                                                  | Default Value               | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. |                             | STRING              | No       | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`.               | `yyyy-MM-dd HH:mm:ss.SSS` | STRING              | Yes      | Yes     |

EXAMPLE 1

    time:date('2014/12/11 13:23:44', 'yyyy/MM/dd HH:mm:ss')

Extracts the date and returns `Thursday`.

EXAMPLE 2

    time:date('2014-11-11 13:23:44.345')

Extracts the date and returns `Tuesday`.

## extract

Function extracts a date unit from the date.

Syntax

    <INT> time:extract(<STRING> unit, <STRING> date.value)
    <INT> time:extract(<STRING> unit, <STRING> date.value, <STRING> date.format)
    <INT> time:extract(<STRING> unit, <STRING> date.value, <STRING> date.format, <STRING> locale)
    <INT> time:extract(<LONG> timestamp.in.milliseconds, <STRING> unit)
    <INT> time:extract(<LONG> timestamp.in.milliseconds, <STRING> unit, <STRING> locale)

QUERY PARAMETERS

| Name                      | Description                                                                                                                                 | Default Value                                           | Possible Data Types | Optional | Dynamic |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|---------------------|----------|---------|
| unit                      | This is the part of the date that needs to be modified. For example, `MINUTE`, `HOUR`, `MONTH`, `YEAR`, `QUARTER`, `WEEK`, `DAY`, `SECOND`. |                                                         | STRING              | No       | No      |
| date.value                | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`.                                                | -                                                      | STRING              | Yes      | Yes     |
| date.format               | The format of the date value provided. For example, `yyyy-MM-dd HH:mm:ss.SSS`.                                                              | `yyyy-MM-dd HH:mm:ss.SSS`                             | STRING              | Yes      | Yes     |
| timestamp.in.milliseconds | The date value in milliseconds. For example, `1415712224000L`.                                                                              | -                                                      | LONG                | Yes      | Yes     |
| locale                    | Represents a specific geographical, political or cultural region. For example `en_US` and `fr_FR`                                           | Current default locale set in the Java Virtual Machine. | STRING              | Yes      | No      |

EXAMPLE 1

    time:extract('YEAR', '2019/11/11 13:23:44.657', 'yyyy/MM/dd HH:mm:ss.SSS')

Extracts the year amount and returns `2019`.

EXAMPLE 2

    time:extract('DAY', '2019-11-12 13:23:44.657')

Extracts the day amount and returns `12`.

EXAMPLE 3

    time:extract(1394556804000L, 'HOUR')

Extracts the hour amount and returns `22`.

## timestampInMilliseconds

Returns the system time or the given time in milliseconds.

Syntax

    <LONG> time:timestampInMilliseconds()
    <LONG> time:timestampInMilliseconds(<STRING> date.value, <STRING> date.format)
    <LONG> time:timestampInMilliseconds(<STRING> date.value)

QUERY PARAMETERS

| Name        | Description                                                                                  | Default Value               | Possible Data Types | Optional | Dynamic |
|-------------|----------------------------------------------------------------------------------------------|-----------------------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. | Current system time         | STRING              | Yes      | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`.               | `yyyy-MM-dd HH:mm:ss.SSS` | STRING              | Yes      | Yes     |

EXAMPLE 1

    time:timestampInMilliseconds()

Returns the system current time in milliseconds.

EXAMPLE 2

    time:timestampInMilliseconds('2007-11-30 10:30:19', 'yyyy-MM-DD HH:MM:SS')

Converts `2007-11-30 10:30:19` in `yyyy-MM-DD HH:MM:SS` format to
milliseconds as `1170131400019`.

EXAMPLE 3

    time:timestampInMilliseconds('2007-11-30 10:30:19.000')

Converts `2007-11-30 10:30:19` in `yyyy-MM-DD HH:MM:ss.SSS` format to
milliseconds as `1196398819000`.

## utcTimestamp

Function returns the system current time in UTC timezone with
`yyyy-MM-dd HH:mm:ss` format.

Syntax

    <STRING> time:utcTimestamp()

EXAMPLE 1

    time:utcTimestamp()

Returns the system current time in UTC timezone with
`yyyy-MM-dd HH:mm:ss` format, and a sample output will be like
`2019-07-03 09:58:34`.
