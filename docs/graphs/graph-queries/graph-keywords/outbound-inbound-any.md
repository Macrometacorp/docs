---
title: OUTBOUND | INBOUND | ANY
---

`OUTBOUND`, `INBOUND`, and `ANY` are used to specify the direction of graph traversal when performing operations such as traversals or finding the shortest path. These keywords help you control how the traversal follows the edges in the graph, allowing you to customize the query to fit your specific use case.

Here's a brief explanation of each direction keyword:

## OUTBOUND

When you use `OUTBOUND`, the traversal follows edges from their starting vertices (`_from`) to their target vertices (`_to`). This direction is useful when you want to explore relationships from a particular vertex to its connected vertices.

**Example**: In a social network graph, an `OUTBOUND` traversal from a user vertex can be used to find the users that the starting user follows.

## INBOUND

With `INBOUND`, the traversal follows edges in the reverse direction, from their target vertices (`_to`) to their starting vertices (`_from`). This direction is helpful when you want to explore relationships that point towards a particular vertex.

**Example**: In a social network graph, an `INBOUND` traversal to a user vertex can be used to find the users who follow the target user.

## ANY

The `ANY` keyword means that the traversal will follow edges in both `OUTBOUND` and `INBOUND` directions. This direction is useful when you want to explore relationships without any specific direction constraint.

**Example**: In a social network graph, an `ANY` traversal from a user vertex can be used to find all users who either follow or are followed by the starting user.

## Syntax

Here's an example of using the direction keywords in a graph traversal query:

```sql
FOR v, e, p IN 1..3 DIRECTION start_vertex
  GRAPH 'graph_name'
  FILTER your_conditions_here
  RETURN your_result_here
```

Replace `DIRECTION` with `OUTBOUND`, `INBOUND`, or `ANY` as required by your specific use case.

By using the appropriate direction keyword in your graph queries, you can control the traversal behavior and obtain the desired results when working with graph data in Macrometa.
