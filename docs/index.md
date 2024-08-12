---
hide_title: true
sidebar_position: 0
title: Overview
---

# Documentation

Macrometa's Global Data Network (GDN) is a distributed backend for building global applications. 

## Getting Started

<grid cols={3}>
  <card
    heading="Quickstart Guide"
    description="Get started with a comprehensive tutorial that covers the basics."
    href="/quickstart"
  />
  <card
    heading="Developer Tools"
    description="Leverage our CLI, SDKs and libraries to start building now."
    href="/development"
  />
  <card
    heading="Sample Apps"
    description="Explore our library of open source sample apps and starter projects."
    href="/apps"
  />
</grid>

## Global Data Mesh

Store and serve any kind of data, anywhere in the world, with high throughput and ultra-low latency reads and writes.

<grid cols={3}>
  <card
    heading="Search Views"
    description="Flexible vector search, semantic search, similarity ranking, full-text search, and more."
    href="/search-views"
  />
  <card
    heading="Streams"
    description="Distributed, real-time stream engine with pub/sub and message queues."
    href="/streams"
  />
  <card
    heading="Graphs"
    description="Dynamic, high-throughput graphs with ultra low-latency queries."
    href="/graphs"
  />
</grid>

#### Collections

<grid cols={3}>
  <card
    heading="Document Collections"
    description="NoSQL document collections with flexible indexing and modeling."
    href="/collections/types-collections/documents"
  />
  <card
    heading="Key-Value Collections"
    description="High-throughput KV collections powering a wide range of use cases."
    href="/collections/types-collections/keyvalue"
  />
  <card
    heading="Graph Edge Collection"
    description="Document type used by Graphs to model relationships between nodes."
    href="/collections/graph-edge"
  />
  <card
    heading="Dynamo-mode Collections"
    description="Full-featured compatibility with AWS DynamoDB SDKs and CLI."
    href="/collections/dynamo/create-dynamo-table"
  />
  <card
    heading="Redis-mode Collections"
    description="Full-featured Redis-compatible collection and API."
    href="/collections/redis-mode/"
  />
</grid>

## Edge Compute

Deploy compute runtimes and complex event-driven workloads alongside your data, and within milliseconds of your customers.

<grid cols={3}>
  <card
    heading="Query Workers"
    href="/queryworkers"
  />
  <card
    heading="Stream Workers"
    href="/cep"
  />
</grid>

## Access

<grid cols={3}>
  <card
    heading="API Keys"
    href="/account-management/api-keys/"
  />
  <card
    heading="Authentication"
    href="/account-management/auth"
  />
  <card
    heading="Permissions"
    href="/account-management/permissions"
  />
  <card
    heading="Users"
    href="/account-management/users"
  />
    <card
    heading="Connections - Beta"
    href="/connections"
  />
</grid>

## Network

<grid cols={3}>
  <card
    heading="Fabrics"
    href="/geofabrics"
  />
</grid>

## Why Macrometa?

If you're still curious as to why you should build on Macrometa rather than on the centralized cloud (AWS, GCP, or Azure), please keep reading.

#### 1. Low-latency Everywhere

Deliver ultra-low latency apps, APIs, and event-driven workloads closer to the pulse of your business. With Macrometa, your data is no longer centralized in a specific region, but rather replicated and available for reads and writes (N-Active) from 175+ locations around the world. This allows you to build stateful real-time applications closer to your end-users than ever before. Check out [Global Data Mesh](https://www.macrometa.com/platform/global-data-mesh) to learn more.

#### 2. Faster Time-To-Production

The Global Data Network is a converged platform consisting of a poly-model database (Key-Value, Document, Search, Graph), a stream engine, complex event processing, and compute capabilities. Utilizing a single platform as opposed to stitching together a variety of services _a la carte_ in the public cloud allows you to build, iterate, and execute faster. Check out [Edge Compute](https://www.macrometa.com/platform/edge-compute) to learn more.

#### 3. Lower Total Cost of Ownership (TCO)

Multiple cloud services are often needed to build global applications. When it's time to scale out to support a global audience, you will end up utilizing several databases, maintaining copies of your data within multiple regions, and the costs will add up very quickly. The Global Data Network allows you to maintain and query a single copy of data with extremely low latency from anywhere in the world. Your development team will be free to spend more time on the business logic and less time focusing on data replication and network orchestration.
