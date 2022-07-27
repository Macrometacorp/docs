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

![Document Store Data Tab](/img/collections/doc-store-indexes.png)

- **ID -** This is a unique primary key for the indexes.
- **Type -** The index type.
- **Unique -** If the index is declared unique, then no two documents are allowed to have the same set of attribute values. The **true** option is the default value for primary keys/indexes while **false** is specified for all other keys/indexes.
- **Sparse -** Indicates whether the index is sparse or not. If the index is declared sparse, then a document will be excluded from the index and no uniqueness checks are performed if any index attribute value is not set or has a value of null.
- **Deduplicate -** Controls whether inserting duplicate index values from the same document into a unique array index will lead to a unique constraint error or not. Default is **true**, meaning that only a single instance of each non-unique index value will be inserted into the index per document. If **false**, then each instance of a non-unique index value will be inserted into the index per document.
- **Extras -** Extra conditions of the index definition, such as minimum length for fulltext index.
- **Selectivity Est -** An estimate indicating the percentage of documents affected by the indexed attributes.
- **Fields -** The attributes on which the index is created.
- **Name -** A custom name generated for a non-primary index. The primary index is created and named during the creation of a collection.
- **Action -** Allows a user to delete or add indexes. The primary key is a unique identifier and cannot be deleted.
