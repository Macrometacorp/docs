---
title: Working with Graphs
sidebar_position: 25
---

_Edge documents (edges)_ are similar to standard documents but with two additional required fields `_from` and `_to`. Values of these fields must be the handles of "from" and "to" vertex documents linked by the edge document in question. Here is an example of a valid edge document:

```json
{
  "_id": "friends/001",
  "_key": "001",
  "_rev": "_Wm3dyle--_",
  "_from": "students/john",
  "_to": "students/jane",
  "closeness": 9.5
}
```

A _graph_ consists of _vertices_ and _edges_. Edges are stored as documents in edge collections. A vertex can be a document of a document collection or of an edge collection (so edges can be used as vertices). Which collections are used within a named graph is defined via edge definitions. A `named graph` can contain more than one edge definition, at least one is needed. Graphs allow you to structure your models in line with your domain and group them logically in collections and giving you the power to query them in the same graph queries.

In SQL you commonly have the construct of a relation table to store `n:m` relations between two data tables. An `edge collection` is somewhat similar to these relation tables. `Vertex collections` resemble the data tables with the objects to connect.

While simple graph queries with fixed number of hops via the relation table may be doable in SQL with several nested joins, graph databases can handle an arbitrary number of these hops over edge collections - this is called `traversal`. Also edges in one edge collection may point to several vertex collections. Its common to have attributes attached to edges, i.e. a label naming this interconnection.

Edges have a direction, with their relations `_from` and `_to` pointing from one document to another document stored in vertex collections. In queries you can define in which directions the edge relations may be followed i.e.,

- OUTBOUND: `_from` → `_to`
- INBOUND: `_from` ← `_to`
- ANY: `_from` ↔ `_to`.