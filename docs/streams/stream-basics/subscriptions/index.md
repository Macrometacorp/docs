---
sidebar_position: 1
title: Subscriptions
---

A subscription is a named configuration rule that determines how messages are delivered to consumers. These are the available subscription modes in GDN streams:

- [Exclusive subscription](#exclusive)
- [Shared subscription](#shared)
- [Failover subscription](#failover)
- [Key-shared subscription](#key_shared)

These modes are illustrated in the figure below.

![stream-subscription-modes](/img/stream-subscription-modes.png)


## Configure a subscription

To configure a subscription:

1. Create a [producer](../producers.md).
1. Create at least two [consumers](../consumers.md) with the same subscription name. For example, `consumer-subscription`.
1. Send a message and test the delivery of these messages to the created consumers.

## Exclusive

This is the default subscription mode which allows only one consumer to subscribe. Any further attempt by other consumers to subscribe results in the consumer receiving an error. 

In the diagram below, only Consumer-A-0 is allowed to consume messages.

![stream-exclusive-subscriptions](/img/stream-exclusive-subscriptions.png)

## Shared

In shared mode, also referred to as _round robin_, messages are distributed across consumers so that any given message is delivered to only one consumer.

A disconnection from a consumer results in all of its unacknowledged messages rescheduled and sent to the remaining consumers.

In the diagram below, Consumer-C-1 and Consumer-C-2 can subscribe to the stream, but Consumer-C-3 and others could as well.

![stream-shared-subscriptions](/img/stream-shared-subscriptions.png)

When using shared mode:

- Message ordering is not guaranteed.
- You cannot use cumulative acknowledgment.

## Failover

In failover mode, the subscription designates a primary consumer to stream received messages. If the primary consumer disconnects, unacknowledged and subsequent messages deliver to the next consumer in line which becomes the new primary.

In the diagram below, Consumer-B-0 is the primary consumer while Consumer-B-1 would be the next in line to receive messages if Consumer-B-0 disconnected.

![stream-failover-subscriptions](/img/stream-failover-subscriptions.png)

## Key_Shared

Key_shared mode is similar to shared mode, except messages with the same ordering key are delivered to only one consumer. If the consumer for a specific key disconnects, a new consumer takes over.

When using key_shared subscriptions:

- Producers must disable batching or use key-based batching.
- Use a `key` or `orderingKey` for messages.
- You cannot use cumulative acknowledgment.

You can limit batching by configuring the number of messages that producers are allowed to send. Messages without a key are grouped into a patch with a special `NON_KEY` designation. 

![stream-key-shared-subscriptions](/img/stream-key-shared-subscriptions.png)

## Multi-stream Subscriptions

GDN stream consumers can simultaneously subscribe to multiple streams. You can define a list of streams in two ways:

- Use a [regular expression](https://en.wikipedia.org/wiki/Regular_expression) (regex). For example `persistent://tenant1/fabric1/finance-.*`
- Define a list of streams

When subscribing to multiple streams by regex, all streams must be in the same geofabric.

When subscribing to multiple streams, the GDN stream client automatically calls the GDN API to discover and subscribe to any streams that match the regex pattern. The consumer also automatically subscribes to any future lists created with the regex pattern.

:::note
A consumer subscribing to multiple streams removes the strict ordering requirement GDN guarantees on single streams. Hence, use cases requiring strict ordering should use other subscription modes, not multi-stream subscriptions.
:::