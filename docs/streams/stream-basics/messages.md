---
sidebar_position: 20
title: Messages
---

Messages are the basic unit of Macrometa streams. Producers publish messages to streams, and consumers process these messages and send an acknowledgment. 

A message has the following properties:

| **Properties** | **Description** |
| ---            | ---        |
| Value          | The data carried by the message. All GDN messages carry raw bytes.   |
| Key	         | Messages can optionally be tagged with keys, which can be useful for things like stream compaction. |
| Properties	 | An optional key-value map of user-defined properties.   |
| Producer name	 | The name of the producer that sent the message. Producers are automatically named, or you can name them.  |
| Sequence ID    |	Each GDN message belongs to an ordered sequence on its stream. A message's sequence ID is its order in that sequence. |
| Publish time   | The timestamp when the message was published. Automatically applied by the producer. |
| Event time     | An optional timestamp which other applications can use to track events. Default is `0`. |

By default, GDN does the following:

- Deletes all messages that have been acknowledged by a consumer.
- Stores all unacknowledged messages in a message backlog for up to three days.

GDN streams has two features, however, that enable you to override this default behavior:

- Message _retention_ enables you to store messages that have been acknowledged by a consumer.
- Message _expiration_ enables you to set a time to live (TTL) for messages that have not yet been acknowledged.

All message retention and expiration is managed at the geofabric level. You can also add a [message queue](./message-queues/index.md) to a specific stream limit the number of messages in the backlog.

The following diagram illustrates both concepts:

![stream-retention-expiry](/img/stream-retention-expiry.png)

:::note
Contact support@macrometa.com if you need to change the message expiration TTL.
:::