---
sidebar_position: 25
title: Filtering Paths
---

Path filtering enables advanced and efficient filtering capabilities, significantly improving query performance. Using the `path` variable, you can apply filters based on specific iteration depths. You can filter for absolute positions in the path by specifying a positive number (thus benefiting from optimization strategies), or for relative positions to the path's end by specifying a negative number.

The following examples are based on the [traversal graph](../../graph-examples/example-graphs#the-traversal-graph). If you create this example graph, then you can run any of the queries listed in this page.

## Filtering Edges on the Path

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.edges[0].theTruth == true
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

This query filters all paths where the starting edge (index 0) has the attribute `theTruth` equal to `true`. The resulting paths will be up to five items long

## Filtering Vertices on the Path

Similar to filtering edges, you can also filter vertices:

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.vertices[1]._key == "G"
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

## Combining Multiple Filters

You can combine filters in any way you like:

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.edges[0].theTruth == true
        AND p.edges[1].theFalse == false
    FILTER p.vertices[1]._key == "G"
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

This query filters all paths where the first edge has the attribute `theTruth` equal to `true`, the first vertex is "G," and the second edge has the attribute `theFalse` equal to `false`. The resulting paths will be up to five items long.

:::note
Although the query has a defined a minimum of 1, it only returns results of depth 2. This is because, for all results in depth 1, the second edge does not exist and cannot fulfill the condition.
:::

## Filtering the Entire Path

Using array comparison operators, filters can also be defined for the entire path. For example, requiring that `ALL` edges have `theTruth == true`:

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.edges[*].theTruth ALL == true
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

Or `NONE` of the edges should have `theTruth == true`:

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.edges[*].theTruth NONE == true
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

:::note
If the query result is an empty list, then no matches were found.
:::

Both examples above are recognized by the optimizer and can potentially use indexes other than the edge index.

You can also define a condition that at least one edge on the path must fulfill:

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.edges[*].theTruth ANY == true
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

This guarantees that at least one, but possibly more, edges fulfill the condition. You can apply all the above filters to vertices in the same way.

## Comparing Path Filtering vs. Vertex or Edge Filtering

Path filtering affects the iteration on your graph. If certain conditions are not met, then the traversal might stop continuing along this path.

In contrast, filters on vertices or edges only determine whether you're interested in the actual value of these documents. This influences the list of returned documents (if you return `v` or `e`) similar to specifying a non-null `min` value. If you specify a `min` value of 2, then the traversal over the first two nodes of these paths has to be executed - you just won't see them in your result array.

Filters on vertices or edges are similar - the traverser has to walk along these nodes since you may be interested in documents further down the path.
