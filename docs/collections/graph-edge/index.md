---
sidebar_position: 1
title: Graph Edge Collection
---

An edge collection is a specialized type of collection that stores the relationships between vertices in a graph. These relationships are represented as directed or undirected edges, connecting two vertices. Edge collections have a unique structure that includes two special attributes: `_from` and `_to`.

- The `_from` attribute represents the starting vertex of an edge, and it stores the vertex's unique identifier (usually in the format `collection_name/document_key`).
- The `_to` attribute represents the ending vertex of an edge and also stores the vertex's unique identifier.

Apart from the `_from` and `_to` attributes, edge collections can store additional attributes to describe properties or characteristics of the relationships, such as weight, type, or any other relevant metadata.

For more information about working with graphs, refer to [Graphs](../../graphs/).

<DocCardList />
