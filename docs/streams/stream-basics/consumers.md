---
sidebar_position: 35
title: Consumers
---

A consumer is an application that subscribes to a stream and then receives messages published by producers.

## Receive Modes

Messages can be received from streams either synchronously (sync) or asynchronously (async).

| Mode          | Description  |
|--------------|---------------------------|
| Sync receive  | A sync receive will be blocked until a message is available. |
| Async receive | An async receive will return immediately with a future value |

## Acknowledgement (ack)

When a consumer has successfully processed a message, it needs to send an acknowledgement to the GDN so that GDN can discard the message. If no acknowledgement is received, then GDN stores the message based on retention and expiry rules.

Messages can be acknowledged either one by one or cumulatively. With cumulative acknowledgement, the consumer only needs to acknowledge the last message it received. All messages in the stream up to (and including) the provided message will not be re-delivered to that consumer.

:::note
Cumulative acknowledgement cannot be used with `shared subscription mode`, because shared mode involves multiple consumers having access to the same subscription.
:::

## Readers

GDN stream readers are like stream consumers but with two crucial differences:

- You can specify where on a stream readers begin processing messages (consumers always begin with the latest available unacknowledged message).
- Readers don't retain data or acknowledge messages.

## Listeners

Client libraries can provide their own listener implementations for consumers. In this interface, the `received` method is called whenever a new message is received.

## Cursor

A cursor is the subscription position for a stream consumer. 
