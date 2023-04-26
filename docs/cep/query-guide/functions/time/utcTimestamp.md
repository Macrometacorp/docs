---
title: utcTimestamp (Function)
---

Function returns the system current time in UTC timezone with `yyyy-MM-dd HH:mm:ss` format.

## Syntax

```sql
<STRING> time:utcTimestamp()
```

## Query Parameters

None

## Example 1

```sql
SELECT time:utcTimestamp() AS utcTimestamp;
```

This query returns the system current time in UTC timezone with `yyyy-MM-dd HH:mm:ss` format. A sample output could be `2019-07-03 09:58:34`.

## Example 2

```sql
CREATE STREAM InputStream ();
CREATE STREAM OutputStream (utcTimestamp string);

@info(name = 'utcTimestampQuery')
INSERT INTO OutputStream
SELECT time:utcTimestamp() AS utcTimestamp
FROM InputStream;
```

The `utcTimestampQuery` processes events from the `InputStream`. It uses the `time:utcTimestamp()` function to obtain the system current time in UTC timezone with `yyyy-MM-dd HH:mm:ss` format. The query outputs the UTC timestamp as the `utcTimestamp` attribute for each event to the `OutputStream`.
