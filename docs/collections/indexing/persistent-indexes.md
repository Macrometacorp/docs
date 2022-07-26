---
sidebar_position: 60
title: Persistent Indexes
---

This is an introduction to C8DB persistent indexes. In a persistent index, the index entries are written to disk when documents are stored or updated.

It is possible to define a persistent index on one or more attributes (or paths) of documents. The index is then used in queries to locate documents within a given range. If the index is declared unique, then no two documents are allowed to have the same set of attribute values.

Creating a new document or updating a document will fail if the uniqueness is violated. If the index is declared sparse, a document will be excluded from the index and no uniqueness checks will be performed if any index attribute value is not set or has a value of `null`.

## Create Persistent Index in GDN Console

1. [Log in to your Macrometa account](https://auth.paas.macrometa.io/).
1. Click **COLLECTIONS**.
1. Click the collection that you want to create an index for.
1. Click **Indexes**.
1. In **Type**, select **Persistent Index**.
1. Enter the following information:

   - **Fields -** Choose one or more attributes from the collection.
   - **Name -** The name of the index. If left blank, then Macrometa autogenerates the name.
   - **Unique -** If true, will create a unique index.
   - **Sparse -** If true, will create the sparse index.
   - **Deduplicate Array Values -** If selected, duplicate index values from the same document into a
unique array index.
   - **Create in Background -** If true, will create an index in the background rather than lock the collection while the index is created. This allows for basic CRUD operations to occur while the index is created. For more information, refer to [Create Index in Background](create-index-in-background.md).

1. Click **Create**.

## Accessing Persistent Indexes

Ensures that a unique persistent index exists

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/persistent?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                              \    
 -d '{ "fields": [ "type" : "persistent", "fields::["field1", ..., "fieldn" ], "unique": true}'
```

Creates a unique persistent index on all documents using *field1*, ... *fieldn* as attribute paths. At least one attribute path has to be given. The index will be non-sparse by default.

All documents in the collection must differ in terms of the indexed attributes. Creating a new document or updating an existing document will will fail if the attribute uniqueness is violated. 

To create a sparse unique index, set the *sparse* attribute to `true`:
```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/persistent?collection=collectionName'  \
 -H 'Authorization: bearer <token>'                                                                               \
 -d '{ "fields": [ "type" : "persistent", "fields: ["field1", ..., "fieldn" ], "unique": true, "sparse" : true}'
```

In a sparse index all documents will be excluded from the index that do not contain at least one of the specified index attributes or that have a value of `null` in any of the specified index attributes. Such documents will not be indexed, and not be taken into account for uniqueness checks.

In a non-sparse index, these documents will be indexed (for non-present indexed attributes, a value of `null` will be used) and will be taken into account for uniqueness checks.

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.


To ensure that a non-unique persistent index exists
```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/persistent?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                              \
 -d '{ "fields": [ "type" : "persistent", "fields::["field1", ..., "fieldn" ]}'
```

Creates a non-unique persistent index on all documents using *field1*, ... *fieldn* as attribute paths. At least one attribute path has to be given. The index will be non-sparse by default.

To create a sparse unique index, set the *sparse* attribute to `true`.

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

## Query by example

constructs a query-by-example using a persistent index `collection.byExample(example)`

Selects all documents from the collection that match the specified example and returns a cursor. A persistent index will be used if present.

You can use *toArray*, *next*, or *hasNext* to access the result. The result can be limited using the *skip* and *limit* operator.

An attribute name of the form *a.b* is interpreted as attribute path, not as attribute. If you use

```json
{ "a" : { "c" : 1 } }
```

as example, then you will find all documents, such that the attribute *a* contains a document of the form *{c : 1 }*. For example the document

```json
{ "a" : { "c" : 1 }, "b" : 1 }
```

will match, but the document

```json
{ "a" : { "c" : 1, "b" : 1 } }
```

will not.

However, if you use

```json
{ "a.c" : 1 },
```

then you will find all documents, which contain a sub-document in *a* that has an attribute *c* of value *1*. Both the following documents

```json
{ "a" : { "c" : 1 }, "b" : 1 }
```
and

```json
{ "a" : { "c" : 1, "b" : 1 } }
```
will match.