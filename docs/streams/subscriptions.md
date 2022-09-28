---
sidebar_position: 40
title: Subscriptions
---

A subscription is a named configuration rule that determines how messages are delivered to consumers. There are three available subscription modes in GDN streams: [exclusive](#exclusive), [shared](#shared), and [failover](#failover). These modes are illustrated in the figure below.

![stream-subscription-modes](/img/stream-subscription-modes.png)

### Exclusive

In `exclusive` mode, only a single consumer is allowed to attach to the subscription. If more than one consumer attempts to subscribe to a stream using the same subscription, the consumer receives an error.

In the diagram above, only **Consumer-A** is allowed to consume messages.

> Exclusive mode is the default subscription mode.

```java
Consumer consumer = client.newConsumer()
		.topic("my-topic")
		.subscriptionType(SubscriptionType.Exclusive)
		.subscriptionName("my-subscription-name")
		.subscriptionInitialPosition(SubscriptionInitialPosition.Earliest)
		.subscribe();
```

![stream-exclusive-subscriptions](/img/stream-exclusive-subscriptions.png)

### Shared

In `shared` or `round robin` mode, multiple consumers can attach to the same subscription. Messages are delivered in a round robin distribution across consumers, and any given message is delivered to only one consumer. When a consumer disconnects, all the messages that were sent to it and not acknowledged will be rescheduled for sending to the remaining consumers.

In the diagram above, **Consumer-B-1** and **Consumer-B-2** are able to subscribe to the stream, but **Consumer-C-1** and others could as well.

**Limitations of shared mode:**

There are two important things to be aware of when using shared mode:

- Message ordering is not guaranteed.
- You cannot use cumulative acknowledgment with shared mode.

```java
Consumer consumer = client.newConsumer()
		.topic("my-topic")
		.subscriptionType(SubscriptionType.Shared)
		.subscriptionName("my-subscription-name")
		.subscriptionInitialPosition(SubscriptionInitialPosition.Earliest)
		.subscribe();
```

![stream-shared-subscriptions](/img/stream-shared-subscriptions.png)

### Failover

In `failover` mode, multiple consumers can attach to the same subscription. The consumers will be lexically sorted by the consumer's name and the first consumer will initially be the only one receiving messages. This consumer is called the `master consumer`.

When the master consumer disconnects, all (non-acked and subsequent) messages will be delivered to the next consumer in line.

In the diagram above, **Consumer-C-1** is the master consumer while **Consumer-C-2** would be the next in line to receive messages if **Consumer-C-1** disconnected.

```java
Consumer consumer = client.newConsumer()
		.topic("my-topic")
		.subscriptionType(SubscriptionType.Failover)
		.subscriptionName("my-subscription-name")
		.subscriptionInitialPosition(SubscriptionInitialPosition.Earliest)
		.subscribe();
```

![stream-failover-subscriptions](/img/stream-failover-subscriptions.png)

### Key_Shared

In Key_Shared type, multiple consumers can attach to the same subscription. Messages are delivered in a distribution across consumers and message with same key or same ordering key are delivered to only one consumer. No matter how many times the message is re-delivered, it is delivered to the same consumer. When a consumer connected or disconnected will cause served consumer change for some key of message.

Note that when the consumers are using the Key_Shared subscription type, you need to disable batching or use key-based batching for the producers. There are two reasons why the key-based batching is necessary for Key_Shared subscription type:

-The broker dispatches messages according to the keys of the messages, but the default batching approach might fail to pack the messages with the same key to the same batch.
-Since it is the consumers instead of the broker who dispatch the messages from the batches, the key of the first message in one batch is considered as the key of all messages in this batch, thereby leading to context errors.

The key-based batching aims at resolving the above-mentioned issues. This batching method ensures that the producers pack the messages with the same key to the same batch. The messages without a key are packed into one batch and this batch has no key. When the broker dispatches messages from this batch, it uses NON_KEY as the key. In addition, each consumer is associated with only one key and should receive only one message batch for the connected key. By default, you can limit batching by configuring the number of messages that producers are allowed to send.

Below is example of enabling the key-based batching under the Key_Shared subscription type, with client being the Pulsar client that you created.


```java
Producer<byte[]> producer = client.newProducer()
        .topic("my-topic")
        .batcherBuilder(BatcherBuilder.KEY_BASED)
        .create();
```

#### Limitations of Key_Shared type

When you use Key_Shared type, be aware that:

-You need to specify a key or orderingKey for messages.
-You cannot use cumulative acknowledgment with Key_Shared type.

![stream-failover-subscriptions](/img/stream-key-shared-subscriptions.png)

## Multi-stream Subscriptions

When a consumer subscribes to a GDN stream, by default it subscribes to one specific stream, such as `persistent://tenant1/fabric1/my-stream`. GDN stream consumers can simultaneously subscribe to multiple streams. You can define a list of streams in two ways:

- On the basis of a [**reg**ular **ex**pression](https://en.wikipedia.org/wiki/Regular_expression) (regex), for example `persistent://tenant1/fabric1/finance-.*`
- By explicitly defining a list of streams

:::note
When subscribing to multiple streams by regex, all streams must be in the same `geofabric`.
:::

When subscribing to multiple streams, the GDN stream client will automatically make a call to the GDN API to discover the streams that match the regex pattern/list and then subscribe to all of them. If any of the streams don't currently exist, the consumer will auto-subscribe to them once the streams are created.

### No Ordering Guarantees

When a consumer subscribes to multiple streams, all ordering guarantees normally provided by GDN on single stream do not hold. If your use case for GDN involves any strict ordering requirements, we would strongly recommend against using this feature.
