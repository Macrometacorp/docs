---
sidebar_position: 20
title: Shortest Path Query
---

A _shortest path query_ is a query that finds the shortest path between two given documents in your graph. The two documents are referred to as the `startVertex` and `targetVertex`. When you run this query, you receive the result as an array where each element represents a vertex in the shortest path and consists of two items:

- The vertex itself.
- The edge pointing to it.

Shortest path queries enable you to quickly find the shortest path between two vertices in your graph, allowing you to traverse and analyze your graph's structure. This can be particularly useful in applications where finding the most efficient path is critical, such as route planning or supply chain optimization.

## Shortest Path Query in Action

In this high-level example, you have a graph with four vertices labeled A, B, C, and D. The edges are labeled with their weight, or length. The graph looks like this:

![traversal graph](/img/graphs/traversal_graph.png)

Use the following parameters for your query:

- Start at the vertex **A**.
- Finish with the vertex **D**.

In this example, the shortest path between **A** and **D** is through vertices A, B, C and D in that order. The shortest path statement returns the following pairs:

| Vertex | Edge  |
|--------|-------|
|    A   | null  |
|    B   | A → B |
|    C   | B → C |
|    D   | C → D |

Note that the first edge in the result set will always be null because there is no edge pointing to the startVertex.

## Syntax

When writing a shortest path query, you can either use a named graph or a set of edge collections (anonymous graph).

### Syntax for Named Graphs

Use this syntax if you have created a named graph, which is entered as `graphName`.

```sql
FOR vertex[, edge]
  IN OUTBOUND|INBOUND|ANY SHORTEST_PATH
  startVertex TO targetVertex
  GRAPH graphName
  [OPTIONS options]
```

### Syntax for Collection Sets

Instead of `GRAPH graphName`, you can specify a list of edge collections (anonymous graph). The involved vertex collections are determined by the edges of the given edge collections. The rest of the behavior is similar to the named version.

```sql
FOR vertex[, edge]
  IN OUTBOUND|INBOUND|ANY SHORTEST_PATH
  startVertex TO targetVertex
  edgeCollection1, ..., edgeCollectionN
  [OPTIONS options]
```

### Syntax Traversing in Mixed Directions

For a shortest path with a list of edge collections you can optionally specify the direction for some of the edge collections. For example, if you have three edge collections _edges1_, _edges2_ and _edges3_, where in _edges2_ the direction has no relevance, but in _edges1_ and _edges3_ the direction should be taken into account. In this case, you could use `OUTBOUND` as general search direction and `ANY` specifically for _edges2_ as follows:

```sql
FOR vertex IN OUTBOUND SHORTEST_PATH
  startVertex TO targetVertex
  edges1, ANY edges2, edges3
```

All collections in the list that do not specify their own direction will use the direction defined after `IN` (here: `OUTBOUND`). This allows you to use a different direction for each collection in your path search.

## Query Parameters

This section explains the parameters of the queries above.

### FOR

Emits up to two variables:

- **vertex** (object): The current vertex on the shortest path
- **edge** (object, _optional_): The edge pointing to the vertex

### IN OUTBOUND|INBOUND|ANY

Defines in which direction edges are followed.

- **OUTBOUND**: Outgoing
- **INBOUND**: Incoming
- **ANY**: Both outgoing and incoming

### startVertex TO targetVertex

Both are string objects.

The two vertices between which the shortest path is computed. This can be specified in the form of an ID string or in the form of a document with the attribute `_id`. All other values will lead to a warning and an empty result. If one of the specified documents does not exist, then the result is empty as well and there is no warning.

### GRAPH graphName

String object. The name identifying the named graph. Its vertex and edge collections are already defined, you do not need to specify them.

### OPTIONS options

Object, _optional_.

Used to modify the way the traversal runs. Only the following attributes have an effect, all others are ignored:

- **weightAttribute** (string): A top-level edge attribute that should be used to read the edge weight. If the attribute is not existent or not numeric, then the _defaultWeight_ is used instead.
- **defaultWeight** (number): This value is used as fallback if there is no _weightAttribute_ in the edge document, or if it's not a number. The default is 1.

## Conditional shortest path

The SHORTEST_PATH computation will only find an unconditioned shortest path. With this construct it is not possible to define a condition like: "Find the shortest path where all edges are of type _X_". If you want to do this, use a normal [Traversal](traversal-queries/) instead with the option `{bfs: true}` in combination with `LIMIT 1`.

Please also consider [to use `WITH`](../../queries/c8ql/operations/with.md) to specify the collections you expect to be involved.

## Examples

These examples are based on the [Traversal Graph](../graph-examples/example-graphs.md#the-traversal-graph). Create a graph based on the example graph to follow along.

![traversal graph](/img/graphs/traversal_graph.png)

### Shortest Path Example

You can query the shortest path from **A** to **D** using either the named graph syntax or the collection sets syntax. The results are identical. For information about running queries, refer to [Running Queries](../../queries/running-queries).

#### Named Graph

```sql
FOR v, e IN OUTBOUND SHORTEST_PATH 'circles/A' TO 'circles/D' GRAPH 'traversalGraph' 
  RETURN [v._key, e._key]
```

This query uses the named graph `'traversalGraph'` and the `OUTBOUND` keyword to traverse from the start vertex `'circles/A'` to the target vertex `'circles/D'`. The `SHORTEST_PATH` keyword ensures that only the shortest path is returned.

The `RETURN` statement returns an array containing the `_key` attributes of both the vertex (`v._key`) and the edge (`e._key`) of each step along the path. Because this query is using a named graph, the edge collections are inferred from the graph and do not need to be specified explicitly.

#### Collection Sets

```sql
FOR v, e IN OUTBOUND SHORTEST_PATH 'circles/A' TO 'circles/D' edges 
  RETURN [v._key, e._key]
```

This query specifies the edge collection to traverse (`edges`). The `OUTBOUND` keyword is used to traverse in the outbound direction from the start vertex `'circles/A'` to the target vertex `'circles/D'`. The `SHORTEST_PATH` keyword ensures that only the shortest path is returned.

The `RETURN` statement returns an array containing the `_key` attributes of both the vertex (`v._key`) and the edge (`e._key`) of each step along the path.

### Traverse Mixed Directions Example

You can also compute shortest paths based on documents found in collections. You can use either the named graph syntax or the collection sets syntax, the results are identical. For information about running queries, refer to [Running Queries](../../queries/running-queries).

#### Named Graph

```sql
FOR a IN circles FILTER a._key == 'A' 
  FOR d IN circles FILTER d._key == 'D' 
    FOR v, e IN 
      OUTBOUND SHORTEST_PATH a TO d 
      GRAPH 'traversalGraph' 
      RETURN [v._key, e._key]
```

This query uses a named graph. It first filters the vertex with the key `'A'` from the `'circles'` vertex collection and assigns it to variable `'a'`. Similarly, it filters the vertex with the key `'D'` from the `'circles'` vertex collection and assigns it to variable `'d'`. It then finds the shortest path between vertex `'a'` and vertex `'d'` using the `'traversalGraph'` named graph.

The `RETURN` statement returns an array containing the `_key` attributes of both the vertex (`v._key`) and the edge (`e._key`) of each step along the path.

#### Collection Sets

```sql
FOR a IN circles FILTER a._key == 'A' 
  FOR d IN circles FILTER d._key == 'D' 
    FOR v, e IN 
      OUTBOUND SHORTEST_PATH a TO d edges 
      RETURN [v._key, e._key]
```

This query uses a collection set instead of a named graph. It first filters the vertex with the key `'A'` from the `'circles'` vertex collection and assigns it to variable `'a'`. Similarly, it filters the vertex with the key `'D'` from the `'circles'` vertex collection and assigns it to variable `'d'`. It then finds the shortest path between vertex `'a'` and vertex `'d'` using the edge collections specified in the `'edges'` collection set.

The `RETURN` statement returns an array containing the `_key` attributes of both the vertex (`v._key`) and the edge (`e._key`) of each step along the path.

### Results

Your results will be similar to the following. They will not be identical, because the edges of the Traversal Graph in the Example Graphs are created with randomly assigned `_KEY` values.

```json
  [ 
    [
      "A",
      null
    ],
    [
      "B",
      "4464905920"
    ],
    [
      "C",
      "4464905922"
    ],
    [
      "D",
      "4464905924"
    ]
  ]
```
