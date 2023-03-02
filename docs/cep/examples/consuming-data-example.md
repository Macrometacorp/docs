---
title: Consuming Data Example
---

## Stream Worker for Consuming Data

Following are the steps to create a stream worker:

1. Open the Stream Apps editor in the GUI.

1. Click **New** to define a new stream worker.

1. Enter a **Name** for the stream worker. For example `SalesTotalsApp`.

1. Enter a **Description**.

1. Define an input stream to define the schema based on which input events are selected to the streaming integrator flow as follows.

    ```sql
	CREATE STREAM <Stream_Name> (attribute1_name attribute1_type, attribute2_name attribute2_type, ...)
    ```

	For example:

    ```sql
    CREATE STREAM ConsumerSalesTotalsStream (transNo int, product string, price int, quantity int, salesValue long)
    ```

1. Connect a source to the input stream you added as follows.

    ```sql
	CREATE SOURCE <Stream_Name> WITH (type='SOURCE_TYPE') (attribute1_name attribute1_type, attribute2_name attribute2_type, ...);
    ```

    For example:

    ```sql
	CREATE SOURCE ConsumerSalesTotalsStream WITH (type='stream') (transNo int, product string, price int, quantity int, salesValue long);
    ```

1. Configure parameters for the source you added. For example, you can specify the collection name for the stream source in the example used.

    ```sql
	CREATE SOURCE ConsumerSalesTotalsStream WITH (type='stream', stream.list='SalesTotalsEP') (transNo int, product string, price int, quantity int, salesValue long);
    ```

1. Add an `@map` annotation to the source configuration as shown below.

    ```sql
	CREATE SOURCE <Stream_Name> WITH (type='SOURCE_TYPE', PARAMETER1_NAME='PARAMETER1_VALUE', map.type='MAP_TYPE') (attribute1_name attribute1_type, attribute2_name attribute2_type, ...);
    ```

    For example:

    ```sql
    CREATE SOURCE ConsumerSalesTotalsStream WITH (type='stream', stream.list='SalesTotalsEP', map.type='json') (transNo int, product string, price int, quantity int, salesValue long);
    ```

    :::info
    Mapping is explained in detail in the [Consuming a message in default format](#consume-messages-in-default-format) and [Consuming a message in custom format](#consume-messages-in-custom-format) sections. However, note that you need to add a mapping type to complete a source configuration. If no mapping type i specified, an error is indicated.
    :::

1. To query a stream, specify how the output is derived and the name of an output stream to which this output is directed.

    ```sql
    insert into <OUTPUT_STREAM_NAME>
    select <ATTRIBUTE1_Name>, <ATTRIBUTE2_NAME>, ... 
    from <INPUT_STREAM_NAME>
    group by <ATTRIBUTE_NAME>;
    ```

    For example:

    ```sql
    insert into PublishSalesTotalsStream
    select *
    from ConsumerSalesTotalsStream
    group by productinsert into PublishSalesTotalsStream;
    ```

1. Complete the stream worker by defining an output stream with a connected sink configuration.

    :::tip
    In the example used, you can define the `PublishSalesTotals` stream that you already specified as the output stream in the query, and connect a `stream` sink to it as follows. Publishing the output is explained in detail in the [Publishing Data guide](publishing-data.md).
    :::

    ```sql
	CREATE SOURCE PublishSalesTotalsStream WITH (type='stream', stream='SalesTotals', replication.type='local') (transNo int, product string, price int, quantity int, salesValue long);
    ```

1. Save the Stream Worker. The completed application is as follows:

```sql
@App:name("SalesTotalsApp")
@App:qlVersion("2")
@App:description("Description of the plan")

CREATE SOURCE ConsumerSalesTotalsStream WITH (type='stream', stream.list='SalesTotalsEP', map.type='json', stream.type='local') (transNo int, product string, price int, quantity int, salesValue long);

CREATE SOURCE PublishSalesTotalsStream WITH (type='stream', stream.list='SalesTotals', map.type='json', replication.type='local') (transNo int, product string, price int, quantity int, salesValue long);

-- CREATE STREAM TO CONSUME DATA (OPTIONAL, USED FOR TESTING)
-- CREATE SINK STREAM ConsumerSales (transNo int, product string, price int, quantity int, salesValue long);

-- TRANSFERS DATA BETWEEN SOURCES
INSERT INTO PublishSalesTotalsStream
SELECT *
FROM ConsumerSalesTotalsStream
GROUP BY product;

-- SENDS DATA TO A STREAM (OPTIONAL, USED FOR TESTING)
-- INSERT INTO ConsumerSales
-- SELECT *
-- FROM PublishSalesTotalsStream;
```