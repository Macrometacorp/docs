---
sidebar_position: 20
title: Filtering Paths
---

Path filtering enables advanced and efficient filtering capabilities, significantly impacting query performance. Using the path variable, you can apply filters based on specific iteration depths.

You can filter for absolute positions in the path by specifying a positive number (thus benefiting from optimization strategies), or for relative positions to the path's end by specifying a negative number.

The following examples are based on the [traversal graph](../../graph-examples/example-graphs#the-traversal-graph). If create this example graph, then you can run any of the queries listed in this topic.

## Filtering Paths

Filtering on paths is a powerful way to filter data and can have a significant impact on query performance. The `path` variable can be used to filter on specific iteration depths by specifying an absolute or relative position in the path.

### Filtering Edges on the Path

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.edges[0].theTruth == true
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

will filter all paths where the start edge (index 0) has the attribute _theTruth_ equal to _true_. The resulting paths will be up to 5 items long.

### Filtering vertices on the path

Similar to filtering the edges on the path you can also filter the vertices:

```sql
FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.vertices[1]._key == "G"
    RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

### Combining several filters

And of course you can combine these filters in any way you like:

```sql
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[0].theTruth == true
           AND p.edges[1].theFalse == false
        FILTER p.vertices[1]._key == "G"
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

The query will filter all paths where the first edge has the attribute _theTruth_ equal to _true_, the first vertex is "G" and the second edge has the attribute _theFalse_ equal to _false_. The resulting paths will be up to 5 items long.

:::note
Although we have defined a _min_ of 1, we will only get results of depth 2. This is because for all results in depth 1 the second edge does not exist and hence cannot fulfill the condition here.
:::

### Filter on the entire path

With the help of array comparison operators filters can also be defined on the entire path, like ALL edges should have theTruth == true:

```sql
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[*].theTruth ALL == true
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

Or NONE of the edges should have theTruth == true:

```sql
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[*].theTruth NONE == true
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

Both examples above are recognized by the optimizer and can potentially use other indexes than the edge index.

It is also possible to define that at least one edge on the path has to fulfill the condition:

```sql
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[*].theTruth ANY == true
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

It is guaranteed that at least one, but potentially more edges fulfill the condition. All of the above filters can be defined on vertices in the exact same way.

## Filtering on the path vs. Filtering on Vertices or Edges

Filtering on the path influences the Iteration on your graph. If certain conditions aren't met, the traversal may stop continuing along this path.

In contrast filters on vertex or edge only express whether you're interested in the actual value of these documents. Thus, it influences the list of returned documents (if you return v or e) similar as specifying a non-null `min` value. If you specify a min value of 2, the traversal over the first two nodes of these paths has to be executed - you just won't see them in your result array.

Similar are filters on vertices or edges - the traverser has to walk along these nodes, since you may be interested in documents further down the path.