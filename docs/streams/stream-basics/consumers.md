---
sidebar_position: 35
title: Consumers
---

A _consumer_ is an application that subscribes to a stream and then receives messages published by [producers](/docs/streams/stream-basics/producers/).

## Receive Modes

Messages can be received from streams either synchronously (sync) or asynchronously (async).

| Mode          | Description  |
|--------------|---------------------------|
| Sync receive  | A sync receive will be blocked until a message is available. |
| Async receive | An async receive will return immediately with a future value |

## Acknowledgement (ack)

When a consumer has successfully processed a message, it must send an acknowledgement to the Global Data Network (GDN) so that the GDN can discard the message. If no acknowledgement is received, then the GDN stores the message based on [retention and expiry rules](messages#message-retention-and-expiry).

Messages can be acknowledged either one by one or cumulatively. With cumulative acknowledgement, the consumer only needs to acknowledge the last message it received. All messages in the stream, up to and including, the provided message will not be re-delivered to that consumer.

:::note
Cumulative acknowledgement cannot be used with [shared subscription mode](subscriptions#shared), because shared mode involves multiple consumers having access to the same subscription.
:::

## Readers

Stream readers are similar to stream consumers, but there are two crucial differences between them:

- Readers allow you to specify the starting point for processing messages within a stream. In contrast, consumers always begin with the earliest or latest available unacknowledged message.
- Unlike consumers, readers do not retain data or acknowledge messages. This means that readers can access messages without affecting other consumers or the message state within the stream.
- Readers read both acknowledged and unacknowledged messages.

Readers are useful in scenarios where you want to process the stream data without affecting the message acknowledgment state or when you need to start processing messages from a specific point in the stream. For example, you might use a reader for analytics, monitoring, or auditing purposes.

For more information about using readers, refer to [Manage Readers](../stream-tasks/manage-readers).

## Listeners

Client libraries can provide their own listener implementations for consumers. In this interface, the `received` method is called whenever a new message is received.

## Cursor

A cursor is the subscription position for a stream consumer. You can think of it like the cursor on your page, marking where you are.