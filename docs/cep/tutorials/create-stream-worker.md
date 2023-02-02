---
sidebar_position: 2
title: Create Stream Workers
---

Stream workers are declarative specs that define the processing logic to process the events sent to the stream processor. A stream worker definition contains the following configurations:

<table>
<thead>
<tr class="header">
<th>Configuration</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Stream</td>
<td>A logical series of events ordered in time with a uniquely identifiable name, and set of defined attributes with specific data types defining its schema.</td>
</tr>
<tr class="even">
<td>Source</td>
<td>This consumes data from external sources (such as `TCP` , ` Kafka ` , ` HTTP ` , etc) in the form of events, then converts each event (that can be in `JSON` , ` binary` , etc. format) to a stream event, and passes that to a stream for processing.</td>
</tr>
<tr class="odd">
<td>Sink</td>
<td>This takes events arriving at a stream, maps them to a predefined data format (such as `JSON,` `binary` , etc), and publishes them to external endpoints (such as ` E-mail ` , ` TCP ` , ` Kafka ` , `HTTP ` , etc).</td>
</tr>
<tr class="even">
<td>Table</td>
<td>A structured representation of data stored with a defined schema. The tables can be accessed and manipulated at runtime.</td>
</tr>
<tr class="odd">
<td>Executional Element</td>
<td><p>An executional element can be one of the following:</p>
<ul>
<li>Stateless query: Queries that only consider currently incoming events when generating an output. e.g., filters</li>
<li>Stateful query: Queries that consider both currently incoming events as well as past events when generating an output. e.g., windows, sequences, patterns, etc.</li>
<li>Partitions: Collections of stream definitions and queries separated from each other within a stream worker for the purpose of processing events in parallel and in isolation</li>
</ul></td>
</tr>
</tbody>
</table>

Macrometa provide in-build source, sink and store explained in the later section of this document.

## Creating a Stream Worker

To create a stream worker follow the steps below:

1. Open the GUI. Click the **Stream Workers** tab.
1. Click **New Stream Worker** to define a new stream worker.
1. Type a **Name** for the stream worker. For example, `SweetProductionAnalysis`.
1. Type a **Description**.
1. Add the following sample stream worker:

	```sql
	CREATE SOURCE SweetProductionStream WITH (type = 'database', collection='SweetProductionData', collection.type='DOC', replication.type='GLOBAL',  map.type='json') (name string, amount double);
	
	CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json') (name string, amount double);
	
	INSERT INTO ProductionAlertStream
	SELECT *
	FROM SweetProductionStream;
	```

1. Click **Save** to save the stream worker.
1. Select all the regions to deploy your application in.
1. Click **Save**.

## Source

For this example, a source can be of type stream or database. The incoming data is used for processing. A source-of-type database is best if you need to store incoming data. Otherwise, you can use a source-type stream.

### Create Streams

Syntax:

```sql
   CREATE SOURCE SourceName WITH (type="stream", stream.list="STRING", replication.type="STRING", map.type='type') (strings);
```

Example:
```sql
   CREATE SOURCE OrderStream WITH (type="stream", stream.list="OrderStream", replication.type="GLOBAL", map.type='json') (product_id string, quantity int);
```
Stream workers will use the stream with the default query parameters explained in the chart below.

Query Parameters:

<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Default Value</th>
<th>Possible Data Types</th>
<th>Optional</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>stream.list</td>
<td>This specifies the list of streams to which the source must listen. This list can be provided as a set of comma-separated values e.g. `stream_one,stream_two`</td>
<td></td>
<td>STRING</td>
<td>No</td>
</tr>
<tr class="even">
<td>replication.type</td>
<td>Specifies if the replication type of the streams. Possible values can be `local` and `global`</td>
<td>local</td>
<td>STRING</td>
<td>Yes</td>
</tr>
</tbody>
</table>

### Create collections

You can create collections with your stream worker, and store incoming data in it for further processing, the syntax to achieve that is shown below:

Syntax:

```sql
   CREATE SOURCE SourceName WITH (type="database", collection="STRING", replication.type="STRING", collection.type="STRING", map.type='type') (strings);
```


Example:
```sql
   CREATE SOURCE SweetProductionStream WITH (type = 'database', collection='SweetProductionData', collection.type='DOC', replication.type='GLOBAL',  map.type='json') (name string, amount double);
```

Query parameters:

<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Default Value</th>
<th>Possible Data Types</th>
<th>Optional</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>collection</td>
<td>This specifies the name of the collection to which the source must listen.</td>
<td></td>
<td>STRING</td>
<td>No</td>
</tr>
<tr class="even">
<td>replication.type</td>
<td>Specifies if the replication type of the collection. At the moment local collections are not allowed, type must be `global`</td>
<td>local</td>
<td>STRING</td>
<td>No</td>
</tr>
<tr class="odd">
<td>collection.type</td>
<td>This specifies the type of the data collection contains. Possible values can be `doc` and `edge`.</td>
<td>doc</td>
<td>STRING</td>
<td>Yes</td>
</tr>
</tbody>
</table>

## Sink

Sinks are used to publish events to an external source after being processed. Sink consumes events from streams and allows the definition of a schema for the output format. 

### Create streams

Syntax:
```sql
   CREATE SINK SinkName WITH (type="stream", stream="STRING", replication.type="STRING", map.type='type') (strings);
```

Example:
```sql
   CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json') (name string, amount double);
```
Query Parameters:

<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Default Value</th>
<th>Possible Data Types</th>
<th>Optional</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>stream</td>
<td>The streams to which the sink needs to publish events.</td>
<td></td>
<td>STRING</td>
<td>No</td>
</tr>
<tr class="even">
<td>replication.type</td>
<td>Specifies if the replication type of the stream. Possible values can be `local` and `global`</td>
<td>local</td>
<td>STRING</td>
<td>Yes</td>
</tr>
</tbody>
</table>
