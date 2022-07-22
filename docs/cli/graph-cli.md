---
title: Graph Commands
---

# Graphs (gdnsl graph)

Commands to work with graphs.

```bash
gdnsl graph GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Help for graph command group
  gdnsl graph -h
```

**Options:**

```bash
  -h, --help                Help for graph commands.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph create

Create a graph

```bash
gdnsl graph create GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Create a graph "social"
  gdnsl graph create social

  # Create a graph "social" with edge collection "relation", set "from" vertex as "female" & "male" and set "to" vertex as "female" & "male". The edge-definition format is "EDGE_COLLECTION:FROM_VERTICES:TO_VERTICES".
  gdnsl graph create social --edge-definition "relation:female,male:female,male"

  # Create a graph "social" with edge collection "relation", set "from" vertex as "female" & "male" and set "to" vertex as "female" & "male" with additional options specified. The edge-definition format is "EDGE_COLLECTION:FROM_VERTICES:TO_VERTICES".
  gdnsl graph create social --edge-definition "relation:female,male:female,male" --option "key=value"

```

**Options:**

```bash
  -h, --help                Help for graph describe.
      --edge-definition     Specify the edge definition of the graph. This edge definition has to contain a collection and an array of each from and to vertex collections. An edge definition can only be added if this definition is either not used in any other graph, or it is used with exactly the same definition. It is not possible to store a definition "e" from "v1" to "v2" in the one graph, and "e" from "v2" to "v1" in the other graph. Can be given multiple times.
      --option              Specify any additional options to be given. Can be given multiple times.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph list

List all graphs.

```bash
gdnsl graph list
```

**Examples:**

```bash

  # List all graphs
  gdnsl graph list

```

**Options:**

```bash
  -h, --help                Help for graph list.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph delete

Delete a graph

```bash
gdnsl graph delete GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Drop the graph "social"
  gdnsl graph delete social

  # Drop the graph "social" and any collections if they are not used in other graphs
  gdnsl graph delete social --drop-collections

```

**Options:**

```bash
  -h, --help                Help for graph describe.
      --drop-collections    Drop the collection as well. Collection will only be dropped if it is not used in other graphs. Default is false.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph describe

Describe a graph.

```bash
gdnsl graph describe GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Describe the graph "social"
  gdnsl graph describe social

  # Describe all edge definitions of the graph "social"
  gdnsl graph describe social --edge-definitions

  # Describe all vertex collections of the graph "social"
  gdnsl graph describe social --vertex

```

**Options:**

```bash
  -h, --help                Help for graph describe.
      --edge-definitions    Get all the edge definitions of a graph.
      --vertex              Get all the vertex collections of a graph.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph update

Update a graph.

```bash
gdnsl graph update GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Add an edge-definition to the graph "social" for the edge collection "relation", set "from" vertex as "female" & "male" and set "to" vertex as "female" & "male". The edge-definition format is "EDGE_COLLECTION:FROM_VERTICES:TO_VERTICES".
  gdnsl graph update social --add-edge-definition "relation:female,male:female,male"

  # Add a vertex collection "age" to the graph "social"'s orphan collections
  gdnsl graph update social --add-vertex-collection "age"

  # Remove "age" vertex collection from graph "social"
  gdnsl graph update social --remove-vertex-collection "age"

  # Remove the edge definitions belonging to the "relation" edge collection
  gdnsl graph update social --remove-edge-collection "relation"

  # Replace an edge-definition of the graph "social" for the edge collection "relation", set "from" vertices as "female" & "male", and set "to" vertices as "female" & "male". The edge-definition format is "EDGE_COLLECTION:FROM_VERTICES:TO_VERTICES".
  gdnsl graph update social --collection relation --replace-edge-definition "relation:female,male:female,male"

  # Replace a vertex collection "age" to the graph "social"'s orphan collections and drop the collection if it is not being used
  gdnsl graph update social --collection relation --replace-edge-definition "relation:female,male:female,male" --drop-collections
      
  # Enable stream on graph collection social
  gdnsl graph update social --stream 
    
  # Disable stream on graph collection social
  gdnsl graph update social --no-stream

  # Enable waitForSync on graph collection social
  gdnsl graph update social --wait-for-sync 
    
  # Disable waitForSync on graph collection social
  gdnsl graph update social --no-wait-for-sync

  # Enable stream and waitForSync on graph collection social
  gdnsl graph update social --stream --wait-for-sync 
    
  # Disable stream and waitForSync on graph collection social
  gdnsl graph update social --no-stream  --no-wait-for-sync

```

**Options:**

```bash
  -h, --help   help for graph describe

      --add-edge-definition         Specify the edge definition of the graph. This edge definition has to contain a collection and an array of each from and to vertex collections. An edge definition can only be added if this definition is either not used in any other graph, or it is used with exactly the same definition. It is not possible to store a definition "e" from "v1" to "v2" in the one graph, and "e" from "v2" to "v1" in the other graph.

      --add-vertex-collection       Adds a vertex collection to the set of orphan collections of the graph. If the collection does not exist, it will be created.

      --collection                  The name of the edge collection the edge belongs to. Should be used with "--replace-edge-definition" flag

      --replace-edge-definition     Specify the edge definition of the graph. This edge definition has to contain a collection and an array of each from and to vertex collections. An edge definition can only be added if this definition is either not used in any other graph, or it is used with exactly the same definition. It is not possible to store a definition "e" from "v1" to "v2" in the one graph, and "e" from "v2" to "v1" in the other graph.

      --remove-edge-collection      Remove one edge definition from the graph. This will only remove the edge collection, the vertex collections remain untouched and can still be used in your queries.

      --remove-vertex-collection   The name of the edge collection the edge belongs to. Removes a vertex collection from the graph and optionally deletes the collection, if it is not used in any other graph. It can only remove vertex collections that are no longer part of edge definitions, if they are used in edge definitions you are required to modify those first.
      
      --drop-collection             Drop the collection as well. Collection will only be dropped if it is not used in other graphs. Default value is false.

      --fabric                      Name of the fabric to use.
      --stream                      Enable stream on the kv collection.
      --no-stream                   Disable stream on the kv collection.
      --wait-for-sync               Enable waitForSync on the kv collection.
      --no-wait-for-sync            Disable waitForSync on the kv collection.
```

## gdnsl graph traversal

Starts a graph traversal from a given vertex and following edges contained in a given edge collection.

```bash
gdnsl graph traversal GRAPH-NAME [flags]
```

**Examples:**

```bash

	# Traverse 'edges' edge collection starting from the vertex "circles/F"
	gdnsl graph traversal --edge-collection edges --start-vertex "circles/F" --direction 'any' --visitor 'result.vertices.push(vertex._key);' --init 'result.vertices = [];' --order postorder

```

**Options:**

```bash
  -h, --help                  Help to traverse a graph.
      --direction             Direction for traversal. If set, must be either "outbound", "inbound", or "any"; if not set, the expander attribute must be specified.
      --edge-collection       Name of the collection that contains the edges .
      --expander              Body (JavaScript) code of custom expander function must be set if direction attribute is not set function signature: (config, vertex, path) -> array expander must return an array of the connections for vertex each connection is an object with the attributes edge and vertex
      
      --filter                Default is to include all nodes: body (JavaScript code) of custom filter function function signature: (config, vertex, path) -> mixed can return four different string values:
      "exclude" -> this vertex will not be visited.
      "prune" -> the edges of this vertex will not be followed.
      "" or undefined -> visit the vertex and follow its edges.
      Array -> containing any combination of the above. If there is at least one "exclude" or "prune" respectively is contained, it's effect will occur.
      
      --init                  Body (JavaScript) code of custom result initialization function function signature: (config, result) -> void initialize any values in result with what is required.

      --item-order            Item iteration order can be "forward" or "backward".
      --max-depth             ANDed with any existing filters visits only nodes in at most the given depth.
      --max-iterations        Maximum number of iterations in each traversal. This number can be set to prevent endless loops in traversal of cyclic graphs. When a traversal performs as many iterations as the maxIterations value, the traversal will abort with an error. If maxIterations is not set, a server-defined value may be used.

      --min-depth             ANDed with any existing filters): visits only nodes in at least the given depth.
      --order                 Traversal order can be "preorder", "postorder" or "preorder-expander".
      --sort                  Body (JavaScript) code of a custom comparison function for the edges. The signature of this function is (l, r) -> integer (where l and r are edges) and must return -1 if l is smaller than, +1 if l is greater than, and 0 if l and r are equal. The reason for this is the following: The order of edges returned for a certain vertex is undefined. This is because there is no natural order of edges for a vertex with multiple connected edges. To explicitly define the order in which edges on the vertex are followed, you can specify an edge comparator function with this attribute. Note that the value here has to be a string to conform to the JSON standard, which in turn is parsed as function body on the server side. Furthermore note that this attribute is only used for the standard expanders. If you use your custom expander you have to do the sorting yourself within the expander code.

      --start-vertex          id of the startVertex, e.g. "users/foo".
      --strategy              Traversal strategy can be "depthfirst" or "breadthfirst".
      --uniqueness            Specifies uniqueness for vertices and edges visited.
If set, must be an object like this:
"uniqueness": {"vertices": "none"|"global"|"path", "edges": "none"|"global"|"path"}
      
      --visitor               Body (JavaScript) code of custom visitor function function signature: (config, result, vertex, path, connected) -> void The visitor function can do anything, but its return value is ignored. To populate a result, use the result variable by reference. Note that the connected argument is only populated when the order attribute is set to "preorder-expander".

      --fabric                Name of the fabric to use.
```
