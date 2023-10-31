---
sidebar_position: 1
title: Fabrics
---

GeoFabrics enable you to create region-based subsets within your tenants. Each GeoFabric represents a group of collections, processes, and data that cannot be accessed from other GeoFabrics. You must log into the `_system` GeoFabric to create, modify, or delete GeoFabrics. Each GeoFabric has a unique URL that enables access to permitted users.

## What are GeoFabrics?

A GeoFabric is a collection of edge data centers linked together as a single high-performance virtual cloud. Each GeoFabric consists of storage, networking, and processing functions. A GeoFabric is created when a tenant account is provisioned with the edge locations.

## What's in a GeoFabric?

Each GeoFabric contains collections (key-value and documents), graphs, streams, stream processors and search capabilities. Data written to a GeoFabric is pinned to the locations that are part of the GeoFabric.

A tenant can have multiple GeoFabrics. Each GeoFabric isolates its contained data from other GeoFabrics.

Each GeoFabric contains the following:

- [Collections](../collections/index.md) are groups of JSON documents. A GeoFabric can store unlimited collections, and collections can store unlimited documents.
- [Graphs](../graphs/index.md) consist of vertices and edges. Edges are stored as documents in edge collections. A vertex can be a document of a document collection or of an edge collection (so edges can be used as vertices).
- [Search Views](../search-views/index.md) is a full-text search engine for information retrieval on one or more linked collections.
- [Streams](../streams/index.md) are a type of collection that capture data in motion. Streams support both pub-sub and queuing models. Messages are sent via streams by publishers to consumers who then do something with the message.
- [Stream Workers](../cep/index.md) perform complex event processing in real-time on streams.
