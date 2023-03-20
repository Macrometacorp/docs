---
title: Vertices and Edges
sidebar_position: 40
---

This page discusses best practices for determining what data should be stored in edges and vertices in Macrometa graphs.

## Vertices

Vertices are the main objects in your graph data model, such as users, groups, or articles. For each type of object, a [document collection](../../collections/documents/) (also called a vertex collection) stores the individual entities. Entities can be connected by edges to express and classify relations between vertices. It often makes sense to have one edge collection per relation type.

Macrometa does not require you to store your data in graph structures with edges and vertices. You can also decide to embed attributes, such as which groups a user is part of or `_id`s of documents in another document, instead of connecting the documents with edges. This can be a meaningful performance optimization for _1:n_ relationships, if your data is not focused on relations and you don't need graph traversal with varying depth. However, it usually means introducing some redundancy and possibly inconsistencies if you embed data, so it should be considered as a tradeoff.

For example, let's say you have two vertex collections: `Users` and `Groups`. Documents in the `Groups` collection contain the attributes of the Group, such as when it was founded, its subject, an icon URL, and so on. `Users` documents contain the data specific to a user, such as all names, birthdays, avatar URLs, or hobbies.

## Edges

An [edge collection](../../collections/graph-edge/) is used to store relations between users and groups. Since multiple users might be in an arbitrary number of groups, this is an _m:n_ relation. The edge collection can be called `UsersInGroups`, with one edge having `_from` pointing to `Users/John` and `_to` pointing to `Groups/BowlingGroupHappyPin`. This makes the user **John** a member of the group **Bowling Group Happy Pin**. Attributes of this relation might contain qualifiers to this relation, such as the permissions of **John** in this group or the date when he joined the group.

If you use documents and their attributes in a sentence, nouns would typically be vertices, and verbs the edges.

## Advantages of this Approach

Graphs give you the advantage of not just being able to have a fixed number of m:n relations in a row, but an arbitrary number. Edges can be traversed in both directions (outbound and inbound), making it easy to determine all groups a user is in, but also to find out which members a certain group has. Users could also be interconnected to create a social network.

Using the graph data model, dealing with data that has lots of relations stays manageable and can be queried in very flexible ways, whereas it would be difficult to handle in a relational database system.
