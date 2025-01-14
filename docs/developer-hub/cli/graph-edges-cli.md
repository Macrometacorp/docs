---
title: Graph Edge Commands
---

# Graph Edges (gdnsl graph edge)

This page contains information about the `gdnsl graph edge` CLI command.

## gdnsl graph edge create

Create an edge.

```bash
gdnsl graph edge create GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Create an edge in the "social" graph in "relation" edge-collection from "male/John" to "female/Doe"
  gdnsl graph edge create social --collection relation --from "male/John" --to "female/Doe"

  # Create an edge in the "social" graph in "relation" edge-collection from "male/John" to "female/Doe" and return the new version of the document
  gdnsl graph edge create social --collection relation --from "male/John" --to "female/Doe" --return-new

```

**Options:**

```bash
  -h, --help                Help to create graph edge.
      --collection          The name of the edge collection the edge belongs to.
      --from                The source vertex of this edge. Has to be valid within the used edge definition.
      --to                  The target vertex of this edge. Has to be valid within the used edge definition.
      --return-new          Define if the response should contain the complete new version of the document.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph edge delete

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

## gdnsl graph edge describe

Describe an edge.

```bash
gdnsl graph edge describe GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Describe the edge with the _key as "1w44RO8kQMG3kB0feiua1g" in the collection "relation"
  gdnsl graph edge describe social --collection relation --edge 1w44RO8kQMG3kB0feiua1g

```

**Options:**

```bash
  -h, --help                Help for graph describe.
      --collection          The name of the edge collection the edge belongs to.
      --edge                The _key attribute of the edge.
      --rev                 Must contain a revision. If this is set a document is only returned if it has exactly this revision. Also see if-match header as an alternative to this.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is returned, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --if-none-match       If the "If-None-Match" header is given, then it must contain exactly one Etag. The document is returned, only if it has a different revision as the given Etag. Otherwise a HTTP 304 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph edge list

List edges starting or ending in the vertex.

```bash
gdnsl graph edge list [flags]
```

**Examples:**

```bash

  # Get the edges from the "relation" collection from any direction in the vertex "female/alice"
  gdnsl graph edge list --collection relation --vertex-id "female/alice"

  # Get the edges from the "relation" collection from "in" direction in the vertex "female/alice"
  gdnsl graph edge list --collection relation --vertex-id "female/alice" --direction "in"

```

**Options:**

```bash
  -h, --help                Help for graph describe.
      --direction           Selects "in" or "out" direction for edges. If not set, any edges are returned.
      --vertex-id           The id of the start vertex.
      --collection          The id of the collection.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph edge replace

Replaces the data of an edge in the collection.

```bash
gdnsl graph edge replace GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Replace the edge with the _key as "1w44RO8kQMG3kB0feiua1g" in the collection "relation" in the graph "social"
  gdnsl graph edge replace social --collection relation --edge 1w44RO8kQMG3kB0feiua1g --from "male/John" --to "female/Doe"

```

**Options:**

```bash
  -h, --help                Help to replace graph edge.
      --collection          The name of the edge collection the edge belongs to.
      --edge                The _key attribute of the edge.
      --from                The source vertex of this edge. Has to be valid within the used edge definition.
      --to                  The target vertex of this edge. Has to be valid within the used edge definition.
      --keep-null           Define if values set to null should be stored. By default the key is not removed from the document. Default is true.
      --return-old          Define if a presentation of the deleted document should be returned within the response object. Default is false.
      --return-new          Define if a presentation of the new document should be returned within the response object. Default is true.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph edge update

Update the data of an edge in the collection.

```bash
gdnsl graph edge update GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Replace the edge with the _key as "1w44RO8kQMG3kB0feiua1g" in the collection "relation" in the graph "social"
  gdnsl graph edge update social --collection relation --edge 1w44RO8kQMG3kB0feiua1g --data "{\"fname\":\"John\"}"

```

**Options:**

```bash
  -h, --help                Help to update graph edge.
      --collection          The name of the edge collection the edge belongs to.
      --edge                The _key attribute of the edge.
      --data                JSON body as string.
      --keep-null           Define if values set to null should be stored. By default the key is not removed from the document. Default is true.
      --return-old          Define if a presentation of the deleted document should be returned within the response object. Default is false.
      --return-new          Define if a presentation of the new document should be returned within the response object. Default is true.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```
