---
sidebar_position: 25
title: Producers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


A _producer_ is an application or process that publishes messages to the stream. Once published, they can be processed with [stream workers](../../cep/).

## Send Modes

Producers can send messages to GDN either synchronously (sync) or asynchronously (async).

| Mode       | Description                                                                                                                                         |
|:-----------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| Sync send  | The producer waits for acknowledgement from the broker after sending each message. If acknowledgment isn't received, then the producer considers the send operation a failure. |
| Async send | The producer puts the message in a blocking queue and return immediately. The client library then sends the message to the broker in the background. If the queue is full, then the producer could be blocked or fail immediately when calling the API, depending on arguments passed to the producer. |


## Compression

Messages published by producers can be compressed during transportation in order to save bandwidth. Macrometa streams currently supports two types of compression:

- [LZ4](https://github.com/lz4/lz4)
- [ZLIB](https://zlib.net/)
- [ZSTD](https://facebook.github.io/zstd/)
- [SNAPPY](https://github.com/google/snappy)

## Batching

Macrometa Streams use batching to enhance efficiency in message processing. When batching is enabled, the producer aggregates multiple messages and transmits them as a single batched request. The batching size is determined by two factors: the maximum number of messages allowed in a batch and the maximum publish latency.

By default, a batch can accommodate up to 1,000 messages. The default maximum publish latency is set at 10 milliseconds, ensuring a timely transmission of message batches.