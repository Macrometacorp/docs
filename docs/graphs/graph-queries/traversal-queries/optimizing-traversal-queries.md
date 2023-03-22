---
sidebar_position: 50
title: Optimizing Traversal Queries
---

This page explains how you can optimize your traversal queries.

## Using filters and the explainer to extrapolate the costs

All three variables emitted by the traversals might as well be used in filter statements. For some of these filter statements the optimizer can detect that it is possible to prune paths of traversals earlier, hence filtered results will not be emitted to the variables in the first place. This may significantly improve the performance of your query. Whenever a filter is not fulfilled, the complete set of _vertex_, _edge_ and _path_ will be skipped. All paths with a length greater than _max_ will never be computed.

In the current state, `AND` combined filters can be optimized, but `OR` combined filters cannot.

## Query explainer for optimizations

Let's have a look what the optimizer does behind the curtain and inspect traversal queries using the explainer:

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

We now see two queries: In one we add a variable _localScopeVar_, which is outside the scope of the traversal itself - it is not known inside of the traverser.

Therefore, this filter can only be executed after the traversal, which may be undesired in large graphs. The second query on the other hand only operates on the path, and therefore this condition can be used during the execution of the traversal.

Paths that are filtered out by this condition won't be processed at all.
