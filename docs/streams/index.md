---
sidebar_position: 1
title: Streams
---

Streams are a type of collection in GDN to capture data in motion. Messages are sent via streams by publishers to consumers who then do something with the message. Streams can be created with client SDKs (pyC8, jsC8), REST APIs, or the web console.

Streams unifies `queuing` and `pub-sub messaging` into a unified messaging model that provides a lot of flexibility to users to consume messages in a way that is best for the use case at hand.

> producer --> stream --> subscription --> consumer

A stream is a named channel for sending messages. Each stream is backed by a distributed append-only log and can be local (at one edge location only) or global (across all edge locations in the fabric).

Messages from publishers are only stored once on a stream, and can be consumed as many times as necessary by consumers. The stream is the source of truth for consumption. Although messages are only stored once on the stream, there can be different ways of consuming these messages.

Consumers are grouped together for consuming messages. Each group of consumers is a subscription on a stream. Each consumer group can have its own way of consuming the messages: exclusively, shared, or failover.

Streams provide:

- Seamless geo-replication of messages across regions
- Very low publish and end-to-end latency
- Seamless scalability to over a million topics
- Multiple subscription modes (`exclusive`, `shared`, and `failover`) for streams
- Guaranteed message delivery with persistent message storage

Streams in GDN is built on the [publish-subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern, aka pub-sub. In this pattern, producers publish messages to streams. Consumers can then subscribe to those streams, process incoming messages, and send an acknowledgement when processing is complete.

Once a subscription has been created, all messages will be retained by GDN streams, even if the consumer gets disconnected. Retained messages will be discarded only when a consumer acknowledges that they've been successfully processed.

As in other pub-sub systems, streams in GDN are named channels for transmitting messages from producers to consumers. Stream names are URLs that have a well-defined structure:

```http
persistent://tenant/geofabric/stream-name
```

|Stream name component | Description |
|--------------------|---------------|
|`persistent` | This identifies the type of stream. GDN currently supports only persistent streams. With persistent streams, all messages are durably persisted on disk (that means on multiple disks).
|`tenant`             | The stream tenant within the instance. Tenants are essential to multi-tenancy in GDN |
|`geofabric`          | The administrative unit of the stream, which acts as a grouping and geo-fencing mechanism for related streams. Stream configuration is performed at the geofabric level. Each tenant can have multiple geofabrics. |
|`stream`              | The final part of the name. Stream names are freeform. |

:::note
Every collection within a geofabric is also a stream with the same name.
:::

A geofabric is a geo-fenced grouping within a tenant. A tenant can create multiple geofabrics. For instance, a tenant with different applications can create a separate geofabric for each application. A geofabric allows the application to create and manage a hierarchy of streams. The stream `my-tenant/app1` is a geofabric for the application `app1` for `my-tenant`. You can create any number of `streams` under the geofabric.

## Producers

A producer is a process that attaches to a stream and publishes messages to a stream for processing.

### Send modes

Producers can send messages to GDN  either synchronously (sync) or asynchronously (async).

| Mode       | Description  |
|-----------|---------------------|
| Sync send  | The producer will wait for acknowledgement from the broker after sending each message. If acknowledgment isn't received then the producer will consider the send operation a failure |
| Async send | The producer will put the message in a blocking queue and return immediately. The client library will then send the message to the broker in the background. If the queue is full, the producer could be blocked or fail immediately when calling the API, depending on arguments passed to the producer. |

### Compression

Messages published by producers can be compressed during transportation in order to save bandwidth. Macrometa streams currently supports two types of compression:

- [LZ4](https://github.com/lz4/lz4)
- [ZLIB](https://zlib.net/)

### Batching

If batching is enabled, the producer will accumulate and send a batch of messages in a single request. Batching size is defined by the maximum number of messages and maximum publish latency.

## Consumers

A consumer is a process that attaches to a stream via a subscription and then receives messages.

### Receive modes

Messages can be received from streams either synchronously (sync) or asynchronously (async).

| Mode          | Description  |
|--------------|---------------------------|
| Sync receive  | A sync receive will be blocked until a message is available. |
| Async receive | An async receive will return immediately with a future value |

### Acknowledgement

When a consumer has successfully processed a message, it needs to send an acknowledgement to the GDN so that GDN can discard the message (otherwise it stores the message).

Messages can be acknowledged either one by one or cumulatively. With cumulative acknowledgement, the consumer only needs to acknowledge the last message it received. All messages in the stream up to (and including) the provided message will not be re-delivered to that consumer.

:::note
Cumulative acknowledgement cannot be used with `shared subscription mode`, because shared mode involves multiple consumers having access to the same subscription.
:::

### Listeners

Client libraries can provide their own listener implementations for consumers. In this interface, the `received` method is called whenever a new message is received.

## Subscription Modes

A subscription is a named configuration rule that determines how messages are delivered to consumers. There are three available subscription modes in GDN streams: [exclusive](#exclusive), [shared](#shared), and [failover](#failover). These modes are illustrated in the figure below.

![stream-subscription-modes](/img/stream-subscription-modes.png)

### Exclusive

In `exclusive` mode, only a single consumer is allowed to attach to the subscription. If more than one consumer attempts to subscribe to a stream using the same subscription, the consumer receives an error.

In the diagram above, only **Consumer-A** is allowed to consume messages.

> Exclusive mode is the default subscription mode.

![stream-exclusive-subscriptions](/img/stream-exclusive-subscriptions.png)

### Shared

In `shared` or `round robin` mode, multiple consumers can attach to the same subscription. Messages are delivered in a round robin distribution across consumers, and any given message is delivered to only one consumer. When a consumer disconnects, all the messages that were sent to it and not acknowledged will be rescheduled for sending to the remaining consumers.

In the diagram above, **Consumer-B-1** and **Consumer-B-2** are able to subscribe to the stream, but **Consumer-C-1** and others could as well.

**Limitations of shared mode:**

There are two important things to be aware of when using shared mode:

- Message ordering is not guaranteed.
- You cannot use cumulative acknowledgment with shared mode.

![stream-shared-subscriptions](/img/stream-shared-subscriptions.png)

### Failover

In `failover` mode, multiple consumers can attach to the same subscription. The consumers will be lexically sorted by the consumer's name and the first consumer will initially be the only one receiving messages. This consumer is called the `master consumer`.

When the master consumer disconnects, all (non-acked and subsequent) messages will be delivered to the next consumer in line.

In the diagram above, **Consumer-C-1** is the master consumer while **Consumer-C-2** would be the next in line to receive messages if **Consumer-C-1** disconnected.

![stream-failover-subscriptions](/img/stream-failover-subscriptions.png)

## Multi-stream Subscriptions

When a consumer subscribes to a GDN stream, by default it subscribes to one specific stream, such as `persistent://tenant1/fabric1/my-stream`. GDN stream consumers can simultaneously subscribe to multiple streams. You can define a list of streams in two ways:

- On the basis of a [**reg**ular **ex**pression](https://en.wikipedia.org/wiki/Regular_expression) (regex), for example `persistent://tenant1/fabric1/finance-.*`
- By explicitly defining a list of streams

:::note
When subscribing to multiple streams by regex, all streams must be in the same `geofabric`.
:::
When subscribing to multiple streams, the GDN stream client will automatically make a call to the GDN API to discover the streams that match the regex pattern/list and then subscribe to all of them. If any of the streams don't currently exist, the consumer will auto-subscribe to them once the streams are created.

**No ordering guarantees:**

When a consumer subscribes to multiple streams, all ordering guarantees normally provided by GDN on single stream do not hold. If your use case for GDN involves any strict ordering requirements, we would strongly recommend against using this feature.
