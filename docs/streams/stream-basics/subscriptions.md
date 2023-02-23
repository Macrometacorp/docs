---
sidebar_position: 200
title: Subscriptions
---

A subscription is a named configuration rule that determines how messages are delivered to consumers. There are three available subscription modes in GDN streams: [exclusive](#exclusive), [shared](#shared), and [failover](#failover). These modes are illustrated in the figure below.

![stream-subscription-modes](/img/stream-subscription-modes.png)

To configure a subscription:

1. Create a [producer](producers.md).
1. Create at least two [consumers](consumers.md) with the same subscription name. For example, `consumer-subscription`.

To test the example code, open three terminals simultaneously and run `node producer.js`, then run `consumer-1.js` in second terminal and `consumer-2.js` in third terminal. If successful, you will see messages in both consumer terminals.

## Exclusive

To use shared (round robin) mode we need to change consumers configuration to `Shared` ([Shown in code example below](#code-example-for-consumer-1)). Messages are delivered in a round robin distribution across consumers, and any given message is delivered to only one consumer.

:::note
There are two important things to be aware of when using shared mode:

Message ordering is not guaranteed.
You cannot use cumulative acknowledgment with shared mode.
:::

When setting up consumers _exclusive_ mode is the default mode. Only a single consumer is allowed to attach to the subscription. If more than one consumer attempts to subscribe to a stream using the same subscription, then the consumer receives an error.

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

## Failover

To use failover mode we need to change consumers configuration to `Failover` ([Shown in code example below](#code-example-for-consumer-1)). In failover mode, multiple consumers can attach to the same subscription. A master consumer is picked for the stream to receives messages. When the master consumer disconnects, all non-acknowledged and subsequent messages are delivered to the next consumer in line.

In _failover_ mode, multiple consumers can attach to the same subscription. A master consumer is picked for the stream to receives messages. When the master consumer disconnects, all non-acknowledged and subsequent messages are delivered to the next consumer in line.

In the diagram below, Consumer-C-1 is the master consumer while Consumer-C-2 would be the next in line to receive messages if Consumer-C-1 disconnected.

![stream-failover-subscriptions](/img/stream-failover-subscriptions.png)

## Key_Shared

In *key_shared* mode, multiple consumers can attach to the same subscription. Messages are delivered in a distribution across consumers and messages with the same key or same ordering key are delivered to only one consumer. No matter how many times the message is re-delivered, it is delivered to the same consumer. When a consumer connected or disconnected will cause served consumer change for some key of message.

Note that when the consumers are using the Key_Shared subscription type, you need to disable batching or use key-based batching for the producers. There are two reasons why the key-based batching is necessary for Key_Shared subscription type:

- The broker dispatches messages according to the keys of the messages, but the default batching approach might fail to pack the messages with the same key to the same batch.
- Because it is the consumers instead of the broker that dispatch the messages from the batches, the key of the first message in one batch is considered the key of all messages in this batch, thereby leading to context errors.

The key-based batching aims at resolving the above-mentioned issues. This batching method ensures that the producers pack the messages with the same key to the same batch. The messages without a key are packed into one batch and this batch has no key. When the broker dispatches messages from this batch, it uses NON_KEY as the key. In addition, each consumer is associated with only one key and should receive only one message batch for the connected key. By default, you can limit batching by configuring the number of messages that producers are allowed to send.

Below is an example of enabling the key-based batching under the key_shared subscription type.



### Limitations of Key_Shared Subscriptions

When you use key_shared subscriptions, be aware that:

-You need to specify a key or orderingKey for messages.
-You cannot use cumulative acknowledgment with key_shared subscriptions.

![stream-key-shared-subscriptions](/img/stream-key-shared-subscriptions.png)

## Multi-stream Subscriptions

When a consumer subscribes to a GDN stream, by default it subscribes to one specific stream, such as `persistent://tenant1/fabric1/my-stream`. GDN stream consumers can simultaneously subscribe to multiple streams. You can define a list of streams in two ways:

- On the basis of a [**reg**ular **ex**pression](https://en.wikipedia.org/wiki/Regular_expression) (regex), for example `persistent://tenant1/fabric1/finance-.*`
- By explicitly defining a list of streams

:::note
When subscribing to multiple streams by regex, all streams must be in the same geofabric.
:::

When subscribing to multiple streams, the GDN stream client will automatically make a call to the GDN API to discover the streams that match the regex pattern/list and then subscribe to all of them. If any of the streams don't currently exist, the consumer will auto-subscribe to them once the streams are created.

### No Ordering Guarantees

When a consumer subscribes to multiple streams, all ordering guarantees normally provided by GDN on single stream do not hold. If your use case for GDN involves any strict ordering requirements, best practice is not to use multi-stream subscriptions.
