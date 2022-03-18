---
sidebar_position: 2
---

# Create Stream Application

## Introduction

Stream applications are declarative specs that define the processing logic to process the events sent to the stream processor. A stream app definition contains the following configurations:

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
<td>This consumes data from external sources (such as `TCP` , ` Kafka ` , ` HTTP ` , etc) in the form of events, then converts each event (that can be in `XML` , `             JSON` , ` binary` , etc. format) to a stream event, and passes that to a stream for processing.</td>
</tr>
<tr class="odd">
<td>Sink</td>
<td>This takes events arriving at a stream, maps them to a predefined data format (such as `  XML ` , `JSON,` `binary` , etc), and publishes them to external endpoints (such as ` E-mail ` , ` TCP ` , ` Kafka ` , `HTTP ` , etc).</td>
</tr>
<tr class="even">
<td>Table</td>
<td>A structured representation of data stored with a defined schema. Stored data can be backed by In-Memory, or external data stores such as RDBMS, MongoDB, etc. The tables can be accessed and manipulated at runtime.</td>
</tr>
<tr class="odd">
<td>Executional Element</td>
<td><p>An executional element can be one of the following:</p>
<ul>
<li>Stateless query: Queries that only consider currently incoming events when generating an output. e.g., filters</li>
<li>Stateful query: Queries that consider both currently incoming events as well as past events when generating an output. e.g., windows, sequences, patterns, etc.</li>
<li>Partitions: Collections of stream definitions and queries separated from each other within a Stream application for the purpose of processing events in parallel and in isolation</li>
</ul></td>
</tr>
</tbody>
</table>

Macrometa provide in-build source, sink and store explained in the later section of this document.

## Creating a Stream Application

To create a stream application follow the steps below:

1. Open the GUI. Click the **Stream Apps** tab.
1. Click **New** to define a new stream application.
1. Type a **Name** for the stream application. For example, `SweetProductionAnalysis`.
1. Type a **Description**.
1. Add the following sample stream application.

```
CREATE SOURCE SweetProductionStream WITH (type = 'database', collection='SweetProductionData', map.type='json') (name string, amount double);

CREATE SINK ProductionAlertStream WITH (type= 'stream', stream='ProductionAlertStream', map.type='json'

INSERT INTO ProductionAlertStream
SELECT *
FROM SweetProductionStream;
```

1. Click `Save` to save the stream app.
1. Select all the regions to deploy your application in.
1. Click on `Save`.

## Source

### C8Streams

Syntax:

	CREATE SOURCE SourceName WITH (type="stream", stream.list="STRING", replication.type="STRING", map.type='type') (strings);


Example:


	CREATE SOURCE OrderStream WITH (type="stream", stream.list="OrderStream", replication.type="local", map.type='json') (product_id string, quantity integer);

Stream application will use the stream with the default query parameters explained in the chart below.

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

### C8DB

Syntax:

	CREATE SOURCE SourceName WITH (type="database", collection="STRING", replication.type="STRING", collection.type="STRING", map.type='type') (strings);


Example:

	CREATE SOURCE SweetProductionStream WITH (type="database", map.type='json') (name string, amount double);

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
<td>collection</td>
<td>This specifies the name of the c8db collection to which the source must listen.</td>
<td></td>
<td>STRING</td>
<td>No</td>
</tr>
<tr class="even">
<td>replication.type</td>
<td>Specifies if the replication type of the c8db collection. Possible values can be `local` and `global`</td>
<td>local</td>
<td>STRING</td>
<td>Yes</td>
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

### C8Streams

Syntax:

	CREATE SINK SinkName WITH (type="stream", stream="STRING", replication.type="STRING", map.type='type') (strings);
    @sink(type="c8streams", stream="<STRING>", replication.type="<STRING>", @map(...)))

Example:
    
	CREATE SINK ProductionAlertStream WITH (type="stream", stream='ProductionAlertStream', map.type='json`) (name string, amount double);


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
<td>The streams to which the C8Stream sink needs to publish events.</td>
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

## Table

### C8DB

Syntax:

	CREATE STORE StoreName WITH (type="database", collection="STRING", replication.type="STRING", collection.type="STRING", map.type='type', from="STRING", to="STRING") (strings);
    

Example:

	CREATE STORE SweetProductionCollection WITH (type="database", collection="SweetProductionCollection", replication.type="local", map.type='json') (strings);

Stream applications will use the c8db with the default query parameters explained in the chart below. 
    
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
<td>This specifies the name of the c8db collection to which events must written.</td>
<td></td>
<td>STRING</td>
<td>No</td>
</tr>
<tr class="even">
<td>replication.type</td>
<td>Specifies if the replication type of the c8db collection. Possible values can be `local` and `global`</td>
<td>local</td>
<td>STRING</td>
<td>Yes</td>
</tr>
<tr class="odd">
<td>collection.type</td>
<td>This specifies the type of the data collection contains. Possible values can be `doc` and `edge`.</td>
<td>doc</td>
<td>STRING</td>
<td>Yes</td>
</tr>
<tr class="even">
<td>from</td>
<td>If `collection.type` is specified as `edge`, this field indicates which field to be considered as a source node of the edge.</td>
<td>_from</td>
<td>STRING</td>
<td>Yes</td>
</tr>
<tr class="odd">
<td>to</td>
<td>If `collection.type` is specified as `edge`, this field indicates which field to be considered as a destination node of the edge.</td>
<td>_to</td>
<td>STRING</td>
<td>Yes</td>
</tr>
</tbody>
</table>

## Tutorials

Following tutorials cover various user scenarios using Macrometa Stream Processing.

* [Publishing Data](publishing-data.md)
* [Consuming Data](consuming-data.md)
* [Filtering Data](filtering-data.md)
* [Transforming Data](transforming-data.md)
* [Enriching Data](enriching-data.md)
* [Executing Scripts](executing-scripts.md)
* [Correlating Data](correlating-data.md)
* [Summarizing Data](summarizing-data.md)


Refer to [Reference](../reference/overview.md) for additional stream processing examples.
