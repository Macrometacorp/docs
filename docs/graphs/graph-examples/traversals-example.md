---
sidebar_position: 40
title: Graph Traversals with Geo Queries
---

This example demonstrates how to perform a graph traversal based on a geo query. It starts by finding cities within a specified radius from a given set of coordinates (in this case, Bonn). Then, it performs a graph traversal using those cities as starting points and returns the connected cities within one edge away.

To follow along, create a new graph using the [City Graph](example-graphs#the-city-graph) example.

![cities_graph\(1\)](/img/graphs/cities_graph.png)

## Locating Start Vertex with Geo Query

This example locates the start vertex for a graph traversal using a [geo index](../../collections/indexing/geo-indexes).

The query below searches for cities within a 400,000-meter radius of the provided coordinates for Bonn:

```sql
LET bonn = [50.7340, 7.0998]

FOR startCity IN WITHIN(germanCity, bonn[0], bonn[1], 400000)
  RETURN startCity
```

This query returns German cities within 400 km of Bonn, such as Hamburg and Cologne. It does not return Paris, as it is in the `frenchCity` collection.

```json
[
	{
		"_id": "germanCity/Cologne",
		"_key": "Cologne",
		"_rev": "_fvOwSD6--C",
		"geometry": {
			"coordinates": [
				6.9528,
				50.9364
			],
			"type": "Point"
		},
		"isCapital": false,
		"population": 1000000
	},
	{
		"_id": "germanCity/Hamburg",
		"_key": "Hamburg",
		"_rev": "_fvOwSD6--F",
		"geometry": {
			"coordinates": [
				10.0014,
				53.5653
			],
			"type": "Point"
		},
		"isCapital": false,
		"population": 1000000
	}
]
```

## Graph Traversal with Geo-based Start Vertices

The geo index query returns the `startCity` (Cologne and Hamburg), which is used as the starting point for the graph traversal. For simplicity, only the direct neighbors are returned. The result is formatted to show the `startCity` from which the traversal originated.

```sql
FOR startCity IN WITHIN(germanCity, @lat, @long, @radius)
  FOR v, e, p IN 1..1 OUTBOUND startCity GRAPH 'routeplanner'
    RETURN { startcity: startCity._key, traversedCity: v }
```


## Grouping Traversals by Start City

You can use a `LET` statement with a subquery to group the traversals by their `startCity` efficiently. This query finds cities within a 400,000-meter radius of the provided coordinates for Bonn, then uses a subquery to find connected cities for each found city within one edge away in the 'routeplanner' graph. Finally, it returns an object containing the start city and the connected cities.

```sql
LET bonn = [50.7340, 7.0998]

FOR startCity IN WITHIN(germanCity, bonn[0], bonn[1], 400000)
    LET oneCity = (
        FOR v, e, p IN 1..1 OUTBOUND startCity GRAPH 'routeplanner'
            RETURN v
    )
    RETURN { startCity: startCity._key, connectedCities: oneCity }
```

