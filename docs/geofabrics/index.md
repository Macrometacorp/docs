---
sidebar_position: 4
title: Fabrics
---

Fabrics enable you to create region-based subsets within your tenants. Each fabric represents a group of collections, processes, and data inaccessible by other fabrics. GDN contains a `_system` fabric, which allows you to log in and [create](create-geofabric.md), [modify](update-geofabric.md), or [delete](delete-geofabric.md) fabrics. Each fabric has a unique URL that enables access to permitted users.

You can get started by [creating your first geofabric](create-geofabric.md). 

## What Are Fabrics?

A fabric is a collection of edge data centers linked together as a single high-performance virtual cloud. Each fabric consists of storage, networking, and processing functions. A fabric is created when a tenant account is provisioned with the edge locations.

## What's in a Fabric?

Each fabric contains collections (key-value and documents), graphs, streams, stream processors and search capabilities. Data written to a fabric is pinned to the locations that are part of the fabric.

A tenant can have multiple fabrics. Each fabric isolates its contained data from other fabrics.

Each fabric contains the following:

- [Collections](../database/collections/index.md) are groups of JSON documents. A fabric can store unlimited collections, and collections can store unlimited documents.
- [Graphs](../database/graphs/index.md) consist of vertices and edges. Edges are stored as documents in edge collections. A vertex can be a document of a document collection or of an edge collection (so edges can be used as vertices).
- [Search Views](../database/search-views/index.md) is a full-text search engine for information retrieval on one or more linked collections.
- [Streams](../streams/index.md) are a type of collection that capture data in motion. Streams support both pub-sub and queuing models. Messages are sent via streams by publishers to consumers who then do something with the message.
- [Stream Workers](../compute/cep/index.md) perform complex event processing in real-time on streams.
