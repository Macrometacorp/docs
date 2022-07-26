---
sidebar_position: 30
title: Working with Indexes
---

## Indexing Attributes and Sub-Attributes

Top-level as well as nested attributes can be indexed. For attributes at the top level, the attribute names alone are required. To index a single field, pass an array with a single element (string of the attribute key) to the _fields_ parameter of the ensureIndex() method.

To create an index:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
-H 'Authorization: bearer <token>'                                                  \ 0
-d '{ "fields": [ "name" ], "sparse": true, "type": "hash", "unique": true}'
```

To create a combined index over multiple fields, add more members to the _fields_ array. For example:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
-H 'Authorization: bearer <token>'                                                  \ 
-d '{ "fields": [ "name", "age" ], "sparse": true, "type": "hash", "unique": true}'
```

To index sub-attributes, specify the attribute path using the dot notation:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
-H 'Authorization: bearer <token>'                                                  \   
-d '{ "fields": [ "name.first", "name.last" ], "type": "hash"}'
```

## Indexing Array Values

If an index attribute contains an array, GDN will store the entire array as the index value by default. Accessing individual members of the array via the index is not possible this way.

To make an index insert the individual array members into the index instead of the entire array value, a special array index needs to be created for the attribute. Array indexes can be set up like regular hash or skiplist indexes using the `collection.ensureIndex()` function. To make a hash or skiplist index an array index, the index attribute name needs to be extended with <i>[\*]</i> when creating the index and when filtering in a C8QL query using the `IN` operator.

The following example creates an array hash index on the `tags` attribute in a collection named `posts`:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1' \
-H 'Authorization: bearer <token>'                                                 \
-d '{ "tags" : [ "foobar", "baz", "quux" ]}'
```

This array index can then be used for looking up individual `tags` values from C8QL queries via the `IN` operator:

```js
FOR doc IN posts
  FILTER 'foobar' IN doc.tags
  RETURN doc
```

It is possible to add the [array expansion operator](../../c8ql/array-operators.md#array-expansion) <i>[\*]</i>, but it is not mandatory. You may use it to indicate that an array index is used, it is purely cosmetic however:

```js
FOR doc IN posts
  FILTER 'foobar' IN doc.tags[*]
  RETURN doc
```

The following FILTER conditions will _not_ use the array index:

```js
FILTER doc.tags ANY == 'foobar'
FILTER doc.tags ANY IN 'foobar'
FILTER doc.tags IN 'foobar'
FILTER doc.tags == 'foobar'
FILTER 'foobar' == doc.tags
```

It is also possible to create an index on subattributes of array values. This makes sense if the index attribute is an array of objects, e.g.

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1' \
-H 'Authorization: bearer <token>'                                                 \
-d '{ "tags": [ { "name": "abc" }, { "name": "baz" }, { "name": "quux" } ] }'
```

The following query will then use the array index (this does require the [array expansion operator](working-with-indexes.md)):

```js
FOR doc IN posts
  FILTER 'foobar' IN doc.tags[*].name
  RETURN doc
```

If you store a document having the array which does contain elements not having the subattributes this document will also be indexed with the value `null`, which in GDN is equal to attribute not existing.

GDN supports creating array indexes with a single <i>[\*]</i> operator per index attribute. For example, creating an index as follows is _not_ supported:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=c1' \
 -H 'Authorization: bearer <token>'                                                             \ 
 -d '{ "fields": ["tags[*].name[*].value" ], "type" : "hash"}'
```

Array values will automatically be de-duplicated before being inserted into an array index. For example, if the following document is inserted into the collection, the duplicate array value `bar` will be inserted only once:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ tags: [ "foobar", "bar", "bar" ] }'
```

This is done to avoid redundant storage of the same index value for the same document, which would not provide any benefit.

If an array index is declared **unique**, the de-duplication of array values will happen before inserting the values into the index, so the above insert operation with two identical values `bar` will not necessarily fail

It will always fail if the index already contains an instance of the `bar` value. However, if the value `bar` is not already present in the index, then the de-duplication of the array values will effectively lead to `bar` being inserted only once.

To turn off the deduplication of array values, it is possible to set the **deduplicate** attribute on the array index to `false`. The default value for **deduplicate** is `true` however, so de-duplication will take place if not explicitly turned off.

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "fields": [ "tags[*]" ], "type" : "hash", "deduplicate": false}'
 
// will fail now
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ tags: [ "foobar", "bar", "bar" ] }'
```

If an array index is declared and you store documents that do not have an array at the specified attribute this document will not be inserted in the index. Hence the following objects will not be indexed:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "fields": [ "tags[*]" ], "type" : "hash"}'
 
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "something": "else" }'

curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": null }'
 
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": "this is no array"  }'
 
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": { content: [1, 2, 3] }  }'
```

An array index is able to index explicit `null` values. When queried for `null`values, it will only return those documents having explicitly `null` stored in the array, it will not return any documents that do not have the array at all.

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "fields": [ "tags[*]" ], "type" : "hash"}'
 
// Will not be indexed
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": null }'

// Will not be indexed
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": []  }'

// Will be indexed for null
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": [null]  }'

// Will be indexed for null, 1 and 2
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": { content: [null, 2, 3] }  }'
```

Declaring an array index as **sparse** does not have an effect on the array part of the index, this in particular means that explicit `null` values are also indexed in the **sparse** version.

If an index is combined from an array and a normal attribute the sparsity will apply for the attribute e.g.:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "fields": [ "tags[*]", "name" ], "type" : "hash", "sparse": true}'
 
// Will not be indexed
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \ 
 -d '{ "tags": null, "name: "alice" }'

// Will not be indexed
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": [], "name": "alice" }'

// Will not be indexed
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": [1, 2, 3]  }'

// Will not be indexed
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": [1, 2, 3], "name" : null }'
 
// Will be indexed for [1, "alice"], [2, "alice"], [3, "alice"]
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": [1, 2, 3], "name" : "alice"  }'
 
// Will be indexed for [null, "bob"]
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
 -H 'Authorization: bearer <token>'                                                 \
 -d '{ "tags": [null], "name" : "blob"  }'
```

:::note
Filtering using array indexes only works from within C8QL queries and only if the query filters on the indexed attribute using the `IN` operator. The other comparison operators (`==`, `!=`, `>`, `>=`, `<`, `<=`, `ANY`, `ALL`, `NONE`) currently cannot use array indexes.
:::

## Vertex centric indexes

The most important indexes for graphs are the edge indexes, indexing the `_from` and `_to` attributes of edge collections. They provide very quick access to all edges originating in or arriving at a given vertex, which allows to quickly find all neighbours of a vertex in a graph.

In many cases one would like to run more specific queries, for example finding amongst the edges originating in a given vertex only those with the 20 latest time stamps. Exactly this is achieved with "vertex centric indexes". In a sense these are localized indexes for an edge collection, which sit at every single vertex.

Technically, they are implemented in GDN as indexes, which sort the complete edge collection first by `_from` and then by other attributes. If we for example have a skiplist index on the attributes `_from` and `timestamp` of an edge collection, we can answer the above question very quickly with a single range lookup in the index.

One can create sorted indexes (type "skiplist" and "persistent") that index the special edge attributes `_from` or `_to` and additionally other attributes. These are used in graph traversals, when appropriate `FILTER` statements are found by the optimizer.

For example, to create a vertex centric index of the above type, you would simply do

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/skiplist?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "fields": [ "type" : "skiplist", ."fields": [ "_from", "timestamp" ] }'
```

Then, queries like

```js
FOR v, e, p IN 1..1 OUTBOUND "V/1" edges
  FILTER e.timestamp ALL >= "2016-11-09"
  RETURN p
```

will be considerably faster in case there are many edges originating in vertex `"V/1"` but only few with a recent time stamp.

## Collection Index Operations

**Listing all indexes of a collection:**

// Returns information about the indexes

```cURL
curl -X 'GET' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index?collection=collectionName' \
 -H 'Authorization: bearer <token>' 
```

Returns an array of all indexes defined for the collection. Note that `_key` implicitly has an index assigned to it.

**Creating an index:**

Indexes should be created using the general method `ensureIndex`.

ensures that an index exists

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/<indexType>?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ <Index description> }'
```

Ensures that an index according to the `index-description` exists. A new index will be created if none exists with the given description.

The `index-description` must contain at least a `type` attribute. Other attributes may be necessary, depending on the index type.

**type** can be one of the following values:

- `hash`: hash index
- `skiplist`: skiplist index
- `fulltext`: fulltext index
- `geo`: geo index, with one or two attributes

**name** can be a string. Index names are subject to the same character restrictions as collection names. If omitted, a name will be auto-generated so that it is unique with respect to the collection, e.g. `idx_832910498`.

**sparse** can be `true` or `false`.

For `hash`, and *`skiplist` the sparsity can be controlled, `fulltext` and `geo` are [sparse](which-index.md) by definition.

**unique** can be `true` or `false` and is supported by `hash` or `skiplist`

Calling this method returns an index object. Whether or not the index object existed before the call is indicated in the return attribute _isNewlyCreated_.

**deduplicate** can be `true` or `false` and is supported by array indexes of type `hash` or `skiplist`. It controls whether inserting duplicate index values from the same document into a unique array index will lead to a unique constraint error or not. The default value is `true`, so only a single instance of each non-unique index value will be inserted into the index per document. Trying to insert a value into the index that already exists in the index will always fail, regardless of the value of this attribute.

**Examples**

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                        \
 -d '{ "type": "hash", "fields": [ "a" ], "sparse": true }'
 
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                        \
 -d '{ "type": "hash", "fields": [ "a", "b"], "unique": true }'
```

```

**Dropping an index:**
curl -X 'DELETE' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/<collectionName>/<indexName>' \
 -H 'Authorization: bearer <token>'
```

Drops the index. If the index does not exist, then `false` is returned. If the index existed and was dropped, then `true` is returned. Note that you cannot drop some special indexes (e.g. the primary index of a collection or the edge index of an edge collection).

**Revalidating whether an index is used:**

finds an index

So you've created an index, and since its maintainance isn't for free, you definitely want to know whether your query can utilize it.

You can use explain to verify whether **skiplists** or **hash indexes** are used.
