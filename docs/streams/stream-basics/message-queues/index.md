---
sidebar_position: 1
title: Message Queues
---

A message queue automatically balances loads across all consumers for a given stream. Best practice is to use multiple consumers.

Each stream has a receiver queue that determines how many messages the consumer will attempt to fetch at a time. A consumer with a receiver queue of `1000` (default) attempts to process 1,000 messages from the stream's backlog upon connection. Setting the receiver queue to zero verifies that each consumer only processes one message at a time. Refer to the [Set Message Queue](set-message-queue.md) topic for more details.

When you restrict the receiver queue size, you limit the potential throughput of those consumers. Decide if you prefer greater performance or greater control.