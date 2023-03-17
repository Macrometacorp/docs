---
title: GDN Graphs vs. Relational Databases
sidebar_position: 10
---


In this article, we'll look at how graphs are represented and managed in relational databases compared to GDN, focusing on concepts such as vertex collections, traversal, edge index, and edge attributes.

Representing Graphs in Relational Databases
In a relational database, you'd typically store the vertices of a graph in one table and the edges in another. Each edge would have a foreign key for its starting vertex and one for its ending vertex.

Bipartite Graphs and m:n Relations
For a bipartite graph, you can use two tables A and B for the two vertex sets, and the edge table would simply contain one foreign key for A and one for B. This data model is also known as a "link table" or "junction table" and serves as the standard solution for m:n relations.

GDN: A Flexible Document Store
GDN is a document store that provides efficient joins in its query language. You can use a vertex collection and an edge collection to achieve the desired complexity guarantees. You can also store arbitrary labeling information for both vertices and edges along with their corresponding JSON documents.

Vertex Collections and Traversal
Vertex collections are similar to data tables with objects to connect. While simple graph queries with a fixed number of hops via the relation table might be doable in SQL with several nested joins, GDN can handle an arbitrary number of these hops over edge collections - this is called traversal.

Edge Index for Efficient Lookup
GDN uses a special edge index to achieve O(k) neighbor lookup complexity. This index is a hash table that tolerates repeated keys and keeps elements with equal keys together in a linked list. The joins help combine the edge documents with their corresponding vertices.

Edge Attributes and Directionality
Edges in a single edge collection can point to multiple vertex collections. It's common to attach attributes to edges, like a label naming the interconnection. Edges have a direction, with their relations _from and _to pointing from one document to another document stored in vertex collections.

Querying Edge Directions
In queries, you can specify the directions in which edge relations can be followed, such as:

- OUTBOUND: `_from` → `_to`
- INBOUND: `_from` ← `_to`
- ANY: `_from` ↔ `_to`
