---
sidebar_position: 20
title: Messages
---

Messages are the basic unit of GDN streams. Producers publish messages to streams, and consumers then consume them streams and acknowledge when the message has been processed.

|Component | Purpose|
|---------|--------|
| Value / data payload | The data carried by the message. All GDN stream messages carry raw bytes, although message data can also conform to data schemas in the future. |
| Key | Messages can optionally be tagged with keys, which can be useful for things like stream compaction. |
| Properties | An optional key-value map of user-defined properties. |
| Producer name | The name of the producer that produced the message. Producers are automatically given default names, but you can apply your own explicitly as well. |
| Sequence ID | Each GDN stream message belongs to an ordered sequence on its stream. A message's sequence ID is its ordering in that sequence. |
| Publish time | The timestamp of when the message was published, automatically applied by the producer. |
| Event time | An optional timestamp that applications can attach to the message representing when something happened, such as when the message was processed. The event time of a message is 0 if none is explicitly set. |

## Stream as Message Queue

Message queues are essential components of many large-scale data architectures. If every single work object that passes through your system absolutely _must_ be processed in spite of the slowness or downright failure of this or that system component, then there's a good chance that you'll need a message queue to step in and ensure that unprocessed data is retained---with correct ordering---until the required actions are taken.

### Benefits of Using GDN Streams as a Message Queue

GDN Streams is a great choice for a message queue because:

- It was built with persistent storage in mind.
- It offers automatic load balancing across consumers for messages on a stream.
- You can use the same GDN stream to act as a real-time message bus and as a message queue, or just one or the other.
- You can set aside some streams for real-time purposes and other streams for message queue purposes, or use specific GeoFabrics for either purpose.

### Client Configuration Changes

To use a stream as a message queue, you should distribute the receiver load on that topic across several consumers. The optimal number of consumers will depend on the load.

Consumer settings:

- Establish a [shared subscription](subscriptions.md#shared) and use the same subscription name as the other consumers. Otherwise the subscription is not shared, and the consumers can't act as a processing ensemble.
- If you want to have tight control over message dispatching across consumers, then set the consumers' **receiver queue** size very low (potentially even to 0 if necessary).

Each stream has a receiver queue that determines how many messages the consumer will attempt to fetch at a time. A receiver queue of 1,000 (the default), for example, means that the consumer will attempt to process 1,000 messages from the stream's backlog upon connection. Setting the receiver queue to zero essentially means ensuring that each consumer is only doing one thing at a time.

The downside to restricting the receiver queue size of consumers is that that limits the potential throughput of those consumers. Whether the performance/control trade-off is worthwhile will depend on your use case.

## Message Retention and Expiry

By default, GDN does the following:

- Immediately deletes all messages that have been acknowledged by a consumer.
- Persistently stores all unacknowledged messages in a message backlog for up to three days.

GDN streams has two features, however, that enable you to override this default behavior:

- Message _retention_ allows you to store messages that have been acknowledged by a consumer.
- Message _expiry_ allows you to set a time to live (TTL) for messages that have not yet been acknowledged.

:::note
All message retention and expiry is managed at the geofabric level.
:::

The diagram below illustrates both concepts:

![stream-retention-expiry](/img/stream-retention-expiry.png)

With message retention, shown at the top, a retention policy applied to all streams in a database dictates that some messages are durably stored in GDN even though they've already been acknowledged. Acknowledged messages that are not covered by the retention policy are deleted. Without a retention policy, all of the acknowledged messages would be deleted.

With message expiry, shown at the bottom, some messages are deleted, even though they haven't been acknowledged, because they've expired according to the TTL applied to the namespace. For example, because a TTL of five minutes has been applied and the messages haven't been acknowledged but are 10 minutes old.
