---
sidebar_position: 7
---

# Geo functions

## Geo utility functions

The following helper functions **can** use geo indexes, but do not have to in all cases. You can use all of these functions in combination with each other, and if you have configured a geo index it may be utilized, see [Geo Indexing](../../collections/documents/indexing/working-with-indexes#geo-spatial-indexes).

### DISTANCE()

`DISTANCE(latitude1, longitude1, latitude2, longitude2) → distance`

Calculate the distance between two arbitrary coordinates in meters (as birds would fly). The value is computed using the haversine formula, which is based on a spherical Earth model. It's fast to compute and is accurate to around 0.3%, which is sufficient for most use cases such as location-aware services.

- **latitude1** (number): the latitude portion of the first coordinate
- **longitude1** (number): the longitude portion of the first coordinate
- **latitude2** (number): the latitude portion of the second coordinate
- **longitude2** (number): the longitude portion of the second coordinate
- returns **distance** (number): the distance between both coordinates in **meters**

```js
// Distance from Brandenburg Gate (Berlin) to (Cologne)
DISTANCE(52.5163, 13.3777, 50.9322, 6.94) // 476918.89688380965 (~477km)

// Sort a small number of documents based on distance to Central Park (New York)
FOR doc IN doc // e.g. documents returned by a traversal
  SORT DISTANCE(doc.latitude, doc.longitude, 40.78, -73.97)
  RETURN doc
```

### GEO_CONTAINS()

`GEO_CONTAINS(geoJsonA, geoJsonB) → bool`

Checks whether the [GeoJSON object](../../collections/documents/indexing/working-with-indexes#geojson-mode) `geoJsonA` fully contains `geoJsonB` (Every point in B is also in A). The object `geoJsonA` has to be of type `Polygon` or `MultiPolygon`, other types are not supported because containment is ill defined. This function can be **optimized** by a S2 based [geospatial index](../../collections/documents/indexing/working-with-indexes#geo-spatial-indexes).

- **geoJsonA** (object): first GeoJSON object or coordinate array (in longitude, latitude order)
- **geoJsonB** (object): second GeoJSON object or coordinate array (in longitude, latitude order)
- returns **bool** (bool): true when every point in B is also contained in A, false otherwise

### GEO_DISTANCE()

`GEO_DISTANCE(geoJsonA, geoJsonB, ellipsoid) → distance`

Return the distance between two GeoJSON objects, measured from the **centroid** of each shape. For a list of supported types see the [geo index page](../../collections/documents/indexing/working-with-indexes#geo-spatial-indexes).

- **geoJsonA** (object): first GeoJSON object
- **geoJsonB** (object): second GeoJSON object
- **ellipsoid** (string, *optional*): reference ellipsoid to use. Supported are `"sphere"` (default) and `"wgs84"`.
- returns **distance** (number): the distance between the centroid points of the two objects on the reference ellipsoid

```js
LET polygon = {
  type: "Polygon",
  coordinates: [[[-11.5, 23.5], [-10.5, 26.1], [-11.2, 27.1], [-11.5, 23.5]]]
}
FOR doc IN collectionName
  LET distance = GEO_DISTANCE(doc.geometry, polygon) // calculates the distance
  RETURN distance
```

### GEO_AREA()

`GEO_AREA(geoJson, ellipsoid) → area`

Return the area for a polygon or multi-polygon on a sphere with the average Earth radius, or an ellipsoid. For a list of supported types see the [geo index page](../../collections/documents/indexing/working-with-indexes#geo-spatial-indexes).

- **geoJson** (object): a GeoJSON object
- **ellipsoid** (string, *optional*): reference ellipsoid to use. Supported are `"sphere"` (default) and `"wgs84"`.
- returns **area** (number): the area in square meters of the polygon

```js
LET polygon = {
  type: "Polygon",
  coordinates: [[[-11.5, 23.5], [-10.5, 26.1], [-11.2, 27.1], [-11.5, 23.5]]]
}
RETURN GEO_AREA(polygon, "wgs84")
```

### GEO_EQUALS()

`GEO_EQUALS(geoJsonA, geoJsonB) → bool`

Checks whether two GeoJSON objects are equal or not. For a list of supported types see the [geo index page](../../collections/documents/indexing/working-with-indexes#geo-spatial-indexes).

- **geoJsonA** (object): first GeoJSON object
- **geoJsonB** (object): second GeoJSON object.
- returns **bool** (bool): true for equality.

```js
LET polygonA = GEO_POLYGON([
  [-11.5, 23.5], [-10.5, 26.1], [-11.2, 27.1], [-11.5, 23.5]
])
LET polygonB = GEO_POLYGON([
  [-11.5, 23.5], [-10.5, 26.1], [-11.2, 27.1], [-11.5, 23.5]
])
RETURN GEO_EQUALS(polygonA, polygonB) // true
```

```js
LET polygonA = GEO_POLYGON([
  [-11.1, 24.0], [-10.5, 26.1], [-11.2, 27.1], [-11.1, 24.0]
])
LET polygonB = GEO_POLYGON([
  [-11.5, 23.5], [-10.5, 26.1], [-11.2, 27.1], [-11.5, 23.5]
])
RETURN GEO_EQUALS(polygonA, polygonB) // false
```

### GEO_INTERSECTS()

`GEO_INTERSECTS(geoJsonA, geoJsonB) → bool`

Checks whether the [GeoJSON object](../../collections/documents/indexing/working-with-indexes#geojson-mode) `geoJsonA` intersects with `geoJsonB` (i.e. at least one point in B is also A or vice-versa). This function can be **optimized** by a S2 based [geospatial index](../../collections/documents/indexing/working-with-indexes#geo-spatial-indexes).

- **geoJsonA** (object): first GeoJSON object
- **geoJsonB** (object): second GeoJSON object.
- returns **bool** (bool): true if B intersects A, false otherwise

## GeoJSON Constructors


The following helper functions are available to easily create valid GeoJSON output. In all cases you can write equivalent JSON yourself, but these functions will help you to make all your C8QL queries shorter and easier to read.

### GEO_LINESTRING()

`GEO_LINESTRING(points) → geoJson`

Construct a GeoJSON LineString. Needs at least two longitude/latitude pairs.

- **points** (array): number array of longitude/latitude pairs
- returns **geoJson** (object): a valid GeoJSON LineString

```js
RETURN GEO_LINESTRING([
    [35, 10], [45, 45]
])
```

### GEO_MULTILINESTRING()

`GEO_MULTILINESTRING(points) → geoJson`

Construct a GeoJSON MultiLineString. Needs at least two elements consisting valid LineStrings coordinate arrays.

- **points** (array): array of LineStrings
- returns **geoJson** (object): a valid GeoJSON MultiLineString

```js
RETURN GEO_MULTILINESTRING([
    [[100.0, 0.0], [101.0, 1.0]],
    [[102.0, 2.0], [101.0, 2.3]]
])
```

### GEO_MULTIPOINT()

`GEO_MULTIPOINT(points) → geoJson`

Construct a GeoJSON LineString. Needs at least two longitude/latitude pairs.

- **points** (array): number array of longitude/latitude pairs
- returns **geoJson** (object): a valid GeoJSON Point

```js
RETURN GEO_MULTIPOINT([
    [35, 10], [45, 45]
])
```

### GEO_POINT()

`GEO_POINT(longitude, latitude) → geoJson`

Construct a valid GeoJSON Point.

- **longitude** (number): the longitude portion of the point
- **latitude** (number): the latitude portion of the point
- returns **geoJson** (object): a GeoJSON Point

```js
RETURN GEO_POINT(1.0, 2.0)
```

### GEO_POLYGON()

`GEO_POLYGON(points) → geoJson`

Construct a GeoJSON Polygon. Needs at least one array representing a loop. Each loop consists of an array with at least three longitude/latitude pairs. The first loop must be the outermost, while any subsequent loops will be interpreted as holes.

- **points** (array): array of (arrays of) longitude/latitude pairs
- returns **geoJson** (object\|null): a valid GeoJSON Polygon

Simple Polygon:

```js
RETURN GEO_POLYGON([
    [0.0, 0.0], [7.5, 2.5], [0.0, 5.0]
])
```

Advanced Polygon with a hole inside:

```js
RETURN GEO_POLYGON([
    [[35, 10], [45, 45], [15, 40], [10, 20], [35, 10]],
    [[20, 30], [35, 35], [30, 20], [20, 30]]
])
```

### GEO_MULTIPOLYGON()

`GEO_MULTIPOLYGON(polygons) → geoJson`

Construct a GeoJSON MultiPolygon. Needs at least two Polygons inside. See [GEO_POLYGON()](#geo_polygon) for the rules of Polygon construction.

- **polygons** (array): array of arrays of array of longitude/latitude pairs
- returns **geoJson** (object\|null): a valid GeoJSON MultiPolygon

MultiPolygon comprised of a simple Polygon and a Polygon with hole:

```js
RETURN GEO_MULTIPOLYGON([
    [
        [[40, 40], [20, 45], [45, 30], [40, 40]]
    ],
    [
        [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
        [[30, 20], [20, 15], [20, 25], [30, 20]]
    ]
])
```