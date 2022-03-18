---
sidebar_position: 2
title: Index Basics
---

# Index basics

Indexes allow users to quickly access documents by using indexed attributes with their queries. While GDN automatically indexes some system attributes, you can create extra indexes on non-system attributes of documents.

You can create user-defined indexes on collections. You can create indexes by specifying the names of the index attributes. Some index types (such as full-text) can only index one attribute, while others allow indexing multiple attributes.

GDN automatically indexes the system attributes `_id`, `_key`, `_from` and `_to` in the provided indexes. A collection's primary key determines the `_id` and `_key` values, and the edge collection's edge index determines the `_from` and `_to` values.

You cannot use the system attribute `_id` in user-defined indexes, but you can use `_key`, `_rev`, `_from`, and `_to`.

Creating new indexes is done under an exclusive collection lock by default. When you create a new index, the collection is not available during creation. Creating indexes in the foreground is undesirable if you have to perform it on a live system without a dedicated maintenance window.

For potentially long running index creation, GDN supports creating indexes in the background. The collection remains mostly available during the index creation. Refer to [Creating Indexes in Background](#creating-indexes-in-background) for more information.

GDN provides the following index types:

* [Primary index](#primary-index)
* [Edge index](#edge-index)
* [Persistent index](#persistent-index)
* [Hash index](#hash-index)
* [Skiplist index](#skiplist-index)
* [TTL (time-to-live) index](#ttl-index)
* [Geo index](#geo-index)
* [Full-text index](#full-text-index)

## Primary Index

Each collection has a *primary index* that stores the [document keys](glossary#document-key) (`_key` attribute) for all documents in the collection. The primary index allows you to quickly select documents using the `_key` or `_id` attributes. C8QL queries automatically use primary indexes for equality lookups on `_key` or `_id`. 

You can use a dedicated function to find a document with its `_key` or `_id` using the primary index:

```js
collection.document("<document-key>");
_document("<document-id>");
```

The primary index is an unsorted hash index, so it cannot be used for sorting or non-equality range queries.  You cannot change, remove, or create a primary index. 


## Edge Index

Each [edge collection](glossary#edge-collection) automatically creates an *edge index*. The edge index provides quick access to documents by either their `_from` or `_to` attributes. You can use an edge index to quickly find connections between vertex documents. Queries use edge indexes when referring to the connecting edges of a vertex.

C8QL uses edge indexes when performing equality lookups on `_from` or `_to` values in an edge collection. You can use a dedicated function to find edges with their `_from` or `_to` values using the edge index:

```js
collection.edges("<from-value>");
collection.edges("<to-value>");
collection.outEdges("<from-value>");
collection.outEdges("<to-value>");
collection.inEdges("<from-value>");
collection.inEdges("<to-value>");
```

The edge index is a hash index that stores the union of all `_from` and `_to` attributes. It can be used for equality lookups, but not for range queries or for sorting. Edge indexes are automatically created for edge collections. It is not possible to create user-defined edge indexes. However, it is possible to freely use the `_from` and `_to` attributes in user-defined indexes.

:::note
You cannot remove or change an edge index.
:::
## Persistent Index

Persistent index entries are written to disk when documents are stored or updated, so the entries do not need to be rebuilt when the server is restarted or the indexed collection is loaded. Persistent indexes can reduce collection loading times. You can only use persistent indexes in addition to another primary index.

The index implementation uses the RocksDB engine and provides logarithmic complexity for insert, update, and remove operations. Because the persistent index is not in-memory, it does not store pointers to the primary index. Instead it stores a document's primary key. To retrieve a document via a persistent index via an index value lookup, there will therefore be an additional O(1) complexity lookup into the primary index to fetch the actual document.

Persistent indexes are sorted and can be used for point lookups, range queries, and sorting operations if you provide one of the following in the query:

* All index attributes.
* A leftmost prefix of the index attributes.


## Hash Index

:::note
Hash indexes are deprecated and replaced by persistent indexes. You can still use these indexes in the API, but not the Web GUI.
:::

A hash index can be used to quickly find documents with specific attribute values. The hash index is unsorted, so it supports equality lookups but no range queries or sorting.

You can create a hash index on one or more document attributes. A query only uses a hash index if all specified attributes are present in the search condition, and if all attributes are compared using the equality (`==`) operator. Hash indexes are used from within C8QL and several query functions such as `byExample` and `firstExample`.

The following types of indexes each have different characteristics:

- *Unique hash index*: All documents in the collection must have different values for the attributes covered by the unique index. You cannot insert a document with the same key value as an already existing document. 

	This type of index is not sparse. Documents that do not contain the index attributes or that have a value of `null` in the index attributes will still be indexed. A key value of `null` may only occur once in the index, so this type of index cannot be used for optional attributes due to unique constraint violations.

	The unique option can also be used to ensure that [no duplicate edges](indexing-hash.html#ensure-uniqueness-of-relations-in-edge-collections) are created, by adding a combined index for the fields `_from` and `_to` to an edge collection.

- *Unique, sparse hash index*: All documents in the collection must have different values for the attributes covered by the unique index. This index does not include documents with an attribute not set or set to `null`. No documents in a collection will have duplicate keys if the indexed attributes are set. This index can be used for optional attributes.

- *Non-unique hash index*: All documents in the collection are indexed. This type of index is not sparse. Documents that do not contain the index attributes or that have a value of `null` in the index attribute(s) are still indexed. Duplicate key values can occur and do not lead to unique constraint violations.
 
- *Non-unique, sparse hash index*: Only indexes documents that have all indexed attributes set to a value other than `null`. This index can be used for optional attributes.

The amortized complexity of lookup, insert, update, and removal operations in unique hash indexes is O(1). 

Non-unique hash indexes have an amortized complexity of O(1) for insert, update, and removal operations. That means non-unique hash indexes can be used on attributes with low cardinality. 

If a hash index is created on an attribute that is missing in all or many of the documents, the index takes these actions:

- If the index is sparse, the documents missing the attribute are not indexed and do not use index memory. These documents do not influence the update or removal performance for the index.

- If the index is non-sparse, the documents missing the attribute are contained in the index with a key value of `null`. 

Hash indexes support [indexing array values](#indexing-array-values) if the index attribute name is extended with a `[*]`.

## Skiplist Index

:::note
Skiplist indexes are deprecated and replaced by persistent indexes. You can still use these indexes in the API, but not the Web GUI.
:::

A skiplist is a sorted index structure. It can be used to quickly find documents with specific attribute values, for range queries and for returning documents from the index in sorted order. Skiplists will be used from within C8QL and several query functions, e.g. `byExample`, `firstExample` etc.

Skiplist indexes are sorted and can be used for point lookups, range queries, and sorting operations if you provide one of the following in the query:

* All index attributes.
* A leftmost prefix of the index attributes.

For example, if a skiplist index is created on attributes `value1` and `value2`, the following filter conditions can use the index (the `<=` and `>=` operators are omitted here for brevity):

```js
FILTER doc.value1 == ...
FILTER doc.value1 < ...
FILTER doc.value1 > ...
FILTER doc.value1 > ... && doc.value1 < ...

FILTER doc.value1 == ... && doc.value2 == ...
FILTER doc.value1 == ... && doc.value2 > ...
FILTER doc.value1 == ... && doc.value2 > ... && doc.value2 < ...
```

To use a skiplist index for sorting, you must specify the index attributes in the `SORT` clause of the query in the same order as the index definition. Skiplist indexes are always created in ascending order, but they can also be accessed in descending order. For a *combined index* (an index on multiple attributes), the sort orders in the `SORT` clause must be either all ascending (optionally omitted as ascending is default) or all descending. 

For example, if the skiplist index is created on attributes `value1` and `value2` in order, the following sorts clauses can use the index for sorting:

- `SORT value1 ASC, value2 ASC` (and its equivalent `SORT value1, value2`)
- `SORT value1 DESC, value2 DESC`
- `SORT value1 ASC` (and its equivalent `SORT value1`)
- `SORT value1 DESC`

The following sort clauses cannot make use of the index order and require an extra sort step:

- `SORT value1 ASC, value2 DESC`
- `SORT value1 DESC, value2 ASC`
- `SORT value2` (and its equivalent `SORT value2 ASC`)
- `SORT value2 DESC` (because first indexed attribute `value1` is not used in sort clause)

:::note
The last two sort clauses cannot use the index because they do not refer to a leftmost prefix of the index attributes.
:::

Skiplists can optionally be declared unique, disallowing the same value from being saved in the indexed attribute.

The following types of indexes each have different characteristics:

- *Unique skiplist index*: All documents in the collection must have different values for the attributes covered by the unique index. You cannot insert a document with the same key value as an already existing document. 

	This type of index is not sparse. Documents that do not contain the index attributes or that have a value of `null` in the index attributes will still be indexed. A key value of `null` may only occur once in the index, so this type of index cannot be used for optional attributes due to unique constraint violations.

- *Unique, sparse skiplist index*: All documents in the collection must have different values for the attributes covered by the unique index. This index does not include documents with an attribute not set or set to `null`. No documents in a collection will have duplicate keys if the indexed attributes are set. This index can be used for optional attributes.

- *Non-unique skiplist index*: All documents in the collection are indexed. This type of index is not sparse. Documents that do not contain the index attributes or that have a value of `null` in the index attribute(s) are still indexed. Duplicate key values can occur and do not lead to unique constraint violations.
 
- *Non-unique, sparse skiplist index*: Only indexes documents that have all indexed attributes set to a value other than `null`. This index can be used for optional attributes.

The operational amortized complexity for skiplist indexes is logarithmically correlated with the number of documents in the index.

Skiplist indexes support [indexing array values](#indexing-array-values) if the index attribute name is extended with a `[*]``.


## TTL Index

A TTL (time-to-live) index automatically removes expired documents from a collection. 

You can create a TTL index by setting an `expireAfter` value and picking a single document attribute that contains the documents' creation date and time. Documents are expired after `expireAfter` seconds after their creation time. The creation time is specified as either a numeric timestamp (Unix timestamp) or a date string in format `YYYY-MM-DDTHH:MM:SS`. All date strings will be interpreted as UTC dates.

For example, if `expireAfter` is set to 600 seconds (10 minutes) and the index attribute is "creationDate" and there is the following document:

    { "creationDate" : 1550165973 }

This document will be indexed with a creation date time value of `1550165973`, which translates to the human-readable date `2019-02-14T17:39:33Z`. The document will expire 600 seconds afterwards, which is at timestamp `1550166573` (or `2019-02-14T17:49:33Z` in the human-readable version).

There is no guarantee when exactly the removal of expired documents will be carried out, so queries may still find and return documents that have already expired. These will eventually be removed when the background thread kicks in and has capacity to remove the expired documents. Only documents that are past their expiration time will actually be removed.
  
:::note 
You can specify the numeric date time values for the index attribute in milliseconds since January 1st 1970 (Unix timestamp). We round this value down to the nearest second. To calculate the current timestamp from JavaScript in this format, there is `Date.now() / 1000`. To calculate it from an arbitrary Date instance, there is `Date.getTime() / 1000`.
:::

Alternatively, the index attribute values can be specified as a date string in format `YYYY-MM-DDTHH:MM:SS`. All date strings will be interpreted as UTC dates.
    
The above example document using a date string attribute value would be
 
    { "creationDate" : "2019-02-14T17:39:33Z" }

In case the index attribute does not contain a numeric value or a proper date string, the document will not be stored in the TTL index and thus will not become a candidate for expiration and removal. Providing either a non-numeric value or even no value for the index attribute is a supported way of keeping documents from being expired and removed.

## Geo Index

A geo index enables you to quickly find locations across the earth. Geo indexes are automatically created, but you can create additional geo indexes on one or multiple attributes in collections.

The geo index stores two-dimensional coordinates. You can create two separate document attributes (latitude and longitude) or a single array attribute that contains both latitude and longitude. Latitude and longitude must be numeric values.

Geo indexes provide operations to do the following:

* Find documents with coordinates nearest to a given comparison coordinate
* Find documents with coordinates that are within a specifiable radius around a comparison coordinate.

You can access these operations with dedicated functions in C8QL or simple queries. They are also automatically applied to SORT or FILTER when used with the distance function.

## Full-text Index

A full-text index can be used to find words, or prefixes of words inside documents. A full-text index can be created on a single attribute only, and will index all words contained in documents that have a textual value in that attribute. Only words with a (specifiable) minimum length are indexed. Word tokenization is done using the word boundary analysis provided by libicu, which is taking into account the selected language provided at server start. Words are indexed in their lower-cased form. The index supports complete match queries (full words) and prefix queries, plus basic logical operations such as `and`, `or` and `not` for combining partial results.

The full-text index is sparse, meaning it only indexes documents for which the index attribute is set and contains a string value. Additionally, the index only includes words with a configurable minimum length.

You can use the full-text index through dedicated functions in C8QL or simple queries

You can access these operations via dedicated functions in C8QL or simple queries. They are not applied to any other types of queries.