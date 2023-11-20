---
sidebar_position: 50
title: Strong Consistency
---

When you create a [Document](./documents/), [Key-Value](./keyvalue/), or [Graph Edge](./graph-edge/) collection, you can select the **Strong consistency** checkbox or set  to make it strongly consistent.

DFP NOTE
- Remember to update View collection settings
- Crosslink this from the collection creation topics

Strong consistency aims to resolve data integrity issues like the double-spending problem by ensuring that concurrent read and write operations occur in a linear sequence globally.

## Fabrics

Each fabric in Macrometa spans a set of clusters (also called regions or data centers). When a fabric is created, a “spot region” is assigned to it automatically. When you write data to a strongly consistent collection, all write operations are routed internally to the fabric's spot region. This process is transparent to clients, though it might result in slightly higher latency due to the internal routing.

In Macrometa, collections are used to store a set of JSON documents. Each collection is stored on all the fabric clusters where the collection is located. In multi-node collections, the collection is a set of shards distributed between the cluster servers. Two parameters determine how a collection behaves regarding read and write operations.

## Enable Strong Consistency

To enable strong consistency, set the `strongConsistency` boolean flag to `true` in the POST request body during collection creation. Note that this setting is irreversible after the collection has been created.

If working in the web console, then select the **Strong consistency** checkbox when creating a new collection.

DFP NOTE - WHAT ABOUT API? CANNOT FIND PARAMETER.

## Read and Write Options

Each read or write request for key-value, document, or edge collections can optionally include the `strongConsistency` boolean flag in the URL query. This determines where read operations for a strongly consistent collection are performed:

- **Without Flag**: Reads occur in the local region.
- **With Flag**: Reads are redirected to the spot region.

The `strongConsistency` option is not compatible with causally consistent collections.

## Summary Table

This table summarizes how operations are handled based on the collection's consistency setting:

| Collection Consistency 	| Strong I/O Behavior             	| Causal I/O Behavior                  	|
|-------------------------	|------------------------	|-------------------------	|
| Strong Consistency      	| Spot read, spot write  	| Invalid request      	|
| Causal Consistency       	| Local read, spot write 	| Local read, local write 	|
