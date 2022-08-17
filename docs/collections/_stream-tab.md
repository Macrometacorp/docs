Each collection in Macrometa GDN can be a stream. Collection streams use the WebSocket protocol to emit event messages for operations performed on the collection.

The Stream tab is only displayed if streams are enabled on that collection.

For more information about streams, refer to [Streams](../streams/index.md) and [Stream Workers](../cep/index.md).

## View a collection stream

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **COLLECTIONS**.
1. Click the collection for which you want to view the stream.
1. Click **Stream**. If the Stream tab is not visible, then streams are not enabled on the collection.

## Stream Fields

You can access the following information on the Stream tab.

- **Msg Rate In -** Rate of data packets received per second.
- **Msg Rate Out -** Rate of data packets sent per second.
- **Msg Throughput In/Out -** Throughput or the amount of data passing through the pipeline per second.
- **Average Msg Size -** Size of an average data packet in KB.
- **Storage Size -** Total storage size in KB.
- **Stream -** Name of the enabled stream for collection (same as collection name).
- **Replication -** Local or Global. Only local streams are selected for collection streams.
- **Type -** Stream type for collections-enabled stream.
- **Region -** The region in which the collection was created.
- **WebSocket URL -** Weblink of the stream’s API.
- **Latest Message -** Click to update the stream to the latest messages.
