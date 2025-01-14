---
sidebar_position: 30
title: Values
---

Values are typed data that can be manipulated, transferred, and stored. Values can be referred to by the attributes defined in definitions such as streams and tables.

Stream supports values of type `STRING`, `INT` (Integer), `LONG`, `DOUBLE`, `FLOAT`, `BOOL` (Boolean), and `OBJECT`.

## Syntax

The syntax of each type and their example use as a constant value is as follows,

| Attribute Type | Format     | Example        |
|----------------|----------|---------------------|
| int            | `+`        | `123`, `-75`, `+95`        |
| long           | `+L`       | `123000L`, `-750l`, `+154L`|
| float          | `(+)?('.'*)?(E(-|+)?+)?F`           | `123.0f`, `-75.0e-10F`,`+95.789f`                         |
| double         | `(+)?('.'*)?(E(-|+)?+)?D?`          | `123.0`,`123.0D`,`-75.0e-10D`,`+95.789d`                  |
| bool           | `(true|false)`       | `true`, `false`, `TRUE`, `FALSE`                          |
| string         | `'(;*!('|"|"""|))'` or  `"(;* !("|"""|))"` or `"""(;* !("""))"""`  | `'Any text.'`, `"Text with 'single' quotes."`, ```""" Text with 'single' quotes, "double" quotes, and new lines. """``` |

## Time

Time is a special type of `LONG` value that denotes time using digits and their unit in the format `(<digit>+ <unit>)+`. At execution, the `time` gets converted into milliseconds and returns a `LONG` value.

| Unit  | Syntax |
|------------|-----------------------------|
| Year | `year` | `years`|
| Month | `month` | `months`|
| Week | `week` | `weeks`  |
| Day | `day` | `days`|
| Hour | `hour` | `hours` |
| Minutes | `minute` | `minutes` | `min` |
| Seconds | `second` | `seconds` | `sec` |
| Milliseconds | `millisecond` | `milliseconds` |

## Example 1

1 hour and 25 minutes can by written as `1 hour and 25 minutes` which is equal to the `LONG` value `5100000`.

## Example 2

This example provides introduction to basic stream worker attribute types and some key functions such as `convert()`, `instanceOf...()`, and `cast()`.

In stream workers, other types such as [list](functions/list/), [map](functions/map/), etc, should be passed as an `object` into streams.

### Input

The below event is sent to `PatientRegistrationInputStream`,

[`1200098`, `'Peter Johnson'`, `34`, `194.3f`, `69.6`, `#Fjoiu59%3hkjnknk$#nFT`, `true`, `34`]

Assume that the content of the photo (`#Fjoiu59%3hkjnknk$#nFT`) is binary.

### Output

After processing, the event output at `PatientRegistrationStream` is:

[`1200098`, `'Peter Johnson'`, `34`, `194.3`, `69.6`, `#Fjoiu59%3hkjnknk$#nFT`, `false`, `true`, `34`]

### Stream Worker Code

```sql
-- Defines `PatientRegistrationInputStream` with information in all primitive types.
CREATE STREAM PatientRegistrationInputStream (
                 seqNo long, name string, age int,
                 height float, weight double, photo object,
                 isEmployee bool, wardNo object);


-- Defines the resulting `PatientRegistrationStream` after processing.
CREATE STREAM PatientRegistrationStream (
                 seqNo long, name string, age int,
                 height double, weight double, photo object,
                 isPhotoString bool, isEmployee bool,
                 wardNo int);


@info(name = 'Type-processor')
INSERT INTO PatientRegistrationStream
SELECT seqNo, name, age,
-- `convert()` used to convert `float` type to `double`.
       convert(height, 'double') as height,

       weight, photo,
-- `instanceOfString()` checks if the photo is an instance of `string`.
       instanceOfString(photo) as isPhotoString,

       isEmployee,
-- `cast()` cast the value of wardNo to `int`.
       cast(wardNo, 'int') as wardNo
FROM PatientRegistrationInputStream;
```
