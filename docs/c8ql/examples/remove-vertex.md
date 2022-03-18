---
sidebar_position: 11
---

# Remove Vertex

Deleting vertices with associated edges is currently not handled via C8QL while the [graph management interface](remove-vertex) and the REST API offer a vertex deletion functionality.

However, as shown in this example based on the [knows_graph](/img/knows_graph.png), a query for this use case can be created.

![Example Graph](/img/knows_graph.png)

When deleting vertex **eve** from the graph, we also want the edges `eve -> alice` and `eve -> bob` to be removed.

The involved graph and its only edge collection has to be known. In this case it is the graph **knows_graph** and the edge collection **knows**.

This query will delete **eve** with its adjacent edges:

```js
LET edgeKeys = (FOR v, e IN 1..1 ANY 'persons/eve' GRAPH 'knows_graph' RETURN e._key)
LET r = (FOR key IN edgeKeys REMOVE key IN knows) 
REMOVE 'eve' IN persons
```

This query executed several actions:

* use a graph traversal of depth 1 to get the `_key` of **eve's** adjacent edges
* remove all of these edges from the `knows` collection
* remove vertex **eve** from the `persons` collection

The following query shows a different design to achieve the same result:

```js
LET edgeKeys = (FOR v, e IN 1..1 ANY 'persons/eve' GRAPH 'knows_graph'
            REMOVE e._key IN knows)
REMOVE 'eve' IN persons
```

:::note
The query has to be adjusted to match a graph with multiple vertex/edge collections.
:::

For example, the [city graph](/img/cities_graph.png) contains several vertex collections - `germanCity` and `frenchCity` and several edge collections -  `french / german / international Highway`.

![Example Graph2](/img/cities_graph.png)

To delete city **Berlin** all edge collections `french / german / international Highway` have to be considered. The **REMOVE** operation has to be applied on all edge collections with `OPTIONS { ignoreErrors: true }`. Not using this option will stop the query whenever a non existing key should be removed in a collection.

```js
LET edgeKeys = (FOR v, e IN 1..1 ANY 'germanCity/Berlin' GRAPH 'routeplanner' RETURN e._key)
LET r = (FOR key IN edgeKeys REMOVE key IN internationalHighway
        OPTIONS { ignoreErrors: true } REMOVE key IN germanHighway
        OPTIONS { ignoreErrors: true } REMOVE key IN frenchHighway
        OPTIONS { ignoreErrors: true }) 
REMOVE 'Berlin' IN germanCity
```