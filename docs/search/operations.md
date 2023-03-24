---
sidebar_position: 40
title: Search Queries
---

You can use the `SEARCH` keyword to filter a query using a search view, providing these features:

- Filter documents based on C8QL Boolean expressions and functions.
- Match documents located in different collections.
- Sort the result set based on how closely each document matched the search conditions.

Refer to [Search Views](/search/views/index.md) for information about creating a custom search view.

You must use the `SEARCH` statement in a `FOR...IN` operation. The `SEARCH` statement must be placed after the `FOR` and before any additional operations.

```sql
FOR doc IN <SEARCH_VIEW_NAME>
  SEARCH <EXPRESSION> OPTIONS {…}
  ...
```

For example:

```sql
FOR doc IN MySearchView
  SEARCH ANALYZER(doc.text == "quick" OR doc.text == "brown", "text_en")
RETURN doc
```

Replace `SEARCH_VIEW_NAME` with the name of your search view, and `EXPRESSION` with one of the following [Search functions](functions.md):

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

`SEARCH` does not support:

- Alphabetical order
- Array comparison operators
- In-line expressions

Refer to [Search Options](#search-options) for information about the `OPTIONS` keyword.

## Search by Document Attribute

You can search for documents by querying document attributes that have been indexed by both the search view and the document store. Refer to [Document Store Indexes](/collections/documents/document-store-indexes.md) for more information about adding attributes to document store indexes.

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

You can use the `includeAllFields` [View property](/search/views/optional-properties.md) to index all fields and subfields of the source documents.

## Arrays and trackListPositions

Array elements are indexed individually and can be searched for as if the attribute had each single value at the same time. They behave like a _disjunctive superposition_ of their values as long as the [**trackListPositions**](/search/views/optional-properties.md) View setting is `false` (default).

Therefore, array comparison operators such as `ALL IN` or `ANY ==` aren't really necessary. Consider the following document:

```json
{
  "value": {
    "nested": {
      "deep": [ 1, 2, 3 ]
    }
  }
}
```

A View which is configured to index the field `value` including sub-fields will index the individual numbers under the path `value.nested.deep`, which can be queried for like:

```sql
FOR doc IN viewName
  SEARCH doc.value.nested.deep == 2
  RETURN doc
```

This is different to `FILTER` operations, where you would use an [array comparison operator](../queries/c8ql/operators.md#array-comparison-operators) to find an element in the array:

```sql
FOR doc IN collection
  FILTER doc.value.nested.deep ANY == 2
  RETURN doc
```

You can set `trackListPositions` to `true` if you want to query for a value at a specific array index:

```sql
SEARCH doc.value.nested.deep[1] == 2
```

With `trackListPositions` enabled there will be **no match** for the document anymore if the specification of an array index is left out in the expression:

```sql
SEARCH doc.value.nested.deep == 2
```

Conversely, there will be no match if an array index is specified but `trackListPositions` is disabled.

String tokens (see [Analyzers](/search/analyzers/index.md)) are also indexed individually, but not all Analyzer types return multiple tokens. If the Analyzer does, then comparison tests are done per token/word. For example, given the field `text` is analyzed with `"text_en"` and contains the string `"a quick brown fox jumps over the lazy dog"`, the following expression will be true:

```sql
ANALYZER(doc.text == 'fox', "text_en")
```

Note that the `"text_en"` Analyzer stems the words, so this is also true:

```sql
ANALYZER(doc.text == 'jump', "text_en")
```

So a comparison will actually test if a word is contained in the text. With `trackListPositions: false`, this means for arrays if the word is contained in any element of the array. For example, given:

```json
{"text": [ "a quick", "brown fox", "jumps over the", "lazy dog" ] }
```

… the following will be true:

```sql
ANALYZER(doc.text == 'jump', "text_en")
```

With `trackListPositions: true` you would need to specify the index of the array element `"jumps over the"` to be true:

```sql
ANALYZER(doc.text[2] == 'jump', "text_en")
```



## SEARCH with SORT

The documents emitted from a View can be sorted by attribute values with the standard [SORT() operation](../queries/c8ql/operations/sort.md), using one or multiple attributes, in ascending or descending order (or a mix thereof).

```sql
FOR doc IN viewName
  SORT doc.text, doc.value DESC
  RETURN doc
```

If the (left-most) fields and their sorting directions match up with the [primary sort order](views/primary-sort-order.md) definition of the View then the `SORT` operation is optimized away.

Apart from simple sorting, it is possible to sort the matched View documents by relevance score (or a combination of score and attribute values if desired). The document search via the `SEARCH` keyword and the sorting via the [Search Scoring Functions](functions.md#scoring-functions), namely `BM25()` and `TFIDF()`, are closely intertwined.

The query given in the `SEARCH` expression is not only used to filter documents, but also is used with the scoring functions to decide which document matches the query best. Other documents in the View also affect this decision.

Therefore the Search scoring functions can work _only_ on documents emitted from a View, as both the corresponding `SEARCH` expression and the View itself are consulted in order to sort the results.

```sql
FOR doc IN viewName
  SEARCH ...
  SORT BM25(doc) DESC
  RETURN doc
```

The [BOOST() function](functions.md#boost) can be used to fine-tune the resulting ranking by weighing sub-expressions in `SEARCH` differently.

If there is no `SEARCH` operation prior to calls to scoring functions or if the search expression does not filter out documents (e.g. `SEARCH true`) then a score of `0` will be returned for all documents.

## Search Options

The `SEARCH` operation accepts an options object with the following attributes:

- `collections` (array, _optional_): array of strings with collection names to restrict the search to certain source collections

Given a View with three linked collections `coll1`, `coll2` and `coll3` it is possible to return documents from the first two collections only and ignore the third using the `collections` option:

```sql
FOR doc IN viewName
  SEARCH true OPTIONS { collections: ["coll1", "coll2"] }
  RETURN doc
```

The search expression `true` matches all View documents. You can use any valid expression here while limiting the scope to the chosen source collections.
