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

## Table

Table is similar to collection, is a structured representation of data with a defined schema.

Syntax:

```sql
   CREATE TABLE GLOBAL TableName(property type);
```
Example:
```sql
   CREATE TABLE GLOBAL SweetProductionCollection(name string, amount double);
```

Or equivalent using STORE:
```sql
   CREATE STORE SweetProductionCollection WITH (type="database", collection="SweetProductionCollection", replication.type="global", collection.type="DOC", map.type='json') (name string, amount double);
```

The stream worker will use the Macrometa collections with the default query parameters explained in the chart below.

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
<td>This specifies the name of the collection to which events must written.</td>
<td></td>
<td>STRING</td>
<td>No</td>
</tr>
<tr class="even">
<td>replication.type</td>
<td>Specifies if the replication type of the collection. <b>Note:</b> Type must be `global`. Local collections are not currently allowed.</td>
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


## Source, Sink, Table and Window: Understanding with the help of a Stream Worker example


In the application below, a Macrometa document-based collection plays role of `source` to our SW IntrusionDetectionSystem.
Consider InboundTrafficData as an audit collection where client IPs are added as they make requests to the server.
As a new record is added, an event is emitted by collection streams associated with this collection. This event is consumed by the `source` InboundTraffic.

It is quite possible that your application, `IntrusionDetectionSystem`, might get burst of events having the same IP, and you need to gauge  
Windows store events as and when they arrive and automatically expire/clean them based on the given window constraint.

In our IntrusionDetectionSystem application, we have associated a `sliding window` of two seconds on incoming events. The window will hold all the events that appear
within two seconds. Further Stream QL is grouping all the events by IP and if the count on any of these groups is more than 50, i.e., more than 50 events occurred
from the same IP within two seconds, then we can assume this is suspicious traffic. 


In addition to the window, we have a `Table` which serves reference data for our application.  A table is a stored collection of events, and its schema is defined via the table definition. Unlike `stream`, `table` is stateful and supports interactive queries for the state of the stored events. In our case `SuspiciousIPTable` stores pre-defined suspicious IPs which we are using to verify if it matches IPs in suspicious traffic.

If they match, then we raise an alarm by adding an event to a `sink`. Sink is an abstraction for an egress event, which serves as an output for the stream worker,
convert them to various data formats, and publish them to a stream or external endpoints like HTTP/REST ,database, log, JMS, email, or as in this case, a Macrometa stream.
  

```
@App:name("IntrusionDetectionSystem")
@App:description('The Stream application subscribes to collection InboundTraffic and check for suspicious inbound traffic')
@App:qlVersion('2')

/**
The source stream InboundTraffic is proving ip hits in a server
if the same ip is hitting more than 50 times within 2 seconds, consider it as suspicious trffic
add raise an alarm if same IP matches in our SuspiciousIPTable.

Testing the Stream Application:

    1. Create the collection `InboundTrafficData` of type document;
    
    2. Create a Table SuspiciousIPTable with entries for suspicious IPs 
    
    3. Run the stream app;

    4. Check the sink stream `Alarm` . The data should be available here.

*/

-- Event stores
CREATE SOURCE InboundTraffic WITH (type = 'database', collection = "InboundTrafficData", collection.type="doc" , replication.type="global", map.type='json') (ip string);

CREATE TABLE  SuspiciousIPTable (blocked_ip string);

CREATE SINK STREAM Alarm (ip string, requestCount long , incidentTime long);


INSERT INTO Alarm
SELECT ip, count(ip) as requestCount, currentTimeMillis() as incidentTime
FROM InboundTraffic WINDOW SLIDING_TIME(2 sec) as IT
JOIN SuspiciousIPTable as SIP
ON  IT.ip == SIP.blocked_ip
group by ip
having requestCount > 50 ;
```
