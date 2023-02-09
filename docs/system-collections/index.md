---
sidebar_position: 120
title: System Collections
---

Streams are flows of data in GDN to capture data in motion. Messages are sent via streams by publishers to consumers who then do something with the message. Streams can be created with client SDKs, REST APIs, CLI commands, or the web console.

## Streams Workflow

> producer --> stream --> subscription --> consumer

A stream is a named channel for sending messages. Each stream is backed by a distributed append-only log and can be local (at one edge location only) or global (across all edge locations in the fabric).

Messages from publishers are only stored once on a stream, and can be consumed as many times as necessary by consumers. The stream is the source of truth for consumption. Although messages are only stored once on the stream, there can be different ways of consuming these messages.

Consumers are grouped together for consuming messages. Each group of consumers is a subscription on a stream. Each consumer group can have its own way of consuming the messages: exclusively, shared, or failover.

Streams in GDN is built on the [publish-subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern, aka pub-sub. In this pattern, producers publish messages to streams. Consumers can then subscribe to those streams, process incoming messages, and send an acknowledgement when processing is complete.

Once a subscription has been created, GDN streams retain all messages even if the consumer disconnects from the server. Retained messages are only discarded when a consumer acknowledges that they've been successfully processed.

## Benefits

Streams provide:

- Seamless geo-replication of messages across regions
- Very low publish and end-to-end latency
- Seamless scalability to over a million topics
- Multiple subscription modes (`exclusive`, `shared`, and `failover`) for streams
- Guaranteed message delivery with persistent message storage

## Stream Names

As in other pub-sub systems, streams in GDN are named channels for transmitting messages from producers to consumers. Stream names are URLs that have a well-defined structure:

```http
persistent://tenant/geofabric/stream-name
```

|Stream name component | Description |
|--------------------|---------------|
|`persistent` | This identifies the type of stream. GDN currently supports only persistent streams. With persistent streams, all messages are durably persisted on disk (that means on multiple disks).
|`tenant`             | The stream tenant within the instance. Tenants are essential to multi-tenancy in GDN |
|`geofabric`          | The administrative unit of the stream, which acts as a grouping and geo-fencing mechanism for related streams. Stream configuration is performed at the geofabric level. Each tenant can have multiple geofabrics. |
|`stream-name`              | The final part of the name. Stream names are freeform. |

## Streams and GeoFabrics

A GeoFabric is a geo-fenced grouping within a tenant. A tenant can create multiple GeoFabrics. For more information about GeoFabrics, refer to [GeoFabrics](../geofabrics/index.md).

For example, a tenant with different applications can create a separate geofabric for each application. A geofabric allows the application to create and manage a hierarchy of streams. The stream `my-tenant/app1` is a geofabric for the application `app1` for `my-tenant`. You can create any number of `streams` under the geofabric.

:::note
Every collection within a geofabric is also a stream with the same name.
:::
