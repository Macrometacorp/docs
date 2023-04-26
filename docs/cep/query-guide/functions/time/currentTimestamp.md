---
title: currentTimestamp (Function)
---

When no argument is provided, function returns the system current
timestamp in `yyyy-MM-dd HH:mm:ss` format, and when a time zone is
provided as an argument, it converts and return the current system time
to the given time zone format.

## Syntax

```sql
<STRING> time:currentTimestamp()
<STRING> time:currentTimestamp(<STRING> timezone)
```

## Query Parameters

| Name     | Description   | Default Value   | Possible Data Types | Optional | Dynamic |
|----------|---------------|-----------------|---------------------|----------|---------|
| timezone | The time zone to which the current time need to be converted. For example, `Asia/Kolkata`, `PST`. Get the supported time zone IDs from [here](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html). | System timezone | STRING   | Yes  | No |

## Example 1

```sql
@info(name = 'currentTimestampExample')
SELECT time:currentTimestamp() AS currentTimestamp;
```

The `currentTimestampExample` demonstrates the use of the `time:currentTimestamp()` function to get the current system time in the `yyyy-MM-dd HH:mm:ss` format. The function returns a string representing the current timestamp, such as `2023-04-25 12:34:56`.

## Example 2

```sql
CREATE STREAM InputStream (eventTime long);
CREATE STREAM OutputStream (eventTime long, currentTimestamp string);

@info(name = 'currentTimestampStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, time:currentTimestamp('Asia/Kolkata') AS currentTimestamp
FROM InputStream;
```

The `currentTimestampStreamWorker` processes events from the `InputStream` and uses the `time:currentTimestamp('Asia/Kolkata')` function to get the current system time converted to the `Asia/Kolkata` timezone in the `yyyy-MM-dd HH:mm:ss` format. The query outputs the `eventTime` and a string representing the current timestamp as the `currentTimestamp` attribute for each event to the `OutputStream`.

## Example 3

```sql
CREATE STREAM InputStream (eventTime long);
CREATE STREAM OutputStream (eventTime long, currentTimestamp string);

@info(name = 'currentTimestampCSTStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, time:currentTimestamp('CST') AS currentTimestamp
FROM InputStream;
```

The `currentTimestampCSTStreamWorker` processes events from the `InputStream` and uses the `time:currentTimestamp('CST')` function to get the current system time converted to the `CST` timezone in the `yyyy-MM-dd HH:mm:ss` format. The query outputs the `eventTime` and a string representing the current timestamp as the `currentTimestamp` attribute for each event to the `OutputStream`.
