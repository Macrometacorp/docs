---
title: Sample Dataset Graphs
sidebar_position: 10
---

Macrometa has several graphs based on sample datasets that you can create and use to explore the GDN graph functionality. When you create a graph based on sample datasets, Macrometa creates the named graph as well as collections loaded with vertex and edge data.

:::note
With the default "Search Depth" of 2 of the graph viewer, you might not see all edges of some graphs unless you load the full graph.
:::

## Create Example Graph

To create an example graph:

1. In the Macrometa web console, navigate to **Data > Graphs**.
2. Click **New Graph**, and then click **Sample Datasets**.
3. Click **Create** next to the graph that you want to create. The graphs are described below.

## The Route Planning Graph

This graph shows a set of european cities, and their fictional traveling distances as connections. The cities as vertices in two vertex collections - `germanCity` and `frenchCity`. The edges are their interconnections in several edge collections: `frenchHighway`, `germanHighway`, and `internationalHighway`.

![Cities Example Graph](/img/graphs/cities_graph.png)

## The Social Graph

This graph shows a set of persons and their relations. Female and male person records are stored as vertices in two vertex collections - `female` and `male`. The edges are their connections in the `relation` edge collection.

![Social Example Graph](/img/graphs/social-graph.png)

## The Traversal Graph

This graph was designed to demonstrate filters in traversals. It has some labels to filter on in it.

![Traversal Graph](/img/graphs/traversal_graph.png)

The example stores its vertices in the `circles` document collection and the edges in the  `edges` edge collection.

The circles records have unique numeric labels. The edges have two boolean attributes (_theFalse_ always being false, _theTruth_ always being true) and a label sorting _B_ - _D_ to the left side, _G_ - _K_ to the right side. Left and right side split into paths - at _B_ and _G_ which are each direct neighbors of the root-node _A_. Starting from _A_ the graph has a depth of 3 on all its paths.

## The World Graph

The world country graph structures its nodes: world → continent → country → capital. In some cases, edge directions aren't forward (therefore it will be displayed disjunct in the graph viewer).

This graph can be used to demonstrate raw traversal operations. The vertices are stored in `worldVertices`, the edges are stored in `worldEdges`.

![World Example Graph](/img/graphs/world-graph.png)
