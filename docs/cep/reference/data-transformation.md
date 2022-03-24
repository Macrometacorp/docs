---
sidebar_position: 5
---

# Transforming Data

## Math & Logical Operations

This example shows the use of math or logical operations on events.

```sql
CREATE STREAM TemperatureStream (sensorId string, temperature double);

@info(name = 'celciusTemperature')

-- Converts Celsius value into Fahrenheit.
insert into FahrenheitTemperatureStream
select sensorId, (temperature * 9 / 5) + 32 as temperature
from TemperatureStream;


@info(name = 'Overall-analysis')
-- Calculate approximated temperature to the first digit 
insert all events into OverallTemperatureStream
select sensorId, math:floor(temperature) as approximateTemp 
from FahrenheitTemperatureStream;

@info(name = 'RangeFilter') 
-- Filter out events where `-2 < approximateTemp < 40`
insert into NormalTemperatureStream
select *
from OverallTemperatureStream[ approximateTemp > -2 and approximateTemp < 40];
```

### Input

Below event is sent to `TemperatureStream`,

[`'SensorId'`, `-17`]

### Output

After processing, the following events will be arriving at each stream:

* FahrenheitTemperatureStream: [`'SensorId'`, `1.4`]
* OverallTemperatureStream: [`'SensorId'`, `1.0`]
* NormalTemperatureStream: [`'SensorId'`, `1.0`]

## Transform JSON

This example shows transforming JSON objects within a stream application.

```sql
CREATE STREAM InputStream(jsonString string);

-- Transforms JSON string to JSON object which can then be manipulated
insert into PersonalDetails
select json:toObject(jsonString) as jsonObj 
from InputStream ;

insert into OutputStream
select jsonObj, 
-- Get the `name` element(string) form the JSON
    json:getString(jsonObj,'$.name') as name,

-- Validate if `salary` element is available
    json:isExists(jsonObj, '$.salary') as isSalaryAvailable,

-- Stringify the JSON object
    json:toString(jsonObj) as jsonString
from PersonalDetails;


-- Set `salary` element to `0` is not available 
insert into PreprocessedStream
select json:setElement(jsonObj, '$', 0f, 'salary') as jsonObj
from OutputStream[isSalaryAvailable == false];
```

### Input

Below event is sent to `InputStream`,

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

### Output

After processing, the following events will be arriving:

* OutputStream:

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

* PreprocessedStream:

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