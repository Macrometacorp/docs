---
sidebar_position: 1
title: Graph Traversal Queries
---

A graph traversal query is a type of query used to explore and navigate a graph data structure by traversing its nodes (vertices) and edges, starting from a specific node and following the connections between the nodes based on defined criteria. Graph traversal queries are used to retrieve, analyze, or modify data stored in graph databases.

## Graph Traversal Applications

You would use a graph traversal query when you need to investigate complex relationships, hierarchies, or interconnected data points in your data set. These queries are particularly useful in situations where the data's relational aspect is crucial, such as social networks, recommendation engines, fraud detection, knowledge graphs, and routing problems.

Graph traversal queries can help you find the shortest path between two nodes, discover patterns or clusters within the graph, or analyze the connectedness and centrality of nodes. By using graph traversal queries, you can efficiently process large and complex data sets with numerous connections and uncover insights that would be difficult to achieve with traditional relational databases.

## Understanding Graph Traversal

A traversal starts at a specific document or node, referred to as the `startVertex`, and follows all edges connected to it. It then visits all the connected nodes (also called vertices) and continues following their connected edges. This process is repeated iteratively for a predefined number of iterations, defined by the minimum (`min`) and maximum (`max`) depth.

During the traversal process, every visited vertex between the min and max depth is returned as a set of three items:

- The visited vertex: the current node being traversed.
- The edge pointing to it: the connection between the current node and the previously visited node.
- The complete path from the `startVertex` to the visited vertex: this is represented as an object with two attributes, `edges` and `vertices`. Both are lists of the corresponding elements in the path, and they are sorted in traversal order. In the vertices list, the first element is the `startVertex`, and the last element is the visited vertex. In the `edges` list, the nth element connects the nth element with the (n+1)th element in the `vertices` list.
