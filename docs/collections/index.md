---
sidebar_position: 1
title: Collections
---

A collection can be empty or contain documents. Macrometa GDN is _schemaless_, so you do not need to define valid document attributes. Documents with completely different structures can be stored in the same collection.

## Global or Local Collections

Document collections can be created as _local_ or _global_ collections.

- A _local collection_ stores its data in one region and does not replicate to other regions. You can create a local collection in any specified region. Best practice is to use a region-specific API endpoint when interacting with local collections. If a user sends a request to a local collection without being routed to the appropriate region, the request will fail.
- A _global collection_ replicates its data and maintains state and consistency across all regions in the GeoFabric.

## Collection Types

Macrometa offers several types of collections.

- A [Document Store](documents/index.md) is a NoSQL database that stores data in JSON format (JavaScript Object Notation). For more information, refer to [What is a document database?](https://www.macrometa.com/articles/what-is-document-database)
- A [Key-Value Store](keyvalue/index.md) contains documents in which each document stored in a collection contains a `_key`, and the rest of the document is its value. For more information, refer to [Key-Value Databases](https://www.macrometa.com/articles/key-value-databases).
- A [Dynamo Table](dynamo/create-dynamo-table.md) collection allows you to use AWS Dynamo Database with Macrometa as a datastore.
- A [Graph Edge collection](graphs/index.md) stores _edge documents_ (or _edges_) that define a relationship between other documents with the `_from` and `_to` values. A _vertex_ is a document collection that contains graphs. For more information, refer to [What is a graph database?](https://www.macrometa.com/articles/what-is-graph-database)
