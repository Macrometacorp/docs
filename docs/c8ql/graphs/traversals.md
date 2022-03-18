---
sidebar_position: 4
---

# Graph Traversals

## General query idea

A traversal starts at one specific document (`startVertex`) and follows all edges connected to this document. For all documents (`vertices`) that are targeted by these edges it will again follow all edges connected to them and so on. It is possible to define how many of these follow iterations should be executed at least (`min` depth) and at most (`max` depth).

For all vertices that were visited during this process in the range between `min` depth and `max` depth iterations you will get a result in form of a set with three items:

1. The visited vertex.
2. The edge pointing to it.
3. The complete path from startVertex to the visited vertex as object with an attribute `edges` and an attribute `vertices`, each a list of the coresponding elements. These lists are sorted, which means the first element in `vertices` is the `startVertex` and the last is the visited vertex, and the n-th element in `edges` connects the n-th element with the (n+1)-th element in `vertices`.

## Example execution

Let's take a look at a simple example to explain how it works.

This is the graph that we are going to traverse:

![traversal_graph](/img/traversal_graph.png)

We use the following parameters for our query:

1. We start at the vertex **A**.
2. We use a `min` depth of 1.
3. We use a `max` depth of 2.
4. We follow only in `OUTBOUND` direction of edges

![traversal_graph1](/img/traversal_graph1.png)

Now it walks to one of the direct neighbors of **A**, say **B** (note: ordering is not guaranteed!):

![traversal_graph2](/img/traversal_graph2.png)

The query will remember the state (red circle) and will emit the first result **A** → **B** (black box). This will also prevent the traverser to be trapped in cycles. Now again it will visit one of the direct neighbors of **B**, say **E**:

![traversal_graph3](/img/traversal_graph3.png)

We have limited the query with a `max` depth of *2*, so it will not pick any neighbor of **E**, as the path from **A** to **E** already requires *2* steps. Instead, we will go back one level to **B** and continue with any other direct neighbor there:

![traversal_graph4](/img/traversal_graph4.png)

Again after we produced this result we will step back to **B**. But there is no neighbor of **B** left that we have not yet visited. Hence we go another step back to **A** and continue with any other neighbor there.

![traversal_graph5](/img/traversal_graph5.png)

And identical to the iterations before we will visit **H**:

![traversal_graph6](/img/traversal_graph6.png)

And **J**:

![traversal_graph7](/img/traversal_graph7.png)

After these steps there is no further result left. So all together this query has returned the following paths:

1. **A** → **B**
2. **A** → **B** → **E**
3. **A** → **B** → **C**
4. **A** → **G**
5. **A** → **G** → **H**
6. **A** → **G** → **J**


## Syntax

There are two slightly different syntaxes for traversals in C8QL, one for

- named graphs and another to
- specify a [set of edge collections](#working-with-collection-sets)

## Working with named graphs

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
  * `vertices`: an array of all vertices on this path
  * `edges`: an array of all edges on this path

`IN` `min..max`: the minimal and maximal depth for the traversal:

- **min** (number, `optional`): edges and vertices returned by this query will start at the traversal depth of *min* (thus edges and vertices below will not be returned). If not specified, it defaults to 1. The minimal possible value is 0.
- **max** (number, `optional`): up to *max* length paths are traversed. If omitted, *max* defaults to *min*. Thus only the vertices and edges in the range of *min* are returned. *max* can not be specified without *min*.

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
  * "path" – it is guaranteed that there is no path returned with a duplicate vertex
  * "global" – it is guaranteed that each vertex is visited at most once during the traversal, no matter how many paths lead from the start vertex to this one. If you start with a `min depth > 1` a vertex that was found before *min* depth might not be returned at all (it still might be part of a path). **Note:** Using this configuration the result is not deterministic any more. If there are multiple paths from *startVertex* to *vertex*, one of those is picked.
  * "none" (default) – no uniqueness check is applied on vertices

- **uniqueEdges** (string): optionally ensure edge uniqueness
  * "path" (default) – it is guaranteed that there is no path returned with a duplicate edge
  * "global" – it is guaranteed that each edge is visited at most once during the traversal, no matter how many paths lead from the start vertex to this edge. If you start with a `min depth > 1`, an edge that was found before *min* depth might not be returned at all (it still might be part of a path). **Note:** Using this configuration the result is not deterministic any more. If there are multiple paths from *startVertex* over *edge* one of those is picked.
  * "none" – no uniqueness check is applied on edges. **Note:** Using this configuration the traversal will follow cycles in edges.

- **bfs** (bool): optionally use the alternative breadth-first traversal algorithm
  * true – the traversal will be executed breadth-first. The results will first contain all vertices at depth 1. Than all vertices at depth 2 and so on.
  * false (default) – the traversal will be executed depth-first. It will first return all paths from *min* depth to *max* depth for one vertex at depth 1. Than for the next vertex at depth 1 and so on.

## Working with collection sets

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

## Traversing in mixed directions

For traversals with a list of edge collections you can optionally specify the direction for some of the edge collections. Say for example you have three edge collections `edges1`, `edges2` and `edges3`, where in `edges2` the direction has no relevance but in `edges1` and `edges3` the direction should be taken into account. In this case you can use `OUTBOUND` as general traversal direction and `ANY` specifically for `edges2` as follows:

```js
FOR vertex IN OUTBOUND
  startVertex
  edges1, ANY edges2, edges3
```

All collections in the list that do not specify their own direction will use the direction defined after `IN`. This allows to use a different direction for each collection in your traversal.

## Using filters and the explainer to extrapolate the costs

All three variables emitted by the traversals might as well be used in filter statements. For some of these filter statements the optimizer can detect that it is possible to prune paths of traversals earlier, hence filtered results will not be emitted to the variables in the first place. This may significantly improve the performance of your query. Whenever a filter is not fulfilled, the complete set of *vertex*, *edge* and *path* will be skipped. All paths with a length greater than *max* will never be computed.

In the current state, `AND` combined filters can be optimized, but `OR` combined filters cannot.

## Filtering on paths

Filtering on paths allows for the most powerful filtering and may have the highest impact on performance. Using the path variable you can filter on specific iteration depths. You can filter for absolute positions in the path by specifying a positive number (which then qualifies for the optimizations), or relative positions to the end of the path by specifying a negative number.

The following examples are based on the [traversal graph](../graphs/traversals.md#).

### Pruning

Pruning is the easiest variant to formulate conditions to reduce the amount of data to be checked during a search. So it allows to improve query performance and reduces the amount of overhead generated by the query. Pruning can be executed on the vertex, the edge and the path and any variable defined before.

Examples:

```js
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        PRUNE e.theTruth == true
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

This will search until it sees an edge having `theTruth == true`. The path with this edge will be returned, the search will not continue after this edge.

Namely all responses either have no edge with `theTruth == true` or the last edge on the path has `theTruth == true`.

```js
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        PRUNE v._key == 'G'
        FILTER v._key == 'G'
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

This will search for all paths from the source `circles/A` to the vertex `circles/G`. This is done with first the PRUNE which makes sure we stop search as soon as we have found `G` and we will not go beyond `G` and via a loop return to it.

With the second filter, we remove all paths that do not end in `G` namely all shorter ones that have not been cut out by prune. Hence the list of all paths from `A` to `G` are returned.

:::note
You can also prune as soon as you reach a certain collection with the following example:
```js
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        PRUNE IS_SAME_COLLECTION('circles', v)
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
:::

### Filtering on paths

Filtering on paths allows for the second most powerful filtering and may have the second highest impact on performance. Using the path variable you can filter on specific iteration depths. You can filter for absolute positions in the path by specifying a positive number (which then qualifies for the optimizations), or relative positions to the end of the path by specifying a negative number.

#### Filtering edges on the path

```js
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[0].theTruth == true
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

will filter all paths where the start edge (index 0) has the attribute *theTruth* equal to *true*. The resulting paths will be up to 5 items long.

### Filtering vertices on the path

Similar to filtering the edges on the path you can also filter the vertices:

```js
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.vertices[1]._key == "G"
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

#### Combining several filters

And of course you can combine these filters in any way you like:

```js
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[0].theTruth == true
           AND p.edges[1].theFalse == false
        FILTER p.vertices[1]._key == "G"
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

The query will filter all paths where the first edge has the attribute *theTruth* equal to *true*, the first vertex is "G" and the second edge has the attribute *theFalse* equal to *false*. The resulting paths will be up to 5 items long.

:::note
Although we have defined a *min* of 1, we will only get results of depth 2. This is because for all results in depth 1 the second edge does not exist and hence cannot fulfill the condition here.
:::

#### Filter on the entire path

With the help of array comparison operators filters can also be defined on the entire path, like ALL edges should have theTruth == true:

```js
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[*].theTruth ALL == true
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

Or NONE of the edges should have theTruth == true:

```js
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[*].theTruth NONE == true
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

Both examples above are recognized by the optimizer and can potentially use other indexes than the edge index.

It is also possible to define that at least one edge on the path has to fulfill the condition:

```js
    FOR v, e, p IN 1..5 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[*].theTruth ANY == true
        RETURN { vertices: p.vertices[*]._key, edges: p.edges[*].label }
```

It is guaranteed that at least one, but potentially more edges fulfill the condition. All of the above filters can be defined on vertices in the exact same way.

### Filtering on the path vs. Filtering on Vertices or Edges

Filtering on the path influences the Iteration on your graph. If certain conditions aren't met, the traversal may stop continuing along this path.

In contrast filters on vertex or edge only express whether you're interested in the actual value of these documents. Thus, it influences the list of returned documents (if you return v or e) similar as specifying a non-null `min` value. If you specify a min value of 2, the traversal over the first two nodes of these paths has to be executed - you just won't see them in your result array. 

Similar are filters on vertices or edges - the traverser has to walk along these nodes, since you may be interested in documents further down the path.

### Examples

We will create a simple symmetric traversal demonstration graph:

![traversal graph](/img/traversal_graph.png)

To get started we select the full graph. For better overview we only return the vertex IDs:

```js
    FOR v IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
      RETURN v._key
```

```js
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

We can nicely see that it is heading for the first outer vertex, then goes back to the branch to descend into the next tree. After that it returns to our start node, to descend again. As we can see both queries return the same result, the first one uses the named graph, the second uses the edge collections directly.

Now we only want the elements of a specific depth (min = max = 2), the ones that are right behind the fork:

```js
    FOR v IN 2..2 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
      RETURN v._key
```

```js
    FOR v IN 2 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
      RETURN v._key
```

Results:

  ```json
    [
      "C",
      "E",
      "H",
      "J"
    ]
  ```

As you can see, we can express this in two ways: with or without *max* parameter in the expression.

### Filter examples

Now let's start to add some filters. We want to cut of the branch on the right side of the graph, we may filter in two ways:

- we know the vertex at depth 1 has `_key` == `G`
- we know the `label` attribute of the edge connecting **A** to **G** is `right_foo`

```js
    FOR v, e, p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.vertices[1]._key != 'G'
        RETURN v._key
```

```js
    FOR v, e, p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[0].label != 'right_foo'
        RETURN v._key
```

Results:

  ```json
    [
      "B",
      "C",
      "D",
      "E",
      "F"
    ]
  ```

As we can see all vertices behind **G** are skipped in both queries. The first filters on the vertex `_key`, the second on an edge label.

:::note
As soon as a filter is not fulfilled for any of the three elements `v`, `e` or `p`, the complete set of these will be excluded from the result.
:::

We also may combine several filters, for instance to filter out the right branch (**G**), and the **E** branch:

```js
    FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.vertices[1]._key != 'G'
        FILTER p.edges[1].label != 'left_blub'
        RETURN v._key
```

```js
    FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.vertices[1]._key != 'G' AND p.edges[1].label != 'left_blub'
        RETURN v._key
```

Results:

  ```json
    [
      "B",
      "C",
      "D",
    ]
  ```

As you can see, combining two `FILTER` statements with an `AND` has the same result.

## Comparing OUTBOUND / INBOUND / ANY


All our previous examples traversed the graph in `OUTBOUND` edge direction. You may however want to also traverse in reverse direction (`INBOUND`) or both (`ANY`). Since `circles/A` only has outbound edges, we start our queries from `circles/E`:

```js
    FOR v IN 1..3 OUTBOUND 'circles/E' GRAPH 'traversalGraph'
        RETURN v._key
```

```json
  [
    "F"
  ]
```

```js
    FOR v IN 1..3 INBOUND 'circles/E' GRAPH 'traversalGraph'
        RETURN v._key
```

```json
  [
    "B",
    "A"
  ]
```

```js
    FOR v IN 1..3 ANY 'circles/E' GRAPH 'traversalGraph'
        RETURN v._key
```

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

The first traversal will only walk in the forward (`OUTBOUND`) direction. Therefore from **E** we only can see **F**. Walking in reverse direction (`INBOUND`), we see the path to **A**: **B** → **A**.

Walking in forward and reverse direction (`ANY`) we can see a more diverse result. First of all, we see the simple paths to **F** and **A**. However, these vertices have edges in other directions and they will be traversed.

:::note
The traverser may use identical edges multiple times. For instance, if it walks from **E** to **F**, it will continue to walk from **F** to **E** using the same edge once again. Due to this we will see duplicate nodes in the result.
:::

Please note that the direction can't be passed in by a bind parameter.

## Query explainer for optimizations

Let's have a look what the optimizer does behind the curtain and inspect traversal queries using [the explainer](execution-and-performance-optimizer.html):

```js
    FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        LET localScopeVar = RAND() > 0.5
        FILTER p.edges[0].theTruth != localScopeVar
        RETURN v._key
```

```bash
Query String (173 chars, cacheable: false):
   FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
       LET localScopeVar = RAND() > 0.5
       FILTER p.edges[0].theTruth != localScopeVar
       RETURN v._key
 
Execution plan:
 Id   NodeType          Est.   Comment
  1   SingletonNode        1   * ROOT
  2   TraversalNode        1     - FOR v  /* vertex */, p  /* paths */ IN 1..3  /* min..maxPathDepth */ OUTBOUND 'circles/A' /* startnode */  GRAPH 'traversalGraph'
  3   CalculationNode      1       - LET localScopeVar = (RAND() > 0.5)   /* simple expression */
  4   CalculationNode      1       - LET #6 = (p.`edges`[0].`theTruth` != localScopeVar)   /* simple expression */
  5   FilterNode           1       - FILTER #6
  6   CalculationNode      1       - LET #8 = v.`_key`   /* attribute expression */
  7   ReturnNode           1       - RETURN #8

Indexes used:
 By   Name   Type   Collection   Unique   Sparse   Selectivity   Fields        Ranges
  2   edge   edge   edges        false    false       100.00 %   [ `_from` ]   base OUTBOUND

Functions used:
 Name   Deterministic   Cacheable   Uses V8
 RAND   false           false       false  

Traversals on graphs:
 Id  Depth  Vertex collections  Edge collections  Options                                  Filter / Prune Conditions
 2   1..3   circles             edges             uniqueVertices: none, uniqueEdges: path                           

Optimization rules applied:
 Id   RuleName
  1   move-calculations-up
  2   optimize-traversals
  3   move-calculations-down

```

```js
    FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
        FILTER p.edges[0].label == 'right_foo'
        RETURN v._key
```

```bash
Query String (129 chars, cacheable: true):
   FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
       FILTER p.edges[0].label == 'right_foo'
       RETURN v._key
 

Execution plan:
 Id   NodeType          Est.   Comment
  1   SingletonNode        1   * ROOT
  2   TraversalNode        1     - FOR v  /* vertex */ IN 1..3  /* min..maxPathDepth */ OUTBOUND 'circles/A' /* startnode */  GRAPH 'traversalGraph'
  5   CalculationNode      1       - LET #7 = v.`_key`   /* attribute expression */
  6   ReturnNode           1       - RETURN #7

Indexes used:
 By   Name   Type   Collection   Unique   Sparse   Selectivity   Fields        Ranges
  2   edge   edge   edges        false    false       100.00 %   [ `_from` ]   base OUTBOUND
  2   edge   edge   edges        false    false       100.00 %   [ `_from` ]   level 0 OUTBOUND

Traversals on graphs:
 Id  Depth  Vertex collections  Edge collections  Options                                  Filter / Prune Conditions                   
 2   1..3   circles             edges             uniqueVertices: none, uniqueEdges: path  FILTER (p.`edges`[0].`label` == "right_foo")

Optimization rules applied:
 Id   RuleName
  1   move-calculations-up
  2   move-filters-up
  3   move-calculations-up-2
  4   move-filters-up-2
  5   optimize-traversals
  6   remove-filter-covered-by-traversal
  7   remove-unnecessary-calculations-2
  8   remove-redundant-path-var

```

We now see two queries: In one we add a variable *localScopeVar*, which is outside the scope of the traversal itself - it is not known inside of the traverser.

Therefore, this filter can only be executed after the traversal, which may be undesired in large graphs. The second query on the other hand only operates on the path, and therefore this condition can be used during the execution of the traversal.

Paths that are filtered out by this condition won't be processed at all.

