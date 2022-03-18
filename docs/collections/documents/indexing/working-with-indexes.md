---
sidebar_position: 3
title: Working with Indexes
---

# Working with Indexes

## Indexing Attributes & Sub-Attributes

Top-level as well as nested attributes can be indexed. For attributes at the top level, the attribute names alone are required. To index a single field, pass an array with a single element (string of the attribute key) to the *fields* parameter of the ensureIndex() method. 

To create an index:

```cURL
curl -X POST "https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=c1" 
-H "Authorization: bearer <token>" 
-d "{ \"fields\": [ \"name\" ], \"sparse\": true, \"type\": \"hash\", \"unique\": true}"
```

To create a combined index over multiple fields, add more members to the *fields* array. For example:

```cURL
curl -X POST "https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=c1"
-H "Authorization: bearer <token>" 
-d "{ \"fields\": [ \"name\", \"age\" ], \"sparse\": true, \"type\": \"hash\", \"unique\": true}"
```

To index sub-attributes, specify the attribute path using the dot notation:

```cURL
curl -X POST "https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=c1" 
-H "Authorization: bearer <token>" 
-d "{ \"fields\": [ \"name.first\", \"name.last\" ], \"type\": \"hash\"}"
```

## Indexing Array Values

If an index attribute contains an array, GDN will store the entire array as the index value by default. Accessing individual members of the array via the index is not possible this way. 

To make an index insert the individual array members into the index instead of the entire array value, a special array index needs to be created for the attribute. Array indexes can be set up like regular hash or skiplist indexes using the `collection.ensureIndex()` function. To make a hash or skiplist index an array index, the index attribute name needs to be extended with <i>[\*]</i> when creating the index and when filtering in a C8QL query using the `IN` operator.

The following example creates an array hash index on the `tags` attribute in a collection named `posts`:

```cURL
curl -X POST "https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1" 
-H "Authorization: bearer <token>"
-d "{ \"tags\" : [ \"foobar\", \"baz\", \"quux\" ]}"
```

This array index can then be used for looking up individual `tags` values from C8QL queries via the `IN` operator:

```js
FOR doc IN posts
  FILTER 'foobar' IN doc.tags
  RETURN doc
```

It is possible to add the [array expansion operator](../../../c8ql/array-operators.md#array-expansion) <i>[\*]</i>, but it is not mandatory. You may use it to indicate that an array index is used, it is purely cosmetic however:

```js
FOR doc IN posts
  FILTER 'foobar' IN doc.tags[*]
  RETURN doc
```

The following FILTER conditions will *not* use the array index:

```js
FILTER doc.tags ANY == 'foobar'
FILTER doc.tags ANY IN 'foobar'
FILTER doc.tags IN 'foobar'
FILTER doc.tags == 'foobar'
FILTER 'foobar' == doc.tags
```

It is also possible to create an index on subattributes of array values. This makes sense if the index attribute is an array of objects, e.g.

```cURL
curl -X POST "https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1" 
-H "Authorization: bearer <token>"
-d "{ \"tags\": [ { \"name\": \"foobar\" }, { \"name\": \"baz\" }, { \"name\": \"quux\" } ] }"
```

The following query will then use the array index (this does require the [array expansion operator](working-with-indexes.md)):

```js
FOR doc IN posts
  FILTER 'foobar' IN doc.tags[*].name
  RETURN doc
```

If you store a document having the array which does contain elements not having the subattributes this document will also be indexed with the value `null`, which in GDN is equal to attribute not existing.

GDN supports creating array indexes with a single <i>[\*]</i> operator per index attribute. For example, creating an index as follows is *not* supported:

```js
posts.ensureIndex({ type: "hash", fields: [ "tags[*].name[*].value" ] });
```

Array values will automatically be de-duplicated before being inserted into an array index. For example, if the following document is inserted into the collection, the duplicate array value `bar` will be inserted only once:

```js
posts.insert({ tags: [ "foobar", "bar", "bar" ] });
```

This is done to avoid redudant storage of the same index value for the same document, which would not provide any benefit.

If an array index is declared **unique**, the de-duplication of array values will happen before inserting the values into the index, so the above insert operation with two identical values `bar` will not necessarily fail

It will always fail if the index already contains an instance of the `bar` value. However, if the value `bar` is not already present in the index, then the de-duplication of the array values will effectively lead to `bar` being inserted only once.

To turn off the deduplication of array values, it is possible to set the **deduplicate** attribute on the array index to `false`. The default value for **deduplicate** is `true` however, so de-duplication will take place if not explicitly turned off.

```js
posts.ensureIndex({ type: "hash", fields: [ "tags[*]" ], deduplicate: false });

// will fail now
posts.insert({ tags: [ "foobar", "bar", "bar" ] }); 
```

If an array index is declared and you store documents that do not have an array at the specified attribute this document will not be inserted in the index. Hence the following objects will not be indexed:

```js
posts.ensureIndex({ type: "hash", fields: [ "tags[*]" ] });
posts.insert({ something: "else" });
posts.insert({ tags: null });
posts.insert({ tags: "this is no array" });
posts.insert({ tags: { content: [1, 2, 3] } });
```

An array index is able to index explicit `null` values. When queried for `null`values, it will only return those documents having explicitly `null` stored in the array, it will not return any documents that do not have the array at all.

```js
posts.ensureIndex({ type: "hash", fields: [ "tags[*]" ] });
posts.insert({tags: null}) // Will not be indexed
posts.insert({tags: []})  // Will not be indexed
posts.insert({tags: [null]}); // Will be indexed for null
posts.insert({tags: [null, 1, 2]}); // Will be indexed for null, 1 and 2
```

Declaring an array index as **sparse** does not have an effect on the array part of the index, this in particular means that explicit `null` values are also indexed in the **sparse** version.

If an index is combined from an array and a normal attribute the sparsity will apply for the attribute e.g.:

```js
posts.ensureIndex({ type: "hash", fields: [ "tags[*]", "name" ], sparse: true });
posts.insert({tags: null, name: "alice"}) // Will not be indexed
posts.insert({tags: [], name: "alice"}) // Will not be indexed
posts.insert({tags: [1, 2, 3]}) // Will not be indexed
posts.insert({tags: [1, 2, 3], name: null}) // Will not be indexed
posts.insert({tags: [1, 2, 3], name: "alice"})
// Will be indexed for [1, "alice"], [2, "alice"], [3, "alice"]
posts.insert({tags: [null], name: "bob"})
// Will be indexed for [null, "bob"] 
```

:::note
Filtering using array indexes only works from within C8QL queries and only if the query filters on the indexed attribute using the `IN` operator. The other comparison operators (`==`, `!=`, `>`, `>=`, `<`, `<=`, `ANY`, `ALL`, `NONE`) currently cannot use array indexes.
:::

## Persistent Indexes

### Introduction

This is an introduction to C8DB persistent indexes.

It is possible to define a persistent index on one or more attributes (or paths) of documents. The index is then used in queries to locate documents within a given range. If the index is declared unique, then no two documents are allowed to have the same set of attribute values.

Creating a new document or updating a document will fail if the uniqueness is violated. If the index is declared sparse, a document will be excluded from the index and no uniqueness checks will be performed if any index attribute value is not set or has a value of `null`. 

### Accessing Persistent Indexes

Ensures that a unique persistent index exists
`collection.ensureIndex({ type: "persistent", fields: [ "field1", ..., "fieldn" ], unique: true })`

Creates a unique persistent index on all documents using *field1*, ... *fieldn* as attribute paths. At least one attribute path has to be given. The index will be non-sparse by default.

All documents in the collection must differ in terms of the indexed attributes. Creating a new document or updating an existing document will will fail if the attribute uniqueness is violated. 

To create a sparse unique index, set the *sparse* attribute to `true`:

`collection.ensureIndex({ type: "persistent", fields: [ "field1", ..., "fieldn" ], unique: true, sparse: true })`

In a sparse index all documents will be excluded from the index that do not contain at least one of the specified index attributes or that have a value of `null` in any of the specified index attributes. Such documents will not be indexed, and not be taken into account for uniqueness checks.

In a non-sparse index, these documents will be indexed (for non-present indexed attributes, a value of `null` will be used) and will be taken into account for uniqueness checks.

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.


To ensure that a non-unique persistent index exists
`collection.ensureIndex({ type: "persistent", fields: [ "field1", ..., "fieldn" ] })`

Creates a non-unique persistent index on all documents using *field1*, ... *fieldn* as attribute paths. At least one attribute path has to be given. The index will be non-sparse by default.

To create a sparse unique index, set the *sparse* attribute to `true`.

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

### Query by example

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

## TTL (time-to-live) Indexes

### Introduction

The TTL index type provided by GDN can be used for removing expired documents from a collection.

The TTL index is set up by setting an `expireAfter` value and by selecting a single document attribute which contains a reference point in time. For each document, that reference point in time can then be specified as a numeric timestamp (Unix timestamp) or a date string in format `YYYY-MM-DDTHH:MM:SS` with an optional timezone offset.

All date strings without a timezone offset will be interpreted as UTC dates.

Documents will count as expired when wall clock time is beyond the per-document reference point in time value plus the index' `expireAfter` value added to it. 

### Removing documents at a fixed period after creation / update

One use case supported by TTL indexes is to remove documents at a fixed duration after they have been created or last updated. This requires setting up the index with an attribute that contains the documents' creation or last-updated time.

Let's assume the index attribute is set to "creationDate", and the `expireAfter` attribute of the index was set to 600 seconds (10 minutes).

```js
    collection.ensureIndex({ type: "ttl", fields: ["creationDate"], expireAfter: 600 });
```

Let's further assume the following document now gets inserted into the collection:

```json
    { "creationDate" : 1550165973 }
```

This document will be indexed with a reference point in time value of `1550165973`, which translates to the human-readable date/time `2019-02-14T17:39:33.000Z`. The document will expire 600 seconds afterwards, which is at timestamp `1550166573` (or `2019-02-14T17:49:33.000Z` in the human-readable version). From that point on, the document is a candidate for being removed.

The numeric date time values for the index attribute need to be specified **in seconds** since January 1st 1970 (Unix timestamp). To calculate the current timestamp using JavaScript in this format, use: `Date.now() / 1000`. To calculate it from an arbitrary `Date` instance, use: `Date.getTime() / 1000`. In C8QL, you also have to divide the timestamp, e.g. `DATE_NOW() / 1000`.

Alternatively, the reference points in time can be specified as a date string in format `YYYY-MM-DDTHH:MM:SS` with an optional timezone offset. All date strings without a timezone offset will be interpreted as UTC dates.
  
The above example document using a date string attribute value would be

```json
    { "creationDate" : "2019-02-14T17:39:33.000Z" }
```

Now any data-modification access to the document could update the value in the document's `creationDate` attribute to the current date/time, which would prolong the existence of the document and keep it from being expired and removed. 

GDN will not automatically set a document's reference point in time on initial insertion or on every subsequent modification of the document. Instead, it is the responsibility of client applications to set and update the reference points in time of documents whenever the use case requires it.

### Removing documents at certain points in time

Another use case is to specify a per-document expiration/removal point in time, and setting the `expireAfter` attribute to a low value (e.g. 0 seconds).

Let's assume the index attribute is set to "expireDate", and the `expireAfter` attribute of the index was set to 0 seconds (immediately when wall clock time reaches the value specified in `expireDate`).

```js
    collection.ensureIndex({ type: "ttl", fields: ["expireDate"], expireAfter: 0 });
```

When storing the following document in the collection, it will expire at the point in time specified in the document itself:

```json
    { "expireDate" : "2019-03-28T01:06:00Z" }
```

As `expireAfter` was set to 0, the document will count as expired when wall clock time has reached the timeout.

It should be intuitive to see that the `expireDate` can be different per document. This allows mixing of documents with different expiration periods by calculating their expiration dates differently in the client application.

### Format of date/time values

The expiration date time values can be specified either as a numeric timestamp, containing the number of milliseconds since January 1st 1970 (rounded down to the nearest second), or as a date/time string in ISO 8601 format `YYYY-MM-DDTHH:MM:SS` with an optional timezone offset. The timezone offset can be specified as either `Z` (Zulu/UTC time) or as a deviation from UTC time in hours and minutes (i.e. `+HH:MM` or `-HH:MM`).

Valid example date string values are:

| Date/time string                  | Local Date    | Local Time   | Timezone Offset             |
|-----------------------------------|---------------|--------------|-----------------------------|
| `"2019-05-27"`                    | May 27th 2019 | 00:00:00     | +00:00 (UTC time)           |
| `"2019-05-27T21:20:00"`           | May 27th 2019 | 21:20:00     | +00:00 (UTC time)           |
| `"2019-05-27T21:20:00Z"`          | May 27th 2019 | 21:20:00     | +00:00 (UTC time)           |
| `"2019-05-27T21:20:00.123Z"`      | May 27th 2019 | 21:20:00.123 | +00:00 (UTC time)           |
| `"2019-05-27T21:20:00.123+01:30"` | May 27th 2019 | 21:20:00.123 | +01:30 offset from UTC time |
| `"2019-05-27T21:20:00.123-02:00"` | May 27th 2019 | 21:20:00.123 | -02:00 offset from UTC time |

Using an invalid date string value in a document's TTL index attribute will prevent the document from being inserted into the TTL index, so it will neither be expired nor removed automatically. No error is raised however.

:::note
Date string values can be programmatically validated using the AQL function `IS_DATESTRING`.
:::

### Preventing documents from being removed

In case the index attribute does not contain a numeric value nor a proper date string, the document will not be stored in the TTL index and thus will not become a candidate for expiration and removal. Providing either a non-numeric value or even no value for the index attribute is a supported way to keep documents from being expired and removed.

### Limitations

TTL indexes are designed exactly for the purpose of removing expired documents from collections. It is **not recommended** to rely on TTL indexes for user-land C8QL queries. This is because TTL indexes may store a transformed, always numerical version of the index attribute value internally even if it was originally passed in as a date string. As a result, you may see different values for the attribute, depending on whether it gets taken from the index or the document. TTL indexes will likely not be usable for filtering and sort operations in user-land C8QL queries.

> There can at most be one TTL index per collection.

The actual removal of expired documents will not necessarily happen immediately when they have reached their expiration time. 

Expired documents will eventually be removed by a background thread that is periodically going through all TTL indexes and removing the expired documents.

There is no guarantee when exactly the removal of expired documents will be carried out, so queries may still find and return documents that have already expired. These will eventually be removed when the background thread kicks in and has spare capacity to remove the expired documents. It is guaranteed however that only documents which are past their expiration time will actually be removed.
  
The frequency for invoking the background removal thread can be configured using the `--ttl.frequency` startup option. The frequency is specified in milliseconds.

In order to avoid "random" load spikes by the background thread suddenly kicking in and removing a lot of documents at once, the number of to-be-removed documents per thread invocation can be capped.

The total maximum number of documents to be removed per thread invocation is controlled by the startup option `--ttl.max-total-removes`. The maximum number of documents in a single collection at once can be controlled by the startup option `--ttl.max-collection-removes`.

:::note
There are limited number of background threads for performing the removal of expired documents of all collections in all databases. If the number of databases and collections with TTL indexes is high and there are many documents to remove from these, the background thread may at least temporarily lag behind with its removal operations. It should eventually catch up in case the number of to-be-removed documents per invocation is not higher than the background thread's configured threshold values.
:::

### Accessing TTL Indexes

Ensures that a TTL index exists:

`collection.ensureIndex({ type: "ttl", fields: [ "field" ], expireAfter: 600 })`

Creates a TTL index on all documents using *field* as attribute path. Exactly one attribute path has to be given. The index will be sparse in all cases.

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

## Fulltext Indexes

### Introduction

A fulltext index can be used to find words, or prefixes of words inside documents.

A fulltext index can be defined on one attribute only, and will include all words contained in documents that have a textual value in the index attribute.

For example, given a fulltext index on the `translations` attribute and the following documents, then searching for `лиса` using the fulltext index would return only the first document. Searching for the index for the exact string `Fox` would return the first two documents, and searching for `prefix:Fox` would return all three documents:

```js
{ translations: { en: "fox", de: "Fuchs", fr: "renard", ru: "лиса" } }
{ translations: "Fox is the English translation of the German word Fuchs" }
{ translations: [ "C8DB", "document", "database", "Fox" ] }
```

:::note
Deeper nested objects are ignored. For example, a fulltext index on *translations* would index *Fuchs*, but not *fox*, given the following document structure:
:::
```js
{ translations: { en: { US: "fox" }, de: "Fuchs" }
```

If you need to search across multiple fields and/or nested objects, you may write all the strings into a special attribute, which you then create the index on (it might be necessary to clean the strings first, e.g. remove line breaks and strip certain words).

If the index attribute is neither a string, an object or an array, its contents will not be indexed. When indexing the contents of an array attribute, an array member will only be included in the index if it is a string. When indexing the contents of an object attribute, an object member value will only be included in the index if it is a string. Other data types are ignored and not indexed.

### Accessing Fulltext Indexes

Ensures that a fulltext index exists:

`collection.ensureIndex({ type: "fulltext", fields: [ "field" ], minLength: minLength })`

Creates a fulltext index on all documents on attribute *field*.

Fulltext indexes are implicitly sparse: all documents which do not have the specified *field* attribute or that have a non-qualifying value in their *field* attribute will be ignored for indexing.

:::note
Only a single attribute can be indexed. Specifying multiple attributes is unsupported.
:::

The minimum length of words that are indexed can be specified via the *minLength* parameter. Words shorter than minLength characters will not be indexed. *minLength* has a default value of 2. It is thus recommended to explicitly specify this value.

In case that the index was successfully created, an object with the index details is returned.

Looks up a fulltext index:

`collection.lookupFulltextIndex(attribute, minLength)`

Checks whether a fulltext index on the given attribute *attribute* exists.

### Fulltext C8QL Functions

Fulltext C8QL functions are detailed in [Fulltext functions](../../../c8ql/functions/fulltext.md).

## Geo-Spatial Indexes

GDN features [Google S2](http://s2geometry.io/){:target="_blank"} based geospatial index. Indexing is supported for a subset of the [**GeoJSON**](#geojson) geometry types as well as simple latitude longitude pairs.

C8QL's geospatial functions and GeoJSON constructors are described in [Geo functions](working-with-indexes.md).

The geospatial index supports containment and intersection queries for various geometric 2D shapes. You should be mainly using AQL queries to perform these types of operations. The index can operate in **two different modes**, depending on if you want to use the GeoJSON data-format or not. The modes are mainly toggled by using the `geoJson` field when creating the index.

This index assumes coordinates with the latitude between -90 and 90 degrees and the longitude between -180 and 180 degrees. A geo index will ignore all documents which do not fulfill these requirements.

### GeoJSON Mode

To create an index in GeoJSON mode execute:

```js
collection.ensureIndex({ type: "geo", fields: [ "geometry" ], geoJson:true })
```

This creates the index on all documents and uses _geometry_ as the attributed field where the value is either a [Geometry Object](https://tools.ietf.org/html/rfc7946#section-3.1){:target="_blank"} **or** a _coordinate array_. 

The array must contain at least two numeric values with longitude (first value) and the latitude (second value). This corresponds to the format described in [RFC 7946 Position](https://tools.ietf.org/html/rfc7946#section-3.1.1){:target="_blank"}.

All documents, which do not have the attribute path or have a non-conform value in it, are excluded from the index.

A geo index is implicitly sparse, and there is no way to control its sparsity. In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

### Non-GeoJSON mode

This index mode exclusively supports indexing on coordinate arrays. Values that contain GeoJSON or other types of data will be ignored. In the non-GeoJSON mode the index can be created on one or two fields.

To create a geo-spatial index on all documents using *latitude* and *longitude* as separate attribute paths, two paths need to be specified in the *fields* array:

`collection.ensureIndex({ type: "geo", fields: [ "latitude", "longitude" ] })`

The first field is always defined to be the _latitude_ and the second is the _longitude_. The `geoJson` flag is implicitly _false_ in this mode.

Alternatively you can specify only one field:

`collection.ensureIndex({ type: "geo", fields: [ "location" ], geoJson:false })`

It creates a geospatial index on all documents using *location* as the path to the coordinates. The value of the attribute has to be an array with at least two numeric values. The array must contain the latitude (first value) and the longitude (second value).

All documents, which do not have the attribute path(s) or have a non-conforming value in it, are excluded from the index.

A geo index is implicitly sparse, and there is no way to control its sparsity. In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

### Indexed GeoSpatial Queries

The geospatial index supports a variety of C8QL queries, which can be built with the help of the [geo utility functions](working-with-indexes.md). There are three specific geo functions that can be optimized, provided that they are used correctly: `GEO_DISTANCE, GEO_CONTAINS, GEO_INTERSECTS`. Additionally, there is a built-in support to optimize the older geo functions `DISTANCE`, `NEAR` and `WITHIN` (the last two only if they are used in their 4 argument version, without *distanceName*).

When in doubt whether your query is being properly optimized, check the [C8QL explain](working-with-indexes.md) output to check for index usage.

#### Query for Results near Origin (NEAR type query)

A basic example of a query for results near an origin point:

```sql
FOR x IN geo_collection
  FILTER GEO_DISTANCE([@lng, @lat], x.geometry) <= 100000
  RETURN x._key
```

The first parameter can be a GeoJSON object or a coordinate array in `[longitude, latitude]` ordering. The second parameter is the document field on which the index was created. The function `GEO_DISTANCE` always returns the distance in meters, so will receive results up until _100km_.

#### Query for Sorted Results near Origin (NEAR type query)

A basic example of a query for the 1000 nearest results to an origin point (ascending sorting):

```sql
FOR x IN geo_collection
  SORT GEO_DISTANCE([@lng, @lat], x.geometry) ASC
  LIMIT 1000
  RETURN x._key
```

The first parameter can be a GeoJSON object or a coordinate array in `[longitude, latitude]` ordering. The second parameter is the documents field on which the index was created.

You may also get results farthest away (distance sorted in descending order):

```sql
FOR x IN geo_collection
  SORT GEO_DISTANCE([@lng, @lat], x.geometry) DESC
  LIMIT 1000
  RETURN x._key
```

#### Query for Results within Distance

A query which returns documents at a distance of _1km_ or farther away, up to _100km_ from the origin. This will return the documents with a GeoJSON value that is located in the specified search annulus.

```sql
FOR x IN geo_collection
  FILTER GEO_DISTANCE([@lng, @lat], x.geometry) <= 100000
  FILTER GEO_DISTANCE([@lng, @lat], x.geometry) >= 1000
  RETURN x
```

#### Query for Results contained in Polygon

A query which returns documents whose stored geometry is contained within a GeoJSON Polygon.

```sql
LET polygon = GEO_POLYGON([[[60,35],[50,5],[75,10],[70,35]]])
FOR x IN geo_collection
  FILTER GEO_CONTAINS(polygon, x.geometry)
  RETURN x
```

The first parameter of `GEO_CONTAINS` must be a polygon. Other types are not valid. The second parameter must contain the document field on which the index was created.

#### Query for Results Intersecting a Polygon

A query which returns documents with an intersection of their stored geometry and a GeoJSON Polygon.

```sql
LET polygon = GEO_POLYGON([[[60,35],[50,5],[75,10],[70,35]]])
FOR x IN geo_collection
  FILTER GEO_INTERSECTS(polygon, x.geometry)
  RETURN x
```

The first parameter of `GEO_INTERSECTS` must be a polygon. Other types are not valid. The second parameter must contain the document field on which the index was created.

### GeoJSON

GeoJSON is a geospatial data format based on JSON. It defines several different types of JSON objects and the way in which they can be combined to represent data about geographic shapes on the earth surface. GeoJSON uses a geographic coordinate reference system, World Geodetic System 1984 (WGS 84), and units of decimal degrees.

Internally GDN maps all coordinates onto a unit sphere. Distances are projected onto a sphere with the Earth's *Volumetric mean radius* of *6371 km*. GDN implements a useful subset of the GeoJSON format [(RFC 7946)](https://tools.ietf.org/html/rfc7946){:target="_blank"}. Feature Objects and the GeometryCollection type are not supported. 

Supported geometry object types are:

- Point
- MultiPoint
- LineString
- MultiLineString
- Polygon

#### Point

A [GeoJSON Point](https://tools.ietf.org/html/rfc7946#section-3.1.2){:target="_blank"} is a [position](https://tools.ietf.org/html/rfc7946#section-3.1.1){:target="_blank"} comprised of a longitude and a latitude:

```json
{
  "type": "Point",
  "coordinates": [100.0, 0.0]
}
```

#### MultiPoint

A [GeoJSON MultiPoint](https://tools.ietf.org/html/rfc7946#section-3.1.7){:target="_blank"} is an array of positions:

```json
{
  "type": "MultiPoint",
  "coordinates": [
    [100.0, 0.0],
    [101.0, 1.0]
  ]
}
```

#### LineString

A [GeoJSON LineString](https://tools.ietf.org/html/rfc7946#section-3.1.4){:target="_blank"} is an array of two or more positions:

```json
{
  "type": "LineString",
  "coordinates": [
    [100.0, 0.0],
    [101.0, 1.0]
  ]
}
```

#### MultiLineString

A [GeoJSON MultiLineString](https://tools.ietf.org/html/rfc7946#section-3.1.5){:target="_blank"} is an array of LineString coordinate arrays:

```json
{
  "type": "MultiLineString",
  "coordinates": [
    [
      [100.0, 0.0],
      [101.0, 1.0]
    ],
    [
      [102.0, 2.0],
      [103.0, 3.0]
    ]
  ]
}
```

#### Polygon

A [GeoJSON Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6){:target="_blank"} consists of a series of closed `LineString` objects (ring-like). These *Linear Ring* objects consist of four or more vertices with the first and last coordinate pairs being equal. Coordinates of a Polygon are an array of linear ring coordinate arrays. The first element in the array represents the exterior ring.

Any subsequent elements represent interior rings (holes within the surface).

- A linear ring may not be empty, it needs at least three _distinct_ coordinates
- Within the same linear ring consecutive coordinates may be the same, otherwise (except the first and last one) all coordinates need to be distinct
- A linear ring defines two regions on the sphere. GDN will always interpret the region of smaller area to be the interior of the ring. This introduces a practical limitation that no polygon may have an outer ring enclosing more than half the Earth's surface

**No Holes:**

```json
{
  "type": "Polygon",
    "coordinates": [
    [
      [100.0, 0.0],
      [101.0, 0.0],
      [101.0, 1.0],
      [100.0, 1.0],
      [100.0, 0.0]
    ]
  ]
}
```

**With Holes:**

- The exterior ring should not self-intersect.
- The interior rings must be contained in the outer ring
- No two rings can cross each other, i.e. no ring may intersect both the interior and exterior face of another ring
- Rings cannot share edges, they may however share vertices
- No ring may be empty
- Polygon rings should follow the right-hand rule for orientation (counterclockwise external rings, clockwise internal rings).

```json
{
  "type": "Polygon",
  "coordinates": [
    [
      [100.0, 0.0],
      [101.0, 0.0],
      [101.0, 1.0],
      [100.0, 1.0],
      [100.0, 0.0]
    ],
    [
      [100.8, 0.8],
      [100.8, 0.2],
      [100.2, 0.2],
      [100.2, 0.8],
      [100.8, 0.8]
    ]
  ]
}
```

#### MultiPolygon

A [GeoJSON MultiPolygon](https://tools.ietf.org/html/rfc7946#section-3.1.6){:target="_blank"} consists of multiple polygons. The "coordinates" member is an array of _Polygon_ coordinate arrays. 

- Polygons in the same MultiPolygon may not share edges, they may share coordinates
- Polygons and rings must not be empty
- A linear ring defines two regions on the sphere. GDN will always interpret the region of smaller area to be the interior of the ring. This introduces a practical limitation that no polygon may have an outer ring enclosing more than half the Earth's surface
- Linear rings **must** follow the right-hand rule for orientation (counterclockwise external rings, clockwise internal rings).

Example with two polygons, the second one with a hole:

```json
{
    "type": "MultiPolygon",
    "coordinates": [
        [
            [
                [102.0, 2.0],
                [103.0, 2.0],
                [103.0, 3.0],
                [102.0, 3.0],
                [102.0, 2.0]
            ]
        ],
        [
            [
                [100.0, 0.0],
                [101.0, 0.0],
                [101.0, 1.0],
                [100.0, 1.0],
                [100.0, 0.0]
            ],
            [
                [100.2, 0.2],
                [100.2, 0.8],
                [100.8, 0.8],
                [100.8, 0.2],
                [100.2, 0.2]
            ]
        ]
    ]
}
```

#### Examples

ensures that a geo index exists
`collection.ensureIndex({ type: "geo", fields: [ "location" ] })`

Creates a geospatial index on all documents using *location* as the path to the coordinates. The value of the attribute has to be an array with at least two numeric values. The array must contain the latitude (first value) and the longitude (second value).

All documents, which do not have the attribute path or have a non-conforming value in it, are excluded from the index.

A geo index is implicitly sparse, and there is no way to control its sparsity.

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

To create a geo index on an array attribute that contains longitude first, set the *geoJson* attribute to `true`. This corresponds to the format described in [RFC 7946 Position](https://tools.ietf.org/html/rfc7946#section-3.1.1){:target="_blank"}

`collection.ensureIndex({ type: "geo", fields: [ "location" ], geoJson: true })`

To create a geo-spatial index on all documents using *latitude* and *longitude* as separate attribute paths, two paths need to be specified in the *fields* array:

`collection.ensureIndex({ type: "geo", fields: [ "latitude", "longitude" ] })`

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.


ensures that a geo index exists
`collection.ensureIndex({ type: "geo", fields: [ "location" ] })`

This method is an alias for *ensureGeoIndex* since geo indexes are always sparse, meaning that documents that do not contain the index attributes or has non-numeric values in the index attributes will not be indexed. *ensureGeoConstraint* is deprecated and *ensureGeoIndex* should be used instead.

The index does not provide a `unique` option because of its limited usability. It would prevent identical coordinates from being inserted only, but even a slightly different location (like 1 inch or 1 cm off) would be unique again and not considered a duplicate, although it probably should. The desired threshold for detecting duplicates may vary for every project (including how to calculate the distance even) and needs to be implemented on the application layer as needed. 

## Vertex centric indexes

As mentioned above, the most important indexes for graphs are the edge indexes, indexing the `_from` and `_to` attributes of edge collections. They provide very quick access to all edges originating in or arriving at a given vertex, which allows to quickly find all neighbours of a vertex in a graph.

In many cases one would like to run more specific queries, for example finding amongst the edges originating in a given vertex only those with the 20 latest time stamps. Exactly this is achieved with "vertex centric indexes". In a sense these are localized indexes for an edge collection, which sit at every single vertex.

Technically, they are implemented in GDN as indexes, which sort the complete edge collection first by `_from` and then by other attributes. If we for example have a skiplist index on the attributes `_from` and `timestamp` of an edge collection, we can answer the above question very quickly with a single range lookup in the index.

One can create sorted indexes (type "skiplist" and "persistent") that index the special edge attributes `_from` or `_to` and additionally other attributes. These are used in graph traversals, when appropriate `FILTER` statements are found by the optimizer.

For example, to create a vertex centric index of the above type, you would simply do

```js
edges.ensureIndex({"type":"skiplist", "fields": ["_from", "timestamp"]});
```

Then, queries like

```js
FOR v, e, p IN 1..1 OUTBOUND "V/1" edges
  FILTER e.timestamp ALL >= "2016-11-09"
  RETURN p
```

will be considerably faster in case there are many edges originating in vertex `"V/1"` but only few with a recent time stamp.

## Index Identifiers & Handles

An `index handle` uniquely identifies an index in the database. It is a string and consists of the collection name and an `index identifier` separated by a `/`. The index identifier part is a numeric value that is auto-generated by GDN.

A specific index of a collection can be accessed using its *index handle* or *index identifier* as follows:

```js
collection.index("<index-handle>");
collection.index("<index-identifier>");
_index("<index-handle>");
```

For example: Assume that the index handle, which is stored in the `_id` attribute of the index, is `demo/362549736` and the index was created in a collection named `demo`. Then this index can be accessed as:

```js
demo.index("demo/362549736");
```

Because the index handle is unique within the database, you can leave out the *collection* and use the shortcut:

```js
_index("demo/362549736");
```

## Collection Methods

**Listing all indexes of a collection:**

`getIndexes()` -  returns information about the indexes

Returns an array of all indexes defined for the collection. Note that `_key` implicitly has an index assigned to it.

**Creating an index:**

Indexes should be created using the general method `ensureIndex`. 

ensures that an index exists
`collection.ensureIndex(index-description)`

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

Calling this method returns an index object. Whether or not the index object existed before the call is indicated in the return attribute *isNewlyCreated*.

**deduplicate** can be `true` or `false` and is supported by array indexes of type `hash` or `skiplist`. It controls whether inserting duplicate index values from the same document into a unique array index will lead to a unique constraint error or not. The default value is `true`, so only a single instance of each non-unique index value will be inserted into the index per document. Trying to insert a value into the index that already exists in the index will always fail, regardless of the value of this attribute.

**Examples**

```bash
test.ensureIndex({ type: "hash", fields: [ "a" ], sparse: true });
test.ensureIndex({ type: "hash", fields: [ "a", "b" ], unique: true });
```

**Dropping an index:**

drops an index `collection.dropIndex(index)`

Drops the index. If the index does not exist, then `false` is returned. If the index existed and was dropped, then `true` is returned. Note that you cannot drop some special indexes (e.g. the primary index of a collection or the edge index of an edge collection).

`collection.dropIndex(index-handle)`

Same as above. Instead of an index an index handle can be given.

## GeoFabric Methods

**Fetching an index by handle**

finds an index `_index(index-handle)`

Returns the index with `index-handle` or null if no such index exists.

**Dropping an index:**

drops an index
`_dropIndex(index)`

Drops the `index`.  If the index does not exist, then `false` is returned. If the index existed and was dropped, then `true` is returned.

`_dropIndex(index-handle)`

Drops the index with `index-handle`.

**Revalidating whether an index is used:**

finds an index

So you've created an index, and since its maintainance isn't for free, you definitely want to know whether your query can utilize it.

You can use explain to verify whether **skiplists** or **hash indexes** are used.

## Creating Indexes in Background

Creating new indexes is by default done under an exclusive collection lock. This means that the collection (or the respective shards) are not available for write operations as long as the index is created. This "foreground" index creation can be undesirable, if you have to perform it on a live system without a dedicated maintenance window.

Indexes can also be created in "background", not using an exclusive lock during the entire index creation. The collection remains basically available, so that other CRUD operations can run on the collection while the index is being created. This can be achieved by setting the *inBackground* attribute when creating an index.

To create an index in the background, just specify `inBackground: true`, like in the following examples:

```js
// create the hash index in the background
collection.ensureIndex({ type: "hash", fields: [ "value" ], unique: false, inBackground: true });
collection.ensureIndex({ type: "hash", fields: [ "email" ], unique: true, inBackground: true });

// skiplist indexes work also of course
collection.ensureIndex({ type :"skiplist", fields: ["abc", "cdef"], unique: true, inBackground: true });
collection.ensureIndex({ type :"skiplist", fields: ["abc", "cdef"], sparse: true, inBackground: true });

// also supported on fulltext indexes
collection.ensureIndex({ type: "geo", fields: [ "latitude", "longitude"], inBackground: true });
collection.ensureIndex({ type: "geo", fields: [ "latitude", "longitude"], inBackground: true });
collection.ensureIndex({ type: "fulltext", fields: [ "text" ], minLength: 4, inBackground: true })
```

**Behavior:**

Indexes that are still in the build process will not be visible via the GDN APIs. Nevertheless it is not possible to create the same index twice via the *ensureIndex* API while an index is still begin created. AQL queries also will not use these indexes until the index reports back as fully created. Note that the initial *ensureIndex* call or HTTP request will still block until the index is completely ready. Existing single-threaded client programs can thus safely set the *inBackground* option to *true* and continue to work as before.

:::info
Should you be building an index in the background you cannot rename or drop the collection. These operations will block until the index creation is finished. This is equally the case with foreground indexing.
:::
**Performance:**

Background index creation might be slower than the "foreground" index creation and require more RAM. Under a write heavy load (specifically many remove, update or replace operations), the background index creation needs to keep a list of removed documents in RAM. This might become unsustainable if this list grows to tens of millions of entries.

Building an index is always a write heavy operation (internally), it is always a good idea to build indexes during times with less load.

## Troubleshooting

When in doubt about whether and which indexes will be used for executing a given C8QL query, click the `Explain` button in the web interface in the `Queries` view or use the `explain()` method for the statement as follows:

```js
var query = "FOR doc IN collection FILTER doc.value > 42 RETURN doc";
var stmt = createStatement(query);
stmt.explain();
```

The `explain()` command will return a detailed JSON representation of the query's execution plan. The JSON explain output is intended to be used by code. To get a human-readable and much more compact explanation of the query, there is an explainer tool:

```js
var query = "FOR doc IN collection FILTER doc.value > 42 RETURN doc";
require("@c8db_db/c8ql/explainer").explain(query);
```

If any of the explain methods shows that a query is not using indexes, the following steps may help:

* check if the attribute names in the query are correctly spelled. In a schema-free database, documents in the same collection can have varying structures. There is no such thing as a `non-existing attribute` error. A query that refers to attribute names not present in any of the documents will not return an error, and obviously will not benefit from indexes.

* check the return value of the `getIndexes()` method for the collections used in the query and validate that indexes are actually present on the attributes used in the query's filter conditions. 

* if indexes are present but not used by the query, the indexes may have the wrong type. For example, a hash index will only be used for equality comparisons (i.e. `==`) but not for other comparison types such as `<`, `<=`, `>`, `>=`. Additionally hash indexes will only be used if all of the index attributes are used in the query's FILTER conditions. A skiplist index will only be used if at least its first attribute is used in a FILTER condition. If additionally of the skiplist index attributes are specified in the query (from left-to-right), they may also be used and allow to filter more documents.

* using indexed attributes as function parameters or in arbitrary expressions will likely lead to the index on the attribute not being used. For example, the following queries will not use an index on `value`:

```sql
      FOR doc IN collection FILTER TO_NUMBER(doc.value) == 42 RETURN doc
      FOR doc IN collection FILTER doc.value - 1 == 42 RETURN doc
```

  In these cases the queries should be rewritten so that only the index attribute is present on one side of the operator, or additional filters and indexes should be used to restrict the amount of documents otherwise.

* certain C8QL functions such as `WITHIN()` or `FULLTEXT()` do utilize indexes internally, but their use is not mentioned in the query explanation for functions in general. These functions will raise query errors (at runtime) if no suitable index is present for the collection in question.

* the query optimizer will in general pick one index per collection in a query. It can pick more than one index per collection if the FILTER condition contains multiple branches combined with logical `OR`.  For example, the following queries can use indexes:

```sql
      FOR doc IN collection FILTER doc.value1 == 42 || doc.value1 == 23 RETURN doc
      FOR doc IN collection FILTER doc.value1 == 42 || doc.value2 == 23 RETURN doc
      FOR doc IN collection FILTER doc.value1 < 42 || doc.value2 > 23 RETURN doc
```

  The two `OR`s in the first query will be converted to an `IN` list, and if there is a suitable index on `value1`, it will be used. The second query requires two separate indexes on `value1` and `value2` and will use them if present. The third query can use the indexes on `value1` and `value2` when they are sorted.

