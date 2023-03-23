---
sidebar_position: 20
title: k Shortest Paths Syntax
---

## Syntax

The syntax for k Shortest Paths queries is similar to the one for [Shortest Path](shortest-path.md) and there are also two options to either use a named graph or a set of edge collections. It only emits a path variable however, whereas SHORTEST_PATH emits a vertex and an edge variable.

:::note
It is highly recommended that you use a **LIMIT** statement, as k Shortest Paths is a potentially expensive operation. On large connected graphs it can return a large number of paths, or perform an expensive (but unsuccessful) search for more short paths.
:::

### Working with named graphs

```json
FOR path
  IN OUTBOUND|INBOUND|ANY K_SHORTEST_PATHS
  startVertex TO targetVertex
  GRAPH graphName
  [OPTIONS options]
  [LIMIT offset, count]
```

- `FOR`: emits the variable **path** which contains one path as an object containing `vertices`, `edges`, and the `weight` of the path.

- `IN` `OUTBOUND|INBOUND|ANY`: defines in which direction edges are followed (outgoing, incoming, or both)

- `K_SHORTEST_PATHS`: the keyword to compute k Shortest Paths
  - **startVertex** `TO` **targetVertex** (both string\|object): the two vertices between which the paths will be computed. This can be specified in the form of a ID string or in the form of a document with the attribute `_id`. All other values will lead to a warning and an empty result. If one of the specified documents does not exist, the result is empty as well and there is no warning.

- `GRAPH` **graphName** (string): the name identifying the named graph. Its vertex and edge collections will be looked up.

- `OPTIONS` **options** (object, _optional_): used to modify the execution of the traversal. Only the following attributes have an effect, all others are ignored:
  - **weightAttribute** (string): a top-level edge attribute that should be used to read the edge weight. If the attribute does not exist or is not numeric, the _defaultWeight_ will be used instead.
  - **defaultWeight** (number): this value will be used as fallback if there is no _weightAttribute_ in the edge document, or if it's not a number. The default is 1.

- `LIMIT` (see [LIMIT operation](../../queries/c8ql/operations/limit.md), _optional_): the maximal number of paths to return. It is highly recommended to use a `LIMIT` for `K_SHORTEST_PATHS`.

### Working with collection sets

```js
FOR path
  IN OUTBOUND|INBOUND|ANY K_SHORTEST_PATHS
  startVertex TO targetVertex
  edgeCollection1, ..., edgeCollectionN
  [OPTIONS options]
  [LIMIT offset, count]
```

Instead of `GRAPH graphName` you can specify a list of edge collections. The involved vertex collections are determined by the edges of the given edge collections.

### Traversing in mixed directions

For k shortest paths with a list of edge collections you can optionally specify the direction for some of the edge collections. Say for example you have three edge collections _edges1_, _edges2_ and _edges3_, where in _edges2_ the direction has no relevance, but in _edges1_ and _edges3_ the direction should be taken into account. In this case you can use `OUTBOUND` as general search direction and `ANY` specifically for _edges2_ as follows:

```js
FOR vertex IN OUTBOUND K_SHORTEST_PATHS
  startVertex TO targetVertex
  edges1, ANY edges2, edges3
```

All collections in the list that do not specify their own direction will use the direction defined after `IN` (here: `OUTBOUND`). This allows to use a different direction for each collection in your path search.
