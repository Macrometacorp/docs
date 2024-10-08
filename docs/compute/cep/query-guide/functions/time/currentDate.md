---
title: currentDate (Function)
---

Function returns the system time in `yyyy-MM-dd` format.

## Syntax

```sql
<STRING> time:currentDate()
```

## Query Parameters

None

## Example 1

```sql
@info(name = 'currentDateExample')
SELECT time:currentDate() AS currentDate;
```

The `currentDateExample` demonstrates the use of the `time:currentDate()` function to get the current date in the `yyyy-MM-dd` format. The function returns a string representing the current date, such as `2023-04-25`.

## Example 2

```sql
CREATE STREAM InputStream (eventTime long);
CREATE SINK STREAM OutputStream (eventTime long, currentDate string);

@info(name = 'currentDateStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, time:currentDate() AS currentDate
FROM InputStream;
```

The `currentDateStreamWorker` processes events from the `InputStream` and uses the `time:currentDate()` function to get the current date in the `yyyy-MM-dd` format. The query outputs the `eventTime` and a string representing the current date as the `currentDate` attribute for each event to the `OutputStream`.
