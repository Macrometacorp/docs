---
sidebar_position: 1
title: Message Queues
---

A message queue automatically balances loads across all consumers for a given stream. Best practice is to use multiple consumers.

Each stream has a receiver queue that determines how many messages the consumer will attempt to fetch at a time. A receiver queue of 1,000 (the default), for example, means that the consumer will attempt to process 1,000 messages from the stream's backlog upon connection. Setting the receiver queue to zero essentially means ensuring that each consumer is only doing one thing at a time.

The downside to restricting the receiver queue size of consumers is that that limits the potential throughput of those consumers. Whether the performance/control trade-off is worthwhile will depend on your use case.