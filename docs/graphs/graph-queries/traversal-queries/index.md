---
sidebar_position: 1
title: Graph Traversal Queries
---

A traversal starts at one specific document (`startVertex`) and follows all edges connected to this document. For all documents (`vertices`) that are targeted by these edges it will again follow all edges connected to them and so on. It is possible to define how many of these follow iterations should be executed at least (`min` depth) and at most (`max` depth).

For all vertices that were visited during this process in the range between `min` depth and `max` depth iterations you will get a result in form of a set with three items:

- The visited vertex.
- The edge pointing to it.
- The complete path from startVertex to the visited vertex as object with an attribute `edges` and an attribute `vertices`, each a list of the corresponding elements. These lists are sorted, which means the first element in `vertices` is the `startVertex` and the last is the visited vertex, and the n-th element in `edges` connects the n-th element with the (n+1)-th element in `vertices`.

## Syntax

There are two slightly different syntaxes for traversals in C8QL, one for

- named graphs and another to
- specify a [set of edge collections](#working-with-collection-sets)

### Working with named graphs

```js
[WITH collection1[, collection2[, ...collectionN]]]
FOR vertex[, edge[, path]]
  IN [min[..max]]
  OUTBOUND|INBOUND|ANY startVertex
  GRAPH graphName
  [OPTIONS options]
```

`WITH`:

- **collections** (collection, `repeatable`): list of collections that will be involved in the traversal

`FOR`: emits up to three variables:

- **vertex** (object): the current vertex in a traversal
- **edge** (object, `optional`): the current edge in a traversal
- **path** (object, `optional`): representation of the current path with two members:
  - `vertices`: an array of all vertices on this path
  - `edges`: an array of all edges on this path

`IN` `min..max`: the minimal and maximal depth for the traversal:

- *_min_* (number, `optional`): edges and vertices returned by this query will start at the traversal depth of *min* (thus edges and vertices below will not be returned). If not specified, it defaults to 1. The minimal possible value is 0.
- *_max_* (number, `optional`): up to _max_ length paths are traversed. If omitted, _max_ defaults to _min_. Thus only the vertices and edges in the range of _min_ are returned. *max* can not be specified without _min_.

`OUTBOUND|INBOUND|ANY`: follow outgoing, incoming, or edges pointing in either direction in the traversal; Please note that this can't be replaced by a bind parameter.

- **startVertex** (string|object): a vertex where the traversal will originate from. This can be specified in the form of an ID string or in the form of a document with the attribute `_id`. All other values will lead to a warning and an empty result. If the specified document does not exist, the result is empty as well and there is no warning.

`GRAPH` **graphName** (string): the name identifying the named graph. Its vertex and edge collections will be looked up. Note that the graph name is like a regular string, hence it must be enclosed by quote marks.

`PRUNE` **condition**: A condition, like in a FILTER statement, which will be evaluated in every step of the traversal, as early as possible. The semantics of this condition is as follows:

- If the condition evaluates to `true` this path will be considered as a result, it might still be post filtered or ignored due to depth constraints. However the search will not continue from this path, namely there will be no result having this path as a prefix.
e.g.: Take the path: `(A) -> (B) -> (C)`  starting at `A` and PRUNE on `B` will result in `(A)` and `(A) -> (B)` being valid paths, and `(A) -> (B) -> (C)` not returned, it got pruned on B.
- If the condition evaluates to `false` we will continue our search beyond this path.

There is only one `PRUNE` condition possible, but it can contain an arbitrary amount of `AND` or `OR` statements. Also note that you can use the output variables of this traversal in the `PRUNE`, as well as all variables defined before this Traversal statement.

`OPTIONS` **options** (object, `optional`): used to modify the execution of the traversal. Only the following attributes have an effect, all others are ignored:

- **uniqueVertices** (string): optionally ensure vertex uniqueness
  - "path" – it is guaranteed that there is no path returned with a duplicate vertex
  - "global" – it is guaranteed that each vertex is visited at most once during the traversal, no matter how many paths lead from the start vertex to this one. If you start with a `min depth > 1` a vertex that was found before _min_ depth might not be returned at all (it still might be part of a path). **Note:** Using this configuration the result is not deterministic any more. If there are multiple paths from _startVertex_ to _vertex_, one of those is picked.
  - "none" (default) – no uniqueness check is applied on vertices

- **uniqueEdges** (string): optionally ensure edge uniqueness
  - "path" (default) – it is guaranteed that there is no path returned with a duplicate edge
  - "global" – it is guaranteed that each edge is visited at most once during the traversal, no matter how many paths lead from the start vertex to this edge. If you start with a `min depth > 1`, an edge that was found before _min_ depth might not be returned at all (it still might be part of a path). **Note:** Using this configuration the result is not deterministic any more. If there are multiple paths from _startVertex_ over _edge_ one of those is picked.
  - "none" – no uniqueness check is applied on edges. **Note:** Using this configuration the traversal will follow cycles in edges.

- **bfs** (bool): optionally use the alternative breadth-first traversal algorithm
  - true – the traversal will be executed breadth-first. The results will first contain all vertices at depth 1. Than all vertices at depth 2 and so on.
  - false (default) – the traversal will be executed depth-first. It will first return all paths from _min_ depth to _max_ depth for one vertex at depth 1. Than for the next vertex at depth 1 and so on.

### Working with collection sets

```js
[WITH collection1[, collection2[, ...collectionN]]]
FOR vertex[, edge[, path]]
  IN [min[..max]]
  OUTBOUND|INBOUND|ANY startVertex
  edgeCollection1, ..., edgeCollectionN
  [OPTIONS options]
```

Instead of `GRAPH graphName` you may specify a list of edge collections. Vertex collections are determined by the edges in the edge collections. The traversal options are the same as with the [named graph variant](#working-with-named-graphs).

If the same edge collection is specified multiple times, it will behave as if it were specified only once. Specifying the same edge collection is only allowed when the collections do not have conflicting traversal directions.

### Traversing in mixed directions

For traversals with a list of edge collections you can optionally specify the direction for some of the edge collections. Say for example you have three edge collections `edges1`, `edges2` and `edges3`, where in `edges2` the direction has no relevance but in `edges1` and `edges3` the direction should be taken into account. In this case you can use `OUTBOUND` as general traversal direction and `ANY` specifically for `edges2` as follows:

```js
FOR vertex IN OUTBOUND
  startVertex
  edges1, ANY edges2, edges3
```

All collections in the list that do not specify their own direction will use the direction defined after `IN`. This allows to use a different direction for each collection in your traversal.
