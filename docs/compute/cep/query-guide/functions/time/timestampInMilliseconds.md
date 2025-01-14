---
title: timestampInMilliseconds (Function)
---

Returns the system time or the given time in milliseconds.

## Syntax

```sql
<LONG> time:timestampInMilliseconds()
<LONG> time:timestampInMilliseconds(<STRING> date.value, <STRING> date.format)
<LONG> time:timestampInMilliseconds(<STRING> date.value)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| date.value  | The value of the date. For example, `2014-11-11 13:23:44.657`, `2014-11-11`, `13:23:44.657`. | Current system time         | STRING| Yes      | Yes     |
| date.format | The format of the date value provided. For example, `yyyy/MM/dd HH:mm:ss.SSS`. | `yyyy-MM-dd HH:mm:ss.SSS` | STRING| Yes      | Yes     |

## Example 1

```sql
SELECT time:timestampInMilliseconds() AS currentTimeMillis;
```

This query returns the system current time in milliseconds.

## Example 2

```sql
SELECT time:timestampInMilliseconds('2007-11-30 10:30:19', 'yyyy-MM-dd HH:mm:ss') AS millis;
```

This query converts the timestamp string `'2007-11-30 10:30:19'` in the format `'yyyy-MM-dd HH:mm:ss'` to milliseconds. The output is `1196418619000`.

## Example 3

```sql
SELECT time:timestampInMilliseconds('2007-11-30 10:30:19.000') AS millis;
```

This query converts the timestamp string `'2007-11-30 10:30:19.000'` in the format `'yyyy-MM-dd HH:mm:ss.SSS'` to milliseconds. The output is `1196418619000`.

## Example 4

```sql
CREATE STREAM InputStream (timestampStr string, format string);
CREATE SINK STREAM OutputStream (millis long);

@info(name = 'timestampInMillisecondsQuery')
INSERT INTO OutputStream
SELECT time:timestampInMilliseconds(timestampStr, format) AS millis
FROM InputStream;
```

The `timestampInMillisecondsQuery` processes events from the `InputStream`, which contains a timestamp string (`timestampStr`) and its corresponding format (`format`). It uses the `time:timestampInMilliseconds(timestampStr, format)` function to convert the timestamp string in the specified format to milliseconds. The query outputs the converted value as the `millis` attribute for each event to the `OutputStream`.
