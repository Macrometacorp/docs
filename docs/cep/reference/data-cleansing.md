---
sidebar_position: 4
---

# Cleansing the Events

## Value based Filtering

This example shows filter-out events based on simple conditions such as `number value`, `range` or `null` type.

```
-- Defines `TemperatureStream` stream to process events having `sensorId` and `temperature`(F).
CREATE STREAM TemperatureStream (sensorId string, temperature double);

@info(name = 'EqualsFilter')
-- Filter out events with `sensorId` equalling `A1234`
insert into SenorA1234TemperatureStream
select *
from TemperatureStream[ sensorId == 'A1234'];


@info(name = 'RangeFilter') 
-- Filter out events where `-2 < temperature < 40`
insert into NormalTemperatureStream
select *
from TemperatureStream[ temperature > -2 and temperature < 40];


@info(name = 'NullFilter') 
-- Filter out events with `SensorId` being `null`
insert into InValidTemperatureStream
select *
from TemperatureStream[ sensorId is null ];
```

### Input

Below events are sent to `TemperatureStream`,

1. [`'A1234'`, 39]
2. [`'sensor1'`, 35]
3. [`null`, 43]

### Output

After processing, the following events will be arriving at each stream:

* SenorA1234TemperatureStream: <br/>[`'A1234'`, 39] only

* NormalTemperatureStream:  <br/>[`'sensor1'`, 35] only

* InValidTemperatureStream: <br/>[`null`, 43] only 

## If-Then-Else

This example shows how to enrich events based on a simple `if-then-else` conditions.

```
-- Defines `TemperatureStream` stream to process events having `sensorId` and `temperature`(F).
CREATE STREAM TemperatureStream (sensorId string, temperature double);

@info(name = 'SimpleIfElseQuery')
insert into ValidTemperatureStream
select sensorId,
-- if `temperature` > -2, `isValid` will be `true` else `false` 
	ifThenElse(temperature > -2, 'Valid', 'InValid') as isValid 
from TemperatureStream;

@info(name = 'ComplexIfElseQuery') 
insert into ProcessedTemperatureStream
select sensorId, 
-- If the `temperature` > 40 the status is set to `High`, between -2 and 40 as `Normal` & less than -2 as `InValid` 
	ifThenElse(temperature > -2, 
		ifThenElse(temperature > 40, 'High', 'Normal'), 
		'InValid') 
	as tempStatus
from TemperatureStream	;
```

### Events at each stream

When an event with values [`'sensor1'`, `35.4`] is sent to TemperatureStream stream it will get converted and travel through the streams as below.

* ValidTemperatureStream : [`'sensor1'`, `'Valid'`]
* ProcessedTemperatureStream : [`'sensor1'`, `'Normal'`]

## Regex Matching

This example demonstrates event cleansing using regex expressions.

```
-- Defines `SweetProductionStream` having information of `name` and `amount`
define stream SweetProductionStream (name string, amount int);

@info(name='ProcessSweetProductionStream')
insert into ChocolateProductStream
select name, 
-- Matches if `name` begins with the word 'chocolate'
   regex:matches('chocolate(.*)', name) as isAChocolateProduct, 
-- Captures the `sweetType` of the sweet following the flavour in `name`
   regex:group('.*\s(.*)', name, 1) as sweetType
from SweetProductionStream;
```

### Input

Below event is sent to `SweetProductionStream`, 

[`'chocolate cake'`, `34`]


### Output

After processing, the event arriving at `ChocolateProductStream` will be as follows:

[`'chocolate cake'`, `true`, `'cake'`]


## Default

This example shows how to use `default` function to process attributes with `null` values.


```
-- Defines `PatientRegistrationInputStream` having information in all primitive types.
CREATE STREAM PatientRegistrationInputStream (
                 seqNo long, name string, age int,
                 height float, weight double, photo object,
                 isEmployee bool, wardNo object);


@info(name = 'SimpleIfElseQuery')
insert into PreprocessedPatientRegistrationInputStream
select 
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

from PatientRegistrationInputStream;
```

### Input

An event of all `null` attributes is sent to `PatientRegistrationInputStream`,


### Output

After processing, the event arriving at `PreprocessedPatientRegistrationInputStream` will be as follows, 

[`'invalid'`, `0` `0.0`, `0`, `0.0`]

with types,

[`string`, `long`, `double`, `int`, `float`]


## Type based Filtering

This example shows filter-out events based on data `type` of the attribute.


```
-- Defines `SweetProductionStream` having information of `name` and `amount`
CREATE STREAM SweetProductionStream (name string, amount int);

@info(name='ProcessSweetProductionStream')
insert into ProcessedSweetProductionStream
select 
-- `true` if `amount` is of `int` type
   instanceOfInteger(amount) as isAIntInstance,
    name, 
    amount
from SweetProductionStream;
```

### Input

Below event is sent to `SweetProductionStream`, 

[`'chocolate cake'`, `'invalid'`]

### Output

After processing, the event arriving at `ProcessedSweetProductionStream` will be as follows:

[`false`, `'chocolate cake'`, `'invalid'`]

## Remove Duplicate Events

Provides examples of removing `duplicate` events that arrive within a given time duration.

### Example

```
CREATE STREAM TemperatureStream (sensorId string, seqNo string, temperature double);

@info(name = 'Deduplicate-sensorId')
-- Remove duplicate events arriving within `1 minute` time gap, based on unique `sensorId`.
insert into UniqueSensorStream
select *
from TemperatureStream#unique:deduplicate(sensorId, 1 min);

@info(name = 'Deduplicate-sensorId-and-seqNo')
-- Remove duplicate events arriving within `1 minute` time gap, based on unique `sensorId` and `seqNo` combination.
insert into UniqueSensorStream
select *
from TemperatureStream#unique:deduplicate(str:concat(sensorId,'-',seqNo), 1 min)
insert into UniqueSensorSeqNoStream;
```

### Behavior

When events are sent to `TemperatureStream` stream, following events will get emitted after deduplication on `UniqueSensorStream` stream via `Deduplicate-sensorId` query, and `UniqueSensorSeqNoStream` stream via `Deduplicate-sensorId-and-seqNo` query.


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
