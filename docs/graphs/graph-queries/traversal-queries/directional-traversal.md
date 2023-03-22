---
sidebar_position: 30
title: Directional Traversal
---

This page explains directional keywords for graph traversal. You can only specify direction using these keywords; bind parameters cannot be used for this purpose. Note that during traversal, the traverser may use the same edges multiple times. For example, it might walk from **E** to **F** and then from **F** back to **E** using the same edge, resulting in duplicate nodes in the results.

All previous examples in this section traversed the graph in the `OUTBOUND` edge direction. However, you might want to also traverse in reverse direction (`INBOUND`) or both (`ANY`). Because `circles/A` only has outbound edges, the queries below start traversing from `circles/E`:

The following examples are based on the [traversal graph](../../graph-examples/example-graphs#the-traversal-graph). If you create this example graph, then you can run any of the queries listed in this topic.

## OUTBOUND Example

The first traversal moves only in the forward (`OUTBOUND`) direction. Therefore, traversing from **E** only returns **F**.

Query:

```sql
FOR v IN 1..3 OUTBOUND 'circles/E' GRAPH 'traversalGraph'
    RETURN v._key
```

Result:

```json
  [
    "F"
  ]
```

## INBOUND Example

Moving in the reverse direction (`INBOUND`) returns the path to **A**: **B** → **A**.

Query:

```sql
FOR v IN 1..3 INBOUND 'circles/E' GRAPH 'traversalGraph'
    RETURN v._key
```

Result:

```json
  [
    "B",
    "A"
  ]
```

## ANY Example

Traversing in forward and reverse direction (`ANY`) returns a more diverse result. It includes the simple paths to **F** and **A**, but these vertices have edges in other directions and they are traversed.

Query:

```sql
FOR v IN 1..3 ANY 'circles/E' GRAPH 'traversalGraph'
    RETURN v._key
```

Result:

```json
  [
    "F",
    "B",
    "C",
    "D",
    "A",
    "G"
  ]
```
