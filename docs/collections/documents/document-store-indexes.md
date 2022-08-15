---
title: Document Store Indexes
sidebar_position: 50
---

Indexes enable you to create searchable attributes to speed up your queries. For more information about indexes, refer to [Indexing](../indexing/index.md).

## Document Store Indexes

You can create the following types of index for a document collection:

- [Geo Index](../indexing/geo-indexes.md)
- [Fulltext Index](../indexing/fulltext-indexes.md)
- [Persistent Index](../indexing/persistent-indexes.md)
- [TTL Index](../indexing/ttl-indexes.md)

Refer to each index type for more information about the index and for instructions on how to create and use it.

## View Indexes

View active indexes for a collection on the Indexes tab. The section explains what each element of the tab means.

![Document Store Indexes Tab](/img/collections/doc-store-indexes.png)

- **ID -** This is a unique primary key for the indexes.
- **Type -** The index type.
- **Unique -** If `true`, then no two documents are allowed to have the same set of attribute values. Default is `true` for primary keys and indexes, and default is `false` is for all other keys and indexes.
- **Sparse -** If `true`, then a document is excluded from the index. If any index value is not set or has a null value, GDN does not perform uniqueness checks.
- **Deduplicate -** If `true` (default), GDN only inserts each non-unique index value once per document. Attempting to insert duplicate values results in an error. If `false`, GDN inserts each instance of the value into the index per document.
- **Extras -** Extra conditions of the index definition, such as minimum length for fulltext index.
- **Selectivity Est -** An estimate indicating the percentage of documents affected by the indexed attributes.
- **Fields -** The attributes on which the index is created.
- **Name -** A custom name generated for a non-primary index. The primary index is created and named during the creation of a collection.
- **Action -** Allows a user to delete or add indexes. The primary key is a unique identifier and cannot be deleted.
