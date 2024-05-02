---
sidebar_position: 10
title: Get Started with Event Delivery
---

PhotonIQ Event Delivery is a completely managed, white-glove service. Macrometa engineers will implement it for you, making sure the service is optimized and working correctly according.

However, some people like to be more hands-on with their management. This page provides information to help you take a more active role in managing Event Delivery.

## Prerequisites

- To work with Macrometa streams, then you must have a [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create collections. Your Macrometa partners can help you get set up, or you can sign up on your own.
- Decide what kind of [collection](../../collections/) to send streaming data to. Consult with your Macrometa partners to decide what is the best option for your use case.
  - [Document Collection](../../collections/documents/) - Accepts any document type.
  - [Key-Value Collection](../../collections/keyvalue/) - Accepts key-value pairs, can be set up to include blobs.

- An application to receive Event Delivery streams.

## Set Up Macrometa Streams

Event Delivery lets you filter events from Macrometa streams and publish events to streams, so the first step is to get your data into a collection stream in the Macrometa Global Data Network (GDN).

A stream is a named channel for sending messages. Each stream is backed by a distributed append-only log and can be local (at one edge location only) or global (across all edge locations in the [fabric](../../geofabrics/)).

1. Create a collection that you will send streaming data to. Make sure you enable streams when you create it.
   - []

   ![New Collection Stream](/img/photoniq/event-delivery/new-collection-stream.png)

2. 

## Set Up Event Delivery

Once your stream is set up in the GDN, you can subscribe to it with Event Delivery and manage it using the [Event Delivery API](https://www.macrometa.com/docs/apiEds#/).

1. [Subscribe to the stream](https://www.macrometa.com/docs/apiEds#/paths/ws:-api-es-v1-subscribe/get). This includes adding any [Event Delivery Queries](event-delivery-queries.md) to filter events.
2. [Publish events](https://www.macrometa.com/docs/apiEds#/paths/api-es-v1-fabric-fabricName--stream--streamName--publish/post). You can use this API endpoint or use one of the options for publishing events to the GDN stream.
3. Monitor the service using the following endpoints:
   - [Retrieve metrics](https://www.macrometa.com/docs/apiEds#/paths/api-es-v1-metrics/get)
   - [Health check](https://www.macrometa.com/docs/apiEds#/paths/api-es-v1-health/get)
