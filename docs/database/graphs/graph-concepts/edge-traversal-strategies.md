---
title: Edge Traversal Strategies
sidebar_position: 35
---

When working with graph collections, you might need to traverse edges of a particular type. Two primary approaches can help you accomplish this.

## Filtering Edges with Attributes

One way to traverse specific edge types is by using an attribute in the edge document, such as `type`. This attribute can differentiate between edge categories, such as "friends", "family", "married", or "workmates". To follow only the friend edges, you can filter the edges using `FILTER e.type = "friends"`.

## Utilizing Multiple Edge Collections

A potentially more efficient alternative is to create separate edge collections for different types of edges. For instance, you could use collection names like `friend_edges`, `family_edges`, `married_edges`, and `workmate_edges`. You can then configure several graphs that include subsets of the available edge and vertex collections. To follow only `friend` edges, specify `friend_edges` as the single edge collection.

## Selecting the Right Approach

Each method offers advantages and drawbacks:

- Filtering edges using attributes can be CPU-intensive, as comparisons are performed on each traversed edge.
- The multiple edge collections approach is constrained by the number of collections that can be used simultaneously in one query (max: 10 collections) to limit resource requirements.

When choosing an approach, consider your use case and data constraints. If your edges have around a dozen different types, the collection approach may be more suitable; otherwise, the `FILTER` approach is recommended. With the collection approach, you can still use `FILTER` operations on edges, eliminating the need for a `FILTER` on the type while keeping everything else the same.
