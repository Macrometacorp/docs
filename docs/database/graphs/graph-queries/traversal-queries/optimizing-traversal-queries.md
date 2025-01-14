---
sidebar_position: 50
title: Optimizing Traversal Queries
---

When working with graph traversal queries in Macrometa, it's essential to understand how the query optimizer and filter statements can help improve the performance of your queries. The query optimizer in the query execution plan can optimize filters combined with the `AND` operator, but not filters combined with the `OR` operator. Knowing this can help you design filter statements that can be optimized effectively, leading to better query performance.

To learn more about query execution plans, refer to [Execution Plan](../../../../compute/queryworkers/queries/running-queries#execution-plan).

## Filter Statements and Early Path Pruning

In a graph traversal query, three variables are emitted:

- vertex
- edge
- path

Filter statements can be applied to these variables to refine the results. When the optimizer in the query detects that certain filter statements can lead to early pruning, then the filtered results are not emitted to the variables, reducing the overall processing time of the query.

When a filter is not fulfilled, the entire set of vertex, edge, and path is skipped, meaning that all paths with a length greater than the specified maximum will never be computed. This prevents unnecessary processing and helps improve query performance.

## Analyzing Query Optimizations with the Execution Plan

The query execution plan provides insights into how the optimizer works and how it optimizes graph traversals. By analyzing the execution plan, which consists of different stages, such as NodeType, estimations, and the optimization rules applied, you can better understand the optimization process.

The execution plan also shows the indexes used and the traversals on graphs. This information is useful for developers and database administrators, as it can help them optimize queries to improve performance, especially when working with large graphs. By understanding how the query optimizer works and the optimization rules applied, you can modify their queries to make better use of the optimization mechanisms provided by the database engine.

For more information about running queries and query results, refer to [Running Queries](../../../../compute/queryworkers/queries/running-queries).

## Practical Examples and Considerations

In this example, there are two queries: identical except that one includes the variable _localScopeVar_, which is outside the scope of the traversal itself - it is not known inside of the traverser. Therefore, the filter in the query can only be executed after the traversal, which might be undesired in large graphs. The second query only operates on the path, and therefore this condition can be used during the execution of the traversal.

1. A query with a variable (`localScopeVar`) outside the scope of the traversal. The filter using this variable can only be executed after the traversal, which might result in poor performance for large graphs as the traversal would generate many unnecessary paths before filtering them out.

  ```sql
      FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
          LET localScopeVar = RAND() > 0.5
          FILTER p.edges[0].theTruth != localScopeVar
          RETURN v._key
  ```

  The execution plan for the query would look something like this. Notice it takes seven steps to execute and uses three optimization rules.

  ```bash
  ...
  
  Execution plan:
  Id   NodeType          Est.   Comment
    1   SingletonNode        1   * ROOT
    2   TraversalNode        1     - FOR v  /* vertex */, p  /* paths */ IN 1..3  /* min..maxPathDepth */ OUTBOUND 'circles/A' /* startnode */  GRAPH 'traversalGraph'
    3   CalculationNode      1       - LET localScopeVar = (RAND() > 0.5)   /* simple expression */
    4   CalculationNode      1       - LET #6 = (p.`edges`[0].`theTruth` != localScopeVar)   /* simple expression */
    5   FilterNode           1       - FILTER #6
    6   CalculationNode      1       - LET #8 = v.`_key`   /* attribute expression */
    7   ReturnNode           1       - RETURN #8

  ...                       

  Optimization rules applied:
  Id   RuleName
    1   move-calculations-up
    2   optimize-traversals
    3   move-calculations-down

  ```

1. A query that operates only on the path, where the filter condition can be used during the execution of the traversal. This means that paths that are filtered out by this condition won't be processed at all, improving the query's performance.

  ```sql
      FOR v,e,p IN 1..3 OUTBOUND 'circles/A' GRAPH 'traversalGraph'
          FILTER p.edges[0].label == 'right_foo'
          RETURN v._key
  ```

  The execution plan for the query would look something like this. Notice it takes six steps to execute and uses eight optimization rules.

  ```bash
  ...

  Execution plan:
  Id   NodeType          Est.   Comment
    1   SingletonNode        1   * ROOT
    2   TraversalNode        1     - FOR v  /* vertex */ IN 1..3  /* min..maxPathDepth */ OUTBOUND 'circles/A' /* startnode */  GRAPH 'traversalGraph'
    5   CalculationNode      1       - LET #7 = v.`_key`   /* attribute expression */
    6   ReturnNode           1       - RETURN #7

  ...

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
