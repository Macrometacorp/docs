---
sidebar_position: 40
title: Traversals with Geo Queries
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

You can execute the geo query separately, get the `_id` values for the start cities (Cologne and Hamburg, from the previous query), and then pass them as bind parameters to the graph traversal query:

Syntax:

```sql
FOR startCityId IN [ @city1, @city2 ]
  LET startCity = DOCUMENT(startCityId)
  FOR v, e, p IN 1..1 OUTBOUND startCity GRAPH 'routeplanner'
    RETURN { startCity: startCity._key, traversedCity: v }
```

Here the bind parameters are replaced by ids:

```sql
FOR startCityId IN [ "germanCity/Cologne", "germanCity/Hamburg" ]
  LET startCity = DOCUMENT(startCityId)
  FOR v, e, p IN 1..1 OUTBOUND startCity GRAPH 'routeplanner'
    RETURN { startCity: startCity._key, traversedCity: v }
```

The result is showing all the possible connections between the start cities and their directly connected cities in the graph:

```json
[
	{
		"startCity": "Cologne",
		"traversedCity": {
			"_id": "frenchCity/Lyon",
			"_key": "Lyon",
			"_rev": "_fvOwSD6--I",
			"geometry": {
				"coordinates": [
					4.84,
					45.76
				],
				"type": "Point"
			},
			"isCapital": false,
			"population": 80000
		}
	},
	{
		"startCity": "Cologne",
		"traversedCity": {
			"_id": "frenchCity/Paris",
			"_key": "Paris",
			"_rev": "_fvOwSD6--L",
			"geometry": {
				"coordinates": [
					2.3508,
					48.8567
				],
				"type": "Point"
			},
			"isCapital": true,
			"population": 4000000
		}
	},
	{
		"startCity": "Hamburg",
		"traversedCity": {
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
		}
	},
	{
		"startCity": "Hamburg",
		"traversedCity": {
			"_id": "frenchCity/Paris",
			"_key": "Paris",
			"_rev": "_fvOwSD6--L",
			"geometry": {
				"coordinates": [
					2.3508,
					48.8567
				],
				"type": "Point"
			},
			"isCapital": true,
			"population": 4000000
		}
	},
	{
		"startCity": "Hamburg",
		"traversedCity": {
			"_id": "frenchCity/Lyon",
			"_key": "Lyon",
			"_rev": "_fvOwSD6--I",
			"geometry": {
				"coordinates": [
					4.84,
					45.76
				],
				"type": "Point"
			},
			"isCapital": false,
			"population": 80000
		}
	}
]
```

A simpler way to consider the results is:

- **Start City**: Cologne
  - Traversed City: Lyon
  - Traversed City: Paris
- **Start City**: Hamburg
  - Traversed City: Cologne
  - Traversed City: Paris
  - Traversed City: Lyon

## Grouping Traversals by Start City

This example combines the previous two queries.

You can use a `LET` statement with a subquery to group the traversals by their `startCity` efficiently. This query finds cities within a 400,000-meter radius of the provided coordinates for Bonn, then uses a subquery to find connected cities for each found city within one edge away in the `routeplanner` graph.

```sql
LET bonn = [50.7340, 7.0998]

FOR startCity IN WITHIN(germanCity, bonn[0], bonn[1], 400000)
    LET oneCity = (
        FOR v, e, p IN 1..1 OUTBOUND startCity GRAPH 'routeplanner'
            RETURN v
    )
    RETURN { startCity: startCity._key, connectedCities: oneCity }
```

The query returns the direct neighbors of Cologne and Hamburg in the `routeplanner` graph, the same as the previous one.
