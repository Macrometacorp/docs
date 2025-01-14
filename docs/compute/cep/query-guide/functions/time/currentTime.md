---
title: currentTime (Function)
---

Function returns system time in `HH:mm:ss` format.

## Syntax

```sql
<STRING> time:currentTime()
```

## Query Parameters

None

## Example 1

```sql
@info(name = 'currentTimeExample')
SELECT time:currentTime() AS currentTime;
```

The `currentTimeExample` demonstrates the use of the `time:currentTime()` function to get the current system time in the `HH:mm:ss` format. The function returns a string representing the current time, such as `14:21:26`.

## Example 2

```sql
CREATE STREAM InputStream (eventTime long);
CREATE SINK STREAM OutputStream (eventTime long, currentTime string);

@info(name = 'currentTimeStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, time:currentTime() AS currentTime
FROM InputStream;
```

The `currentTimeStreamWorker` processes events from the `InputStream` and uses the `time:currentTime()` function to get the current system time in the `HH:mm:ss` format. The query outputs the `eventTime` and a string representing the current time as the `currentTime` attribute for each event to the `OutputStream`.
