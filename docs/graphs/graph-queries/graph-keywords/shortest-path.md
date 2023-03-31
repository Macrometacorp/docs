---
title: SHORTEST_PATH
sidebar_position: 40
---

The `SHORTEST_PATH` keyword in [C8QL](../../../queries/c8ql/) is used to find the shortest path between two vertices in a graph. By default the shortest path is calculated by the number of edges (hops) between a start vertex and a target vertex. You can specify a weight attribute, in which case the shortest path would be the one with the smallest sum of weights over the edges in the path. If it finds two paths with the same shortest length, then it returns only one.

This keyword can be particularly useful for tasks such as finding the shortest route between two points in a transportation network, discovering the shortest chain of connections between two users in a social network, or analyzing the shortest dependency chain in a project management system.

For more information about using `SHORTEST_PATH`, refer to [Shortest Path Queries](../shortest-path-queries/).

## Purpose

The purpose of the `SHORTEST_PATH` keyword is to identify the most direct route between two vertices in a graph, considering the edge weights and directions. This allows users to efficiently find the minimum-cost paths within their graph data, enabling better decision-making, optimization, and analysis across various use cases and domains.

## Syntax

Here's the general syntax for using the `SHORTEST_PATH` keyword in C8QL:

```sql
FOR vertex, edge IN DIRECTION
  SHORTEST_PATH start_vertex TO target_vertex
  GRAPH 'graph_name'
  OPTIONS {weightAttribute: "attribute_name", defaultWeight: 1}
  RETURN {vertex, edge}
```

## Query Parameters

| Parameter         | Description         |
|-------------------|---------------------------------------------|
| IN DIRECTION    |  Defines in which direction edges are followed (OUTBOUND, INBOUND, or ANY). |
| start_vertex       | The starting vertex for the path search.                                |
| target_vertex      | The target vertex that you want to find the shortest path to.           |
| GRAPH 'graph_name' | The name of the graph you want to search.                               |
| OPTIONS options    | (Optional) Additional options to customize the path search.             |
| - weightAttribute  | (string) A top-level edge attribute that should be used to read the edge weight.   |
| - defaultWeight    | (number) This value is used as fallback if there is no _weightAttribute_ in the edge document, or if it's not a number. The default is 1. |

## Example

Here's an example of finding the shortest path between two users in a social network graph:

```sql
FOR user, connection IN OUTBOUND
  SHORTEST_PATH 'users/12345' TO 'users/67890'
  GRAPH 'socialGraph'
  RETURN {user: user._key, connection: connection ? connection._key : null}
```

This query finds the shortest path between the user with the ID `users/12345` and the user with the ID `users/67890` in the `socialGraph`. The query returns an array of objects containing the user and connection information for each vertex and edge in the shortest path.

It's important to note that in this example, `SHORTEST_PATH` returns the unweighted shortest path, meaning it only considers the number of hops (edges) between vertices. If you need to find the shortest path based on a specific attribute, such as distance or cost, you can use the `OPTIONS` parameter to specify a weight attribute and a custom weight function.
