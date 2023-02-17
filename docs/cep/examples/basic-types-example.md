---
sidebar_position: 30
title: Basic Types Example
---

This page provides introduction to basic stream worker attribute types which are `int`, `long`, `float`, `double`, `string`, and `object`, and some key functions such as `convert()`, `instanceOf...()`, and `cast()`.

In stream workers, other types such as [list](../query-guide/functions/list/index.md), [map](../query-guide/functions/map/index.md), etc, should be passed as an `object` into streams.

## Input

Below event is sent to `PatientRegistrationInputStream`,

[`1200098`, `'Peter Johnson'`, `34`, `194.3f`, `69.6`, `#Fjoiu59%3hkjnknk$#nFT`, `true`, `34`]

Here, assume that the content of the photo (`#Fjoiu59%3hkjnknk$#nFT`) is binary.

## Output

After processing, the event arriving at `PatientRegistrationStream` will be as follows:

[`1200098`, `'Peter Johnson'`, `34`, `194.3`, `69.6`, `#Fjoiu59%3hkjnknk$#nFT`, `false`, `true`, `34`]

## Example

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
       convert(height, 'double') AS height,

       weight, photo,
-- `instanceOfString()` checks if the photo is an instance of `string`.
       instanceOfString(photo) AS isPhotoString,

       isEmployee,
-- `cast()` cast the value of wardNo to `int`.
       cast(wardNo, 'int') AS wardNo
FROM PatientRegistrationInputStream;
```
