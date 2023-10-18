---
sidebar_position: 40
title: Fulltext Search Queries
---

With Macrometa, the `SEARCH` keyword is used to filter your queries using a fulltext search view. By employing this keyword, you can:

- Filter documents based on Boolean expressions and functions in [C8QL](../../../queries/c8ql/).
- Match documents that reside in different collections.
- Sort the resulting set based on how closely each document matches the search conditions.

:::note
Some attributes listed in this page cannot be set in the Macrometa web console.
:::

## Syntax

The `SEARCH` statement must be used within a `FOR...IN` operation. For the correct sequence, the `SEARCH` statement should be placed after `FOR` and before any additional operations.

```sql
FOR doc IN <SEARCH_VIEW_NAME>
  SEARCH <EXPRESSION> OPTIONS {…}
  ...
```

Replace `<SEARCH_VIEW_NAME>` with the name of your fulltext search view, and `<EXPRESSION>` with a function like:

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

Here's an example:

```sql
FOR doc IN MySearchView
  SEARCH ANALYZER(doc.text == "quick" OR doc.text == "brown", "text_en") OPTIONS { collections: ["coll1", "coll2"] }
RETURN doc
```

In this context, the `OPTIONS {...}` clause provides additional parameters to the `SEARCH` function, such as limiting the search to specific collections.

## Limitations

The `SEARCH` keyword doesn't support:

- Alphabetical order
- Array comparison operators
- Inline expressions

## Search Options

The `SEARCH` keyword can also accept the following optional attribute:

- `collections` (array): An array of strings with the collection names. This restricts the search to certain source collections.

If a search view is linked to three collections (`coll1`, `coll2`, and `coll3`), you can use the `collections` option to only return documents from `coll1` and `coll2`:

```sql
FOR doc IN viewName
  SEARCH true OPTIONS { collections: ["coll1", "coll2"] }
RETURN doc
```

In contrast, you can use `false` instead of `true` to exclude the specified collections from your search.

## Search by Document Attribute

By querying document attributes indexed in both the search view and the document store, you can search for documents. The search result will include all attributes of the documents. However, if you query a non-indexed attribute, it will yield no results.

For example:

```sql
FOR doc IN MySearchView
  SEARCH doc.someAttr == "One"
RETURN doc
```

In this example, although `anotherAttr` is not indexed, it is returned as it's part of the document. Querying for `anotherAttr` directly, however, would yield no results:

```sql
FOR doc IN myView
  SEARCH doc.anotherAttr == "One"
RETURN doc
```

By using the `includeAllFields` property, you can index all fields and subfields of the source documents. However, please note that indexing all fields might increase the size of your index and potentially impact performance.

## Search for Array Elements

You can search for individual elements of an array if your fulltext search view has `trackListPositions` set to `true`. Here is an example:

```sql
FOR doc IN viewName
  SEARCH doc.value.nested.deep == 2
RETURN doc
```

However, if `trackListPositions` is disabled on your search view, you must specify the position within the array of the data you want to find. For instance:

```sql
FOR doc IN viewName
  SEARCH doc.value.nested.deep[1] == 2
RETURN doc
```

In this example, `[1]` indicates that the desired result (`2`) is the second value in the array.

## Search with SORT()

The `SORT()` operation allows you to retrieve documents that are not indexed by the search view. Here's an example:

```sql
FOR doc IN viewName
  SORT doc.text, doc.value DESC
RETURN doc
```

Additionally, the `SORT()` operation can also work with scoring functions to sort documents by their relevance. This, however, only works for documents that are not part of the search view's index. For example:

```sql
FOR doc IN viewName
  SEARCH ...
  SORT BM25(doc) DESC
RETURN doc
```
