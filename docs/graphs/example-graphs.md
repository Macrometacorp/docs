---
title: Example Graphs
sidebar_position: 50
---

Macrometa comes with a set of easily graspable graphs that are used to demonstrate the APIs.
You can use the `add samples` tab in the `create graph` window in the web interface and use it to create instances of these graphs in your GDN fabric. Once you've created them, you can view them in Macrometa web console.

## The Knows\_Graph

A set of persons knowing each other:
![Persons relation Example Graph](/img/knows_graph.png)

The _knows_ graph consists of one _vertex collection_ `persons` connected via one _edge collection_ `knows`.
It will contain five persons _Alice_, _Bob_, _Charlie_, _Dave_ and _Eve_.
We will have the following directed relations:

- _Alice_ knows _Bob_
- _Bob_ knows _Charlie_
- _Bob_ knows _Dave_
- _Eve_ knows _Alice_
- _Eve_ knows _Bob_

:::note
With the default "Search Depth" of 2 of the graph viewer you may not see all edges of this graph.
:::

## The Social Graph

A set of persons and their relations:

<!-- ![Social Example Graph](/img/social_graph.png) -->

This example has female and male persons as _vertices_ in two _vertex collections_ - `female` and `male`. The _edges_ are their connections in the `relation` _edge collection_.

## The City Graph

A set of european cities, and their fictional traveling distances as connections:

![Cities Example Graph](/img/cities_graph.png)

The example has the cities as _vertices_ in several _vertex collections_ - `germanCity` and `frenchCity`. The _edges_ are their interconnections in several _edge collections_ `french / german / international Highway`.

## The Traversal Graph

This graph was designed to demonstrate filters in traversals. It has some labels to filter on it.

![Traversal Graph](/img/traversal_graph.png)

The example has all its vertices in the _circles_ collection, and an _edges_ edge collection to connect them.

Circles have unique numeric labels. Edges have two boolean attributes (_theFalse_ always being false, _theTruth_ always being true) and a label sorting _B_ - _D_ to the left side, _G_ - _K_ to the right side. Left and right side split into Paths - at _B_ and _G_ which are each direct neighbors of the root-node _A_. Starting from _A_ the graph has a depth of 3 on all its paths.

:::note
With the default "Search Depth" of 2 of the graph viewer you may not see all nodes of this graph.
:::

## The k Shortest Paths Graph

The vertices in this graph are train stations of cities in Europe and
North America and the edges represent train connections between them,
with the travel time for both directions as edge weight.

![Train Connection Map](/img/train_map.png)

See the [Shortest Paths](../queryworkers/c8ql/graphs/shortest-path.md) page for query examples. 

## The World Graph

<!-- ![World Graph](/img/world_graph.png) -->

The world country graph structures its nodes like that: world → continent → country → capital. In some cases edge directions aren't forward (therefore it will be displayed disjunct in the graph viewer). It has two ways of creating it. One using the named graph utilities (_worldCountry_), one without (_worldCountryUnManaged_).

It is used to demonstrate raw traversal operations.

## The Mps Graph

This graph was created to demonstrate a use case of the shortest path algorithm. Even though the algorithm can only determine one shortest path, it is possible to return multiple shortest paths with two separate queries. Therefore the graph is named after the [**m**ultiple **p**ath **s**earch](../queryworkers/c8ql/examples/multiple-path-search.md) use case.

![Mps Graph](/img/mps_graph.png)

The example graph consists of _vertices_ in the `mps_verts` collection and _edges_ in the `mps_edges` collection. It is a simple traversal graph with start node _A_ and end node _C_.

## Higher volume graph examples

All of the above examples are rather small so they are easier to comprehend and can demonstrate the way the functionality works. Example: [Pokec social network](https://snap.stanford.edu/data/soc-pokec.html)
