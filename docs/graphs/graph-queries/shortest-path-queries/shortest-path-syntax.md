---
sidebar_position: 20
title: Shortest Path Syntax
---

When writing a shortest path query, you can either use a named graph or a set of edge collections (anonymous graph).

## Syntax for Named Graphs

Use this syntax if you have created a named graph, which is entered as `graphName`.

```sql
FOR vertex[, edge]
  IN OUTBOUND|INBOUND|ANY SHORTEST_PATH
  startVertex TO targetVertex
  GRAPH graphName
  [OPTIONS options]
```

## Syntax for Collection Sets

Instead of `GRAPH graphName`, you can specify a list of edge collections (anonymous graph). The involved vertex collections are determined by the edges of the given edge collections. The rest of the behavior is similar to the named version.

```sql
FOR vertex[, edge]
  IN OUTBOUND|INBOUND|ANY SHORTEST_PATH
  startVertex TO targetVertex
  edgeCollection1, ..., edgeCollectionN
  [OPTIONS options]
```

## Syntax Traversing in Mixed Directions

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

The SHORTEST_PATH computation will only find an unconditioned shortest path. With this construct it is not possible to define a condition like: "Find the shortest path where all edges are of type _X_". If you want to do this, use a normal [Traversal](../traversal-queries/) instead with the option `{bfs: true}` in combination with `LIMIT 1`.

Also consider using [`WITH`](../../../queries/c8ql/operations/with.md) to specify the collections you expect to be involved.
