---
sidebar_position: 1
title: Document Store
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A document collection is a NoSQL database that stores data in JSON format (JavaScript Object Notation). Unlike traditional Relational Database Management Systems, document databases do not require a schema or a pre-defined structure with fixed tables and attributes. This is why they are also known as “non-relational” databases.

A document is based on the concept of a “Key-Value” store. Every key has a corresponding value, different documents have unique keys which help with CRUD operations - Create, Read, Update, and Delete. No two documents can have common primary keys. Multiple documents gathered in one structure is known as a _document collection_.

## Document Attibutes

A document can contain attributes that each store a value. A value can either be atomic (number, string, Boolean, or null), or compound (array or embedded document or object). Arrays and sub-objects can contain all of these types, so a single document can contain nested data structures.

Each document has two identifying attributes: The `_key` identifies it within a single collection, and the `document handle` identifies it across the entire GeoFabric. Additionally, the `document revision` attribute distinguishes individual revisions of a document. Transaction only ever see a single document revision.

For example:

```json
{
  "_id" : "myusers/3456789",
  "_key" : "3456789",
  "_rev" : "14253647",
  "firstName" : "John",
  "lastName" : "Doe",
  "address" : {
    "street" : "Road To Nowhere 1",
    "city" : "Gotham"
  },
  "hobbies" : [
    {"name": "swimming", "howFavorite": 10},
    {"name": "biking", "howFavorite": 6},
    {"name": "programming", "howFavorite": 4}
  ]
}
```

All documents contain special attributes:

- The [document handle](#document-handle) (`_id`).
- The [document's primary key](#document-key) (`_key`).
- The [document revision](#document-revision) (`_rev` ).

You can specify a `_key` value when you create a document. `_id` and `_key` values are unchangeable once the document has been created. The `_rev` value is automatically updated.

### Document Handle

A _document handle_ is a string (`_id`) that identifies a document in the GeoFabric database. The string value consists of the collection's name and the document's `_key` separated by a slash `/`.

### Document Key

A _document key_ is an attribute (`_key`) that identifies a document in its collection and is primarily used for querying. Each document's `_key` is unchangeable.

If you do not specify a key, one is automatically created. An automatic key is only unique within its collection or sharded collections in a cluster. Automatic keys might not be unique across different GeoFabrics. Each collection has a `keyOptions` that can disallow user-specified keys completely or use a specific template for automatically creating keys.

### Document Revision

A _document revision_ (`_rev`) is the MVCC (Multiple Version Concurrency Control) token that specifies a revision of a document. Revisions are read-only.

The `_rev` string is a timestamp that uses the local clock of the database. If different servers in a cluster have a time skew, the timestamps will not be comparable. The database automatically verifies that messages are consistently timestamped on both servers.

If there is causality between events on different servers, timestamps increase from cause to effect. The server might occasionally use a timestamp in the future to maintain consistency.

GDN uses 64-bit unsigned integer values to maintain document revisions internally. We do not document the exact format of the revision values. When returning document revisions to clients, we put them into a string to verify that the revision is not clipped by clients that do not support large integers.

:::note example

You can use the `_rev` attribute as a precondition for queries to avoid losing updates. If a client modifies a document locally without adjusting the revision value, then commits the changes _after_ another user modifies the same document, the first user's operation is cancelled by the server. Otherwise, the first user would inadvertently overwrite the second user's changes

:::

## Multiple Documents in Single Call

GDN APIs can handle multiple documents in a single command, dramatically reducing the client and server overhead. You can do this by performing operations on JSON arrays of objects instead of a single document. As a consequence, document keys, handles and revisions for preconditions have to be supplied embedded in the individual documents given. Multiple document operations are restricted to a single document or edge collection.

## Monetary Data

GDN provides two ways to handle monetary data if you need to capture fractional units of currency and round decimals without precision loss.

- Integer: You can use a general scale factor for digits up to 252 without precision loss. For example, if you set the scale factor to `100`, GDN automatically converts 19.99 to 1999 before performing calucations and converting it back.

- String: You can use strings if you only want to store and retrieve monetary data. You cannot perform calculations on monetary data in strings.

## Data Retrieval

GDN provides the following methods of data retrieval:

- Queries filter documents based on specified criteria, compute new data, and update or delete existing documents. Queries can be as simple as a "query by example" or as complex as "joins" using many collections or traversing graph structures. GDN queries are written in the [C8 Query Language (C8QL)](c8ql/index.md).
- Cursors are used to iterate over the result of queries, so that you get easily processable batches instead of one big hunk.
- Indexes can speed up your searches. Refer to the [Indexing](../indexing/index.md) section for more information.
