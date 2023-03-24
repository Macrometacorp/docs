---
sidebar_position: 40
title: Traversal Examples
---

This page presents several examples of graph traversals, starting with a very simple, no-code explanation and ending with examples of how to filter graph results.

The graph in the following examples is based on the [traversal graph](../../graph-examples/example-graphs#the-traversal-graph). To follow along, create this example graph and run any of the queries provided in this page.

![traversal_graph](/img/graphs/traversal_graph.png)

## Simple Traversal Overview

This section provides an explanation of a simple graph traversal using an example. Each step of the traversal process is broken down as the query is executed.

The query uses the following parameters:

- Start at vertex **A**.
- Use a `min` depth of 1.
- Use a `max` depth of 2.
- Traverse (move) only in `OUTBOUND` direction of edges.

You can traverse edges and vertexes as a named graph or as a set of collections (anonymous graph, also called collection sets).

Here's the query for a named graph:

```sql
FOR v IN 1..2 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
  RETURN v._key
```

And the query for collection sets:

```sql
FOR v IN 1..2 OUTBOUND 'circles/A' edges RETURN v._key
```

The traversal begins at vertex **A**:

![traversal_graph1](/img/graphs/traversal_graph1.png)

First it walks to a direct neighbor of **A**, for example, **B** (note: ordering is not guaranteed!):

![traversal_graph2](/img/graphs/traversal_graph2.png)

The query saves the state (red circle) and emits the first result **A** → **B** (black box). This also prevents the traverser from getting caught in cycles. Next, it proceeds to a direct neighbor of **B**, such as **E**:

![traversal_graph3](/img/graphs/traversal_graph3.png)

With a `max` depth limit of 2, the query will not select any neighbor of **E**, because the path from **A** to **E** already takes two steps. Instead, it returns to **B** and explores any remaining direct neighbors:

![traversal_graph4](/img/graphs/traversal_graph4.png)

After producing this result, the query steps back to **B**. As there are no unvisited neighbors of **B** left, it goes back to **A** and continues with another neighbor there:

![traversal_graph5](/img/graphs/traversal_graph5.png)

Following the same pattern as before, the query walks to **H**:

![traversal_graph6](/img/graphs/traversal_graph6.png)

And then to **J**:

![traversal_graph7](/img/graphs/traversal_graph7.png)

Once these steps are completed, no further results remain. The query returns the following paths in total:

1. **A** → **B**
2. **A** → **B** → **C**
3. **A** → **B** → **E**
4. **A** → **G**
5. **A** → **G** → **H**
6. **A** → **G** → **J**

The query returns the key for each vertex listed above:

```json
[
	"B",
	"C",
	"E",
	"G",
	"H",
	"J"
]
```

This simple traversal example demonstrates how to navigate a graph efficiently using specific parameters. By understanding the steps involved in traversing a graph, you can adapt your queries to explore more complex scenarios and retrieve the desired information effectively. As you become more familiar with graph traversal concepts, you will be better equipped to use Macrometa's Global Data Network to its full potential and enhance your data-driven applications.

## Traversal Queries in a Symmetric Graph

This section demonstrates traversal queries using a simple symmetric graph. The graph is designed to show how different queries return different results, based on the specified depth parameters.

![traversal graph](/img/graphs/traversal_graph.png)

### Full Graph Traversal

Begin by retrieving the full graph by traversing up to depth 3. To make the results easier to comprehend, only the vertex IDs are returned.

Named graph query:

```sql
FOR v IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
  RETURN v._key
```

Collection sets query:

```sql
FOR v IN 1..3 OUTBOUND 'circles/A' edges RETURN v._key
```

Results:

```json
  [
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K"
  ]
```

The query visits all the neighbors of the specified vertex, their neighbors, and so on up to depth 3. Both queries return the same results: the named graph query uses the graph name, while the collection sets query directly uses edge collections.

### Retrieving Elements at Specific Depth

To retrieve only the elements at a particular depth (exactly two steps away from the starting vertex), right behind the fork, you can use the following techniques.

#### Specify Min and Max Depth

In this named graph query, both `min` and `max` depth parameters are set to `2` (`2..2`).

```sql
FOR v IN 2..2 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
  RETURN v._key
```

#### Specify Min Depth Only

In this named graph query, only the `min` depth parameter is set to `2`.

```sql
FOR v IN 2 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
  RETURN v._key
```

#### Traversal Results

Both queries yield the same results.

```json
  [
    "C",
    "E",
    "H",
    "J"
  ]
```

To extract meaningful insights from your data, you must understand how to retrieve elements at a specific depth in a graph traversal. By using the `min` and `max` depth parameters, you can effectively target the desired elements in your graph and simplify your query results.

## Refining Traversal with Filters

This section demonstrates how to apply filters to traversal queries for more precise results. The goal is to exclude specific branches or vertices from the graph. Two filtering approaches are illustrated below:

- Filtering based on the vertex `_key` at depth 1, which is **G** in this case.
- Filtering based on the label attribute of the edge connecting **A** to **G**, which is  `right_foo`.

### Filtering Branches Using Vertex Key or Edge Label

Suppose you want to exclude all vertices connected to **G**. There are several ways to do that.

#### Filter by Vertex Key

In this named graph query, the filter is applied to the `_key` attribute of vertex 1 in the path. The query excludes the paths that go from the start vertex directly to vertex **G**.

```sql
FOR v, e, p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.vertices[1]._key != 'G'
    RETURN v._key
```

#### Filter by Edge Label

In this named graph query, the filter is applied to the label attribute of the start vertex of each edge.

```sql
FOR v, e, p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.edges[0].label != 'right_foo'
    RETURN v._key
```

#### Filtered Results

Both queries produce the same results. They exclude all vertices connected to **G**. The first query filters on the vertex `_key`, while the second filters on an edge label. If a filter is not met for any of the elements `v`, `e`, or `p`, then the entire set is excluded from the result.

```json
  [
    "B",
    "C",
    "D",
    "E",
    "F"
  ]
```

### Combining Multiple Filters

In this section, you'll learn how to combine multiple filters to refine traversal results further. By using several `FILTER` statements, you can efficiently retrieve the exact information you need from your graph.

Consider a scenario where you want to exclude both the right branch (**G**) and the **E** branch from your traversal results.

#### Using Separate Filters

In this named graph query, two separate `FILTER` statements are used.

```sql
FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.vertices[1]._key != 'G'
    FILTER p.edges[1].label != 'left_blub'
    RETURN v._key
```

#### Combining Filters with AND

In this named graph query, `FILTER` statements are combined using the `AND` operator.

```sql
FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
    FILTER p.vertices[1]._key != 'G' AND p.edges[1].label != 'left_blub'
    RETURN v._key
```

#### Combined Filter Results

Both queries produce the same results.

```json
  [
    "B",
    "C",
    "D",
  ]
```

As shown, using two `FILTER` statements combined with an AND operator achieves the desired outcome. By mastering the use of filters, you can effectively extract specific data from your graph.
