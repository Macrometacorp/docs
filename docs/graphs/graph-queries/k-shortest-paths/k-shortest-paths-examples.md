---
sidebar_position: 30
title: k Shortest Paths Examples
---

## Add Example Collections and Datasets

If you want to follow along

## Shortest Path Query in Action

Let us take a look at a simple example to explain how it works. This is the graph that we are going to find some shortest path on:

![Train Connection Map](/img/train_map.png)

Each ellipse stands for a train station with the name of the city written inside of it. They are the vertices of the graph. Arrows represent train connections between cities and are the edges of the graph. The numbers near the arrows describe how long it takes to get from one station to another. They are used as edge weights.

Let us assume that we want to go from **Aberdeen** to **London** by train.

We expect to see the following vertices on _the_ shortest path, in this order:

1. Aberdeen
2. Leuchars
3. Edinburgh
4. York
5. London

By the way, the weight of the path is: 1.5 + 1.5 + 3.5 + 1.8 = **8.3**.

Let us look at alternative paths next, for example because we know that the direct connection between York and London does not operate currently.

An alternative path, which is slightly longer, goes like this:

1. Aberdeen
2. Leuchars
3. Edinburgh
4. York
5. **Carlisle**
6. **Birmingham**
7. London

Its weight is: 1.5 + 1.5 + 3.5 + 2.0 + 1.5 = **10.0**.

Another route goes via Glasgow. There are seven stations on the path as well, however, it is quicker if we compare the edge weights:

1. Aberdeen
2. Leuchars
3. Edinburgh
4. **Glasgow**
5. Carlisle
6. Birmingham
7. London

The path weight is lower: 1.5 + 1.5 + 1.0 + 1.0 + 2.0 + 1.5 = **8.5**.

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
