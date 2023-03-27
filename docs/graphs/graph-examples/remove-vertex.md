---
sidebar_position: 30
title: Remove Vertex Example
---

C8QL does not provide a direct method to remove vertices with associated edges. However, you can achieve this using a combination of queries. The examples below demonstrate how to remove a vertex and its associated edges from different graphs.

## Removing a Vertex from One Collection

This example, demonstrates how to remove a vertex and its associated edges from a graph. The query removes the vertex **eve** from the `knows_graph`, as well as the edges `eve -> alice` and `eve -> bob`.

![Knows Example Graph](/img/graphs/knows_graph.png)

This query deletes **eve** and its adjacent edges:

```sql
LET edgeKeys = (FOR v, e IN 1..1 ANY 'persons/eve' GRAPH 'knows_graph' RETURN e._key)
LET r = (FOR key IN edgeKeys REMOVE key IN knows) 
REMOVE 'eve' IN persons
```

The query performs the following actions:

- Traverses the graph with a depth of 1 to retrieve the `_key` of all edges connected to **eve**.
- Removes all these edges from the `knows` collection.
- Removes the vertex **eve** from the `persons` collection.

After you run the query, Macrometa returns an empty list. If you examine `knows_graph`, then you will see that the vertex and its associated edges have been removed.

An alternative query to achieve the same result is to combine the edge retrieval and removal within the same graph traversal:

```sql
LET edgeKeys = (FOR v, e IN 1..1 ANY 'persons/eve' GRAPH 'knows_graph'
            REMOVE e._key IN knows)
REMOVE 'eve' IN persons
```

## Removing a Vertex from Multiple Collections

In the [City Graph](example-graphs#the-city-graph) example graph, there are several vertex collections - `germanCity` and `frenchCity`, and several edge collections - `frenchHighway`, `germanHighway`, and `internationalHighway`.

![City Example Graph2](/img/graphs/cities_graph.png)

To delete city **Berlin**, you must consider all edge collections. The `REMOVE` operation should be applied to all edge collections with `OPTIONS { ignoreErrors: true }`. If you don't use this option, then the query will stop whenever it encounters a non-existing key that should be removed from a collection.

```sql
LET edgeKeys = (FOR v, e IN 1..1 ANY 'germanCity/Berlin' GRAPH 'routeplanner' RETURN e._key)
LET r = (FOR key IN edgeKeys REMOVE key IN internationalHighway
        OPTIONS { ignoreErrors: true } REMOVE key IN germanHighway
        OPTIONS { ignoreErrors: true } REMOVE key IN frenchHighway
        OPTIONS { ignoreErrors: true }) 
REMOVE 'Berlin' IN germanCity
```

The query performs the following actions:

- Traverses the graph with a depth of 1 to retrieve the `_key` of all edges connected to **Berlin**.
- Removes all these edges from the `internationalHighway`, `germanHighway`, and `frenchHighway` collections using the `ignoreErrors` option to avoid stopping the query if a non-existing key is encountered.
- Removes the vertex **Berlin** from the `germanCity` collection.

After you run the query, Macrometa returns an empty list. If you examine the `routeplanner` graph, then you will see that the vertex and its associated edges have been removed.
