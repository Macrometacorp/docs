---
sidebar_position: 10
title: Get Started with Event Delivery
---

PhotonIQ Event Delivery is a completely managed, white-glove service. Macrometa engineers will implement it for you, making sure the service is optimized and working correctly according.

However, some people like to be more hands-on with their management. This page provides information to help you take a more active role in managing Event Delivery.

## Prerequisites

- If you want to work with Macrometa streams, then you must have a [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create collections. Your Macrometa partners can help you get set up.
- An application to receive Event Delivery streams.

## Set Up Macrometa Streams

Event Delivery lets you filter events from Macrometa streams and publish events to streams, so the first step is to get your data into a stream in the Macrometa Global Data Network (GDN).

You have several options for streams:

- Local stream
- Global stream
- Collection stream

Consult with your Macrometa partners to decide what is the best option for your use case. More information on these options is below, and they are fully documented in the [Macrometa GDN documentation](../../index.md).

### Local or Global Stream

A stream is a named channel for sending messages. Each stream is backed by a distributed append-only log and can be local (at one edge location only) or global (across all edge locations in the [fabric](../../geofabrics/)).

For more information, refer to [Streams](../../streams/).

### Collection Stream

Macrometa GDN has several types of collections, all of which can have the data to a stream as records are added.

For more information, refer to:

- [Collections](../../collections/)
- [Collection Settings](../../collections/view-collection-settings#view-collection-settings) - View and modify the Collection Stream settings.

## Set Up Event Delivery

Once your stream is set up in the GDN, you can subscribe to it with Event Delivery and manage it using the [Event Delivery API](https://www.macrometa.com/docs/apiEds#/).

1. [Subscribe to the stream](https://www.macrometa.com/docs/apiEds#/paths/ws:-api-es-v1-subscribe/get). This includes adding any [Event Delivery Queries](event-delivery-queries.md) to filter events.
2. [Publish events](https://www.macrometa.com/docs/apiEds#/paths/api-es-v1-fabric-fabricName--stream--streamName--publish/post). You can use this API endpoint or use one of the options for publishing events to the GDN stream.
3. Monitor the service using the following endpoints:
   - [Retrieve metrics](https://www.macrometa.com/docs/apiEds#/paths/api-es-v1-metrics/get)
   - [Health check](https://www.macrometa.com/docs/apiEds#/paths/api-es-v1-health/get)
