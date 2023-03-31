---
title: K_SHORTEST_PATHS
sidebar_position: 50
---

The `K_SHORTEST_PATHS` keyword in [C8QL](../../../queries/c8ql/) is used to find the top k shortest paths between two vertices in a graph. It computes a specified number of shortest paths (k) between a start vertex and a target vertex. This can be useful when you want to find alternative routes or paths in a network, such as finding several shortest routes in a transportation network or multiple connection chains in a social network.

For more information about using `K_SHORTEST_PATHS`, refer to [K Shortest Path Queries](../k-shortest-paths-queries/).

## Purpose

The purpose of the `K_SHORTEST_PATH` is to efficiently discover multiple shortest paths between two vertices in a graph. This allows users to analyze and compare alternative routes or paths based on various factors, such as cost, distance, or other attributes.

## Syntax

Here's the general syntax for using the K_SHORTEST_PATHS keyword in C8QL:

```sql
FOR path IN
  K_SHORTEST_PATHS start_vertex TO target_vertex
  GRAPH 'graph_name'
  OPTIONS { maxNumPaths: k, weightAttribute: 'attribute', defaultWeight: default_value }
  RETURN path
```

## Query Parameters

| Parameter         | Description         |
|-------------------|---------------------------------------------|
| start_vertex       | The starting vertex for the path search.                                |
| target_vertex      | The target vertex that you want to find the k shortest paths to.           |
| GRAPH 'graph_name' | The name of the graph you want to search.                               |
| maxNumPaths: k     | The number of shortest paths (k) you want to find.        |
| OPTIONS options    | (Optional) Additional options to customize the path search.             |
| - weightAttribute  | (string) The attribute to use as the weight for calculating the path length. By default, the algorithm uses the unweighted number of hops (edges) between vertices.   |
| - defaultWeight    | (number) This value is used as fallback if there is no _weightAttribute_ in the edge document, or if it's not a number. The default is 1. |

## Example

Here's an example of finding the three shortest paths between two users in a social network graph:

```sql
FOR path IN
  K_SHORTEST_PATHS 'users/12345' TO 'users/67890'
  GRAPH 'socialGraph'
  OPTIONS { maxNumPaths: 3 }
  RETURN path
```

This query finds the top three shortest paths between the user with the ID `users/12345` and the user with the ID `users/67890` in the `socialGraph`. The query returns an array of paths, each containing the vertices and edges in one of the three shortest paths.

If you need to find the k shortest paths based on a specific attribute, such as distance or cost, you can use the `OPTIONS` parameter to specify a weight attribute and a default weight value.

It's important to note that the `K_SHORTEST_PATHS` function might return fewer than k paths if there are fewer than k distinct paths between the given vertices. In such cases, it returns all the distinct paths that it can find.
