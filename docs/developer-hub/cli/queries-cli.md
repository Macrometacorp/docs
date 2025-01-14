---
title: Query Commands
---

# Queries (gdnsl query)

Execute a query and return results. Return a cursor for paginated results.

```bash
gdnsl query QUERY [flags]
```

**Examples:**

```bash

  # Execute a query
  gdnsl query "FOR doc IN addresses RETURN doc"

  # Execute a query with maximum number of result documents to be transferred from the server to the client in one roundtrip to be 10.
  gdnsl query "FOR doc IN addresses RETURN doc" --batch-size 10

  # Execute a query with filter based on input parameters
  gdnsl query "FOR x IN addresses FILTER x.country == @country RETURN x" --param "country=USA"

  # Execute a query with maximum warnings a query will return to 1
  gdnsl query "FOR doc IN addresses RETURN doc" --max-warning-count 1

  # Execute a query  with additional profiling information returned in the sub-attribute "profile"
  gdnsl query "FOR doc IN addresses RETURN doc" --profile 1

  # Execute a query with all optimizer rules disabled
  gdnsl query "FOR doc IN addresses RETURN doc" --optimizer.rule "-all"

  # Execute a query with time-to-live for the cursor to be 10 seconds
  gdnsl query "FOR doc IN addresses RETURN doc" --ttl 10

  # Execute a query to be executed in a streaming fashion
  gdnsl query "FOR doc IN addresses RETURN doc" --stream

  # Execute a query  that will throw an exception and abort instead of producing a warning.
  gdnsl query "FOR doc IN addresses RETURN doc" --fail-on-warning

  # Execute a query to return the sub-attribute "stats" and "fullCount"
  gdnsl query "FOR doc IN addresses RETURN doc" --full-count

  # Execute a query to get the total number of documents in the result
  gdnsl query "FOR doc IN addresses RETURN doc" --count

  # Execute a query  by reading it from a file on the specified path
  gdnsl query --file "path_to_file"

  # Explain the plan of the query
  gdnsl query "FOR doc IN addresses RETURN doc" --explain

  # Explain a query with maximum number of plans that the optimizer is allowed to generate as 1.
  gdnsl query "FOR doc IN addresses RETURN doc" --max-number-of-plans 1 --explain

  # Explain a query excluding all optimizer rules.
  gdnsl query "FOR doc IN addresses RETURN doc" --optimizer-rule "-all" --explain

  # Explain a query with all possible execution plans returned
  gdnsl query "FOR doc IN addresses RETURN doc" --all-plans --explain

  # Explain a cursor by reading it from a file on the specified path
  gdnsl query --file "path_to_file" --explain

  # Explain a cursor with filter based on bindvar
  gdnsl query "FOR x IN addresses FILTER x.country == @country RETURN x" --param "country=USA" --explain

  # Validate a query
  gdnsl query "FOR doc IN addresses RETURN doc" --validate

  # Validate a query read from a file
  gdnsl query  --from-path "path_to_file" --validate

```

**Options:**

```bash
  -h, --help                        Help for query command.
      --batch-size number           Maximum number of result documents to be transferred from the server to the client in one roundtrip. If this attribute is not set, a server-controlled default value will be used. A batchSize value of 0 is disallowed. 

      --param string                Key/value pairs representing the bind parameters. Can be given multiple times. 

      --max-warning-count number    Limits the maximum number of warnings a query will return. The number of warnings a query will return is limited to 10 by default, but that number can be increased or decreased by setting this attribute.

      --profile                     If set to true or 1, then the additional query profiling information will be returned in the sub-attribute profile of the extra return attribute, if the query result is not served from the query cache. Set to 2 the query will include execution stats per query plan node in sub-attribute stats.nodes of the extra return attribute. Additionally the query plan is returned in the sub-attribute extra.plan.

      --skip-inaccessible-collections      C8QL queries (especially graph traversals) will treat collection to which a user has no access rights as if these collections were empty. Instead of returning a forbidden access error, your queries will execute normally.

      --ttl number                The time-to-live for the cursor (in seconds). The cursor will be removed on the server automatically after the specified amount of time. This is useful to ensure garbage collection of cursors that are not fully fetched by clients. If not set, a server-defined value will be used (default: 30 seconds).

      --optimizer.rule string     A list of to-be-included or to-be-excluded optimizer rules can be put into this attribute, telling the optimizer to include or exclude specific rules. To disable a rule, prefix its name with a `-`, to enable a rule, prefix it with a `+`. There is also a pseudo-rule `all`, which matches all optimizer rules. `-all` disables all rules.

      --stream              Can be enabled to execute the query lazily. If set to true, then the query is executed as long as necessary to produce up to batchSize results. These results are returned immediately and the query is suspended until the client asks for the next batch (if there are more results).

      --fail-on-warning     When set to true, the query will throw an exception and abort instead of producing a warning. This option should be used during development to catch potential issues early. When the attribute is set to false, warnings will not be propagated to exceptions and will be returned with the query result.

      --full-count          If set to true and the query contains a LIMIT clause, then the result will have an extra attribute with the sub-attributes stats and fullCount, `{ ... , "extra": { "stats": { "fullCount": 123 } } }`. The fullCount attribute will contain the number of documents in the result before the last top-level LIMIT in the query was applied. It can be used to count the number of documents that match certain filter criteria, but only return a subset of them, in one go. It is thus similar to MySQL's SQL_CALC_FOUND_ROWS hint. Note that setting the option will disable a few LIMIT optimizations and may lead to more documents being processed, and thus make queries run longer. Note that the fullCount attribute may only be present in the result if the query has a top-level LIMIT clause and the LIMIT clause is actually used in the query.

      --count               Indicates whether the number of documents in the result set should be returned in the “count” attribute of the result. Calculating the “count” attribute might have a performance impact for some queries in the future so this option is turned off by default, and “count” is only returned when requested.

      --file string         Read query and the query options from a file. File should be in a JSON format.
      --explain             Explain the query plan.

      --max-number-of-plans number     An optional maximum number of plans that the optimizer is allowed to generate. 
                            Setting this attribute to a low value allows to put a cap on the amount of work the optimizer does.

      --all-plans           If set to true, all possible execution plans will be returned. 
                            The default is false, meaning only the optimal plan will be returned.

      --validate            Validate the query string.
      --fabric              Name of the fabric to use.

```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```

## gdnsl query cursor

Commands to work with a query cursor.

```bash
gdnsl query cursor CURSOR-IDENTIFIER [flags]
```

**Examples:**

```bash

  # Delete a cursor
  gdnsl query cursor 66706 --delete

  # Read next batch from cursor
  gdnsl query cursor 66706 --next

```

**Options:**

```bash
  -h, --help                Help for query delete command.
  --fabric                  Name of the fabric to use.
```

**Options inherited:**

```bash
      --config string       gdnsl config file (default is ./gdnsl.yaml)
```
