---
sidebar_position: 35
title: Consumers
---

A consumer is an app or process that subscribes to a stream and then receives messages published by producers.

## Receive Modes

Messages can be received from streams either synchronously (sync) or asynchronously (async).

| Mode          | Description  |
|--------------|---------------------------|
| Sync receive  | A sync receive will be blocked until a message is available. |
| Async receive | An async receive will return immediately with a future value |

## Acknowledgement

When a consumer has successfully processed a message, it needs to send an acknowledgement to the GDN so that GDN can discard the message (otherwise it stores the message).

Messages can be acknowledged either one by one or cumulatively. With cumulative acknowledgement, the consumer only needs to acknowledge the last message it received. All messages in the stream up to (and including) the provided message will not be re-delivered to that consumer.

:::note
Cumulative acknowledgement cannot be used with `shared subscription mode`, because shared mode involves multiple consumers having access to the same subscription.
:::

## Listeners

Client libraries can provide their own listener implementations for consumers. In this interface, the `received` method is called whenever a new message is received.
