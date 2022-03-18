---
sidebar_position: 14
---

# Traversals

## Finding the start vertex via a geo query

Our first example will locate the start vertex for a graph traversal via [a geo index](../../collections/documents/indexing/index-basics#geo-index).

We use the city graph and its geo indices: ![cities_graph\(1\)](/img/cities_graph.png)

```js
var examples = require("@c8_db/graph-examples/example-graph.js");
var g = examples.loadGraph("routeplanner");
var bonn=[50.7340, 7.0998];
db._query(`FOR startCity IN
........>             WITHIN(germanCity, @lat, @long, @radius)
........>               RETURN startCity`,
........>   {lat: bonn[0], long: bonn[1], radius: 400000}
........> ).toArray()
```

We search all german cities in a range of 400 km around the ex-capital **Bonn**: **Hamburg** and **Cologne**. We won't find **Paris** since its in the `frenchCity` collection.

```js
db._query(`FOR startCity IN
........>             WITHIN(germanCity, @lat, @long, @radius)
........>               FOR v, e, p IN 1..1 OUTBOUND startCity
........>                 GRAPH 'routeplanner'
........>     RETURN {startcity: startCity._key, traversedCity: v}`,
........> {
........>  lat: bonn[0],
........>  long: bonn[1],
........>  radius: 400000
........> } ).toArray()
```

The geo index query returns us `startCity` (**Cologne** and **Hamburg**) which we then use as starting point for our graph traversal. For simplicity we only return their direct neighbours. We format the return result so we can see from which `startCity` the traversal came.

Alternatively we could use a `LET` statement with a subquery to group the traversals by their `startCity` efficiently:

```js
db._query(`FOR startCity IN
........>            WITHIN(germanCity, @lat, @long, @radius)
........>              LET oneCity = (FOR v, e, p IN 1..1 OUTBOUND startCity
........>                GRAPH 'routeplanner' RETURN v)
........>              return {startCity: startCity._key, connectedCities: oneCity}`,
........> {
........>  lat: bonn[0],
........>  long: bonn[1],
........>  radius: 400000
........> } ).toArray();
```

Finally, we clean up again:

```js
examples.dropGraph("routeplanner");
```
