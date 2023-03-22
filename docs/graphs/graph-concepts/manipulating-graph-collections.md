---
title: Manipulating Graph Collections
sidebar_position: 30
---

This page provides guidance on manipulating graph collections in the Macrometa global data network.

## Regular Document Functions and Graph Collections

You can manipulate documents in graph edge and vertex (document) collections using standard collection commands, but best practice is to use graph-specific commands instead.

The GDN graph module adds an additional layer on top of the standard collection methods, which provides several guarantees when manipulating graph collections:

- All modifications to the collections are executed transactionally, which ensures data consistency. This means that either all modifications succeed, or none of them do, and any changes that fail are rolled back.
- If you delete a vertex, then all edges referring to that vertex will be deleted too, ensuring that there are no dangling edges in your data.
- If you insert an edge, then the GDN graph module checks whether the edge matches the edge definitions, which ensures that only valid edges are added to the graph.
- Your edge collections will only contain valid edges, ensuring that there are no loose ends in your data.

It's important to note that these guarantees are only in place when using the GDN graph module. If you access the collections in any other way, then these guarantees are lost. For example, if you delete documents from your vertex collections directly, then the edges pointing to them remain in place, leading to inconsistencies in your data. _Use the graph module for all operations related to graph collections to ensure data consistency._

It's also crucial to start with sound data when creating a graph. The GDN graph module will not to introduce new inconsistencies, but existing inconsistencies in your data are not corrected when creating a graph. This means that if you start with unsound data, then there could be dangling edges, which can lead to further inconsistencies.

## Two Approaches to Traversing Graph Edges

When working with graph collections, it's often necessary to traverse only edges of a specific type. There are two ways to achieve this:

### FILTER Edges

The first approach is to use an attribute in the edge document, such as `type`, where you specify a differentiator for the edge, like "friends", "family", "married," or "workmates." You can then filter the edges later with `FILTER e.type = "friends"` if you only want to follow the friend edges.

### Multiple Edge Collections

Another way, which may be more efficient in some cases, is to use different edge collections for different types of edges. You can have `friend_edges`, `family_edges`, `married_edges`, and `workmate_edges` as collection names, for example. You can then configure several graphs, including a subset of the available edge and vertex collections. To only follow `friend` edges, you would specify `friend_edges` as the sole edge collection.

### Considerations

Both approaches have advantages and disadvantages. The `FILTER` operations on edge attributes will do comparisons on each traversed edge, which can become CPU-intensive. When not finding the edges in the first place because of the collection containing them is not traversed at all, there will never be a reason to actually check for their type attribute with `FILTER`.

The multiple edge collections approach is limited by the number of collections that can be used simultaneously in one query. Every collection used in a query requires some resources inside GDN, and the number is therefore limited (max: 10 collections) to cap the resource requirements.

It might not be possible to store the different types of edges in multiple edge collections. You might have constraints on other edge attributes, such as a hash index with a unique constraint, which requires the documents to be in a single collection for the uniqueness guarantee.

If your edges have about a dozen different types, then it's okay to choose the collection approach; otherwise, the `FILTER` approach is preferred. You can still use `FILTER` operations on edges, of course. With the former approach, you can get rid of a `FILTER` on the type, and everything else can stay the same.
