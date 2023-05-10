---
sidebar_position: 25
title: Producers
---

A _producer_ is an application or process that publishes messages to the stream. Once published, they can be processed with [stream workers](../../cep/).

## Send Modes

Producers can send messages to GDN either synchronously (sync) or asynchronously (async).

| Mode       | Description  |
|-----------|---------------------|
| Sync send  | The producer waits for acknowledgement from the broker after sending each message. If acknowledgment isn't received, then the producer considers the send operation a failure. |
| Async send | The producer puts the message in a blocking queue and return immediately. The client library then sends the message to the broker in the background. If the queue is full, then the producer could be blocked or fail immediately when calling the API, depending on arguments passed to the producer. |

## Compression

Messages published by producers can be compressed during transportation in order to save bandwidth. Macrometa streams currently supports two types of compression:

- [LZ4](https://github.com/lz4/lz4)
- [ZLIB](https://zlib.net/)

## Batching

If batching is enabled, then the producer accumulates and sends a batch of messages in a single request. Batching size is defined by the maximum number of messages and maximum publish latency.

## Chunking

Message chunking enables Macrometa to process large payload messages by splitting the message into chunks at the producer side and aggregating chunked messages at the consumer side.

With message chunking enabled, when the size of a message exceeds the allowed maximum payload size (5MB), the producer splits the original message into chunked messages and publishes them. The consumers automatically consume the aggregated message.

:::note

- Chunking is only available for persistent topics.
- Chunking cannot be enabled simultaneously with batching. Before enabling chunking, you must turn off batching.

:::


### Enable Message Chunking

**Prerequisite**: Turn off batching by setting the `batching_enabled` parameter to `false`.

The message chunking feature is off by default. To enable message chunking, set the `chunkingEnabled` parameter to true when creating a producer.

:::note
If the consumer fails to receive all chunks of a message within a specified period, then it expires incomplete chunks. The default value is 1 minute.
:::
