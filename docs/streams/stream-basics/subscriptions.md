---
sidebar_position: 200
title: Subscriptions
---

A subscription is a named configuration rule that determines how messages are delivered to consumers. There are three available subscription modes in GDN streams: [exclusive](#exclusive), [shared](#shared), [failover](#failover), and [key_shared](#key_shared). These modes are illustrated in the figure below.

![stream-subscription-modes](/img/stream-subscription-modes.png)

To configure a subscription:

1. Create a [producer](producers.md).
1. Create at least two [consumers](consumers.md) with the same subscription name. For example, `consumer-subscription`.

Refer to the following sections for code examples for each subscription type:

- [Exclusive subscription](exclusive-example.md)
- [Shared subscription](shared-example.md)
- [Failover subscription](failover-example.md)

## Exclusive

Exclusive mode is the default in which only one consumer is allowed to subscribe. If further consumers attempt to subscribe to a stream with the same subscription, then the consumer receives an error.

In the diagram below, only Consumer-A is allowed to consume messages.

![stream-exclusive-subscriptions](/img/stream-exclusive-subscriptions.png)

## Shared

In shared mode, also referred to as _round robin_, messages are distributed across consumers so that any given message is delivered to only one consumer.

When a consumer disconnects, all of its unacknowledged messages reschedule to be sent to the remaining consumers.

In the diagram below, Consumer-B-1 and Consumer-B-2 can subscribe to the stream, but Consumer-C-1 and others could as well.

![stream-shared-subscriptions](/img/stream-shared-subscriptions.png)

When using shared mode:

- Message ordering is not guaranteed.
- You cannot use cumulative acknowledgment.

## Failover

In failover mode, the subscription designates a primary consumer to stream received messages. If the primary consumer disconnects, unacknowledged and subsequent messages deliver to the next consumer in line which becomes the new primary.

In the diagram below, Consumer-C-1 is the primary consumer while Consumer-C-2 would be the next in line to receive messages if Consumer-C-1 disconnected.

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

When a consumer subscribes to multiple streams, all ordering guarantees normally provided by GDN on single stream do not hold. If your use case for GDN involves any strict ordering requirements, then best practice is not to use multi-stream subscriptions.