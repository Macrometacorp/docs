---
sidebar_position: 1
title: Collections
---

A collection is a group of documents with a unique name and identifier. These collections can be empty or contain documents. Macrometa GDN is _schemaless_, hence removing the need to define a structure when storing valid document attributes. Documents with completely different structures can be stored in the same collection.

## Local and Global Collections

GDN allows you to create _local_ or _global_ collections.

- A _local collection_ stores its data in one region and does not replicate to other regions in the fabric. You can create a local collection in any specified region. A best practice is to use a region-specific API endpoint when interacting with local collections. Thus, if a user sends a request to a local collection without being routed to the appropriate region, the request will fail.
- A _global collection_ replicates its data and maintains state and consistency across all regions in the fabric.

## Types of Collections

Macrometa offers several types of collections.

- [Document collection](types-collections/documents/index.md): NoSQL database that stores data in JSON format (JavaScript Object Notation). [These databases](https://www.macrometa.com/articles/what-is-document-database) are helpful for storing diverse forms of data, and are thus useful for building content management applications and e-commerce applications.
- [Key-Value collection](types-collections/keyvalue/index.md): Contains documents in which each document stored in a collection contains a `_key`, and the rest of the document is its value.  [Key-Value Databases](https://www.macrometa.com/articles/key-value-databases) are a type of noSQL database that stores different kinds of information, offering more flexibility and ease of retrieval.
- [Redis Mode](redis-mode/index.md): This type allows you to use Macrometa with the Redis API and perform different operations with the Redis client.
- [Dynamo Table](dynamo/create-dynamo-table.md): A dynamo table collection allows you to use AWS Dynamo Database with Macrometa as a datastore.
- [Graph Edge collection](graph-edge/index.md): This type stores _edge documents_ (or _edges_) that define a relationship between other documents with the `_from` and `_to` values. A _vertex_ is a document collection that contains graphs. [Graph databases](https://www.macrometa.com/articles/what-is-graph-database) are also a kind of noSQL database that establishes relationships between entities.
