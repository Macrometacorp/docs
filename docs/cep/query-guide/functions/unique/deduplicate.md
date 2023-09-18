---
title: deduplicate (Stream Processor)
---

Removes duplicate events based on the `unique.key` parameter that arrive
within the `time.interval` gap from one another.

## Syntax

```sql
unique:deduplicate(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> time.interval)
```

## Query Parameters

| Name  | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-------|-------------|---------------|---------------------|----------|---------|
| unique.key    | Parameter to uniquely identify events.     | | INT LONG FLOAT BOOL DOUBLE STRING | No    | Yes     |
| time.interval | The sliding time period within which the duplicate events are dropped. | | INT LONG   | No       | No      |

## Example 1

```sql
CREATE STREAM TemperatureStream (sensorId string, temperature double);
CREATE SINK STREAM UniqueTemperatureStream (sensorId string, temperature double);

@info(name = 'deduplicateTemperatureQuery')
INSERT INTO UniqueTemperatureStream
SELECT *
FROM TemperatureStream WINDOW unique:deduplicate(sensorId, 30 sec);
```

This query creates a `TemperatureStream` with the attributes `sensorId` and `temperature`. It then creates a `UniqueTemperatureStream` with the same attributes.

The `deduplicateTemperatureQuery` processes events from the `TemperatureStream` and uses a `WINDOW unique:deduplicate(sensorId, 30 sec)` clause to remove duplicate events based on the `sensorId` attribute when they arrive within 30 seconds of each other. The deduplicated events are inserted into the `UniqueTemperatureStream`.
