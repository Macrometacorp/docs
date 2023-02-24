---
sidebar_position: 20
title: Messages
---

Messages are the basic unit of GDN streams. Producers publish messages to streams, and consumers process the message and send and acknowledgment. 

A message has the following properties:

- **Value -** The data carried by the message. All GDN stream messages carry raw bytes, although message data can also conform to data schemas in the future.
- **Key -** Messages can optionally be tagged with keys, which can be useful for things like stream compaction.
- **Properties -** An optional key-value map of user-defined properties.
- **Producer name -** The name of the producer that produced the message. Producers are automatically given default names, but you can apply your own explicitly as well.
- **Sequence ID -** Each GDN stream message belongs to an ordered sequence on its stream. A message's sequence ID is its ordering in that sequence.
- **Publish time -** The timestamp of when the message was published, automatically applied by the producer.
- **Event time -** An optional timestamp that applications can attach to the message representing when something happened, such as when the message was processed. The event time of a message is 0 if none is explicitly set.

By default, GDN does the following:

- Deletes all messages that have been acknowledged by a consumer.
- Stores all unacknowledged messages in a message backlog for up to three days.

GDN streams has two features, however, that enable you to override this default behavior:

- Message _retention_ allows you to store messages that have been acknowledged by a consumer.
- Message _expiration_ allows you to set a time to live (TTL) for messages that have not yet been acknowledged.

All message retention and expiration is managed at the geofabric level. You can also add a [message queue](./message-queues/) to a specific stream limit the number of messages in the backlog.

The following diagram illustrates both concepts:

![stream-retention-expiry](/img/stream-retention-expiry.png)

:::note
Contact support@macrometa.com if you need to change the message expiration TTL.
:::