---
title: Graph Edge
sidebar_position: 1
---

A Graph consists of `vertices` and `edges`. Edges are stored as documents in `edge collections`.

A vertex can be a document of a `document collection` or of an `edge collection` (so `edges` can be used as `vertices`). Which collections are used within a named graph is defined via `edge definitions`.

Graphs allow you to structure your models in line with your domain and group them logically in collections and giving you the power to query them in the same graph queries.

_Are graphs and graph databases useful in data modeling, and if so, for what and under which circumstances?_

:::info
Mathematically, a graph (directed, unlabelled, without multiple edges) is nothing but a relation. It consists of a set `V` of vertices and a subset `E` (the edges) of the Cartesian product `V x V`. There is an edge from `v to w`, if and only if the pair `(v,w)` is contained in `E`.

Similarly, a **bipartite graph** is just a subset of a Cartesian product `A x B` for two disjoint sets `A` and `B`. It is only when we go to labelled graphs (in which every edge carries a label) or multiple edges that we get a richer structure. Note that an undirected graph can just be seen as a symmetric directed one.
:::

## Coming from Relational World

In a relational database, we would probably store the vertices of a graph in one table and the edges in a second one. Each edge would have a foreign key for its starting vertex and one for its ending vertex.

In the case of a bipartite graph, we can simply use two tables `A` and `B` for the two vertex sets, and the edge table simply contains one `foreign` key for A and one for B. Note that this data model is also known as “link table” or “junction table”, which is the standard solution for an `m:n` relation.

The fundamental query operation on a graph is to find all neighbours of a vertex. This operation can be performed in the above setup, but it involves a join between the vertex table with itself, using the link table (the edges). Thus, finding the neighbours of a vertex will involve at least some index lookup and  complexity `O(k)` where k is the number of neighbouring vertices.

GDN is a document store that offer efficient joins in the query language. So one can actually use a `vertex` collection and an `edge` collection and achieve above complexity guarantees. Additionally store arbitrary labelling information for both `vertices` and `edges` along with their corresponding JSON documents.

`Vertex` collections resemble the data tables with the objects to connect. While simple graph queries with fixed number of hops via the relation table may be doable in SQL with several nested joins, GDN can handle an arbitrary number of these hops over edge collections - this is called `traversal`.

To get the `O(k)` neighbour lookup GDN uses a special edge index that is a hash table tolerating repeated keys and keeping elements with equal keys together in a linked list. The joins are simply necessary to combine the `edge` documents with their corresponding `vertices`.

Also `edges` in one `edge` collection may point to several `vertex` collections. Its common to have attributes attached to edges, i.e. a label naming this interconnection. Edges have a direction, with their relations `_from` and `_to` pointing from one document to another document stored in `vertex` collections.

In queries you can define in which directions the `edge` relations may be followed i.e.,

- OUTBOUND: `_from` → `_to`
- INBOUND: `_from` ← `_to`
- ANY: `_from` ↔ `_to`

## Edges, Identifiers, Handles

A graph data model always consists of at least two collections: the `relations` between the nodes in the graphs are stored in an `edges collection`, the `nodes` in the graph are stored in documents in `regular collections`.

Edges in are special documents. In addition to the system attributes `_key`, `_id` and `_rev`, they have the attributes `_from` and `_to`, which contain document handles, namely the start-point and the end-point of the edge.

_Example:_

- the “edge” collection stores the information that a company’s reception is sub-unit to the services unit and the services unit is sub-unit to the CEO. You would express this relationship with the `_from` and `_to` attributes
- the `normal` collection stores all the properties about the reception, e.g. that 20 people are working there and the room number etc

- `_from` is the document handle of the linked vertex (incoming relation)
- `_to` is the document handle of the linked vertex (outgoing relation)

Edge collections are special collections that store edge documents. Edge documents are connection documents that reference other documents. The type of a collection must be specified when a collection is created and cannot be changed afterwards.

To change edge endpoints you would need to remove old document/edge and insert new one. Other fields can be updated as in default collection.

> Edges are normal documents that always contain a `_from` and a `_to` attribute.

## Manipulating graph collections with regular document functions

The underlying collections of the graphs are still accessible using the standard methods for collections. However GDN graph module adds an additional layer on top of these collections giving you the following guarantees:

- All modifications are executed transactional
- If you delete a `vertex`, all `edges` referring to this vertex will be deleted too.
- If you insert an `edge`, it is checked if the edge matches the edge definitions.
- Your edge collections will only contain valid edges and you will never have loose ends.

:::warning
These guarantees are lost if you access the collections in any other way than the graph module, so if you delete documents from your vertex collections directly, the edges pointing to them will be remain in place.
:::
Existing inconsistencies in your data will not be corrected when you create a graph. Therefore, make sure you start with sound data as otherwise there could be dangling edges after all. The GDN graph module guarantees to not introduce new inconsistencies only.

## FILTERs on edge document attributes OR Multiple edge collections?

If you want to only `traverse` edges of a specific type, there are two ways to achieve this.

- The first would be an attribute in the edge document i.e. `type`, where you specify a differentiator for the edge like "friends", "family", "married" or "workmates", so you can later `FILTER e.type = "friends"` if you only want to follow the friend edges.

- Another way, which may be more efficient in some cases, is to use different `edge` collections for different types of edges, so you have `friend_edges`, `family_edges`, `married_edges` and `workmate_edges` as collection names. You can then configure several graphs including a subset of the available edge and vertex collections. To only follow `friend` edges, you would specify `friend_edges` as sole edge collection.

Both approaches have advantages and disadvantages. `FILTER` operations on edge attributes will do comparisons on each `traversed edge`, which may become CPU-intense. When not finding the edges in the first place because of the collection containing them is not traversed at all, there will never be a reason to actually check for their type attribute with FILTER.

The multiple edge collections approach is limited by the number of collections that can be used simultaneously in one query. Every collection used in a query requires some resources inside GDN and the number is therefore limited (max: 10 collections) to cap the resource requirements. You may also have constraints on other edge attributes, such as a `hash index` with a unique constraint, which requires the documents to be in a single collection for the uniqueness guarantee, and it may thus not be possible to store the different types of edges in multiple edge collections.

So, if your edges have about a dozen different types, it’s okay to choose the `collection` approach, otherwise the `FILTER` approach is preferred. You can still use `FILTER` operations on edges of course. You can get rid of a `FILTER` on the type with the former approach, everything else can stay the same.

## What data should be in Edge and what should be in a Vertex?

The main objects in your data model, such as users, groups or articles, are usually considered to be vertices.

For each type of object, a document collection (also called vertex collection) should store the individual entities. Entities can be connected by edges to express and classify relations between vertices. It often makes sense to have an edge collection per relation type.

GDN does not require you to store your data in graph structures with edges and vertices, you can also decide
to embed attributes such as which groups a user is part of, or `_id`s of documents in another document instead of connecting the documents with edges. It can be a meaningful performance optimization for _1:n_ relationships, if your data is not focused on relations and you don't need graph traversal with varying depth. It usually means to introduce some redundancy and possibly inconsistencies if you embed data, but it can be an acceptable tradeoff.

### Vertices

Let's say we have two vertex collections, `Users` and `Groups`. Documents in the `Groups` collection contain the attributes of the Group, i.e. when it was founded, its subject, an icon URL and so on. `Users` documents contain the data specific to a user - like all names, birthdays, Avatar URLs, hobbies...

### Edges

We can use an edge collection to store relations between users and groups. Since multiple users may be in an arbitrary number of groups, this is an **m:n** relation. The edge collection can be called `UsersInGroups` with i.e. one edge with `_from` pointing to `Users/John` and `_to` pointing to `Groups/BowlingGroupHappyPin`. This makes the user **John** a member of the group **Bowling Group Happy Pin**. Attributes of this relation may contain qualifiers to this relation, like the permissions of **John** in this group, the date when he joined the group etc.

<!-- ![User in group example](/img/graph_user_in_group.png) -->

So roughly put, if you use documents and their attributes in a sentence, nouns would typically be vertices, verbs become the edges.

You can see this in the [knows graph](#the-knows_graph) below:

    > Alice knows Bob, who in term knows Charlie.

### Advantages of this approach

Graphs give you the advantage of not just being able to have a fixed number of **m:n** relations in a row, but an arbitrary number. Edges can be traversed in both directions, so it's easy to determine all
groups a user is in, but also to find out which members a certain group has. Users could also be
interconnected to create a social network.

Using the graph data model, dealing with data that has lots of relations stays manageable and can be queried in very flexible ways, whereas it would cause headache to handle it in a relational database system.
