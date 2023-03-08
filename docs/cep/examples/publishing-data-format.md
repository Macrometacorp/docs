---
title: Publishing Data in Different Formats
---

This page shows you examples of different ways to map stream worker messages to change how messages are published.

## Publishing data in default format

Stream processor publishes events in default format when it does not make any changes to the attribute names in the output stream before publishing. To understand how this is done, follow the procedure below:

1. Create a stream application with a sink configuration following the instructions in the [Defining event sink in the Stream application](#defining-event-sink-in-the-stream-application) section.

2. Add a `map.type` annotation with the mapping type to the sink configuration as shown below.

    ```sql
	CREATE SINK <Sink_Name> WITH (type='<SINK_TYPE>', map.type='MAP_TYPE') (attribute1_name attribute1_type, attribute2_name attribute2_type, ...);
    ```

    The map type specifies the format in which the events are published. e.g., In the example that you used, you can
    specify the output logs to be printed in the text format by specifying `text` as the mapping type.

    ```sql
	CREATE SINK PublishSalesTotalsStream WITH (type='stream', stream.list='Sales Totals', map.type=text) (transNo int, product string, price int, quantity int, salesValue long);
    ```

3. Save the stream application. If you save the stream application that was created using the example configurations,
the completed stream application is as follows.

```sql
@App:name("SalesTotalsApp")
@App:description("Description of the plan")
@App:qlVersion("2")

CREATE SOURCE ConsumerSalesTotalsStream WITH (type='database', collection.name='SalesTotalsEP', map.type='json') (transNo int, product string, price int, quantity int, salesValue long);

CREATE SINK PublishSalesTotalsStream WITH (type='stream', stream.list='Sales Totals', map.type=text) (transNo int, product string, price int, quantity int, salesValue long);

select transNo, product, price, quantity, salesValue
from ConsumerSalesTotalsStream
group by product
insert into PublishSalesTotalsStream;
```

### Publishing data in custom format

Stream processor publishes data in the custom format when it makes changes to the attribute names in the output stream before publishing. To understand how this is done, follow the procedure below:

:::info
In this section, you can update the same stream application that you saved in the [Publishing data in default format](#publishing-a-message-in-default-format) section.
:::

1. Open your stream application with a sink configuration.

2. Within the `map.type` annotation of the sink configuration, add a `map.payload` annotation. There are two ways to configure this:

    - Some mappers such as `json` and `text` accept only one output payload using the following format:

        ```js
        map.payload="<PAYLOAD>"
        ```

        e.g., In the example, the mapping type is `text`. Therefore, you can add a message to be printed with the output by configuring the `map.payload` annotation as follows.

        ```js
       map.payload="This is a test message from {{user}}."
        ```

    - Some mappers such as `key-value` accept series of mapping values defined as follows:

        ```js
        map.payload="key1='mapping_1', 'key2'='user : {{user}}'"
        ```

3. Save the stream application.