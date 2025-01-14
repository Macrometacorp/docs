---
sidebar_position: 50
title: Error Handling with Tables
---

When performing insert, delete, or update operations on tables, any errors that occur can be directed to a fault stream specific to that table. This is achieved by setting `OnError.action='<action'` and `on.error='STREAM'` within the table definition.

The following actions are supported for error handling at tables:

- `stream` - Forward the error and the event to fault stream. The fault stream, indicated as `!<TableName>`, automatically includes the table's attributes and an `_error` object containing the error details.
- `wait` - Wait for some time (i.e. 5 seconds) and then retry.

## Fault Stream for Tables

Apply the `OnError.action` and o`n.error='STREAM'` properties to a table to handle errors.

```sql
CREATE STORE <table name> WITH (type='database', replication.type="global", collection.type="doc", OnError.action='<action>', on.error='STREAM') (<attribute name> <attribute type>, ...);
```

## Sample: Error Handling in Table Operations

```sql
@App:name("test-db")
@App:qlVersion('2')
CREATE TRIGGER MyTrigger WITH ( interval = 5 sec );

CREATE STORE SampleTable WITH (
    type='database', 
    replication.type="global", 
    collection.type="doc", 
    OnError.action='STREAM', 
    on.error='STREAM'
) (status string, count long, time long);

-- Stream for persisting errors from SampleTable
CREATE SINK SampleTableErrorStream WITH (
    type='stream', 
    stream='ErrorStream', 
    map.type='json'
) (status string, count long, time long, error string);

-- Source to capture error events from the error stream
CREATE SOURCE ErrorStream WITH (
    type='stream', 
    stream.list='ErrorStream', 
    map.type='json', 
    map.attributes.evt = "$"
) (evt string);

-- Table to store error details
CREATE TABLE ErrorTable (event object, error object);

-- Logic to insert into SampleTable
INSERT INTO SampleTable
SELECT "Pass" as status, count() as count, eventTimestamp() as time
FROM MyTrigger;

-- Logic to persist errors into the error stream
INSERT INTO SampleTableErrorStream
SELECT status, count, time, convert(_error, 'string') as error
FROM !SampleTable;

-- Logic to insert error details into ErrorTable
INSERT INTO ErrorTable
SELECT map:remove(map:createFromJSON(evt), 'error') as event, json:getObject(evt,'$.error') as error 
FROM ErrorStream;
```

In this sample, the `OnError.action='STREAM'` and `on.error='STREAM'` directives are used to manage errors during table operations. When the `SampleTable` experiences an error (such as from a delete operation), an error event is generated and directed to the `ErrorStream`, which is then processed and stored in the `ErrorTable`.
