---
sidebar_position: 6
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
insert into TemperatureLogTable
select t.sensorId as sensorId, s.roomNo as roomNo, t.temperature as temperature
from TemperatureStream as t join SensorIdInfoTable as s
     on t.sensorId == s.sensorId;
```

## Event at table and store

When `SensorIdInfoTable` table contains a recode [`'aq-14'`, `'789'`], and when an event with values [`'aq-14'`, `35.4`] is sent to `TemperatureStream` stream.

The event will get converted and added to the `TemperatureLogTable` table as below.

[`'aq-14'`, `'789'`, `35.4`]

## Retrieving values from tables and stores

The stored values can be retrieved by join tables and stores with the streams as in the `Join-query` depicted in the example, or using on-demand queries.

The data in `TemperatureDetailsTable` can be retrieved via on-demand queries as below, using the `On Demand Query REST API`.

```sql
select *
from TemperatureDetailsTable
```
