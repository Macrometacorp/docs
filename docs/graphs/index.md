---
title: Graphs
sidebar_position: 10
---

A Graph consists of `vertices` and `edges`. Edges are stored as documents in [edge collections](../collections/graph-edge/create-graph-edge.md).

A vertex can be a document of a `document collection` or of an `edge collection` (so `edges` can be used as `vertices`). Which collections are used within a named graph is defined via `edge definitions`.

Graphs allow you to structure your models in line with your domain and group them logically in collections and giving you the power to query them in the same graph queries.

## For the Math Geeks

Mathematically, a graph (directed, unlabelled, without multiple edges) is nothing but a relation. It consists of a set `V` of vertices and a subset `E` (the edges) of the Cartesian product `V x V`. There is an edge from `v to w`, if and only if the pair `(v,w)` is contained in `E`.

Similarly, a _bipartite graph_ is just a subset of a Cartesian product `A x B` for two disjoint sets `A` and `B`. It is only when we go to labelled graphs (in which every edge carries a label) or multiple edges that we get a richer structure. Note that an undirected graph can just be seen as a symmetric directed one.
