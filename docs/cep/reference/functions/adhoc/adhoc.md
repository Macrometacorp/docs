---
title: Ad Hoc Queries
---

Ad hoc queries provide a way of performing ad-hoc operations on tables (stores), named windows, and named aggregations. We can send ad hoc queries and fetch data from stores and named windows.



## Syntax

Ad hoc queries use the following syntax:

```js
	select * from SampleAdhocQueryInputTableOneMinTimeWindow;
	
	SELECT * FROM SampleAdhocQueryTable;
```				  
					  


## Example


```js
-- Defines `SampleAdhocQueryInputTable` collection to process events having `sensorId` and `temperature`(F).
CREATE SOURCE SampleAdhocQueryInputTable WITH(type = 'database', collection = "SampleAdhocQueryInputTable", collection.type="doc" , replication.type="global", map.type='json') (sensorId string, temperature double);

-- Named Window
CREATE WINDOW SampleAdhocQueryInputTableOneMinTimeWindow (sensorId string, temperature double) SLIDING_TIME(1 min);

-- Table
CREATE TABLE SampleAdhocQuerySensorA1234DestTable(sensorId string, temperature double);

@info(name = 'Insert-to-window')
INSERT INTO SampleAdhocQueryInputTableOneMinTimeWindow
SELECT *
FROM SampleAdhocQueryInputTable;

@info(name = 'EqualsFilter')
-- Note: Filter out events with `sensorId` equalling `sensor A1234`
INSERT INTO SampleAdhocQuerySensorA1234DestTable
SELECT *
FROM SampleAdhocQueryInputTable
WHERE sensorId == 'sensor A1234';
```


1. Upload following data into `SampleAdhocQueryInputTable` C8DB Collection
	{"sensorId":"sensor A1234","temperature":18}
	{"sensorId":"sensor A1234","temperature":-32.2}
	{"sensorId":"sensor FR45","temperature":20.9}
	{"sensorId":"sensor meter1","temperature":49.6}

2. This application accumulates all the data for one minute in the named window `SampleAdhocQueryInputTableOneMinTimeWindow`
	Named window allows other application to query data in realtime.

3. Run the ad hoc query on the `SampleAdhocQueryInputTableOneMinTimeWindow` 
	Query:
		select * from SampleAdhocQueryInputTableOneMinTimeWindow

	Output:
		[
			["sensor A1234",18],
			["sensor A1234",-32.2],
			["sensor FR45",20.9],
			["sensor meter1",49.6]
		]

4. Similar to Named Windows one can run adhoc queries on the stores as well. Running adhoc query on 
	`SampleAdhocQuerySensorA1234DestTable` Collection should produce below result

	Query: Store the result if sensorId is equal to "sensor A1234"
		SELECT * FROM SampleAdhocQuerySensorA1234DestTable

	Output:
		[
			["sensor A1234",18],
			["sensor A1234",-32.2]
		]