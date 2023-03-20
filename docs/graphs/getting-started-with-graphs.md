---
title: Getting Started with Graphs
sidebar_position: 10
---

In this getting started guide, you'll explore how to work with graphs in Macrometa by establishing relationships between collections, enabling you to run complex queries on airline flight data.

## About Graphs

Graphs provide a mechanism to model your data and perform sophisticated queries across interconnected documents. A graph is composed of _vertices_ and _edges_.

- Vertices are stored in collections and linked by an edge document. Vertices can be either a document or an edge.
- Edges are stored as documents in edge collections. The edge definition delineates which collections are employed in a named graph.
- A named graph must contain at least one edge definition.

By transforming documents into graph structures, you can conduct semantic queries using nodes, edges, and properties. Graphs directly connect data items between different collections. You can use graphs to refer to documents in different tables without a nested join. Graphs can also find patterns of document connections, such as the shortest path between two vertices in a graph.

Edges in one edge collection might point to several vertex collections. You can also assign attributes to edges to perform tasks like categorizing connections.

Edges have a direction, with their relations `_from` and `_to` pointing from one document to another document stored in vertex collections. When executing queries, you can define the direction in which edge relations can be traversed:

- OUTBOUND: `_from` → `_to`
- INBOUND: `_from` ← `_to`
- ANY: `_from` ↔ `_to`.

This guide will help you understand the fundamentals of working with graphs in Macrometa, even if you are new to the concept. By leveraging graphs, you can unlock powerful query capabilities and gain insights from your data that might not be possible with traditional relational databases.

## Create Collections

Create collections to hold the data that you will use to create graphs.

1. [Create a document collection](../collections/documents/create-document-store) named `cities`.
   1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
   1. Click **Collections** and then click **New Collection**.
   1. Click **Document Store**.
   1. In **Collection Name**, enter `cities` and then click **Create**.

1. [Create an edge collection](../collections/graph-edge/create-graph-edge.md) named `flights`.
   1. In **Collections**, click **New Collection**.
   1. Click **Graph Edge**.
   1. In **Collection Name**, enter `flights` and then click **Create**.

You now have two empty collections that are ready to receive data.

## Upload Data with Queries

Add data to the collections with C8QL queries. For more information about Macrometa queries, refer to [Queries](../queries/).

1. Click **Query Workers**.
1. To populate the `cities` collection, copy the following query and paste it in the editor.

	```JavaScript
	LET c = [
		{"_key": "sanfrancisco", "location": [-122.416667, 37.783333]},
		{"_key": "newyork", "location": [-74.0059, 40.7127]},
		{"_key": "detroit", "location": [-83.045833, 42.331389]},
		{"_key": "paris", "location": [2.3508, 48.8567]},
		{"_key": "dublin", "location": [-6.260278, 53.349722]},
		{"_key": "singapore", "location": [103.8, 1.3]},
		{"_key": "houston", "location": [-95.383056, 29.762778]},
		{"_key": "seattle", "location": [-122.333056, 47.609722]}
	]
	FOR city IN c
		INSERT city IN cities
	```

1. Click **Run Query**.

   Macrometa returns an empty list, and records were added to the `cities` collection.

1. To populate the `flights` collection, click **New Query**, then copy the following query and paste it in the editor.

	```JavaScript
	LET e = [
		{"_from": "cities/sanfrancisco", "_to": "cities/singapore", "distance": 13600},
		{"_from": "cities/sanfrancisco", "_to": "cities/newyork", "distance": 4000},
		{"_from": "cities/sanfrancisco", "_to": "cities/detroit", "distance": 3300},
		{"_from": "cities/sanfrancisco", "_to": "cities/houston", "distance": 2600},
		{"_from": "cities/detroit", "_to": "cities/sanfrancisco", "distance": 3300},
		{"_from": "cities/detroit", "_to": "cities/newyork", "distance": 800},
		{"_from": "cities/newyork", "_to": "cities/sanfrancisco", "distance": 4000},
		{"_from": "cities/newyork", "_to": "cities/detroit", "distance": 800},
		{"_from": "cities/newyork", "_to": "cities/dublin", "distance": 5100},
		{"_from": "cities/newyork", "_to": "cities/paris", "distance": 5800},
		{"_from": "cities/newyork", "_to": "cities/houston", "distance": 2300},
		{"_from": "cities/dublin", "_to": "cities/newyork", "distance": 5100},
		{"_from": "cities/dublin", "_to": "cities/paris", "distance": 800},
		{"_from": "cities/paris", "_to": "cities/newyork", "distance": 5800},
		{"_from": "cities/paris", "_to": "cities/dublin", "distance": 800},
		{"_from": "cities/paris", "_to": "cities/singapore", "distance": 10700},
		{"_from": "cities/singapore", "_to": "cities/sanfrancisco", "distance": 13600},
		{"_from": "cities/singapore", "_to": "cities/paris", "distance": 10700},
		{"_from": "cities/houston", "_to": "cities/sanfrancisco", "distance": 2600},
		{"_from": "cities/houston", "_to": "cities/newyork", "distance": 2300}
	]
	FOR edge IN e
		INSERT edge IN flights
	```

1. Click **Run Query**.

   Macrometa returns an empty list, and records were added to the `flights` collection.

Congratulations! Your collections now contain all the records necessary to create a graph.

## Create an Index

Add a geo index to the `cities` collection. For more information about this type of index, refer to [Geo-Spatial Indexes](../collections/indexing/geo-indexes).

1. Click **Collections**, then click **cities**.
1. Click **Indexes**, then click the plus to add an index.
1. Enter the following information:
   - **Type**: Geo Index
   - **Fields**: location
   - **Geo JSON**: True (select the checkbox)

1. Click **Create**.

   Macrometa returns you to the list of indexes, where you can see your new index.

## Create a Graph

And now for the really fun part!

1. Click **Graphs**, and then click **New Graph**.
1. Enter the following information:
   - **Name**: airline
   - **Edge Definitions**: flights
   - **From Collections**: cities
   - **To Collections**: cities

1. Click **Create**.

   Macrometa returns you to the graph list, where you can see your new graph.

Congratulations, you have a graph! You can click it to view it. To be honest, it probably isn't that impressive to look at, so let's run some queries and see what this data can really do.

## Query your Graph

Working with graphs involves not only storing them but also querying information about the graph structure.

While finding the neighbors of a vertex is a common task when working with graphs or relations, there are numerous other queries you might want to perform.

Here are some queries that you can run in the query editor to get you started.

### Breadth-First Search

Find all cities with a direct flight to New York:

```JavaScript
WITH cities
     FOR city IN INBOUND "cities/newyork" flights
	 RETURN city
```

### Shortest Path

Determine the shortest path from San Francisco to Paris:

```JavaScript
WITH cities
     LET path = (
	FOR city IN OUTBOUND SHORTEST_PATH "cities/sanfrancisco" TO "cities/paris"
	    GRAPH "airline"
	    OPTIONS {"weightAttribute": "distance"}
	    RETURN city
     )
     RETURN path
```

### Shortest Path Distance

Calculate the distance along the shortest path from San Francisco to Paris:

```JavaScript
WITH cities
     LET path = (
	FOR city, e IN OUTBOUND SHORTEST_PATH "cities/sanfrancisco" TO "cities/paris"
	    GRAPH "airline"
	    OPTIONS {"weightAttribute": "distance"}
	    RETURN e.distance
	)
	RETURN SUM(path)
```

### Nearest Cities

Find the two nearest cities to a specified latitude and longitude:

```JavaScript
FOR loc IN NEAR(cities, 53.35, -6.26, 2, "distance")
RETURN {
	name: loc._key,
	latitude: loc.location[1],
	longitude: loc.location[0],
	distance: loc.distance / 1000
    }
```

### Cities Within a Given Distance

List cities within 2,500 km of Houston:

```JavaScript
LET city = DOCUMENT("cities/houston")
FOR loc IN WITHIN(cities, city.location[1], city.location[0], 2500 * 1000, "distance")
RETURN {
	name: loc._key,
	latitude: loc.location[1],
	longitude: loc.location[0],
	distance: loc.distance / 1000
    }
```

## Next Steps

Keep exploring your graph, or make a new one! You can read through [Graph Queries](graph-queries/) or take a look at our [Graph Examples](graph-examples/).
