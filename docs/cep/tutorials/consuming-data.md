---
sidebar_position: 3
---

# Consuming Data

Typically the first step  in a stream processing flow is to consume the data to be cleaned, enriched, transformed or summarized to produce the required output.

For the stream processor to consume events, the following is required.

- Message schema: To identify the messages to select for stream processing. The schema of the messages is defined via a _stream_.

- Source: The messages are consumed from different sources including streaming applications, cloud-based applications, databases, and files. The source is defined via a _source configuration_.

A source configuration consists of the following:
  
- `source.type`: This annotation defines the source type via which the messages are consumed, and allows you to configure the source parameters (which change depending on the source type). For the complete list of supported source types, see [Sources](../source/index.md).

- `map.type`: This annotation specifies the format in which messages are consumed, and allows you to configure the mapping parameters (which change based of the mapping type/format selected). For the complete list of supported mapping types, see [Source Mapping](../source/source-mapping/index.md).

- `attributes`: This annotation specifies a custom mapping based on which events to be selected into the stream processing flow are identified. This is useful when the attributes of the incoming messages you want the stream processor to consume are different to the corresponding attribute name in the stream definition.

:::tip
Say the stream processor is reading employee records. The employee name might be defined as `emp No` in the source from which you are extracting the records. However, the corresponding attribute name in the stream definition is `employeeNo` because that is how you want to refer to the attribute in the stream processor. In this instance, you need a custom mapping to indicate that `emp No` is the same as `employeeNo`.
:::

:::note
Stream processors are a combination of stream functions and windows. Stream processors are more advanced than stream functions as they can retain and arbitrarily emit events, and they are more advanced than windows because they can add additional attributes to the events. Stream processors help to achieve complex execution logics that cannot be achieved by other constructs such as functions, aggregate functions, stream functions, and windows.
:::

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

    ```js
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

1. Publish the stream worker to one or more regions via GUI/REST API.

## Supported message formats

### Consume messages in default format

Stream processor consumes a message in the default format when it makes no changes to the names of the attributes of the message schema before it processes the message. To understand how messages are consumed in default format, follow the procedure below.

1. Create a stream worker with a source configuration following the instructions in the above subsection.

2. In the source configuration, make sure that an `@map` annotation is included with the mapping type as shown below.

    ```sql
	CREATE SOURCE <Stream_Name> WITH (type='SOURCE_TYPE', PARAMETER1_NAME='PARAMETER1_VALUE', map.type='MAP_TYPE') (attribute1_name attribute1_type, attribute2_name attribute2_type, ...);
    ```

    The map type specifies the format in which the messages are received.  For example:

    ```sql
	CREATE SOURCE ConsumerSalesTotalsStream WITH (type='http', map.type='json', map.attributes.transNo = '$.transaction', map.attributes.product = 'product', map.attributes.quantity = 'quantity', map.attributes.salesValue = '$.sales', map.attributes.price = 'price') (transNo int, product string, price int, quantity int, salesValue long);
    ```

3. Save the stream worker. If you save the stream worker that was created using the example configurations, the completed stream worker is as follows.

    ```js
    @App:name("SalesTotalsApp")
    @App:qlVersion("2")
    @App:description("Description of the plan")

    CREATE SOURCE ConsumerSalesTotalsStream WITH (type='http', map.type='json', map.attributes.transNo = '$.transaction', map.attributes.product = 'product', map.attributes.quantity = 'quantity', map.attributes.salesValue = '$.salesValue', map.attributes.price = 'price') (transNo int, product string, price int, quantity int, salesValue long);

    CREATE SINK STREAM SalesTotals (product string, totalSale long);

    insert into SalesTotals
    select product, sum(salesValue) as totalSale
    from ConsumerSalesTotalsStream WINDOW SLIDING_TIME(1 min)
    group by product;
    ```

4. To check whether the above stream worker works as expected, publish some messages. For example, a stream using JSON can produce output such as:

    ```json
    {
        "transNo": 1,
        "product": "DDT",
        "price": 100,
        "quantity": 100,
        "salesValue": 10000
    }
    ```

### Consume messages in custom format

Stream processor consumes a message in the custom format when it makes changes to the names of the attributes of the message schema before it processes the message. To understand how messages are consumed in custom format, follow the procedure below.

:::info
For this section, you can edit the same stream worker that you saved in the [Consume messages in default format](#consume-messages-in-default-format) subsection.
:::

1. Open your stream worker with a source configuration.

2. In the `map.type` annotation within the source configuration, add the `attributes` annotation with mappings for different attributes. This can be done in two ways as shown below.  

    - Defining attributes as keys and mapping content as values in the following format.

        ```sql
		CREATE SOURCE <Stream_Name> WITH (type='SOURCE_TYPE', PARAMETER1_NAME='PARAMETER1_VALUE', map.type='MAP_TYPE', @attributes( attributeN='mapping_N', attribute1='mapping_1')) (attribute1_name attribute1_type, attribute2_name attribute2_type, ...);
        ```

:::tip
In the Stream worker used as an example in the previous section, assume that when receiving events, the `transNo` attribute is received as `transaction` and the `salesValue` attribute is received as `sales`.  The mapping type is JSON. therefore, you can  add the mappings as JSONPath expressions.
:::

| **Stream Attribute Name** | **JSON Event Attribute Name** | **JSONPath Expression** |
|---------------------------|-------------------------------|-------------------------|
| `transNo`                 | `transaction`                 | `$.transaction`         |
| `salesValue`              | `sales`                       | `$.sales`               |
    
The mapping can be defined as follows.
    
    ```sql
    CREATE SOURCE ConsumerSalesTotalsStream WITH (type='http', receiver.url='http://localhost:5005/SalesTotalsEP', map.type='json', @attributes(transNo = '$.transaction', salesValue = '$.sales')) (transNo int, product string, price int, quantity int, salesValue long);
    ```
    
* Defining the mapping content of all attributes in the same order as how the attributes are defined in stream definition.

    ```sql
    CREATE SOURCE <Stream_Name> WITH (type='<SOURCE_TYPE>', <PARAMETER1_NAME>='<PARAMETER1_VALUE>', map.type='MAP_TYPE', @attributes( 'mapping_1', 'mapping_N')) (attribute1_name attribute1_type, attributeN_name attributeN_type, ...);
    ``` 
    
    e.g., If you consider the same example, mapping can be defined as follows.
            
    ```sql
    CREATE SOURCE ConsumerSalesTotalsStream(type='http', receiver.url='http://localhost:5005/SalesTotalsEP', map.type='json', @attributes(transNo = '$.transaction', product = product, price = price, quantity = quantity, salesValue = '$.sales')) (transNo int, product string, price int, quantity int, salesValue long);
    ```
