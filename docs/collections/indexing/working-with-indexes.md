---
sidebar_position: 30
title: Working with Indexes
---

## Indexing Attributes & Sub-Attributes

Top-level as well as nested attributes can be indexed. For attributes at the top level, the attribute names alone are required. To index a single field, pass an array with a single element (string of the attribute key) to the *fields* parameter of the ensureIndex() method. 

To create an index:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/document/c1'  \
-H 'Authorization: bearer <token>'                                                  \ 0
-d '{ "fields": [ "name" ], "sparse": true, "type": "hash", "unique": true}'
```

To create a combined index over multiple fields, add more members to the *fields* array. For example:

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

GDN supports creating array indexes with a single <i>[\*]</i> operator per index attribute. For example, creating an index as follows is *not* supported:

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



## Geo-Spatial Indexes

GDN features [Google S2](http://s2geometry.io/){:target="_blank"} based geospatial index. Indexing is supported for a subset of the [**GeoJSON**](#geojson) geometry types as well as simple latitude longitude pairs.

C8QL's geospatial functions and GeoJSON constructors are described in [Geo functions](working-with-indexes.md).

The geospatial index supports containment and intersection queries for various geometric 2D shapes. You should be mainly using AQL queries to perform these types of operations. The index can operate in **two different modes**, depending on if you want to use the GeoJSON data-format or not. The modes are mainly toggled by using the `geoJson` field when creating the index.

This index assumes coordinates with the latitude between -90 and 90 degrees and the longitude between -180 and 180 degrees. A geo index will ignore all documents which do not fulfill these requirements.

### GeoJSON Mode

To create an index in GeoJSON mode execute:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/geo?collection=collectionName'  \
 -H 'Authorization: bearer <token>'                                                                        \
 -d '{ "fields": [ "type" : "geo", ."fields": ["geometry"],  "geoJson": true }'
```

This creates the index on all documents and uses _geometry_ as the attributed field where the value is either a [Geometry Object](https://tools.ietf.org/html/rfc7946#section-3.1){:target="_blank"} **or** a _coordinate array_. 

The array must contain at least two numeric values with longitude (first value) and the latitude (second value). This corresponds to the format described in [RFC 7946 Position](https://tools.ietf.org/html/rfc7946#section-3.1.1){:target="_blank"}.

All documents, which do not have the attribute path or have a non-conform value in it, are excluded from the index.

A geo index is implicitly sparse, and there is no way to control its sparsity. In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

### Non-GeoJSON mode

This index mode exclusively supports indexing on coordinate arrays. Values that contain GeoJSON or other types of data will be ignored. In the non-GeoJSON mode the index can be created on one or two fields.

To create a geo-spatial index on all documents using *latitude* and *longitude* as separate attribute paths, two paths need to be specified in the *fields* array:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/geo?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                       \  
 -d '{ "fields": [ "type" : "geo", ."fields": ["latitude", "longitude"] }'
```

The first field is always defined to be the _latitude_ and the second is the _longitude_. The `geoJson` flag is implicitly _false_ in this mode.

Alternatively you can specify only one field:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/geo?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                       \
 -d '{ "fields": [ "type" : "geo", ."fields": ["location"],  "geoJson": false }'
```

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

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/geo?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                       \
 -d '{ "fields": [ "type" : "geo", ."fields": ["location"]}'
```
Creates a geospatial index on all documents using *location* as the path to the coordinates. The value of the attribute has to be an array with at least two numeric values. The array must contain the latitude (first value) and the longitude (second value).

All documents, which do not have the attribute path or have a non-conforming value in it, are excluded from the index.

A geo index is implicitly sparse, and there is no way to control its sparsity.

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.

To create a geo index on an array attribute that contains longitude first, set the *geoJson* attribute to `true`. This corresponds to the format described in [RFC 7946 Position](https://tools.ietf.org/html/rfc7946#section-3.1.1){:target="_blank"}

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/geo?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                       \
 -d '{ "fields": [ "type" : "geo", ."fields": ["location"],  "geoJson": true }'
```

To create a geo-spatial index on all documents using *latitude* and *longitude* as separate attribute paths, two paths need to be specified in the *fields* array:

```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/geo?collection=collectionName'  \
 -H 'Authorization: bearer <token>'                                                                        \
 -d '{ "fields": [ "type" : "geo", ."fields": ["latitude", "longitude" ] }'
```

In case that the index was successfully created, an object with the index details, including the index-identifier, is returned.


ensures that a geo index exists
```cURL
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/geo?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                       \
 -d '{ "fields": [ "type" : "geo", ."fields": [ "location" ] }'
```

This method is an alias for *ensureGeoIndex* since geo indexes are always sparse, meaning that documents that do not contain the index attributes or has non-numeric values in the index attributes will not be indexed. *ensureGeoConstraint* is deprecated and *ensureGeoIndex* should be used instead.

The index does not provide a `unique` option because of its limited usability. It would prevent identical coordinates from being inserted only, but even a slightly different location (like 1 inch or 1 cm off) would be unique again and not considered a duplicate, although it probably should. The desired threshold for detecting duplicates may vary for every project (including how to calculate the distance even) and needs to be implemented on the application layer as needed. 

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

Calling this method returns an index object. Whether or not the index object existed before the call is indicated in the return attribute *isNewlyCreated*.

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

## Creating Indexes in Background

Creating new indexes is by default done under an exclusive collection lock. This means that the collection (or the respective shards) are not available for write operations as long as the index is created. This "foreground" index creation can be undesirable, if you have to perform it on a live system without a dedicated maintenance window.

Indexes can also be created in "background", not using an exclusive lock during the entire index creation. The collection remains basically available, so that other CRUD operations can run on the collection while the index is being created. This can be achieved by setting the *inBackground* attribute when creating an index.

To create an index in the background, just specify `inBackground: true`, like in the following examples:

```js

```cURL
// create the hash index in the background
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                        \
 -d '{ "type": "hash", "fields": [ "value" ], "unique": false, "inBackground": true }'
 
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/hash?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                        \
 -d '{ "type": "hash", "fields": [ "email" ], "unique": true, "inBackground": true }'
 
 
// skiplist indexes work also of course
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/skiplist?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "type": "skiplist", "fields": [ "abc", "def" ], "unique": true, "inBackground": true }'

curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/skiplist?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "type": "skiplist", "fields": [ "abc", "def" ], "sparse": true, "inBackground": true }'

// Also supported on fulltext and Geo indexes
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/fulltext?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "type": "fulltext", "fields": [ "text" ], "minLength": 4, "inBackground": true }'
 
curl -X 'POST' 'https://api-gdn.eng.macrometa.io/_fabric/_system/_api/index/geo?collection=collectionName' \
 -H 'Authorization: bearer <token>'                                                                            \
 -d '{ "type": "geo", "fields": [ "latitude", "longitude" ], "minLength": 4, "inBackground": true }'
```

**Behavior:**

Indexes that are still in the build process will not be visible via the GDN APIs. Nevertheless it is not possible to create the same index twice via the *ensureIndex* API while an index is still begin created. AQL queries also will not use these indexes until the index reports back as fully created. Note that the initial *ensureIndex* call or HTTP request will still block until the index is completely ready. Existing single-threaded client programs can thus safely set the *inBackground* option to *true* and continue to work as before.

:::info
Should you be building an index in the background you cannot rename or drop the collection. These operations will block until the index creation is finished. This is equally the case with foreground indexing.
:::
**Performance:**

Background index creation might be slower than the "foreground" index creation and require more RAM. Under a write heavy load (specifically many remove, update or replace operations), the background index creation needs to keep a list of removed documents in RAM. This might become unsustainable if this list grows to tens of millions of entries.

Building an index is always a write heavy operation (internally), it is always a good idea to build indexes during times with less load.
