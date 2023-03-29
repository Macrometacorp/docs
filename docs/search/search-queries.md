---
sidebar_position: 40
title: Search Queries
---

You can use the `SEARCH` keyword to filter a query using a search view, allowing you to:

- Filter documents based on C8QL and SQL Boolean expressions and functions.
- Match documents located in different collections.
- Sort the result set based on how closely each document matches the search conditions.

For information about creating a custom search view, refer to [Search Views](/search/views/index.md).

## Syntax

You must use the `SEARCH` statement in a `FOR...IN` operation. The `SEARCH` statement must be placed after the `FOR` and before any additional operations.

```sql
FOR doc IN <SEARCH_VIEW_NAME>
  SEARCH <EXPRESSION> OPTIONS {…}
  ...
```

Replace `SEARCH_VIEW_NAME` with the name of your search view, and `EXPRESSION` with one of the following [operators](search-functions.md):

- `AND`
- `OR`
- `NOT`
- `==`
- `<=`
- `>=`
- `<`
- `>`
- `!=`
- `IN` (array or range), also `NOT IN`

For example:

```sql
FOR doc IN MySearchView
  SEARCH ANALYZER(doc.text == "quick" OR doc.text == "brown", "text_en")
RETURN doc
```

## Limitations

`SEARCH` does not support:

- Alphabetical order
- Array comparison operators
- Inline expressions

Refer to [Search Options](#search-options) for information about the `OPTIONS` keyword.

## Search by Document Attribute

You can search for documents by querying document attributes that have been indexed by both the search view and the document store. Refer to [Document Store Indexes](../collections/documents/document-store-indexes.md) for more information about adding attributes to document store indexes.

When you search for a document by its attribute, all attributes (including non-indexed ones) return in the results. However, querying a non-indexed attribute yields no results.

For example, if you have documents in a collection with these attributes:

```sql
{ "someAttr": "One", "anotherAttr": "One" }
{ "someAttr": "Two", "anotherAttr": "Two" }
```

Only the `someAttr` attribute is indexed in the search view and the document store index.

You can run this query to return all attributes for the first document in the collection:

```sql
FOR doc IN MySearchView
  SEARCH doc.someAttr == "One"
  RETURN doc
```

The result displays all attributes for the first document, including the non-indexed `anotherAttr`.

Alternatively, if you query by the non-indexed `anotherAttr` attribute, the search yields no results:

```sql
FOR doc IN myView
  SEARCH doc.anotherAttr == "One"
  RETURN doc
```

You can use the `includeAllFields` [View property](views/optional-properties.md) to index all fields and subfields of the source documents.

## Search for Array Elements

You can search for individual array elements if your search view has [trackListPositions](views/optional-properties.md) set to `true`.

In the following document, the values `1`, `2,` and `3` are indexed and individually searchable.

```json
{
  "value": {
    "nested": {
      "deep": [ 1, 2, 3 ]
    }
  }
}
```

If your search view indexes the `value` field, you can use a query such as `doc.value.nested.deep`:

```sql
FOR doc IN viewName
  SEARCH doc.value.nested.deep == 2
  RETURN doc
```

Alternatively, you can use an [array comparison operator](../queries/c8ql/operators.md#array-comparison-operators) with a `FILTER` operation:

```sql
FOR doc IN collection
  FILTER doc.value.nested.deep ANY == 2
  RETURN doc
```

If `trackListPositions` is disabled on the search view, you must specify the position within the array of the data you want to find. For example:

```sql
FOR doc IN viewName
  SEARCH doc.value.nested.deep[1] == 2
  RETURN doc
```

In this example, `[1]` indicates that the desired result (`2`) is the second value in the array. If you wanted to find the first value, you would instead use:

```sql
SEARCH doc.value.nested.deep[0] == 1
```

## Search with SORT()

You can retrieve documents that aren't indexed by the search view with the [SORT() operation](../queries/c8ql/operations/sort.md). For example:

```sql
FOR doc IN viewName
  SORT doc.text, doc.value DESC
  RETURN doc
```

You can also use [Search Scoring Functions](search-functions.md#scoring-functions) to sort the retrieved documents by relevance. This only works for documents excluded from the search view's index. For example:

```sql
FOR doc IN viewName
  SEARCH ...
  SORT BM25(doc) DESC
  RETURN doc
```

## Search Options

`SEARCH` also accepts the following optional attribute:

- `collections` (array): Array of strings with collection names to restrict the search to certain source collections.

If a search view has three linked collections (`coll1`, `coll2`, and `coll3`), you can return documents from specific collections with the `collections` option:

```sql
FOR doc IN viewName
  SEARCH true OPTIONS { collections: ["coll1", "coll2"] }
  RETURN doc
```

Alternatively, you can replace `true` with `false` to exclude the specified collections.