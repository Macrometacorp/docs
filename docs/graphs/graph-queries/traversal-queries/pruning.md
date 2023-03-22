---
sidebar_position: 20
title: Pruning for Efficient Searches
---

Pruning allows you to create conditions that reduce the amount of data examined during a search, improving query performance and reducing overhead. You can apply pruning to vertices, edges, paths, and any variables defined earlier in the query.

The following examples are based on the [traversal graph](../../graph-examples/example-graphs#the-traversal-graph). If create this example graph, then you can run any of the queries listed in this page.

## Pruning with theTruth Edge Condition

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    PRUNE e.theTruth == true
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

In this query, the search continues until an edge with `theTruth == true` is found. The path containing this edge is returned, and the search doesn't continue beyond this edge. All returned paths either have no edge with `theTruth == true`, or the last edge on the path has `theTruth == true`.

## Pruning with Vertex Key Condition

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    PRUNE v._key == 'G'
    FILTER v._key == 'G'
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

This query searches for all paths from the source `circles/A` to the vertex `circles/G`. The `PRUNE` statement stops the search as soon as `G` is found and doesn't go beyond `G` or loop back to it. The `FILTER` statement removes all paths that don't end in `G`, including shorter ones that haven't been eliminated by `PRUNE`. As a result, all paths from `A` to `G` are returned.

## Pruning Upon Reaching a Certain Collection

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    PRUNE IS_SAME_COLLECTION('circles', v)
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

In this query, pruning occurs as soon as a vertex in the `'circles'` collection is reached. This helps to focus the search on a specific collection, making it more efficient.
