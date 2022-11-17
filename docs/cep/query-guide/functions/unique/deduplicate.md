---
title: deduplicate (Stream Processor)
---

Removes duplicate events based on the `unique.key` parameter that arrive
within the `time.interval` gap from one another.

Syntax

    unique:deduplicate(<INT|LONG|FLOAT|BOOL|DOUBLE|STRING> unique.key, <INT|LONG> time.interval)

## Query Parameters

| Name          | Description                                                            | Default Value | Possible Data Types               | Optional | Dynamic |
|---------------|------------------------------------------------------------------------|---------------|-----------------------------------|----------|---------|
| unique.key    | Parameter to uniquely identify events.                                 |               | INT LONG FLOAT BOOL DOUBLE STRING | No       | Yes     |
| time.interval | The sliding time period within which the duplicate events are dropped. |               | INT LONG                          | No       | No      |

## Example 1

    CREATE STREAM TemperatureStream (sensorId string, temperature double)

    insert into UniqueTemperatureStream
    select *
    from TemperatureStream#unique:deduplicate(sensorId, 30 sec);

Query that removes duplicate events of `TemperatureStream` stream based
on `sensorId` attribute when they arrive within 30 seconds.
