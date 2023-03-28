---
title: Weights in Graphs
sidebar_position: 100
---

n the context of graph databases, weights are values assigned to edges that represent the "cost" or "importance" of traversing that edge. The weight can represent any domain-specific value, such as distance, time, cost, or similarity. When you use weights in graph queries, you take these values into account when finding paths or traversals, enabling you to find paths that minimize or maximize the sum of the weights along the path.

Unweighted graphs, on the other hand, do not consider the cost or importance of traversing an edge. In unweighted graph queries, each edge is treated equally, and the path length is simply the number of hops (edges) between vertices.

weightAttribute and defaultWeight are options used in C8QL queries that involve pathfinding algorithms, such as SHORTEST_PATH and K_SHORTEST_PATHS. These options allow you to customize the way weights are considered in the pathfinding process.

weightAttribute: This option specifies the name of the attribute in the edge documents that contains the weight values. When you set this option, the pathfinding algorithm takes the edge weights into account when calculating the path length.

defaultWeight: This option sets a default weight value to be used when an edge does not have the specified weight attribute or when the attribute value is invalid. This ensures that the pathfinding algorithm can still compute a path length even when the weight information is incomplete or inconsistent.

Here are some use cases illustrating when and why you might want to use weights:

Transportation networks: In a transportation network graph, the edges might represent roads or rail connections, and the vertices represent locations. The weight attribute could represent the distance, travel time, or cost of traversing each connection. By using weights, you can find the shortest path that minimizes the total distance, travel time, or cost.

Social networks: In a social network graph, the edges represent connections between users. The weight attribute could be used to represent the strength of the relationship or the similarity between users. By using weights, you can find paths or connections that maximize the strength or similarity, effectively finding the most relevant connections.

Supply chain networks: In a supply chain network graph, the edges represent product flows between suppliers, manufacturers, and customers. The weight attribute could represent the cost, time, or risk of moving products between nodes. By using weights, you can find the optimal paths that minimize cost, time, or risk.

To use weights in your C8QL queries, you can provide the weightAttribute and defaultWeight options when using pathfinding functions like SHORTEST_PATH or K_SHORTEST_PATHS. By doing so, you can customize the pathfinding process to take into account the domain-specific requirements of your application, leading to more meaningful and optimized results.
