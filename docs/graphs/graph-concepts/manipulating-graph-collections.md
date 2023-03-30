---
title: Edge Traversal Strategies
sidebar_position: 35
---

When working with graph collections, it's often necessary to traverse only edges of a specific type. There are two main approaches to achieve this:

## Using Edge Attributes with FILTER

One approach is to use an attribute in the edge document, such as `type`, where you specify a differentiator for the edge, like "friends", "family", "married," or "workmates." You can then filter the edges later with `FILTER e.type = "friends"` if you only want to follow the friend edges.

## Employing Multiple Edge Collections

An alternative, potentially more efficient, approach is to use different edge collections for different types of edges. For example, `friend_edges`, `family_edges`, `married_edges`, and `workmate_edges` as collection names. You can then configure several graphs, including a subset of the available edge and vertex collections. To only follow `friend` edges, you would specify `friend_edges` as the sole edge collection.

## Choosing the Best Approach

Each method has its advantages and disadvantages:

- The `FILTER` operations on edge attributes will do comparisons on each traversed edge, which can become CPU-intensive.
- The multiple edge collections approach is limited by the number of collections that can be used simultaneously in one query (max: 10 collections) to cap the resource requirements.

It's essential to consider your use case and the constraints of your data when choosing an approach. If your edges have about a dozen different types, then the collection approach might be suitable; otherwise, the `FILTER` approach is preferred. You can still use `FILTER` operations on edges with the collection approach, removing the need for a `FILTER` on the type, and everything else can stay the same.
