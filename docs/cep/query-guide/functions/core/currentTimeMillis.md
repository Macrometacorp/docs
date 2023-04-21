---
title: currentTimeMillis (Function)
---

Returns the current timestamp of stream processor application in milliseconds.

## Syntax

```sql
<LONG> currentTimeMillis()
```

## Query Parameters

None

## Example 1

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT symbol AS name, currentTimeMillis() AS eventTimestamp
FROM fooStream;
```

This query selects records from the `fooStream` and transforms the data by renaming the `symbol` field to `name` and adding a new field called `eventTimestamp` with the value of the current time in milliseconds using the `currentTimeMillis()` function. The resulting transformed data is then inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the `name` and `eventTimestamp` fields, where `eventTimestamp` represents the current time in milliseconds.
