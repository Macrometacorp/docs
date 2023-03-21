---
sidebar_position: 1
title: Graphs
---

There are multiple ways to work with graphs in GDN, as well as different ways to query your graphs using C8QL.

The two options in managing graphs are to either use

- named graphs where Macrometa manages the collections involved in one graph, or
- graph functions on a combination of document and edge collections.

Named graphs can be defined through the graph-module or via the web interface. The definition contains the name of the graph, and the vertex and edge collections involved. Since the management functions are layered on top of simple sets of document and edge collections, you can also use regular C8QL functions to work with them.

Both variants (named graphs and loosely coupled collection sets a.k.a. anonymous graphs) are supported by the C8QL language constructs for graph querying. These constructs make full use of optimizations and therefore best performance is to be expected:

- [C8QL Traversals](traversal-queries/) to follow edges connected to a start vertex, up to a variable depth. It can be combined with C8QL filter conditions.

- [C8QL Shortest Path](shortest-path.md) to find the vertices and edges between two given vertices, with as few hops as possible.

These types of queries are only useful if you use edge collections and/or graphs in your data model.
