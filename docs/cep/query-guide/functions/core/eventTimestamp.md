---
title: eventTimestamp (Function)
---

Returns the timestamp of the processed event.

## Syntax

```sql
<LONG> eventTimestamp()
```

## Query Parameters

None

## Example 1

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT symbol AS name, EVENTTIMESTAMP() AS eventTimestamp
FROM fooStream;
```

This query selects records from the `fooStream` and transforms the data by renaming the `symbol` field to `name` and adding a new field called `eventTimestamp` with the value of the event's timestamp using the `EVENTTIMESTAMP()` function. The resulting transformed data is then inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the `name` and `eventTimestamp` fields, where `eventTimestamp` represents the timestamp of the event.
