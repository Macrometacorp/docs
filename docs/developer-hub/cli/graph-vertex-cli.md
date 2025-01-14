---
title: Graph Vertex Commands
---

# Graph Vertices (gdnsl graph vertex)

## gdnsl graph vertex create

Create a vertex.

```bash
gdnsl graph vertex create GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Create a vertex in the graph "social" with the vertex collection as "male"
  gdnsl graph vertex create social --collection male --data '{"name": "John"}'

```

**Options:**

```bash
  -h, --help                Help for graph describe.
      --collection          The name of the vertex collection the vertex belongs to.
      --return-new          Define if the response should contain the complete new version of the document.
      --data                json string of the data to be stored.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph vertex delete

Remove vertex from a collection.

```bash
gdnsl graph vertex delete GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Delete a vertex in the graph "social" with the vertex collection as "male"
  gdnsl graph vertex delete social --collection male --vertex "John"

  # Delete a vertex in the graph "social" with the vertex collection as "male" and return the old object
  gdnsl graph vertex delete social --collection male --vertex "John" --return-old

```

**Options:**

```bash
  -h, --help                Help for graph describe.
      --collection          The name of the vertex collection the vertex belongs to.
      --vertex              The _key attribute of the vertex.
      --return-old          Define if a presentation of the deleted document should
                            be returned within the response object. Default is false.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph vertex describe

Get details about a vertex.

```bash
gdnsl graph vertex describe GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Describe the vertex with the _key as "bob" in the collection "male"
  gdnsl graph vertex describe social --collection male --vertex bob

```

**Options:**

```bash
  -h, --help                Help to describe graph vertex.
      --collection          The name of the vertex collection the vertex belongs to.
      --vertex              The _key attribute of the vertex.
      --rev                 Must contain a revision. If this is set a document is only returned if it has exactly this revision. Also see if-match header as an alternative to this. Default is false.
      
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is returned, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned. As an alternative you can supply the Etag in an query parameter rev.
      
      --if-none-match       If the "If-None-Match" header is given, then it must contain exactly one Etag. The document is returned, only if it has a different revision as the given Etag. Otherwise a HTTP 304 is returned.
      
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph vertex replace

Replace the data of a vertex in the collection.

```bash
gdnsl graph vertex replace GRAPH-NAME [flags]
```

**Examples:**

```bash

	# Update a vertex in the graph "social" with the vertex collection as "male"
	gdnsl graph vertex replace social --collection male --vertex "John" --data '{"name": "John", "lname": "Doe"}'

```

**Options:**

```bash
  -h, --help                Help to replace graph vertex.
      --collection          The name of the vertex collection the vertex belongs to.
      --vertex              The _key attribute of the vertex.
      --return-new          Define if the response should contain the complete new version of the document. Default is false.
      --keep-null           Define if values set to null should be stored. By default the key is not removed from the document. Default is false.
      --return-old          Define if a presentation of the deleted document should
be returned within the response object. Default is false.
      --data                json string of the data to be stored.
      --if-match            If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric              Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl graph vertex update

Update the data of a vertex in the collection.

```bash
gdnsl graph vertex replace GRAPH-NAME [flags]
```

**Examples:**

```bash

  # Update a vertex in the graph "social" with the vertex collection as "male"
  gdnsl graph vertex update social --collection male --vertex "John" --data '{"name": "John", "lname": "Doe"}'

```

**Options:**

```bash
  -h, --help                  Help to update graph vertex.
      --collection            The name of the vertex collection the vertex belongs to.
      --vertex                The _key attribute of the vertex.
      --return-new            Define if the response should contain the complete new version of the document. Default is false.
      --keep-null             Define if values set to null should be stored. By default the key is not removed from the document. Default is false.
      --return-old            Define if a presentation of the deleted document should
be returned within the response object. Default is false.
      --data                  json string of the data to be stored
      --if-match              If the "If-Match" header is given, then it must contain exactly one Etag. The document is updated, if it has the same revision as the given Etag. Otherwise a HTTP 412 is returned.
      --fabric                Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string         gdnsl config file (default is ./gdnsl.yaml)
```
