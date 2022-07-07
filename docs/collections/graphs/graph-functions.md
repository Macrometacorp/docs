---
title: Graph Functions
sidebar_position: 60
---

A lot of graph functions accept a vertex (or edge) example as parameter as defined in the next sections.

Examples will explain the API on the [the city graph](#the-city-graph):

![Social Example Graph](/img/cities_graph.png)

## Get vertex *from* of an edge

Get the source vertex of an edge

`graph._fromVertex(edgeId)`

Returns the vertex defined with the attribute *_from* of the edge with *edgeId* as its *_id*.

**Parameters**

 * edgeId (required) *_id* attribute of the edge

## Get vertex *to* of an edge

Get the target vertex of an edge

`graph._toVertex(edgeId)`

Returns the vertex defined with the attribute *_to* of the edge with *edgeId* as its *_id*.

**Parameters**

 * edgeId (required) *_id* attribute of the edge

## Get Neighbors

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

## Get Common Neighbors

Get all `common neighbors` of the vertices defined by the examples.

`graph._commonNeighbors(vertex1Example, vertex2Examples, optionsVertex1, optionsVertex2)`

This function returns the intersection of *graph_module._neighbors(vertex1Example, optionsVertex1)* and *graph_module._neighbors(vertex2Example, optionsVertex2)*.

For parameter documentation see [_neighbors](#get-neighbors).

The complexity of this method is **O(n\*m^x)** with *n* being the maximal amount of vertices defined by the parameters vertexExamples, *m* the average amount of neighbors and *x* the maximal depths. Hence the default call would have a complexity of **O(n\*m)**;

### Count Common Neighbors

Get the amount of common neighbors of the vertices defined by the examples.

`graph._countCommonNeighbors(vertex1Example, vertex2Examples, optionsVertex1, optionsVertex2)`

Similar to [_commonNeighbors](#get-common-neighbors) but returns count instead of the elements.

## Get Common Properties

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

## Count Common Properties

Get the amount of vertices of the graph that share common properties.

`graph._countCommonProperties(vertex1Example, vertex2Examples, options)`

Similar to [_commonProperties](#get-common-properties) but returns count instead of the objects.

## Get Paths

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

## Get Shortest Path

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

## Get Distance To

The `_distanceTo` function returns all paths and there distance within a graph.

`graph._distanceTo(startVertexExample, endVertexExample, options)`

This function is a wrapper of [graph._shortestPath](#get-shortest-path). It does not return the actual path but only the distance between two vertices.

## Absolute Eccentricity
 
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

## Get Eccentricity

Get the normalized [eccentricity](http://en.wikipedia.org/wiki/Distance_%28graph_theory%29){:target="_blank"}
of the vertices defined by the examples.

`graph._eccentricity(vertexExample, options)`

Similar to [_absoluteEccentricity](#get-absolute-eccentricity) but returns a normalized result.

## Get Absolute Closeness

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

## Get Closeness

Get the normalized [closeness](http://en.wikipedia.org/wiki/Centrality#Closeness_centrality){:target="_blank"}
of graphs vertices.

`graph._closeness(options)`

Similar to [_absoluteCloseness](#get-absolute-closeness) but returns a normalized value.

## Get Absolute Betweenness

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

## Get Betweenness

Get the normalized [betweenness](http://en.wikipedia.org/wiki/Betweenness_centrality) of graphs vertices.

`graph_module._betweenness(options)`

Similar to [_absoluteBetweenness](#get-absolute-betweenness) but returns normalized values.

## Get Radius

Get the [radius](http://en.wikipedia.org/wiki/Eccentricity_%28graph_theory%29) of a graph.

**Parameters**

- options (optional) An object defining further options. Can have the following values:
    - *direction*: The direction of the edges. Possible values are *outbound*, *inbound* and *any* (default).
    - *weight*: The name of the attribute of the edges containing the weight.
    - *defaultWeight*: Only used with the option *weight*.
    If an edge does not have the attribute named as defined in option *weight* this default is used as weight.
    If no default is supplied the default would be positive infinity so the path and hence the radius can not be calculated.

## Get Diameter

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
