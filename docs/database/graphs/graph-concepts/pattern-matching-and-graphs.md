---
title: Pattern-matching and Graphs
sidebar_position: 90
---

If you traverse a graph to find paths fulfilling complex conditions, that kind of search is called _pattern matching_.

Pattern matching is a technique used to find specific structures or patterns within a graph. It enables expressing complex queries concisely and intuitively by defining a pattern to match in the graph data. Pattern matching is especially useful for identifying and extracting relevant subgraphs based on specific relationships between vertices and edges.

In [C8QL](../../../compute/queryworkers/queries/c8ql/), Macrometa's query language, you can use the `FOR` keyword to define variables representing vertices and edges in the graph, along with traversal operators to describe their relationships.

## Traversal Operators

- `->`: This operator represents a directed edge from the left-hand side vertex to the right-hand side vertex.
- `<-`: This operator represents a directed edge from the right-hand side vertex to the left-hand side vertex.
- `-`: This operator represents an undirected edge between the two vertices.

## Example: Finding Posts by Followed Users

Consider an example using a social network graph with two vertex collections, `users` and `posts`, and two edge collections, `follows` (representing users following other users) and `creates` (representing users creating posts). To find all posts created by users who are followed by a specific user, say `users/12345`:

```sql
FOR follower IN users
  FILTER follower._id == 'users/12345'
  FOR followee IN 1..1 OUTBOUND follower follows // Traverse follows edges from follower to followee
  FOR post IN 1..1 OUTBOUND followee creates // Traverse creates edges from followee to posts
  RETURN post
```

In this query, pattern matching describes the relationship between the vertices and edges in the graph. The `OUTBOUND` keyword specifies the direction of traversal along the follows and creates edges.

## Example: Finding Mutual Connections

In the same social network graph, suppose you want to find mutual connections between two users, `users/12345` and `users/67890`:

```sql
FOR user1 IN users
  FILTER user1._id == 'users/12345'
  FOR user2 IN users
    FILTER user2._id == 'users/67890'
    FOR mutual IN 1..1 OUTBOUND user1 follows
      FILTER mutual IN 1..1 OUTBOUND user2 follows
      RETURN mutual
```

This query first finds the users followed by both `user1` and `user2`, and then returns the mutual connections.

By using pattern matching in C8QL, you can express complex graph queries more readably and understandably, particularly beneficial when working with large and intricate graph structures.
