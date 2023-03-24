---
sidebar_position: 30
title: K Shortest Paths Examples
---

This page has several examples of k shortest path queries.

## Example Datasets

If you want to follow along, you can create collections and add datasets to them as follows.

### Add Collections

Create the following collections. The collection names in the queries are case-sensitive.

1. [Create a document store collection](../../../collections/documents/create-document-store) called `places`.
2. [Create a graph edge collection](../../../collections/graph-edge/create-graph-edge) called `connections`.

### Add Vertex Dataset

Using one of the methods in [Running Queries](../../../queries/running-queries), run the following query to add data to the `places` collection. These are the graph vertices.

```sql
FOR cityData IN [
  { _key: "Cologne", city: "Cologne", countryCode: "DE" },
  { _key: "Brussels", city: "Brussels", countryCode: "BE" },
  { _key: "York", city: "York", countryCode: "GB" },
  { _key: "London", city: "London", countryCode: "GB" },
  { _key: "Birmingham", city: "Birmingham", countryCode: "GB" },
  { _key: "Carlisle", city: "Carlisle", countryCode: "GB" },
  { _key: "Inverness", city: "Inverness", countryCode: "GB" },
  { _key: "Aberdeen", city: "Aberdeen", countryCode: "GB" },
  { _key: "Leuchars", city: "Leuchars", countryCode: "GB" },
  { _key: "StAndrews", city: "StAndrews", countryCode: "GB" },
  { _key: "Edinburgh", city: "Edinburgh", countryCode: "GB" },
  { _key: "Glasgow", city: "Glasgow", countryCode: "GB" },
  { _key: "Toronto", city: "Toronto", countryCode: "CA" }
]
UPSERT { _key: cityData._key }
INSERT cityData
UPDATE {}
IN places
```

### Add Edges Dataset

Using one of the methods in [Running Queries](../../../queries/running-queries), run the following query to add data to the `connections` collection. These are the graph edges.

```sql
FOR edgeData IN [
  { _from: "places/Inverness", _to: "places/Aberdeen", travelTime: 3 },
  { _from: "places/Aberdeen", _to: "places/Inverness", travelTime: 2.5 },
  { _from: "places/Aberdeen", _to: "places/Leuchars", travelTime: 1.5 },
  { _from: "places/Leuchars", _to: "places/Aberdeen", travelTime: 1 },
  { _from: "places/Leuchars", _to: "places/Edinburgh", travelTime: 1.5 },
  { _from: "places/Edinburgh", _to: "places/Leuchars", travelTime: 3 },
  { _from: "places/Edinburgh", _to: "places/Glasgow", travelTime: 1 },
  { _from: "places/Glasgow", _to: "places/Edinburgh", travelTime: 1 },
  { _from: "places/Edinburgh", _to: "places/York", travelTime: 3.5 },
  { _from: "places/York", _to: "places/Edinburgh", travelTime: 4 },
  { _from: "places/Glasgow", _to: "places/Carlisle", travelTime: 1 },
  { _from: "places/Carlisle", _to: "places/Glasgow", travelTime: 1 },
  { _from: "places/Carlisle", _to: "places/York", travelTime: 2.5 },
  { _from: "places/York", _to: "places/Carlisle", travelTime: 3.5 },
  { _from: "places/Carlisle", _to: "places/Birmingham", travelTime: 2.0 },
  { _from: "places/Birmingham", _to: "places/Carlisle", travelTime: 1 },
  { _from: "places/Birmingham", _to: "places/London", travelTime: 1.5 },
  { _from: "places/London", _to: "places/Birmingham", travelTime: 2.5 },
  { _from: "places/Leuchars", _to: "places/StAndrews", travelTime: 0.2 },
  { _from: "places/StAndrews", _to: "places/Leuchars", travelTime: 0.2 },
  { _from: "places/York", _to: "places/London", travelTime: 1.8 },
  { _from: "places/London", _to: "places/York", travelTime: 2.0 },
  { _from: "places/London", _to: "places/Brussels", travelTime: 2.5 },
  { _from: "places/Brussels", _to: "places/London", travelTime: 3.5 },
  { _from: "places/Brussels", _to: "places/Cologne", travelTime: 2 },
  { _from: "places/Cologne", _to: "places/Brussels", travelTime: 1.5 }
]
UPSERT { _from: edgeData._from, _to: edgeData._to }
INSERT edgeData
UPDATE {}
IN connections
```

### Create the Graph

Create a graph called `kShortestPathsGraph`.

1. In the Macrometa web console, click **Graphs**, then **New Graph**.
1. Enter the following:
   - **Name**: kShortestPathsGraph
   - **Edge Definitions**: connections
   - **From Collections**: places
   - **To Collections**: places
1. Click **Create**.

## K Shortest Path Examples

In this section, you'll find examples of K Shortest Paths queries using a named graph representing train connections in Europe.

![Train Connection Map](/img/train_map.png)

### Comparing SHORTEST_PATH and K_SHORTEST_PATHS with LIMIT 1

The a route from **Aberdeen** to **London** and compare the outputs of `SHORTEST_PATH` and `K_SHORTEST_PATHS` with LIMIT 1. While both should return a path with the same length (or weight), they might not return the same path.

Using `SHORTEST_PATH`:

```sql
FOR v, e IN OUTBOUND SHORTEST_PATH 'places/Aberdeen' TO 'places/London'
GRAPH 'kShortestPathsGraph'
    RETURN { place: v._key, travelTime: e.travelTime }
```

Results:

```json
[
  {
    "place": "Aberdeen",
    "travelTime": null
  },
  {
    "place": "Leuchars",
    "travelTime": 1.5
  },
  {
    "place": "Edinburgh",
    "travelTime": 1.5
  },
  {
    "place": "York",
    "travelTime": 3.5
  },
  {
    "place": "London",
    "travelTime": 1.8
  }
]
```

Using `K_SHORTEST_PATHS`:

```sql
FOR p IN OUTBOUND K_SHORTEST_PATHS 'places/Aberdeen' TO 'places/London'
GRAPH 'kShortestPathsGraph'
    LIMIT 1
    RETURN { places: p.vertices[*]._key, travelTimes: p.edges[*].travelTime }
```

Results:

```json
[
  {
    "places": [
      "Aberdeen",
      "Leuchars",
      "Edinburgh",
      "York",
      "London"
    ],
    "travelTimes": [
      1.5,
      1.5,
      3.5,
      1.8
    ]
  }
]
```

### Finding Multiple Route Options

This example demonstrates how to find more than one route option from **Aberdeen** to **London** using `K_SHORTEST_PATHS`:

```sql
FOR p IN OUTBOUND K_SHORTEST_PATHS 'places/Aberdeen' TO 'places/London'
GRAPH 'kShortestPathsGraph'
    LIMIT 3
    RETURN {
        places: p.vertices[*]._key,
        travelTimes: p.edges[*].travelTime,
        travelTimeTotal: SUM(p.edges[*].travelTime)
    }
```

Results:

```json
[
  {
    "places": [
      "Aberdeen",
      "Leuchars",
      "Edinburgh",
      "York",
      "London"
    ],
    "travelTimes": [
      1.5,
      1.5,
      3.5,
      1.8
    ],
    "travelTimeTotal": 8.3
  },
  {
    "places": [
      "Aberdeen",
      "Leuchars",
      "Edinburgh",
      "York",
      "Carlisle",
      "Birmingham",
      "London"
    ],
    "travelTimes": [
      1.5,
      1.5,
      3.5,
      3.5,
      2,
      1.5
    ],
    "travelTimeTotal": 13.5
  },
  {
    "places": [
      "Aberdeen",
      "Leuchars",
      "Edinburgh",
      "Glasgow",
      "Carlisle",
      "York",
      "London"
    ],
    "travelTimes": [
      1.5,
      1.5,
      1,
      1,
      2.5,
      1.8
    ],
    "travelTimeTotal": 9.3
  }
]
```

### Handling Non-Existent Routes

This example shows a query for a non-existent route from **Aberdeen** to **Toronto**, resulting in an empty result:

```sql
FOR p IN OUTBOUND K_SHORTEST_PATHS 'places/Aberdeen' TO 'places/Toronto'
GRAPH 'kShortestPathsGraph'
    LIMIT 3
    RETURN {
        places: p.vertices[*]._key,
        travelTimes: p.edges[*].travelTime,
        travelTimeTotal: SUM(p.edges[*].travelTime)
    }
```

Results:

```json
[]
```

### Using Edge Weights

In this example, the attribute `travelTime` of `connections` is used as edge weights to consider the quickest connections. A high default weight is set for edges without a `travelTime` attribute (not the case in the example graph). The query returns the top three routes with the fewest changes and favoring the least travel time for the connection between **Saint Andrews** and **Cologne**:

```sql
FOR p IN OUTBOUND K_SHORTEST_PATHS 'places/StAndrews' TO 'places/Cologne'
GRAPH 'kShortestPathsGraph'
OPTIONS {
    weightAttribute: 'travelTime',
    defaultWeight: 15
}
    LIMIT 3
    RETURN {
        places: p.vertices[*]._key,
        travelTimes: p.edges[*].travelTime,
        travelTimeTotal: SUM(p.edges[*].travelTime)
    }
```

Results:

```json
[
  {
    "places": [
      "StAndrews",
      "Leuchars",
      "Edinburgh",
      "York",
      "London",
      "Brussels",
      "Cologne"
    ],
    "travelTimes": [
      0.2,
      1.5,
      3.5,
      1.8,
      2.5,
      2
    ],
    "travelTimeTotal": 11.5
  },
  {
    "places": [
      "StAndrews",
      "Leuchars",
      "Edinburgh",
      "Glasgow",
      "Carlisle",
      "Birmingham",
      "London",
      "Brussels",
      "Cologne"
    ],
    "travelTimes": [
      0.2,
      1.5,
      1,
      1,
      2,
      1.5,
      2.5,
      2
    ],
    "travelTimeTotal": 11.7
  },
  {
    "places": [
      "StAndrews",
      "Leuchars",
      "Edinburgh",
      "Glasgow",
      "Carlisle",
      "York",
      "London",
      "Brussels",
      "Cologne"
    ],
    "travelTimes": [
      0.2,
      1.5,
      1,
      1,
      2.5,
      1.8,
      2.5,
      2
    ],
    "travelTimeTotal": 12.5
  }
]
```
