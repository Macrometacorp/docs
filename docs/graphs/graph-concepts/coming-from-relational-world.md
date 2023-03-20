---
title: Coming From a Relational World
sidebar_position: 10
---

In a relational database, we would probably store the vertices of a graph in one table and the edges in a second one. Each edge would have a foreign key for its starting vertex and one for its ending vertex.

In the case of a bipartite graph, we can simply use two tables `A` and `B` for the two vertex sets, and the edge table simply contains one `foreign` key for A and one for B. Note that this data model is also known as “link table” or “junction table”, which is the standard solution for an `m:n` relation.

The fundamental query operation on a graph is to find all neighbors of a vertex. This operation can be performed in the above setup, but it involves a join between the vertex table with itself, using the link table (the edges). Thus, finding the neighbors of a vertex will involve at least some index lookup and  complexity `O(k)` where k is the number of neighboring vertices.

GDN is a document store that offer efficient joins in the query language. So one can actually use a `vertex` collection and an `edge` collection and achieve above complexity guarantees. Additionally store arbitrary labelling information for both `vertices` and `edges` along with their corresponding JSON documents.

`Vertex` collections resemble the data tables with the objects to connect. While simple graph queries with fixed number of hops via the relation table may be doable in SQL with several nested joins, GDN can handle an arbitrary number of these hops over edge collections - this is called `traversal`.

To get the `O(k)` Neighbor lookup GDN uses a special edge index that is a hash table tolerating repeated keys and keeping elements with equal keys together in a linked list. The joins are simply necessary to combine the `edge` documents with their corresponding `vertices`.

Also `edges` in one `edge` collection may point to several `vertex` collections. Its common to have attributes attached to edges, i.e. a label naming this interconnection. Edges have a direction, with their relations `_from` and `_to` pointing from one document to another document stored in `vertex` collections.

In queries you can define in which directions the `edge` relations may be followed i.e.,

- OUTBOUND: `_from` → `_to`
- INBOUND: `_from` ← `_to`
- ANY: `_from` ↔ `_to`
