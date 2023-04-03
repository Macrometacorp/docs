---
sidebar_position: 50
title: Data Cleaning Examples
---

This page shows examples of ways to clean your data.

## If-Then-Else

This example shows how to enrich events based on a simple `if-then-else` conditions.

```sql
-- Defines `TemperatureStream` stream to process events having `sensorId` and `temperature`(F)
CREATE STREAM TemperatureStream (sensorId string, temperature double);

@info(name = 'SimpleIfElseQuery')
INSERT INTO ValidTemperatureStream
SELECT sensorId,
-- if `temperature` > -2, `isValid`, then return `true`, else `false` 
	ifThenElse(temperature > -2, 'Valid', 'InValid') AS isValid 
FROM TemperatureStream;

@info(name = 'ComplexIfElseQuery') 
INSERT INTO ProcessedTemperatureStream
SELECT sensorId, 
-- If the `temperature` > 40 the status is set to `High`, between -2 and 40 as `Normal` and less than -2 as `InValid` 
	ifThenElse(temperature > -2, 
		ifThenElse(temperature > 40, 'High', 'Normal'), 
		'InValid') 
	as tempStatus
FROM TemperatureStream	;
```

### Events at Each Stream

When an event with values [`'sensor1'`, `35.4`] is sent to TemperatureStream, it is converted and travels through the streams as below.

- ValidTemperatureStream : [`'sensor1'`, `'Valid'`]
- ProcessedTemperatureStream : [`'sensor1'`, `'Normal'`]

## Value-based Filtering

This example shows filter-out events based on simple conditions such as `number value`, `range` or `null` type.

```sql
-- Defines `TemperatureStream` stream to process events having `sensorId` and `temperature`(F)
CREATE STREAM TemperatureStream (sensorId string, temperature double);

@info(name = 'EqualsFilter')
-- Filter out events with `sensorId` equal to A1234
INSERT INTO SenorA1234TemperatureStream
SELECT *
FROM TemperatureStream[ sensorId == 'A1234'];


@info(name = 'RangeFilter') 
-- Filter out events where `-2 < temperature < 40`
INSERT INTO NormalTemperatureStream
SELECT *
FROM TemperatureStream[ temperature > -2 and temperature < 40];


@info(name = 'NullFilter') 
-- Filter out events with `SensorId` is `null`
INSERT INTO InValidTemperatureStream
SELECT *
FROM TemperatureStream[ sensorId is null ];
```

### Value-based Filtering Input

Below events are sent to `TemperatureStream`,

1. [`'A1234'`, 39]
2. [`'sensor1'`, 35]
3. [`null`, 43]

### Value-based Filtering Output

After processing, the following events arrive at each stream:

- SenorA1234TemperatureStream: [`'A1234'`, 39] only

- NormalTemperatureStream:  [`'sensor1'`, 35] only

- InValidTemperatureStream: [`null`, 43] only

## Type-based Filtering

This example shows filter-out events based on the data `type` of the attribute.

```sql
-- Defines `SweetProductionStream` having information of `name` and `amount`
CREATE STREAM SweetProductionStream (name string, amount int);

@info(name='ProcessSweetProductionStream')
INSERT INTO ProcessedSweetProductionStream
SELECT 
-- `true` if `amount` is of `int` type
   instanceOfInteger(amount) as isAIntInstance,
    name, 
    amount
FROM SweetProductionStream;
```

### Type-based Filtering Input

Below event is sent to `SweetProductionStream`:

[`'chocolate cake'`, `'invalid'`]

### Type-based Filtering Output

After processing, the event arriving at `ProcessedSweetProductionStream` is:

[`false`, `'chocolate cake'`, `'invalid'`]

## Regex Matching

This example demonstrates event cleansing using regex expressions.

```sql
-- Defines `SweetProductionStream` having information of `name` and `amount`
CREATE STREAM SweetProductionStream (name string, amount int);

@info(name='ProcessSweetProductionStream')
INSERT INTO ChocolateProductStream
SELECT name, 
-- Matches if `name` begins with the word 'chocolate'
   regex:matches('chocolate(.*)', name) as isAChocolateProduct, 
-- Captures the `sweetType` of the sweet following the flavour in `name`
   regex:group('.*\s(.*)', name, 1) as sweetType
FROM SweetProductionStream;
```

### Regex Matching Input

Below event is sent to `SweetProductionStream`,

[`'chocolate cake'`, `34`]

### Regex Matching Output

After processing, the event arriving at `ChocolateProductStream` is:

[`'chocolate cake'`, `true`, `'cake'`]

## Default Function with Null Values

This example shows how to use the `default` function to process attributes with `null` values.

```sql
-- Defines `PatientRegistrationInputStream` having information in all primitive types
CREATE STREAM PatientRegistrationInputStream (
                 seqNo long, name string, age int,
                 height float, weight double, photo object,
                 isEmployee bool, wardNo object);


@info(name = 'SimpleIfElseQuery')
INSERT INTO PreprocessedPatientRegistrationInputStream
SELECT 
-- Default value of `invalid` to be used if `name` is `null` 
	default(name, 'invalid') as name, 

-- Default value of `0l` to be used if `seqNo` is `null` 
	default(seqNo, 0l) as seqNo, 

-- Default value of `0d` to be used if `weight` is `null` 
	default(weight, 0d) as weight,
	
-- Default value of `0` to be used if `age` is `null` 
	default(age, 0) as age,	

-- Default value of `0f` to be used if `height` is `null` 
	default(height, 0f) as height 	

FROM PatientRegistrationInputStream;
```

### Default Input

An event of all `null` attributes is sent to `PatientRegistrationInputStream`:

### Default Output

After processing, the event arriving at `PreprocessedPatientRegistrationInputStream` is:

[`'invalid'`, `0` `0.0`, `0`, `0.0`]

With types:

[`string`, `long`, `double`, `int`, `float`]

## Remove Duplicate Events

Provides examples of removing `duplicate` events that arrive within a given time duration.

### Example

```sql
CREATE STREAM TemperatureStream (sensorId string, seqNo string, temperature double);

@info(name = 'Deduplicate-sensorId')
-- Remove duplicate events arriving within `1 minute` time gap, based on unique `sensorId`.
INSERT INTO UniqueSensorStream
SELECT *
FROM TemperatureStream#unique:deduplicate(sensorId, 1 min);

@info(name = 'Deduplicate-sensorId-and-seqNo')
-- Remove duplicate events arriving within `1 minute` time gap, based on unique `sensorId` and `seqNo` combination.
INSERT INTO UniqueSensorSeqNoStream
SELECT *
FROM TemperatureStream#unique:deduplicate(str:concat(sensorId,'-',seqNo), 1 min)
```

### Behavior

When events are sent to `TemperatureStream` stream, following events are emitted after deduplication on `UniqueSensorStream` via `Deduplicate-sensorId` query, and `UniqueSensorSeqNoStream` stream via `Deduplicate-sensorId-and-seqNo` query.

|Time | Input to `TemperatureStream` | Output at `UniqueSensorStream` | Output at `UniqueSensorSeqNoStream` |
|---|---|---|---|
| 9:00:00 | [`'AD11'`, `'200'`, `18.0`] | [`'AD11'`, `'200'`, `18.0`]  | [`'AD11'`, `'200'`, `18.0`] |
| 9:00:10 | [`'AD11'`, `'201'`, `23.0`] | -                            | [`'AD11'`, `'201'`, `23.0`] |
| 9:00:20 | [`'FR45'`, `'500'`, `22.0`] | [`'FR45'`, `'500'`, `22.0`]  | [`'FR45'`, `'500'`, `22.0`] |
| 9:00:40 | [`'AD11'`, `'200'`, `18.0`] | -                            | - |
| 9:00:50 | [`'AD11'`, `'202'`, `28.0`] | -                            | [`'AD11'`, `'202'`, `28.0`] |
| 9:01:05 | [`'FR45'`, `'501'`, `22.0`] | -                            | [`'FR45'`, `'501'`, `22.0`] |
| 9:01:10 | [`'AD11'`, `'203'`, `30.0`] | [`'AD11'`, `'203'`, `30.0`]  | [`'AD11'`, `'203'`, `30.0`] |
| 9:02:20 | [`'AD11'`, `'202'`, `28.0`] | [`'AD11'`, `'202'`, `28.0`]  | [`'AD11'`, `'202'`, `28.0`] |
| 9:03:10 | [`'AD11'`, `'204'`, `30.0`] | -                            | [`'AD11'`, `'204'`, `30.0`] |
