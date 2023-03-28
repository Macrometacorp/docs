---
title: PRUNE
---

The PRUNE keyword is used in conjunction with graph traversal queries to optimize performance by controlling the traversal process. It helps to reduce the number of paths explored during the traversal by stopping further exploration of a path if a specified condition is met.

By using PRUNE, you can define criteria that, once met, will prevent the traversal from continuing along a particular path. This early termination of traversal can significantly improve query performance, especially in large graphs, by eliminating unnecessary exploration of nodes and edges that do not contribute to the desired result.

The PRUNE keyword is placed right after the traversal FOR statement and before any FILTER or other conditions. It is followed by an expression that evaluates to a boolean value. If the expression returns true, the traversal is pruned, and the current path will not be explored any further. If the expression returns false, the traversal continues as normal.

In summary, the PRUNE keyword in C8QL allows you to optimize Macrometa graph queries by pruning unnecessary paths during traversal, which can lead to more efficient and faster query execution.

## Purpose

The purpose of the `PRUNE` keyword in C8QL is to control the traversal process by filtering out paths or branches during the graph traversal that do not meet specified conditions. This allows users to efficiently explore specific parts of a graph by pruning unwanted paths early in the traversal, reducing the overall complexity and improving query performance.

## Syntax



## Example

Here is an example of a C8QL traversal query using the PRUNE keyword in a hypothetical social network graph:

FOR vertex, edge, path
    IN 1..4 OUTBOUND 'users/alice' GRAPH 'socialNetwork'
    PRUNE edge.relationshipType == 'blocked'
    FILTER vertex.status == 'active'
    RETURN vertex

In this example, we are traversing the socialNetwork graph starting from the user with the ID 'users/alice' and exploring the graph using an OUTBOUND direction. We set the traversal depth to a range between 1 and 4.

The PRUNE keyword is used with the condition edge.relationshipType == 'blocked'. This means that if the traversal encounters an edge with a relationshipType attribute of 'blocked', it will stop exploring that path further.

Finally, the FILTER keyword is used to filter the results to include only vertices (users) with an 'active' status. The query will return a list of active users reachable from 'users/alice', excluding paths with blocked relationships.
