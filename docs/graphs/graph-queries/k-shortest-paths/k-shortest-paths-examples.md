---
sidebar_position: 30
title: k Shortest Paths Examples
---



## Example Datasets

If you want to follow along

### Add Vertex Dataset

```sql
FOR cityData IN [
  { _key: "Cologne", city: "Cologne", countryCode: "DE" },
  { _key: "Brussels", city: "Brussels", countryCode: "BE" },
  { _key: "Londen", city: "Londen", countryCode: "GB" },
  { _key: "York", city: "York", countryCode: "GB" },
  { _key: "London", city: "London", countryCode: "GB" },
  { _key: "Birmingham", city: "Birmingham", countryCode: "GB" },
  { _key: "Carlisle", city: "Carlisle", countryCode: "GB" },
  { _key: "Inverness", city: "Inverness", countryCode: "GB" },
  { _key: "Aberdeen", city: "Aberdeen", countryCode: "GB" },
  { _key: "Leuchars", city: "Leuchars", countryCode: "GB" },
  { _key: "StAndrews", city: "StAndrews", countryCode: "GB" },
  { _key: "Edinburgh", city: "Edinburgh", countryCode: "GB" },
  { _key: "Glasgow", city: "Glasgow", countryCode: "GB" }
]
UPSERT { _key: cityData._key }
INSERT cityData
UPDATE {}
IN cities
```

### Add Edges Dataset

```sql
FOR edgeData IN [
  { _from: "Cities/Cologne", _to: "Cities/Brussels", travelTime: 1.5 },
  { _from: "Cities/Brussels", _to: "Cities/Cologne", travelTime: 2 },
  { _from: "Cities/Brussels", _to: "Cities/Londen", travelTime: 3.5 },
  { _from: "Cities/Londen", _to: "Cities/Brussels", travelTime: 2.5 },
  { _from: "Cities/York", _to: "Cities/London", travelTime: 1.8 },
  { _from: "Cities/London", _to: "Cities/York", travelTime: 2 },
  { _from: "Cities/London", _to: "Cities/Birmingham", travelTime: 2.5 },
  { _from: "Cities/Carlisle", _to: "Cities/Birmingham", travelTime: 2 },
  { _from: "Cities/Birmingham", _to: "Cities/Carlisle", travelTime: 1 },
  { _from: "Cities/Inverness", _to: "Cities/Aberdeen", travelTime: 3 },
  { _from: "Cities/Aberdeen", _to: "Cities/Inverness", travelTime: 2.5 },
  { _from: "Cities/Leuchars", _to: "Cities/Aberdeen", travelTime: 1 },
  { _from: "Cities/StAndrews", _to: "Cities/Leuchars", travelTime: 0.2 },
  { _from: "Cities/Leuchars", _to: "Cities/StAndrews", travelTime: 0.2 },
  { _from: "Cities/Leuchars", _to: "Cities/Edinburgh", travelTime: 1.5 },
  { _from: "Cities/Edinburgh", _to: "Cities/Leuchars", travelTime: 3 },
  { _from: "Cities/Edinburgh", _to: "Cities/Glasgow", travelTime: 1 },
  { _from: "Cities/Glasgow", _to: "Cities/Edinburgh", travelTime: 1 },
  { _from: "Cities/Edinburgh", _to: "Cities/York", travelTime: 3.5 },
  { _from: "Cities/York", _to: "Cities/Edinburgh", travelTime: 4 }
]
UPSERT { _from: edgeData._from, _to: edgeData._to }
INSERT edgeData
UPDATE {}
IN connections
```

## Examples

We load an example graph to get a named graph that reflects some possible train connections in Europe.

![Train Connection Map](/img/train_map.png)

Suppose we want to query a route from **Aberdeen** to **London**, and compare the outputs of `SHORTEST_PATH` and `K_SHORTEST_PATHS` with `LIMIT 1`. Note that while `SHORTEST_PATH` and `K_SHORTEST_PATH` with `LIMIT 1` should return a path of the same length (or weight), they do not need to return the same path.

Using `SHORTEST_PATH`:

```js
    FOR v, e IN OUTBOUND SHORTEST_PATH 'places/Aberdeen' TO 'places/London'
    GRAPH 'kShortestPathsGraph'
        RETURN { place: v.label, travelTime: e.travelTime }
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

```js
    FOR p IN OUTBOUND K_SHORTEST_PATHS 'places/Aberdeen' TO 'places/London'
    GRAPH 'kShortestPathsGraph'
        LIMIT 1
        RETURN { places: p.vertices[*].label, travelTimes: p.edges[*].travelTime }
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

With `K_SHORTEST_PATHS` we can ask for more than one option for a route:

```js
    FOR p IN OUTBOUND K_SHORTEST_PATHS 'places/Aberdeen' TO 'places/London'
    GRAPH 'kShortestPathsGraph'
        LIMIT 3
        RETURN {
            places: p.vertices[*].label,
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

If we ask for routes that don't exist we get an empty result (from **Aberdeen** to **Toronto**):

```js
    FOR p IN OUTBOUND K_SHORTEST_PATHS 'places/Aberdeen' TO 'places/Toronto'
    GRAPH 'kShortestPathsGraph'
        LIMIT 3
        RETURN {
            places: p.vertices[*].label,
            travelTimes: p.edges[*].travelTime,
            travelTimeTotal: SUM(p.edges[*].travelTime)
        }
```

Results:

```json
[]
```

We can use the attribute _travelTime_ that connections have as edge weights to take into account which connections are quicker. A high default weight is set, to be used if an edge has no _travelTime_ attribute (not the case with the example graph). This returns the top three routes with the fewest changes and favoring the least travel time for the connection **Saint Andrews** to **Cologne**:

```js
    FOR p IN OUTBOUND K_SHORTEST_PATHS 'places/StAndrews' TO 'places/Cologne'
    GRAPH 'kShortestPathsGraph'
    OPTIONS {
        weightAttribute: 'travelTime',
        defaultWeight: 15
    }
        LIMIT 3
        RETURN {
            places: p.vertices[*].label,
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
