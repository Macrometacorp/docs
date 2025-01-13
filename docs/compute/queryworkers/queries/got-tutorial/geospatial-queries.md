---
sidebar_position: 60
title: Part 6 - Geospatial Queries
---

Geospatial coordinates consisting of a latitude and longitude value can be stored either as two separate attributes, or as a single attribute in the form of an array with both numeric values. Macrometa can [index such coordinates](../c8ql/functions/geo) for fast geospatial queries.

## Create Locations Collection

Let's insert some filming locations into a new collection _Locations_.

1. [Create a Document collection](../../../../database/collections/documents/create-document-store) called **Locations**.
2. Copy and paste the following query in the Query Editor:

    ```js
    LET places = [
        { "name": "Dragonstone", "coordinate": [ 55.167801, -6.815096 ] },
        { "name": "King's Landing", "coordinate": [ 42.639752, 18.110189 ] },
        { "name": "The Red Keep", "coordinate": [ 35.896447, 14.446442 ] },
        { "name": "Yunkai", "coordinate": [ 31.046642, -7.129532 ] },
        { "name": "Astapor", "coordinate": [ 31.50974, -9.774249 ] },
        { "name": "Winterfell", "coordinate": [ 54.368321, -5.581312 ] },
        { "name": "Vaes Dothrak", "coordinate": [ 54.16776, -6.096125 ] },
        { "name": "Beyond the wall", "coordinate": [ 64.265473, -21.094093 ] }
    ]

    FOR place IN places
        INSERT place INTO Locations
    ```

3. Run the query.

Macrometa returns an empty list in the results, but the records with the locations and coordinates are added to the collection.

For your reference, here is a visualization of the relative locations overlaid on a map of Europe:

![Locations_Map](/img/c8ql/tutorial/Locations_Map.png)

## Geospatial Index

To query based on coordinates, you must create a [geo index](../../../../database/collections/documents/geospatial/geojson#geojson-supported-index). It determines which fields contain the latitude and longitude values.

To create a geo index:

1. Click **Data > Collections**.
1. Click **Locations**.
1. Click the **Indexes** tab.
1. Click the plus icon to add a new index.
1. In **Type** select **Geo Index**.
1. In **Fields**, enter **coordinate**.
1. Click **Create**

Macrometa returns a success message and your new index appears in the Indexes list. For more information, refer to [Document Collection Indexes](../../../../database/collections/documents/document-store-indexes).

## Find Nearby Locations

A `FOR` loop is used again, but this time to iterate over the results of a function call to `NEAR()` to find the _n_ closest coordinates to a reference point, and return the documents with the nearby locations. The default for _n_ is 100, which means 100 documents are returned at most, the closest matches first.

In below example, the limit is set to 3. The origin (the reference point) is a coordinate somewhere downtown in Dublin, Ireland.

If you enter the following query in the Query Editor:

```js
FOR loc IN NEAR(Locations, 53.35, -6.26, 3)
    RETURN {
        name: loc.name,
        latitude: loc.coordinate[0],
        longitude: loc.coordinate[1]
    }
```

Macrometa returns the following data. It might look different if you are viewing query results as a table.

```json
[
  {
    "name": "Vaes Dothrak",
    "latitude": 54.16776,
    "longitude": -6.096125
  },
  {
    "name": "Winterfell",
    "latitude": 54.368321,
    "longitude": -5.581312
  },
  {
    "name": "Dragonstone",
    "latitude": 55.167801,
    "longitude": -6.815096
  }
]
```

The query returns the location name, as well as the coordinates. The coordinates are returned as two separate attributes. You can use a simpler `RETURN loc` instead if you want. Try replacing the RETURN statement in the query above with `RETURN loc` and compare the results.

## Find Locations Within a Radius

`NEAR()` can be swapped out with `WITHIN()`, to search for locations within a given radius from a reference point. The syntax is the same as for `NEAR()`, except for the fourth parameter, which specifies the radius instead of a limit. The unit for the radius is meters. 

This example uses a radius of 200,000 meters (200 kilometers):

```js
FOR loc IN WITHIN(Locations, 53.35, -6.26, 200 * 1000)
    RETURN {
        name: loc.name,
        latitude: loc.coordinate[0],
        longitude: loc.coordinate[1]
    }
```

Returns two locations:

```json
[
  {
    "name": "Vaes Dothrak",
    "latitude": 54.16776,
    "longitude": -6.096125
  },
  {
    "name": "Winterfell",
    "latitude": 54.368321,
    "longitude": -5.581312
  }
]
```

## Return the Distance

Both `NEAR()` and `WITHIN()` can return the distance to the reference point by adding an optional fifth parameter. It has to be a string, which will be used as the attribute name for an additional attribute with the distance in meters:

```js
FOR loc IN NEAR(Locations, 53.35, -6.26, 3, "distance")
    RETURN {
        name: loc.name,
        latitude: loc.coordinate[0],
        longitude: loc.coordinate[1],
        distance: loc.distance / 1000
    }
```

The query returns:

```json
[
  {
    "name": "Vaes Dothrak",
    "latitude": 54.16776,
    "longitude": -6.096125,
    "distance": 91.56658640314431
  },
  {
    "name": "Winterfell",
    "latitude": 54.368321,
    "longitude": -5.581312,
    "distance": 121.66399816395028
  },
  {
    "name": "Dragonstone",
    "latitude": 55.167801,
    "longitude": -6.815096,
    "distance": 205.31879386198324
  }
]
```

The extra attribute, here called _distance_, is returned as part of the _loc_ variable, as if it was part of the location document. The value is divided by 1,000 in the example query, to convert the unit to kilometers, to make it better readable.

## Next Steps

Great job! You can now use C8QL queries to enter, sort, and manipulate various kinds of data in interesting ways. Here is what you might do next:

- Learn how to turn queries into endpoints with [Query Workers](../../../../compute/queryworkers).
- Read through [Query Examples](../../queries/query-examples/) for more ideas about what to do with C8QL.
- Dig deeper into C8QL [Functions](../c8ql/functions/) and [Operations](../c8ql/operations/).

Have fun!
