---
sidebar_position: 20
title: Shortest Path Query
---

A _shortest path query_ is a query that finds the shortest path between two given documents in your graph. The two documents are referred to as the `startVertex` and `targetVertex`. When you run this query, you receive the result as an array where each element represents a vertex in the shortest path and consists of two items:

- The vertex itself.
- The edge pointing to it.

Shortest path queries enable you to quickly find the shortest path between two vertices in your graph, allowing you to traverse and analyze your graph's structure. This can be particularly useful in applications where finding the most efficient path is critical, such as route planning or supply chain optimization.

For more information about Macrometa queries in general, refer to [Queries](../../../queries/) and [Query Workers](../../../queryworkers/).

## Use Cases

Here are some use cases for shortest path queries.

### E-commerce and Retail

- **Store Navigation**: Shortest path queries can be used to help customers navigate through a physical store, providing the most efficient route to find their desired products.
- **Logistics Planning**: Shortest path queries can optimize the routing of delivery vehicles, finding the most efficient routes to deliver products to customers, reducing transportation costs and improving delivery times.

### Video and Digital Media

- **Optimal Content Recommendations**: Shortest path queries can identify the most relevant content for users based on their viewing history and preferences, by analyzing the shortest connections between content items.
- **Social Network Analysis**: In social media platforms, shortest path queries can help find the most direct connections between users, allowing for more targeted friend or follower recommendations.

### Gaming and E-sports

- **Optimal Pathfinding**: Shortest path queries can be used to calculate the most efficient route for characters in a game to reach a destination, improving the overall gameplay experience.
- **Map Generation**: In procedurally generated game worlds, shortest path queries can be used to ensure that key locations are connected through the most efficient paths, creating a more coherent and enjoyable gaming experience.

### Financial Services

- **Transaction Cost Analysis**: Shortest path queries can help financial institutions optimize trade execution by finding the most direct routes between market participants, reducing transaction costs and improving execution speed.
- **Interbank Payment Routing**: Shortest path queries can be used to identify the most efficient routes for interbank payment transfers, reducing the cost and time required for settlement between financial institutions.

### Telecom and IoT

- **5G Network Planning**: Shortest path queries can identify optimal locations for 5G base stations and small cells, considering factors like coverage, capacity, and interference, to ensure efficient network deployment and resource allocation.
- **Network Failover and Redundancy**: In case of network failures or congestion, shortest path queries can help find alternative communication routes between devices and the core network, minimizing service interruptions and maintaining connectivity.
- **IoT Device Onboarding**: Shortest path queries can efficiently connect new IoT devices to the nearest available access point or gateway, ensuring seamless onboarding and minimal latency for device communication.

## Shortest Path Query in Action

In this high-level example, you have a graph with four vertices labeled A, B, C, and D. The edges are labeled with their weight, or length. The graph looks like this:

![traversal graph](/img/graphs/traversal_graph.png)

Use the following parameters for your query:

- Start at the vertex **A**.
- Finish with the vertex **D**.

In this example, the shortest path between **A** and **D** is through vertices **A**, **B**, **C**, and **D** in that order. The shortest path statement returns the following pairs:

| Vertex | Edge  |
|--------|-------|
|    A   | null  |
|    B   | A → B |
|    C   | B → C |
|    D   | C → D |

Note that the first edge in the result set will always be null because there is no edge pointing to the `startVertex`.
