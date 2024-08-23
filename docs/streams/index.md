---
sidebar_position: 1
title: Streams
---

Streams are flows of data in GDN that capture data in motion. Streams work using the [publish-subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern), aka pub-sub model where producers publish messages to streams and consumers subscribed to these streams consume and process these messages, and send an acknowledgement after processing.

> producer/publisher --> stream --> subscription --> consumer


## Start working with Streams

Start creating, publishing, and subscribing to streams.

<grid cols={4}>
  <card
    heading="Client SDKs"
    description="Create, subscribe and publish to streams using our Python and Javascript SDKs."
    href="/docs/streams/getting-started-streams"
  />
  <card
    heading="REST APIs"
    description="Leverage our extensive list of API endpoints to work with GDN Streams."
    href="/docs/api#/operations/CreateStream"
  />
    <card
    heading="Web Console"
    description="Use our intuitive user interface to send, receive and subscribe to streams."
    href="/docs/streams/stream-tasks/create-streams"
/>
    <card
    heading="GDN CLI"
    description="Install and use the interactive GDN CLI to start subscribing and publishing to streams."
    href="/docs/cli/streams-cli"
  />
</grid>

## Why use streams?

Streams enable:

- Seamless geo-replication of messages across regions with persistent message storage.
- Very low publish and end-to-end latency with guaranteed message delivery.
- Seamless scalability to over a million topics
- Multiple subscription modes (`exclusive`, `shared`, and `failover`) for streams

## Stream Names

As in other pub-sub systems, streams in GDN are named channels for transmitting messages from producers to consumers. Stream names are URLs with a well-defined structure:

```http
persistent://tenant/fabric/stream-name
```

|Stream name component | Description |
|--------------------|---------------|
|`persistent` | This identifies the type of stream. GDN currently supports only persistent streams. With persistent streams, all messages are durably persisted on disk (that means on multiple disks).
|`tenant`             | The stream tenant within the instance. Tenants are essential to multi-tenancy in GDN |
|`geofabric`          | The administrative unit of the stream, which acts as a grouping and geo-fencing mechanism for related streams. Stream configuration is performed at the fabric level. Each tenant can have multiple fabrics. |
|`stream-name`              | The final part of the name. Stream names are freeform. |

## Streams and Fabrics

A [fabric](../geofabrics/index.md) is a geo-fenced grouping within a tenant. A tenant can create and house multiple fabrics.

For example, a tenant with different applications can create a separate fabric for each application. A fabric allows the application to create and manage a hierarchy of streams. The stream `my-tenant/app1` is a fabric for the application `app1` for `my-tenant`. You can create any number of `streams` under the fabric.

:::note
Every collection within a fabric is also a stream with the same name.
:::
