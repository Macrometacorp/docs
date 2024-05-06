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
- Plan your filters, which are set by adding queries to event subscriptions. For more information, refer to [Event Delivery Queries](event-delivery-queries.md).

## Set Up Your Stream in the GDN

Event Delivery lets you filter events from Macrometa streams and publish events to streams, so the first step is to get your data into a collection stream in the Macrometa Global Data Network (GDN).

A stream is a named channel for sending messages. Each stream is backed by a distributed append-only log and can be local (at one edge location only) or global (across all edge locations in the [fabric](../../geofabrics/)).

1. (Optional) [Create a fabric](../../geofabrics/create-geofabric.md) for your collection. This allows you to decide exactly where your data lives. If you skip this step, then the collection will be in the system fabric.
2. Create a collection that you will send streaming data to. Make sure you enable streams when you create it. Instructions for each are below:
   - [Create a Document Collection](../../collections/documents/create-document-store.md)
   - [Create a Key-Value Collection](../../collections/keyvalue/create-key-value-store.md)

   ![New Collection Stream](/img/photoniq/event-delivery/new-collection-stream.png)

3. [View collection settings](../../collections/view-collection-settings.md) to access the following information:
   - **Resource URL** - The endpoint to send data to your collection. All messages sent here are both stored and transmitted to the stream.
   - **Stream Name** - Parameter for Event Delivery endpoints.
   - **Fabric Name** - Parameter for Event Delivery endpoints. In the screenshot below, the fabric name is **_system**.

   ![View Collection Settings](/img/photoniq/event-delivery/view-collection-settings.png)

## Set Up Event Delivery

Once your stream is set up in the GDN, you can subscribe to it with Event Delivery and manage it using the [Event Delivery API](https://www.macrometa.com/docs/apiEds#/).

1. [Subscribe to the stream](https://www.macrometa.com/docs/apiEds#/paths/ws:-api-es-v1-subscribe/get). This includes adding any [Event Delivery queries](event-delivery-queries.md) to filter events.
2. [Publish events](https://www.macrometa.com/docs/apiEds#/paths/api-es-v1-fabric-fabricName--stream--streamName--publish/post). You can use this API endpoint or use one of the options for publishing events to the GDN stream. Events published in this matter are not stored in the collection.
3. Monitor the service using the following endpoints:
   - [Retrieve metrics](https://www.macrometa.com/docs/apiEds#/paths/api-es-v1-metrics/get)
   - [Health check](https://www.macrometa.com/docs/apiEds#/paths/api-es-v1-health/get)
