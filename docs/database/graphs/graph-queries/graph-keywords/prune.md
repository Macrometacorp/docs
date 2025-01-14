---
title: PRUNE
sidebar_position: 30
---

The PRUNE keyword in [C8QL](../../../../compute/queryworkers/queries/c8ql/) is used in conjunction with graph traversal queries to optimize performance by controlling the traversal process. It helps to reduce the number of paths explored during the traversal by stopping further exploration of a path if a specified condition is met.

By using `PRUNE`, you can define criteria that, once met, will prevent the traversal from continuing along a particular path. This early termination of traversal can significantly improve query performance, especially in large graphs, by eliminating unnecessary exploration of nodes and edges that do not contribute to the desired result.

For more information about using `PRUNE`, refer to [Pruning for Efficient Searches](../traversal-queries/traversal-pruning).

## Purpose

The purpose of the `PRUNE` keyword is to control the traversal process by filtering out paths or branches during the graph traversal that do not meet specified conditions. This allows users to efficiently explore specific parts of a graph by pruning unwanted paths early in the traversal, reducing the overall complexity, improving query performance, and allowing you to manage resources such as memory and CPU usage more effectively.

## Syntax

The syntax for the PRUNE keyword in a C8QL traversal query is as follows:

```sql
FOR v, e, p IN min_depth..max_depth DIRECTION start_vertex
  GRAPH 'graph_name'
  PRUNE pruning_conditions
  FILTER traversal_conditions
  RETURN result_expression
```

The `PRUNE` keyword is placed right after the traversal `FOR` statement and before any `FILTER` or other conditions. It is followed by an expression that evaluates to a boolean value. If the expression returns `true`, then the traversal is pruned, and the current path will not be explored any further. If the expression returns false, the traversal continues as normal.

## Query Parameters

| Parameter             | Description                    |
|-----------------------|------------------------------------------------------------|
| min_depth             | The minimum depth of the traversal.                                 |
| max_depth             | The maximum depth of the traversal.                                 |
| DIRECTION             | The direction of the traversal (INBOUND, OUTBOUND, or ANY).        |
| start_vertex          | The starting vertex for the traversal.                              |
| GRAPH 'graph_name'    | The name of the graph you want to traverse.                         |
| PRUNE pruning_conditions | The conditions under which the traversal should stop exploring a specific path.     |
| FILTER traversal_conditions | Additional conditions that must be met for the traversal to continue.    |
| RETURN result_expression | The expression defining the result to be returned by the query.  |

## Example

Here is an example of a C8QL traversal query using the `PRUNE` keyword in a hypothetical social network graph:

```sql
FOR vertex, edge, path
    IN 1..4 OUTBOUND 'users/alice' GRAPH 'socialNetwork'
    PRUNE edge.relationshipType == 'blocked'
    FILTER vertex.status == 'active'
    RETURN vertex
```

In this example, the `socialNetwork` graph is traversed starting from the user with the ID `users/alice` and exploring the graph using an `OUTBOUND` direction. The traversal depth is set to a range between 1 and 4.

The `PRUNE` keyword is used with the condition `edge.relationshipType == 'blocked'`. This means that if the traversal encounters an edge with a relationshipType attribute of `'blocked'`, then it does not explore that path further. Paths up to the blocked relationship are still considered results, though they might still be post-filtered or ignored due to depth constraints.

Finally, the `FILTER` keyword is used to filter the results to include only vertices (users) with an `'active'` status. The query returns a list of active users reachable from `users/alice`, excluding paths with blocked relationships.
