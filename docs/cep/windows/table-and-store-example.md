---
sidebar_position: 60
title: Table and Store Example
---

This example shows how tables and database-backed stores can be used to store events.

## Example

```sql
-- Defines `TemperatureStream` stream having `sensorId` and `temperature` attributes of types `string` and `double`.
CREATE STREAM TemperatureStream (sensorId string, temperature double);

-- Defines `TemperatureLogTable` having `sensorId`, `roomNo`, and `temperature` attributes of types `string`, `string`, and `double`.
CREATE TABLE GLOBAL TemperatureLogTable (sensorId string, roomNo string, temperature double);

-- Defines `SensorIdInfoTable` table.
CREATE TABLE GLOBAL SensorIdInfoTable (sensorId string, roomNo string);

@info(name = 'Join-query')
-- Selects `sensorId`, `roomNo`, and `temperature` attributes from stream and table, and adds events to `TemperatureLogTable`.
INSERT INTO TemperatureLogTable
SELECT t.sensorId AS sensorId, s.roomNo AS roomNo, t.temperature AS temperature
FROM TemperatureStream AS t JOIN SensorIdInfoTable AS s
     ON t.sensorId == s.sensorId;
```

## Event at Table and Store

When `SensorIdInfoTable` table contains a recode [`'aq-14'`, `'789'`], and when an event with values [`'aq-14'`, `35.4`] is sent to `TemperatureStream` stream.

The event will get converted and added to the `TemperatureLogTable` table as below.

[`'aq-14'`, `'789'`, `35.4`]

## Retrieve Values from Tables and Stores

The stored values can be retrieved by joining tables and stores with the streams as in the `Join-query` depicted in the example, or using on-demand queries.

The data in `TemperatureDetailsTable` can be retrieved using on-demand queries as shown below, using the `On Demand Query REST API`.

```sql
SELECT *
FROM TemperatureDetailsTable
```
