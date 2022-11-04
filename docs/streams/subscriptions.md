---
sidebar_position: 40
title: Subscriptions
---

A subscription is a named configuration rule that determines how messages are delivered to consumers. There are three available subscription modes in GDN streams: [exclusive](#exclusive), [shared](#shared), and [failover](#failover). These modes are illustrated in the figure below.

![stream-subscription-modes](/img/stream-subscription-modes.png)

## Exclusive

In _exclusive_ mode, only a single consumer is allowed to attach to the subscription. If more than one consumer attempts to subscribe to a stream using the same subscription, then the consumer receives an error.

In the diagram below, only Consumer-A is allowed to consume messages.

Exclusive mode is the default subscription mode.

![stream-exclusive-subscriptions](/img/stream-exclusive-subscriptions.png)

## Shared

In _shared_ or _round robin_ mode, multiple consumers can attach to the same subscription. Messages are delivered in a round robin distribution across consumers, and any given message is delivered to only one consumer.

When a consumer disconnects, all the messages that were sent to it and not acknowledged are rescheduled for sending to the remaining consumers.

In the diagram below, Consumer-B-1 and Consumer-B-2 can subscribe to the stream, but Consumer-C-1 and others could as well.

### Limitations of Shared Mode

There are two important things to be aware of when using shared mode:

- Message ordering is not guaranteed.
- You cannot use cumulative acknowledgment with shared mode.

![stream-shared-subscriptions](/img/stream-shared-subscriptions.png)

### Failover

In _failover_ mode, multiple consumers can attach to the same subscription. A master consumer is picked for the stream to receives messages. When the master consumer disconnects, all non-acknowledged and subsequent messages are delivered to the next consumer in line.

In the diagram below, Consumer-C-1 is the master consumer while Consumer-C-2 would be the next in line to receive messages if Consumer-C-1 disconnected.

![stream-failover-subscriptions](/img/stream-failover-subscriptions.png)

## Multi-stream Subscriptions

When a consumer subscribes to a GDN stream, by default it subscribes to one specific stream, such as `persistent://tenant1/fabric1/my-stream`. GDN stream consumers can simultaneously subscribe to multiple streams. You can define a list of streams in two ways:

- On the basis of a [**reg**ular **ex**pression](https://en.wikipedia.org/wiki/Regular_expression) (regex), for example `persistent://tenant1/fabric1/finance-.*`
- By explicitly defining a list of streams

:::note
When subscribing to multiple streams by regex, all streams must be in the same `geofabric`.
:::

When subscribing to multiple streams, the GDN stream client will automatically make a call to the GDN API to discover the streams that match the regex pattern/list and then subscribe to all of them. If any of the streams don't currently exist, the consumer will auto-subscribe to them once the streams are created.

### No Ordering Guarantees

When a consumer subscribes to multiple streams, all ordering guarantees normally provided by GDN on single stream do not hold. If your use case for GDN involves any strict ordering requirements, then we strongly recommend against using this feature.
