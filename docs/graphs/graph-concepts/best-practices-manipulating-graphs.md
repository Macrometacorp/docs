---
title: Best Practices for Manipulating Graph Collections
sidebar_position: 30
---

When working with graph collections in Macrometa Global Data Network (GDN), it is best to use graph-specific commands instead of standard collection commands. The GDN graph module offers several advantages that help maintain data consistency and integrity.

## Transactional Operations with GDN Graph Module

The GDN graph module ensures that all modifications to graph collections are executed transactionally. This means that either all modifications succeed, or none of them do, and any changes that fail are rolled back. This transactional nature ensures data consistency across graph collections.

## Maintaining Data Integrity

Using graph-specific commands provided by the GDN graph module ensures data integrity in the following ways:

- **Automatic Edge Deletion**: When you delete a vertex, all edges referring to that vertex are deleted as well, preventing dangling edges in your data.
- **Edge Validation**: When inserting an edge, the GDN graph module checks whether the edge matches the edge definitions, ensuring that only valid edges are added to the graph.
- **Valid Edge Collection**: Edge collections will only contain valid edges, preventing loose ends in your data.

## The Importance of Using GDN Graph Module

These guarantees are only in place when using the GDN graph module. If you access the collections in any other way, then these guarantees are lost. For example, deleting documents from vertex collections directly will leave the edges pointing to them in place, leading to inconsistencies in your data. To ensure data consistency, always use the graph module for all operations related to graph collections.

## Starting with Sound Data

When creating a graph, it is crucial to start with sound data. The GDN graph module will not introduce new inconsistencies, but it will not correct existing inconsistencies in your data when creating a graph. If you start with unsound data, there could be dangling edges, which can lead to further inconsistencies. Make sure to maintain sound data throughout your graph operations to prevent data integrity issues.
