---
title: Weights in Graphs
sidebar_position: 100
---

In the context of graph databases, weights are values assigned to edges that represent the "cost" or "importance" of traversing that edge. The weight can represent any domain-specific value, such as distance, time, cost, or similarity. When you use weights in graph queries, you take these values into account when finding paths or traversals, enabling you to find paths that minimize or maximize the sum of the weights along the path.

Unweighted graphs, on the other hand, do not consider the cost or importance of traversing an edge. In unweighted graph queries, each edge is treated equally, and the path length is simply the number of hops (edges) between vertices.

## Weight Options

`weightAttribute` and `defaultWeight` are options used in [C8QL](../../queries/c8ql/) queries that involve pathfinding algorithms, such as [SHORTEST_PATH](../graph-queries/shortest-path-queries/) and [K_SHORTEST_PATHS](../graph-queries/k-shortest-paths-queries/). These options allow you to customize the way weights are considered in the pathfinding process.

- **weightAttribute**: This option specifies the name of the attribute in the edge documents that contains the weight values. When you set this option, the pathfinding algorithm takes the edge weights into account when calculating the path length. If the attribute does not exist or is not numeric, then the `defaultWeight` is used instead.
- **defaultWeight**: This option sets a default weight value to be used when an edge does not have the specified weight attribute or when the attribute value is invalid. This ensures that the pathfinding algorithm can still compute a path length even when the weight information is incomplete or inconsistent. The default value is 1.

## Use Cases

Here are some use cases illustrating when and why you might want to use weights.

### Transportation Networks

In a transportation network graph, the edges might represent roads or rail connections, and the vertices represent locations. The weight attribute could represent the distance, travel time, or cost of traversing each connection. By using weights, you can find the shortest path that minimizes the total distance, travel time, or cost.

### Social Networks

In a social network graph, the edges represent connections between users. The weight attribute could be used to represent the strength of the relationship or the similarity between users. By using weights, you can find paths or connections that maximize the strength or similarity, effectively finding the most relevant connections.

### Supply Chain Networks

In a supply chain network graph, the edges represent product flows between suppliers, manufacturers, and customers. The weight attribute could represent the cost, time, or risk of moving products between nodes. By using weights, you can find the optimal paths that minimize cost, time, or risk.
