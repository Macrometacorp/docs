---
title: Date Functions
---

C8QL offers functionality to work with dates, but it does not have a special data type for dates (neither does JSON, which is usually used as format to ship data into and out of GDN). Instead, dates in C8QL are represented by either numbers or strings.

All date function operations are done in the _Unix time_ system. Unix time counts all non leap seconds beginning with January 1st 1970 00:00:00.000 UTC, also know as the Unix epoch. A point in time is called timestamp. A timestamp has the same value at every point on earth. The date functions use millisecond precision for timestamps.

Time unit definitions:

- **millisecond**: 1/1000 of a second
- **second**: one [SI second](https://www.bipm.org/en/publications/si-brochure/second.html){:target="_blank"}
- **minute**: one minute is defined as 60 seconds
- **hour**: one hour is defined as 60 minutes
- **day**: one day is defined as 24 hours
- **week**: one week is defined as 7 days
- **month**: one month is defined as 1/12 of a year
- **year**: one year is defined as 365.2425 days

All functions that require dates as arguments accept the following input values:

- **numeric timestamps**, millisecond precision.

  An example timestamp value is `1399472349522`, which translates to `2014-05-07T14:19:09.522Z`.

  Valid range: `-62167219200000` .. `253402300799999` (inclusive)

- **date time strings** in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} format:
  - `YYYY-MM-DDTHH:MM:SS.MMM`
  - `YYYY-MM-DD HH:MM:SS.MMM`
  - `YYYY-MM-DD`

  Milliseconds (`.MMM`) are always optional. Two digits for the hours (`HH`), minutes (`MM`) and seconds (`SS`) are mandatory, i.e. zero-padding is required for the values 0 through 9 (e.g. `05` instead of `5`). Leading zeroes for the year (`YYYY`), month (`MM`) and day (`DD`) can be left out, but is discouraged.

  A time offset may optionally be added at the end of the string, with the hours and minutes that need to be added or subtracted to the date time value. For example, `2014-05-07T14:19:09+01:00` can be used to specify a one hour offset, and `2014-05-07T14:19:09+07:30` can be specified for seven and half hours offset. Negative offsets are also possible. Alternatively to an offset, a `Z` can be used to indicate UTC / Zulu time. An example value is `2014-05-07T14:19:09.522Z` meaning May 7th 2014, 14:19:09 and 522 milliseconds, UTC / Zulu time. Another example value without time component is `2014-05-07Z`.

  Valid range: `"0000-01-01T00:00:00.000Z"` .. `"9999-12-31T23:59:59.999Z"` (inclusive)

Any date/time values outside the valid range that are passed into an C8QL date function will make the function return `null` and trigger a warning for the query, which can optionally be escalated to an error and abort the query. This also applies to operations which produce an invalid value.

```js
DATE_HOUR( 2 * 60 * 60 * 1000 ) // 2
DATE_HOUR("1970-01-01T02:00:00") // 2
```

You are free to store age determinations of specimens, incomplete or fuzzy dates and the like in different, more appropriate ways of course. C8QL's date functions will most certainly not be of any help for such dates, but you can still use language constructs like [SORT](../operations/sort.md) (which also supports sorting of arrays) and indexes like skiplists.

## Current date and time

### DATE_NOW()

`DATE_NOW() → timestamp`

Get the current unix time as numeric timestamp.

- returns **timestamp** (number): the current unix time as a timestamp. The return value has millisecond precision. To convert the return value to seconds, divide it by 1000.

:::note
This function is evaluated on every invocation and may return different values when invoked multiple times in the same query. Assign it to a variable to use the exact same timestamp multiple times.
:::

### Conversion

_DATE_TIMESTAMP()_ and _DATE_ISO8601()_ can be used to convert ISO 8601 date time strings to numeric timestamps and numeric timestamps to ISO 8601 date time strings.

Both also support individual date components as separate function arguments, in the following order:

- year
- month
- day
- hour
- minute
- second
- millisecond

All components following _day_ are optional and can be omitted. Note that no time offset can be specified when using separate date components, and UTC / Zulu time will be used.

The following calls to _DATE_TIMESTAMP()_ are equivalent and will all return _1399472349522_:

```js
DATE_TIMESTAMP("2014-05-07T14:19:09.522")
DATE_TIMESTAMP("2014-05-07T14:19:09.522Z")
DATE_TIMESTAMP("2014-05-07 14:19:09.522")
DATE_TIMESTAMP("2014-05-07 14:19:09.522Z")
DATE_TIMESTAMP(2014, 5, 7, 14, 19, 9, 522)
DATE_TIMESTAMP(1399472349522)
```

The same is true for calls to _DATE_ISO8601()_ that also accepts variable input formats:

```js
DATE_ISO8601("2014-05-07T14:19:09.522Z")
DATE_ISO8601("2014-05-07 14:19:09.522Z")
DATE_ISO8601(2014, 5, 7, 14, 19, 9, 522)
DATE_ISO8601(1399472349522)
```

The above functions are all equivalent and will return _"2014-05-07T14:19:09.522Z"_.

### DATE_ISO8601()

`DATE_ISO8601(date) → dateString`

Return an ISO 8601 date time string from _date_. The date time string will always use UTC / Zulu time, indicated by the _Z_ at its end.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **dateString**: date and time expressed according to ISO 8601, in Zulu time

`DATE_ISO8601(year, month, day, hour, minute, second, millisecond) → dateString`

Return a ISO 8601 date time string from _date_, but allows to specify the individual date components separately. All parameters after _day_ are optional.

- **year** (number): typically in the range 0..9999, e.g. _2017_
- **month** (number): 1..12 for January through December
- **day** (number): 1..31 (upper bound depends on number of days in month)
- **hour** (number, _optional_): 0..23
- **minute** (number, _optional_): 0..59
- **second** (number, _optional_): 0..59
- **milliseconds** (number, _optional_): 0..999
- returns **dateString**: date and time expressed according to ISO 8601, in Zulu time

### DATE_TIMESTAMP()

`DATE_TIMESTAMP(date) → timestamp`

Create a timestamp value from _date_. The return value has millisecond precision. To convert the return value to seconds, divide it by 1000.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **timestamp** (number): numeric timestamp

`DATE_TIMESTAMP(year, month, day, hour, minute, second, millisecond) → timestamp`

Create a timestamp value, but allows to specify the individual date components separately. All parameters after _day_ are optional.

- **year** (number): typically in the range 0..9999, e.g. _2017_
- **month** (number): 1..12 for January through December
- **day** (number): 1..31 (upper bound depends on number of days in month)
- **hour** (number, _optional_): 0..23
- **minute** (number, _optional_): 0..59
- **second** (number, _optional_): 0..59
- **milliseconds** (number, _optional_): 0..999
- returns **timestamp** (number): numeric timestamp

Negative values are not allowed, result in _null_ and cause a warning. Values greater than the upper range bound overflow to the larger components (e.g. an hour of 26 is automatically turned into an additional day and two hours):

```js
DATE_TIMESTAMP(2016, 12, -1) // returns null and issues a warning
DATE_TIMESTAMP(2016, 2, 32) // returns 1456963200000, which is March 3rd, 2016
DATE_TIMESTAMP(1970, 1, 1, 26) // returns 93600000, which is January 2nd, 1970, at 2 a.m.
```

### IS_DATESTRING()

`IS_DATESTRING(value) → bool`

Check if an arbitrary string is suitable for interpretation as date time string.

- **value** (string): an arbitrary string
- returns **bool** (bool): _true_ if _value_ is a string that can be used in a date function. This includes partial dates such as _2015_ or _2015-10_ and strings containing invalid dates such as _2015-02-31_. The function will return _false_ for all non-string values, even if some of them may be usable in date functions.

## Processing

### DATE_DAYOFWEEK()

`DATE_DAYOFWEEK(date) → weekdayNumber`

Return the weekday number of _date_.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **weekdayNumber** (number): 0..6 as follows:
  - 0 – Sunday
  - 1 – Monday
  - 2 – Tuesday
  - 3 – Wednesday
  - 4 – Thursday
  - 5 – Friday
  - 6 – Saturday

### DATE_YEAR()

`DATE_YEAR(date) → year`

Return the year of _date_.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **year** (number): the year part of _date_ as a number

### DATE_MONTH()

`DATE_MONTH(date) → month`

Return the month of _date_.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **month** (number): the month part of _date_ as a number

### DATE_DAY()

`DATE_DAY(date) → day`

Return the day of _date_.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **day** (number): the day part of _date_ as a number

### DATE_HOUR()

Return the hour of _date_.

`DATE_HOUR(date) → hour`

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **hour** (number): the hour part of _date_ as a number

### DATE_MINUTE()

`DATE_MINUTE(date) → minute`

Return the minute of _date_.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **minute** (number): the minute part of _date_ as a number

### DATE_SECOND()

`DATE_SECOND(date) → second`

Return the second of _date_.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **second** (number): the seconds part of _date_ as a number

### DATE_MILLISECOND()

`DATE_MILLISECOND(date) → millisecond`

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **millisecond** (number): the milliseconds part of _date_ as a number

### DATE_DAYOFYEAR()

`DATE_DAYOFYEAR(date) → dayOfYear`

Return the day of year of _date_.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **dayOfYear** (number): the day of year number of _date_.
  The return values range from 1 to 365, or 366 in a leap year respectively.

### DATE_ISOWEEK()

`DATE_ISOWEEK(date) → weekDate`

Return the week date of _date_ according to ISO 8601.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **weekDate** (number): the ISO week date of _date_. The return values range from 1 to 53. Monday is considered the first day of the week. There are no fractional weeks, thus the last days in December may belong to the first week of the next year, and the first days in January may be part of the previous year's last week.

### DATE_LEAPYEAR()

`DATE_LEAPYEAR(date) → leapYear`

Return whether _date_ is in a leap year.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **leapYear** (bool): _true_ if _date_ is in a leap year, _false_ otherwise

### DATE_QUARTER()

`DATE_QUARTER(date) → quarter`

Return which quarter _date_ belongs to.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **quarter** (number): the quarter of the given date (1-based):
  - 1 – January, February, March
  - 2 – April, May, June
  - 3 – July, August, September
  - 4 – October, November, December

### DATE_DAYS_IN_MONTH()

Return the number of days in the month of _date_.

`DATE_DAYS_IN_MONTH(date) → daysInMonth`

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- returns **daysInMonth** (number): the number of days in _date_'s month (28..31)

### DATE_TRUNC()

`DATE_TRUNC(date, unit) → isoDate`

Truncates the given date after _unit_ and returns the modified date.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- **unit** (string): either of the following to specify the time unit (case-insensitive):
  - y, year, years
  - m, month, months
  - d, day, days
  - h, hour, hours
  - i, minute, minutes
  - s, second, seconds
  - f, millisecond, milliseconds
- returns **isoDate** (string): the truncated ISO 8601 date time string

```js
DATE_TRUNC('2017-02-03', 'month') // 2017-02-01T00:00:00.000Z
DATE_TRUNC('2017-02-03 04:05:06', 'hours') // 2017-02-03 04:00:00.000Z
```

```js
    RETURN MERGE(
      FOR doc IN @data
        COLLECT q = DATE_TRUNC(doc.date, "year") INTO bucket
        RETURN { [DATE_YEAR(q)]: bucket[*].doc.value }
    )
    @BV {
    "data": [
      { "date": "2018-03-05", "value": "Spring" },
      { "date": "2018-07-11", "value": "Summer" },
      { "date": "2018-10-26", "value": "Autumn" },
      { "date": "2019-01-09", "value": "Winter" },
      { "date": "2019-04-02", "value": "Spring" }
    ]
    }
```

### DATE_FORMAT()

`DATE_FORMAT(date, format) → str`

Format a date according to the given format string.

- **date** (string\|number): a date string or timestamp
- **format** (string): a format string, see below
- returns **str** (string): a formatted date string

_format_ supports the following placeholders (case-insensitive):

- %t – timestamp, in milliseconds since midnight 1970-01-01
- %z – ISO date (0000-00-00T00:00:00.000Z)
- %w – day of week (0..6)
- %y – year (0..9999)
- %yy – year (00..99), abbreviated (last two digits)
- %yyyy – year (0000..9999), padded to length of 4
- %yyyyyy – year (-009999 .. +009999), with sign prefix and padded to length of 6
- %m – month (1..12)
- %mm – month (01..12), padded to length of 2
- %d – day (1..31)
- %dd – day (01..31), padded to length of 2
- %h – hour (0..23)
- %hh – hour (00..23), padded to length of 2
- %i – minute (0..59)
- %ii – minute (00..59), padded to length of 2
- %s – second (0..59)
- %ss – second (00..59), padded to length of 2
- %f – millisecond (0..999)
- %fff – millisecond (000..999), padded to length of 3
- %x – day of year (1..366)
- %xxx – day of year (001..366), padded to length of 3
- %k – ISO week date (1..53)
- %kk – ISO week date (01..53), padded to length of 2
- %l – leap year (0 or 1)
- %q – quarter (1..4)
- %a – days in month (28..31)
- %mmm – abbreviated English name of month (Jan..Dec)
- %mmmm – English name of month (January..December)
- %www – abbreviated English name of weekday (Sun..Sat)
- %wwww – English name of weekday (Sunday..Saturday)
- %& – special escape sequence for rare occasions
- %% – literal %
- % – ignored

`%yyyy` does not enforce a length of 4 for years before 0 and past 9999. The same format as for `%yyyyyy` will be used instead. `%yy` preserves the sign for negative years and may thus return 3 characters in total.

Single `%` characters will be ignored. Use `%%` for a literal `%`. To resolve ambiguities like in `%mmonth` (unpadded month number + the string "month") between `%mm` + "onth" and `%m` + "month", use the escape sequence `%&`: `%m%&month`.

:::note
_DATE_FORMAT()_ is a rather costly operation and may not be suitable for large datasets (like over 1 million dates). If possible, avoid formatting dates on server-side and leave it up to the client to do so. This function should only be used for special date comparisons or to store the formatted dates in the database. For better performance, use the primitive `DATE_*()` functions together with `CONCAT()` if possible.
:::

Examples:

```js
DATE_FORMAT(DATE_NOW(), "%q/%yyyy") // quarter and year (e.g. "3/2015")
DATE_FORMAT(DATE_NOW(), "%dd.%mm.%yyyy %hh:%ii:%ss,%fff") // e.g. "18.09.2015 15:30:49,374"
DATE_FORMAT("1969", "Summer of '%yy") // "Summer of '69"
DATE_FORMAT("2016", "%%l = %l") // "%l = 1" (2016 is a leap year)
DATE_FORMAT("2016-03-01", "%xxx%") // "063", trailing % ignored
```

## Comparison and calculation

### DATE_ADD()

`DATE_ADD(date, amount, unit) → isoDate`

Add _amount_ given in _unit_ to _date_ and return the calculated date.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- **amount** (number\|string): number of _unit_s to add (positive value) or subtract (negative value). It is recommended to use positive values only, and use [DATE_SUBTRACT()](#date_subtract) for subtractions instead.
- **unit** (string): either of the following to specify the time unit to add or subtract (case-insensitive):
  - y, year, years
  - m, month, months
  - w, week, weeks
  - d, day, days
  - h, hour, hours
  - i, minute, minutes
  - s, second, seconds
  - f, millisecond, milliseconds
- returns **isoDate** (string): the calculated ISO 8601 date time string

```js
DATE_ADD(DATE_NOW(), -1, "day") // yesterday; also see DATE_SUBTRACT()
DATE_ADD(DATE_NOW(), 3, "months") // in three months
DATE_ADD(DATE_ADD("2015-04-01", 5, "years"), 1, "month") // May 1st 2020
DATE_ADD("2015-04-01", 12*5 + 1, "months") // also May 1st 2020
DATE_ADD(DATE_TIMESTAMP(DATE_YEAR(DATE_NOW()), 12, 24), -4, "years") // Christmas four years ago
DATE_ADD(DATE_ADD("2016-02", "month", 1), -1, "day") // last day of February (29th, because 2016 is a leap year!)
```

`DATE_ADD(date, isoDuration) → isoDate`

You may also pass an ISO duration string as _amount_ and leave out _unit_.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- **isoDuration** (string): an ISO 8601 duration string to add to _date_, see below
- returns **isoDate** (string):  the calculated ISO 8601 date time string

The format is `P_Y_M_W_DT_H_M_._S`, where underscores stand for digits and letters for time intervals - except for the separators `P` (period) and `T` (time).

The meaning of the other letters are:

- Y – years
- M – months (if before T)
- W – weeks
- D – days
- H – hours
- M – minutes (if after T)
- S – seconds (optionally with 3 decimal places for milliseconds)

The string must be prefixed by a `P`. A separating `T` is only required if `H`, `M` and/or `S` are specified. You only need to specify the needed pairs of letters and numbers.

```js
DATE_ADD(DATE_NOW(), "P1Y") // add 1 year
DATE_ADD(DATE_NOW(), "P3M2W") // add 3 months and 2 weeks
DATE_ADD(DATE_NOW(), "P5DT26H") // add 5 days and 26 hours (=6 days and 2 hours)
DATE_ADD("2000-01-01", "PT4H") // add 4 hours
DATE_ADD("2000-01-01", "PT30M44.4S" // add 30 minutes, 44 seconds and 400 ms
DATE_ADD("2000-01-01", "P1Y2M3W4DT5H6M7.89S" // add a bit of everything
```

### DATE_SUBTRACT()

`DATE_SUBTRACT(date, amount, unit) → isoDate`

Subtract _amount_ given in _unit_ from _date_ and return the calculated date.

It works the same as [DATE_ADD()](#date_add), except that it subtracts. It is equivalent to calling _DATE_ADD()_ with a negative amount, except that _DATE_SUBTRACT()_ can also subtract ISO durations. Note that negative ISO durations are not supported (i.e. starting with `-P`, like `-P1Y`).

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- **amount** (number\|string): number of _unit_s to subtract (positive value) or add (negative value). It is recommended to use positive values only, and use [DATE_ADD()](#date_add) for additions instead.
- **unit** (string): either of the following to specify the time unit to add or subtract (case-insensitive):
  - y, year, years
  - m, month, months
  - w, week, weeks
  - d, day, days
  - h, hour, hours
  - i, minute, minutes
  - s, second, seconds
  - f, millisecond, milliseconds
- returns **isoDate** (string): the calculated ISO 8601 date time string

`DATE_SUBTRACT(date, isoDuration) → isoDate`

You may also pass an ISO duration string as _amount_ and leave out _unit_.

- **date** (number\|string): numeric timestamp or ISO 8601 date time string
- **isoDuration** (string): an ISO 8601 duration string to subtract from _date_, see below
- returns **isoDate** (string): the calculated ISO 8601 date time string

The format is `P_Y_M_W_DT_H_M_._S`, where underscores stand for digits and letters for time intervals - except for the separators `P` (period) and `T` (time). The meaning of the other letters are:

- Y – years
- M – months (if before T)
- W – weeks
- D – days
- H – hours
- M – minutes (if after T)
- S – seconds (optionally with 3 decimal places for milliseconds)

The string must be prefixed by a `P`. A separating `T` is only required if `H`, `M` and/or `S` are specified. You only need to specify the needed pairs of letters and numbers.

```js
DATE_SUBTRACT(DATE_NOW(), 1, "day") // yesterday
DATE_SUBTRACT(DATE_TIMESTAMP(DATE_YEAR(DATE_NOW()), 12, 24), 4, "years") // Christmas four years ago
DATE_SUBTRACT(DATE_ADD("2016-02", "month", 1), 1, "day") // last day of February (29th, because 2016 is a leap year!)
DATE_SUBTRACT(DATE_NOW(), "P4D") // four days ago
DATE_SUBTRACT(DATE_NOW(), "PT1H3M") // 1 hour and 30 minutes ago
```

### DATE_DIFF()

`DATE_DIFF(date1, date2, unit, asFloat) → diff`

Calculate the difference between two dates in given time _unit_, optionally with decimal places.

- **date1** (number\|string): numeric timestamp or ISO 8601 date time string
- **date2** (number\|string): numeric timestamp or ISO 8601 date time string
- **unit** (string): either of the following to specify the time unit to return the difference in (case-insensitive):
  - y, year, years
  - m, month, months
  - w, week, weeks
  - d, day, days
  - h, hour, hours
  - i, minute, minutes
  - s, second, seconds
  - f, millisecond, milliseconds
- **asFloat** (boolean, _optional_): if set to _true_, decimal places will be preserved in the result. The default is _false_ and an integer is returned. - returns **diff** (number): the calculated difference as number in _unit_. The value will be negative if _date2_ is before _date1_.

### DATE_COMPARE()

`DATE_COMPARE(date1, date2, unitRangeStart, unitRangeEnd) → bool`

Check if two partial dates match.

- **date1** (number\|string): numeric timestamp or ISO 8601 date time string
- **date2** (number\|string): numeric timestamp or ISO 8601 date time string
- **unitRangeStart** (string): unit to start from, see below
- *_unitRangeEnd_* (string, _optional_):  unit to end with, leave out to only compare the component as specified by _unitRangeStart_. An error is raised if *unitRangeEnd* is a unit before _unitRangeStart_.
- returns **bool** (bool): _true_ if the dates match, _false_ otherwise

The parts to compare are defined by a range of time units. The full range is: years, months, days, hours, minutes, seconds, milliseconds (in this order).

All components of _date1_ and _date2_ as specified by the range will be compared. You can refer to the units as:

- y, year, years
- m, month, months
- d, day, days
- h, hour, hours
- i, minute, minutes
- s, second, seconds
- f, millisecond, milliseconds

```js
// Compare months and days, true on birthdays if you're born on 4th of April
DATE_COMPARE("1985-04-04", DATE_NOW(), "months", "days")

// Will only match on one day if the current year is a leap year!
// You may want to add or subtract one day from date1 to match every year.
DATE_COMPARE("1984-02-29", DATE_NOW(), "months", "days")

// compare years, months and days (true, because it's the same day)
DATE_COMPARE("2001-01-01T15:30:45.678Z", "2001-01-01T08:08:08.008Z", "years", "days")
```

You can directly compare ISO date **strings** if you want to find dates before or after a certain date, or in between two dates (`>=`, `>`, `<`, `<=`). No special date function is required. Equality tests (`==` and `!=`) will only match the exact same date and time however. You may use `SUBSTRING()` to compare partial date strings, `DATE_COMPARE()` is basically a convenience function for that. However, neither is really required to limit a search to a certain day as demonstrated here:

```js
FOR doc IN coll
    FILTER doc.date >= "2015-05-15" AND doc.date < "2015-05-16"
    RETURN doc
```

Every ISO date on that day is greater than or equal to `2015-05-15` in a string comparison (e.g. `2015-05-15T11:30:00.000Z`). Dates before `2015-05-15` are smaller and therefore filtered out by the first condition. Every date past `2015-05-15` is greater than this date in a string comparison, and therefore filtered out by the second condition. The result is that the time components in the dates you compare with are "ignored". The query will return every document with _date_ ranging from `2015-05-15T00:00:00.000Z` to `2015-05-15T23:99:99.999Z`. It would also include `2015-05-15T24:00:00.000Z`, but that date is actually `2015-05-16T00:00:00.000Z` and can only occur if inserted manually (you may want to pass dates through [DATE_ISO8601()](#date_iso8601) to ensure a correct date representation).

Leap days in leap years (29th of February) must be always handled manually, if you require so (e.g. birthday checks):

```js
LET today = DATE_NOW()
LET noLeapYear = NOT DATE_LEAPYEAR(today)

FOR user IN users
    LET birthday = noLeapYear AND
                   DATE_MONTH(user.birthday) == 2 AND
                   DATE_DAY(user.birthday) == 29
                   ? DATE_SUBTRACT(user.birthday, 1, "day") /* treat like 28th in non-leap years */
                   : user.birthday
    FILTER DATE_COMPARE(today, birthday, "month", "day")
    /* includes leaplings on the 28th of February in non-leap years,
     * but excludes them in leap years which do have a 29th February.
     * Replace DATE_SUBTRACT() by DATE_ADD() to include them on the 1st of March
     * in non-leap years instead (depends on local jurisdiction).
     */
    RETURN user
```

## Working with dates and indices

There are two recommended ways to store timestamps in GDN:

- string: UTC timestamp with [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601){:target="_blank"}
- number: [unix timestamp](https://en.wikipedia.org/wiki/Unix_time){:target="_blank"} with millisecond precision

The sort order of both is identical due to the sort properties of ISO date strings. You can't mix both types, numbers and strings, in a single attribute however.

You can use [skiplist indices](../../../../../database/collections/indexing/index.md#skiplist-index) with both date types. When chosing string representations, you can work with string comparisons (less than, greater than etc.) to express time ranges in your queries while still utilizing skiplist indices:

```js
    db._create("exampleTime");
    var timestamps = ["2014-05-07T14:19:09.522","2014-05-07T21:19:09.522","2014-05-08T04:19:09.522","2014-05-08T11:19:09.522","2014-05-08T18:19:09.522"];
    for (i = 0; i < 5; i++) db.exampleTime.save({value:i, ts: timestamps[i]})
    db._query("FOR d IN exampleTime FILTER d.ts > '2014-05-07T14:19:09.522' and d.ts < '2014-05-08T18:19:09.522' RETURN d").toArray()
    ~addIgnoreCollection("example")
    ~db._drop("exampleTime")
```

The first and the last timestamp in the array are excluded from the result by the `FILTER`.

## Limitations

Note that dates before the year 1583 aren't allowed by the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} standard by default, because they lie before the official introduction of the Gregorian calendar and may thus be incorrect or invalid. All C8QL date functions apply the same rules to every date according to the Gregorian calendar system, even if inappropriate. That does not constitute a problem, unless you deal with dates prior to 1583 and especially years before Christ. The standard allows negative years, but requires special treatment of positive years too, if negative years are used (e.g. `+002015-05-15` and `-000753-01-01`). This is rarely used however, and C8QL does not use the 7-character version for years between 0 and 9999 in ISO strings. Keep in mind that they can't be properly compared to dates outside that range. Sorting of negative dates does not result in a meaningful order, with years longer ago last, but months, days and the time components in otherwise correct order.

Leap seconds are ignored, just as they are in JavaScript as per [ECMAScript Language Specifications](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1){:target="_blank"}.