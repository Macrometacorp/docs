---
sidebar_position: 2
title: Concepts
---

# Graphs, Vertices & Edges

## Introduction

A Graph consists of `vertices` and `edges`. Edges are stored as documents in `edge collections`.

A vertex can be a document of a `document collection` or of an `edge collection` (so `edges` can be used as `vertices`). Which collections are used within a named graph is defined via `edge definitions`.

Graphs allow you to structure your models in line with your domain and group them logically in collections and giving you the power to query them in the same graph queries.

*Are graphs and graph databases useful in data modeling, and if so, for what and under which circumstances?*

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

* OUTBOUND: `_from` → `_to`
* INBOUND: `_from` ← `_to`
* ANY: `_from` ↔ `_to`

## Edges, Identifiers, Handles

A graph data model always consists of at least two collections: the `relations` between the nodes in the graphs are stored in an `edges collection`, the `nodes` in the graph are stored in documents in `regular collections`.

Edges in are special documents. In addition to the system attributes `_key`, `_id` and `_rev`, they have the attributes `_from` and `_to`, which contain document handles, namely the start-point and the end-point of the edge.

*Example:*

* the “edge” collection stores the information that a company’s reception is sub-unit to the services unit and the services unit is sub-unit to the CEO. You would express this relationship with the `_from` and `_to` attributes
* the `normal` collection stores all the properties about the reception, e.g. that 20 people are working there and the room number etc

* `_from` is the document handle of the linked vertex (incoming relation)
* `_to` is the document handle of the linked vertex (outgoing relation)

Edge collections are special collections that store edge documents. Edge documents are connection documents that reference other documents. The type of a collection must be specified when a collection is created and cannot be changed afterwards.

To change edge endpoints you would need to remove old document/edge and insert new one. Other fields can be updated as in default collection.

> Edges are normal documents that always contain a `_from` and a `_to` attribute.

## Querying graphs

Storing (and retrieving) a graph is one thing, but the actual problems only begin when we want to query information about a graph.

Finding the neighbours of a `vertex` is one crucial question one might have about a graph (or relation, which is the same thing). However, when we deal with graphs (or relations) in practice, we usually have a lot more questions, here we just mention a few that come to mind:

1. Find all neighbours of a `vertex` only using `edges` with a given `property` or `label`.
2. Find all neighbours of a `vertex` with a given `property` or `label`.
3. Find all paths with a fixed length L in the graph starting at some given `vertex`.
4. Find the shortest (or lightest when working with weights) path from vertex `V` to vertex `W`.
5. Find the distances between any two vertices in the graph.
6. Perform a depth first search for some vertex starting at a given vertex.
7. Perform a breadth first search for some vertex starting at a given vertex.
8. Find a minimal spanning tree for the graph.
9. Perform any map-reduce like computation as is possible in the Pregel framework by Google, for example “Pagerank” or “Find connected components”.
10. Solve the traveling salesman problem in the graph.

GDN provides several [Graph Functions](#graph-functions) for working with edges and vertices, to analyze them and their relations

## Manipulating graph collections with regular document functions

The underlying collections of the graphs are still accessible using the standard methods for collections. However GDN graph module adds an additional layer on top of these collections giving you the following guarantees:

* All modifications are executed transactional
* If you delete a `vertex`, all `edges` referring to this vertex will be deleted too.
* If you insert an `edge`, it is checked if the edge matches the edge definitions.
* Your edge collections will only contain valid edges and you will never have loose ends.

:::warning
These guarantees are lost if you access the collections in any other way than the graph module, so if you delete documents from your vertex collections directly, the edges pointing to them will be remain in place.
:::
Existing inconsistencies in your data will not be corrected when you create a graph. Therefore, make sure you start with sound data as otherwise there could be dangling edges after all. The GDN graph module guarantees to not introduce new inconsistencies only.

## FILTERs on edge document attributes OR Multiple edge collections?

If you want to only `traverse` edges of a specific type, there are two ways to achieve this. 

* The first would be an attribute in the edge document i.e. `type`, where you specify a differentiator for the edge like "friends", "family", "married" or "workmates", so you can later `FILTER e.type = "friends"` if you only want to follow the friend edges.

* Another way, which may be more efficient in some cases, is to use different `edge` collections for different types of edges, so you have `friend_edges`, `family_edges`, `married_edges` and `workmate_edges` as collection names. You can then configure several graphs including a subset of the available edge and vertex collections. To only follow `friend` edges, you would specify `friend_edges` as sole edge collection.

Both approaches have advantages and disadvantages. `FILTER` operations on edge attributes will do comparisons on each `traversed edge`, which may become CPU-intense. When not finding the edges in the first place because of the collection containing them is not traversed at all, there will never be a reason to actually check for their type attribute with FILTER.

The multiple edge collections approach is limited by the number of collections that can be used simultaneously in one query. Every collection used in a query requires some resources inside GDN and the number is therefore limited (max: 10 collections) to cap the resource requirements. You may also have constraints on other edge attributes, such as a `hash index` with a unique constraint, which requires the documents to be in a single collection for the uniqueness guarantee, and it may thus not be possible to store the different types of edges in multiple edge collections.

So, if your edges have about a dozen different types, it’s okay to choose the `collection` approach, otherwise the `FILTER` approach is preferred. You can still use `FILTER` operations on edges of course. You can get rid of a `FILTER` on the type with the former approach, everything else can stay the same.

## What data should be in Edge and what should be in a Vertex?

The main objects in your data model, such as users, groups or articles, are usually considered to be vertices.

For each type of object, a document collection (also called vertex collection) should store the individual entities. Entities can be connected by edges to express and classify relations between vertices. It often makes sense to have an edge collection per relation type.

GDN does not require you to store your data in graph structures with edges and vertices, you can also decide
to embed attributes such as which groups a user is part of, or `_id`s of documents in another document instead of connecting the documents with edges. It can be a meaningful performance optimization for *1:n* relationships, if your data is not focused on relations and you don't need graph traversal with varying depth. It usually means to introduce some redundancy and possibly inconsistencies if you embed data, but it can be an acceptable tradeoff.

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

## Example Graphs

GDN  comes with a set of easily graspable graphs that are used to demonstrate the APIs.
You can use the `add samples` tab in the `create graph` window in the web interface and use it to create instances of these graphs in your GDN fabric. Once you've created them, you can them in GUI.

### The Knows\_Graph

A set of persons knowing each other:
![Persons relation Example Graph](/img/knows_graph.png)

The *knows* graph consists of one *vertex collection* `persons` connected via one *edge collection* `knows`.
It will contain five persons *Alice*, *Bob*, *Charlie*, *Dave* and *Eve*.
We will have the following directed relations:

  - *Alice* knows *Bob*
  - *Bob* knows *Charlie*
  - *Bob* knows *Dave*
  - *Eve* knows *Alice*
  - *Eve* knows *Bob*

:::note
With the default "Search Depth" of 2 of the graph viewer you may not see all edges of this graph.
:::

### The Social Graph

A set of persons and their relations:

<!-- ![Social Example Graph](/img/social_graph.png) -->

This example has female and male persons as *vertices* in two *vertex collections* - `female` and `male`. The *edges* are their connections in the `relation` *edge collection*.

### The City Graph

A set of european cities, and their fictional traveling distances as connections:

![Cities Example Graph](/img/cities_graph.png)

The example has the cities as *vertices* in several *vertex collections* - `germanCity` and `frenchCity`. The *edges* are their interconnections in several *edge collections* `french / german / international Highway`. 

### The Traversal Graph

This graph was designed to demonstrate filters in traversals. It has some labels to filter on it.

![Traversal Graph](/img/traversal_graph.png)

The example has all its vertices in the *circles* collection, and an *edges* edge collection to connect them.

Circles have unique numeric labels. Edges have two boolean attributes (*theFalse* always being false, *theTruth* always being true) and a label sorting *B* - *D* to the left side, *G* - *K* to the right side. Left and right side split into Paths - at *B* and *G* which are each direct neighbours of the root-node *A*. Starting from *A* the graph has a depth of 3 on all its paths.

:::note
With the default "Search Depth" of 2 of the graph viewer you may not see all nodes of this graph.
:::

### The k Shortest Paths Graph

The vertices in this graph are train stations of cities in Europe and
North America and the edges represent train connections between them,
with the travel time for both directions as edge weight.

![Train Connection Map](/img/train_map.png)

See the [k Shortest Paths page](../documents/c8ql/query-patterns/graphs-kshortest-paths) for query examples.

### The World Graph

<!-- ![World Graph](/img/world_graph.png) -->

The world country graph structures its nodes like that: world → continent → country → capital. In some cases edge directions aren't forward (therefore it will be displayed disjunct in the graph viewer). It has two ways of creating it. One using the named graph utilities (*worldCountry*), one without (*worldCountryUnManaged*). 

It is used to demonstrate raw traversal operations.

### The Mps Graph

This graph was created to demonstrate a use case of the shortest path algorithm. Even though the algorithm can only determine one shortest path, it is possible to return multiple shortest paths with two separate queries. Therefore the graph is named after the [**m**ultiple **p**ath **s**earch](../documents/c8ql/query-patterns/multiple-path-search) use case.

![Mps Graph](/img/mps_graph.png)

The example graph consists of *vertices* in the `mps_verts` collection and *edges* in the `mps_edges` collection. It is a simple traversal graph with start node *A* and end node *C*.

### Higher volume graph examples

All of the above examples are rather small so they are easier to comprehend and can demonstrate the way the functionality works. Example: [Pokec social network](https://snap.stanford.edu/data/soc-pokec.html)

## Graph Functions

A lot of graph functions accept a vertex (or edge) example as parameter as defined in the next sections.

Examples will explain the API on the [the city graph](concepts.md#the-city-graph):

![Social Example Graph](/img/cities_graph.png)

### Get vertex *from* of an edge

Get the source vertex of an edge

`graph._fromVertex(edgeId)`

Returns the vertex defined with the attribute *_from* of the edge with *edgeId* as its *_id*.

**Parameters**

 * edgeId (required) *_id* attribute of the edge

### Get vertex *to* of an edge

Get the target vertex of an edge

`graph._toVertex(edgeId)`

Returns the vertex defined with the attribute *_to* of the edge with *edgeId* as its *_id*.

**Parameters**

 * edgeId (required) *_id* attribute of the edge

### Get Neighbors

Get `all neighbors` of the vertices defined by the example

`graph._neighbors(vertexExample, options)`

The function accepts an id, an example, a list of examples or even an empty example as parameter for vertexExample.

The complexity of this method is **O(n\*m^x)** with *n* being the vertices defined by the parameter vertexExamplex, *m* the average amount of neighbors and *x* the maximal depths. Hence the default call would have a complexity of **O(n\*m)**;

**Parameters**

- vertexExample (optional)
- options (optional) An object defining further options. Can have the following values:
    - *direction*: The direction of the edges. Possible values are *outbound*, *inbound* and *any* (default).
    - *edgeExamples*: Filter the edges
    - *neighborExamples*: Filter the neighbor vertices
    - *edgeCollectionRestriction* : One or a list of edge-collection names that should be considered to be on the path.
    - *vertexCollectionRestriction* : One or a list of vertex-collection names that should be considered on the intermediate vertex steps.
    - *minDepth*: Defines the minimal number of intermediate steps to neighbors (default is 1).
    - *maxDepth*: Defines the maximal number of intermediate steps to neighbors (default is 1).

### Get Common Neighbors

Get all `common neighbors` of the vertices defined by the examples.

`graph._commonNeighbors(vertex1Example, vertex2Examples, optionsVertex1, optionsVertex2)`

This function returns the intersection of *graph_module._neighbors(vertex1Example, optionsVertex1)* and *graph_module._neighbors(vertex2Example, optionsVertex2)*.

For parameter documentation see [_neighbors](#get-neighbors).

The complexity of this method is **O(n\*m^x)** with *n* being the maximal amount of vertices defined by the parameters vertexExamples, *m* the average amount of neighbors and *x* the maximal depths. Hence the default call would have a complexity of **O(n\*m)**;

### Count Common Neighbors

Get the amount of common neighbors of the vertices defined by the examples.

`graph._countCommonNeighbors(vertex1Example, vertex2Examples, optionsVertex1, optionsVertex2)`

Similar to [_commonNeighbors](#get-common-neighbors) but returns count instead of the elements.

### Get Common Properties

Get the vertices of the graph that share `common properties`.

`graph._commonProperties(vertex1Example, vertex2Examples, options)`

The function accepts an id, an example, a list of examples or even an empty example as parameter for vertex1Example and vertex2Example.

The complexity of this method is **O(n)** with *n* being the maximal amount of vertices defined by the parameters vertexExamples.

**Parameters**

- vertex1Examples (optional) Filter the set of source vertices
- vertex2Examples (optional) Filter the set of vertices compared to.
- options (optional) An object defining further options. Can have the following values:
    - *vertex1CollectionRestriction* : One or a list of vertex-collection names that should be searched for source vertices.
    - *vertex2CollectionRestriction* : One or a list of vertex-collection names that should be searched for compare vertices.
    - *ignoreProperties* : One or a list of attribute names of a document that should be ignored.

### Count Common Properties

Get the amount of vertices of the graph that share common properties.

`graph._countCommonProperties(vertex1Example, vertex2Examples, options)`

Similar to [_commonProperties](#get-common-properties) but returns count instead of the objects.

### Get Paths

The `_paths` function returns all paths of a graph.

`graph._paths(options)`

This function determines all available paths in a graph.

The complexity of this method is **O(n\*n\*m)** with *n* being the amount of vertices in the graph and *m* the average amount of connected edges;

**Parameters**

- options (optional) An object containing options, see below:
    - *direction*: The direction of the edges. Possible values are *any*, *inbound* and *outbound* (default).
    - *followCycles* (optional): If set to *true* the query follows cycles in the graph, default is false.
    - *minLength* (optional): Defines the minimal length a path must have to be returned (default is 0).
    - *maxLength* (optional): Defines the maximal length a path must have to be returned (default is 10).

### Get Shortest Path

The `_shortestPath` function returns all shortest paths of a graph.

`graph._shortestPath(startVertexExample, endVertexExample, options)`

This function determines all shortest paths in a graph. The function accepts an id, an example, a list of examples or even an empty example as parameter for start and end vertex.

The length of a path is by default the amount of edges from one start vertex to an end vertex. The option weight allows the user to define an edge attribute representing the length.

**Parameters**

- startVertexExample (optional) An example for the desired start Vertices.
- endVertexExample (optional) An example for the desired end Vertices.
- options (optional) An object containing options, see below:
    - *direction*: The direction of the edges as a string. Possible values are *outbound*, *inbound* and *any* (default).
    - *edgeCollectionRestriction*: One or multiple edge collection names. Only edges from these collections will be considered for the path.
    - *startVertexCollectionRestriction*: One or multiple vertex collection names. Only vertices from these collections will be considered as start vertex of a path.
    - *endVertexCollectionRestriction*: One or multiple vertex collection names. Only vertices from these collections will be considered as end vertex of a path.
    - *weight*: The name of the attribute of the edges containing the length as a string.
    - *defaultWeight*: Only used with the option *weight*.
    If an edge does not have the attribute named as defined in option *weight* this default is used as length.
    If no default is supplied the default would be positive Infinity so the path could not be calculated.

### Get Distance To

The `_distanceTo` function returns all paths and there distance within a graph.

`graph._distanceTo(startVertexExample, endVertexExample, options)`

This function is a wrapper of [graph._shortestPath](#get-shortest-path). It does not return the actual path but only the distance between two vertices.

### Absolute Eccentricity
 
Get the [eccentricity](http://en.wikipedia.org/wiki/Distance_%28graph_theory%29){:target="_blank"} of the vertices defined by the examples.

`graph._absoluteEccentricity(vertexExample, options)`

The function accepts an id, an example, a list of examples or even an empty example as parameter for vertexExample.


**Parameters**

- vertexExample (optional) Filter the vertices.
- options (optional) An object defining further options. Can have the following values:
    - *direction*: The direction of the edges. Possible values are *outbound*, *inbound* and *any* (default).
    - *edgeCollectionRestriction* : One or a list of edge-collection names that should be considered to be on the path.
    - *startVertexCollectionRestriction* : One or a list of vertex-collection names that should be considered for source vertices.
    - *endVertexCollectionRestriction* : One or a list of vertex-collection names that should be considered for target vertices.
    - *weight*: The name of the attribute of the edges containing the weight.
    - *defaultWeight*: Only used with the option *weight*.
    If an edge does not have the attribute named as defined in option *weight* this default is used as weight.
    If no default is supplied the default would be positive infinity so the path and hence the eccentricity can not be calculated.

### Get Eccentricity

Get the normalized [eccentricity](http://en.wikipedia.org/wiki/Distance_%28graph_theory%29){:target="_blank"}
of the vertices defined by the examples.

`graph._eccentricity(vertexExample, options)`

Similar to [_absoluteEccentricity](#get-absolute-eccentricity) but returns a normalized result.

### Get Absolute Closeness

Get the [closeness](http://en.wikipedia.org/wiki/Centrality#Closeness_centrality) of the vertices defined by the examples.

`graph._absoluteCloseness(vertexExample, options)`

The function accepts an id, an example, a list of examples or even an empty example as parameter for *vertexExample*.

**Parameters**

- vertexExample (optional) Filter the vertices.
- options (optional) An object defining further options. Can have the following values:
    - *direction*: The direction of the edges. Possible values are *outbound*, *inbound* and *any* (default).
    - *edgeCollectionRestriction* : One or a list of edge-collection names that should be considered to be on the path.
    - *startVertexCollectionRestriction* : One or a list of vertex-collection names that should be considered for source vertices.
    - *endVertexCollectionRestriction* : One or a list of vertex-collection names that should be considered for target vertices.
    - *weight*: The name of the attribute of the edges containing the weight.
    - *defaultWeight*: Only used with the option *weight*.
    If an edge does not have the attribute named as defined in option *weight* this default is used as weight.
    If no default is supplied the default would be positive infinity so the path and hence the closeness can not be calculated.

### Get Closeness

Get the normalized [closeness](http://en.wikipedia.org/wiki/Centrality#Closeness_centrality){:target="_blank"}
of graphs vertices.

`graph._closeness(options)`

Similar to [_absoluteCloseness](#get-absolute-closeness) but returns a normalized value.

### Get Absolute Betweenness

Get the [betweenness](http://en.wikipedia.org/wiki/Betweenness_centrality){:target="_blank"}
of all vertices in the graph.

`graph._absoluteBetweenness(vertexExample, options)`

**Parameters**

- vertexExample (optional) Filter the vertices, see [Definition of examples](#definition-of-examples)
- options (optional) An object defining further options. Can have the following values:
    - *direction*: The direction of the edges. Possible values are *outbound*, *inbound* and *any* (default).
    - *weight*: The name of the attribute of the edges containing the weight.
    - *defaultWeight*: Only used with the option *weight*.
    If an edge does not have the attribute named as defined in option *weight* this default is used as weight.
    If no default is supplied the default would be positive infinity so the path and hence the betweenness can not be calculated.

### Get Betweenness

Get the normalized [betweenness](http://en.wikipedia.org/wiki/Betweenness_centrality) of graphs vertices.

`graph_module._betweenness(options)`

Similar to [_absoluteBetweenness](#get-absolute-betweenness) but returns normalized values.

### Get Radius

Get the [radius](http://en.wikipedia.org/wiki/Eccentricity_%28graph_theory%29) of a graph.

**Parameters**

- options (optional) An object defining further options. Can have the following values:
    - *direction*: The direction of the edges. Possible values are *outbound*, *inbound* and *any* (default).
    - *weight*: The name of the attribute of the edges containing the weight.
    - *defaultWeight*: Only used with the option *weight*.
    If an edge does not have the attribute named as defined in option *weight* this default is used as weight.
    If no default is supplied the default would be positive infinity so the path and hence the radius can not be calculated.

### Get Diameter

Get the [diameter](http://en.wikipedia.org/wiki/Eccentricity_%28graph_theory%29){:target="_blank"}
of a graph.

`graph._diameter(graphName, options)`

**Parameters**

- options (optional) An object defining further options. Can have the following values:
    - *direction*: The direction of the edges. Possible values are *outbound*, *inbound* and *any* (default).
    - *weight*: The name of the attribute of the edges containing the weight.
    - *defaultWeight*: Only used with the option *weight*.
    If an edge does not have the attribute named as defined in option *weight* this default is used as weight.
    If no default is supplied the default would be positive infinity so the path and hence the radius can not be calculated.
