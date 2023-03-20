---
title: Edge vs. Vertex
sidebar_position: 40
---

This page discusses what data should be in an edge and what should be in a vertex in the context of Macrometa graphs.

## Vertices

The main objects in your data model, such as users, groups or articles, are usually considered to be vertices.

For each type of object, a document collection (also called vertex collection) should store the individual entities. Entities can be connected by edges to express and classify relations between vertices. It often makes sense to have an edge collection per relation type.

The GDN does not require you to store your data in graph structures with edges and vertices, you can also decide
to embed attributes such as which groups a user is part of, or `_id`s of documents in another document instead of connecting the documents with edges. It can be a meaningful performance optimization for _1:n_ relationships, if your data is not focused on relations and you don't need graph traversal with varying depth. It usually means to introduce some redundancy and possibly inconsistencies if you embed data, but it can be an acceptable tradeoff.

Let's say we have two vertex collections, `Users` and `Groups`. Documents in the `Groups` collection contain the attributes of the Group, i.e. when it was founded, its subject, an icon URL and so on. `Users` documents contain the data specific to a user - like all names, birthdays, Avatar URLs, hobbies...

## Edges

We can use an edge collection to store relations between users and groups. Since multiple users may be in an arbitrary number of groups, this is an **m:n** relation. The edge collection can be called `UsersInGroups` with i.e. one edge with `_from` pointing to `Users/John` and `_to` pointing to `Groups/BowlingGroupHappyPin`. This makes the user **John** a member of the group **Bowling Group Happy Pin**. Attributes of this relation may contain qualifiers to this relation, like the permissions of **John** in this group, the date when he joined the group etc.

<!-- ![User in group example](/img/graph_user_in_group.png) -->

So roughly put, if you use documents and their attributes in a sentence, nouns would typically be vertices, verbs become the edges.

You can see this in the [knows graph](#the-knows_graph) below:

    > Alice knows Bob, who in term knows Charlie.

## Advantages of This Approach

Graphs give you the advantage of not just being able to have a fixed number of **m:n** relations in a row, but an arbitrary number. Edges can be traversed in both directions, so it's easy to determine all
groups a user is in, but also to find out which members a certain group has. Users could also be
interconnected to create a social network.

Using the graph data model, dealing with data that has lots of relations stays manageable and can be queried in very flexible ways, whereas it would cause headache to handle it in a relational database system.
