---
sidebar_position: 30
title: Producers
---

A producer is an app or process that publishes messages to the stream. Once published, they can be processed with [stream workers](../cep/index.md).

## Send modes

Producers can send messages to GDN  either synchronously (sync) or asynchronously (async).

| Mode       | Description  |
|-----------|---------------------|
| Sync send  | The producer will wait for acknowledgement from the broker after sending each message. If acknowledgment isn't received then the producer will consider the send operation a failure |
| Async send | The producer will put the message in a blocking queue and return immediately. The client library will then send the message to the broker in the background. If the queue is full, the producer could be blocked or fail immediately when calling the API, depending on arguments passed to the producer. |

## Compression

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
