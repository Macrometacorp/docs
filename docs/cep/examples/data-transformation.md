---
sidebar_position: 50
title: Data Transformation Examples
---

This page explains ways to transform your data.

The stream processor allows you to perform a wide range of transformations to the input data received. The transformations are carried out via operators that are defined inline within the stream worker.

## Transform Data using Operators

The operators that you can configure inline within stream workers in order to carry out data transformations are listed in the [Stream Query Guide](../query-guide/).

To show how an inline operators are configured, consider an example where readings from a sensor that indicates  the temperature of a room every second are transformed to indicate the average temperature and the average humidity as at each second.

```sql
@App:name("TemperatureApp")
@App:description("Calculate an average temperature of the room")
@App:qlVersion("2")

-- Define the input stream. Each event indicates the device ID, the room number, and the temperature.
CREATE STREAM TempStream (deviceID long, roomNo int, temp double);

-- Define the output stream that will receive the average temperature of each incoming message in the TempStream.
CREATE SINK OutputStream WITH (type='stream', stream='OutputStream', map.type='json') (roomNo int, avgTemp double);

-- Calculate average temp, group by room number, and insert into OutputStream.
INSERT INTO OutputStream
SELECT roomNo, avg(temp) AS avgTemp
FROM TempStream
GROUP BY roomNo;
```

## Math and Logical Operations

This example shows the use of math or logical operations on events.

```sql
@App:name("DataTransformation")
@App:qlVersion("2")

CREATE STREAM TemperatureStream (sensorId string, temperature double);

CREATE SINK FilteredResultsStream WITH (type='stream', stream='FilteredResultsStream', map.type='json')(sensorId string, approximateTemp double);

@info(name = 'celsiusTemperature')

-- Converts Celsius value into Fahrenheit
INSERT INTO FahrenheitTemperatureStream
SELECT sensorId, (temperature * 9 / 5) + 32 AS temperature
FROM TemperatureStream;


@info(name = 'Overall-analysis')
-- Calculate approximated temperature to the first digit 
INSERT INTO events into OverallTemperatureStream
SELECT sensorId, math:floor(temperature) AS approximateTemp 
FROM FahrenheitTemperatureStream;

@info(name = 'RangeFilter') 
-- Filter out events where `-2 < approximateTemp < 40`
INSERT INTO FilteredResultsStream
SELECT *
FROM OverallTemperatureStream[ approximateTemp > -2 and approximateTemp < 40];
```

### Input

Below event is sent to `TemperatureStream`:

[`'SensorId'`, `-17`]

### Output

After processing, the following events arrive at each stream:

- FahrenheitTemperatureStream: [`'SensorId'`, `1.4`]
- OverallTemperatureStream: [`'SensorId'`, `1.0`]
- NormalTemperatureStream: [`'SensorId'`, `1.0`]

## Transform JSON

This example shows transforming JSON objects within a stream worker.

```sql
CREATE STREAM InputStream(jsonString string);

-- Transforms JSON string to JSON object that can then be manipulated
INSERT INTO PersonalDetails
SELECT json:toObject(jsonString) AS jsonObj 
FROM InputStream;

INSERT INTO OutputStream
SELECT jsonObj, 
-- Get the `name` element(string) form the JSON
    json:getString(jsonObj,'$.name') AS name,

-- Validate if `salary` element is available
    json:isExists(jsonObj, '$.salary') AS isSalaryAvailable,

-- Stringify the JSON object
    json:toString(jsonObj) AS jsonString
FROM PersonalDetails;


-- Set `salary` element to `0` is not available 
INSERT INTO PreprocessedStream
SELECT json:setElement(jsonObj, '$', 0f, 'salary') AS jsonObj
FROM OutputStream[isSalaryAvailable == false];
```

### Transform JSON Input

Below event is sent to `InputStream`:

```json
[
    {
        "name" : "streamapp.user",
        "address" : {
            "country": "USA"
        },
        "contact": "+9xxxxxxxx"
    }
]
```

### Transform JSON Output

After processing, the following events arrive:

- OutputStream:

```json
[ 
    {
        "address": {
            "country":"USA"
        },
        "contact":"+9xxxxxxxx",
        "name":"streamapp.user"
    }
]
```

- PreprocessedStream:

```json
[
    {
        "name" : "streamapp.user",
        "salary": 0.0,
        "address" : {
            "country": "USA"
        },
        "contact": "+9xxxxxxxx"
    }
]
```
