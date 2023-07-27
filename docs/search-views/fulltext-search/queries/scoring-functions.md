---
sidebar_position: 30
title: Scoring Functions
---

Scoring functions play a vital role in Macrometa's Fulltext Search Views by returning a ranking value for the documents discovered by a C8QL search query. A higher score signifies a better match.

## Implementing Scoring Functions

Scoring functions predominantly take the document specified by a `FOR` operation as their first argument. To bring the most relevant documents to the forefront of your search results, use descending order `DESC`.

## Calculating Custom Scores

Macrometa allows you to compute custom scores. You can apply a scoring function in conjunction with document attributes and numeric functions. In the example below, a custom score is calculated as `TFIDF(doc) * LOG(doc.value)`:

```c8ql
FOR movie IN imdbView
  SEARCH PHRASE(movie.title, "Star Wars", "text_en")
  SORT BM25(movie) * LOG(movie.runtime + 1) DESC
  RETURN movie
```

You can also sort a combination of scores and attributes across multiple search views and collections to hone your searches:

```c8ql
FOR a IN viewA
  FOR c IN coll
    FOR b IN viewB
      SORT TFIDF(b), c.name, BM25(a)
      ...
```

## Understanding BM25 Scoring Function

The BM25 scoring function utilizes the [Best Matching 25 (BM25) algorithm](https://en.wikipedia.org/wiki/Okapi_BM25) to sort documents based on their relevance.

### Syntax

`BM25(doc, k, b) → score`

`doc` (document): Specified by `FOR ... IN viewName`
`k` (number, _optional_): Adjusts the text term frequency scaling. Defaults to `1.2`. 
`b` (number, _optional_): Determines the scaling by the total text length. Defaults to `0.75`.

### Examples

The following example returns documents sorted by relevance using the BM25 scoring function with default settings:

```c8ql
FOR doc IN viewName
  SEARCH ...
  SORT BM25(doc) DESC
  RETURN doc
```

This example demonstrates sorting by relevance with a double-weighted term frequency and full text length normalization:

```c8ql
FOR doc IN viewName
  SEARCH ...
  SORT BM25(doc, 2.4, 1) DESC
  RETURN doc
```

## Using BOOST Scoring Function

The BOOST function tailors the importance of a specific search expression within a query, offering a boost to its relevance. It defaults to a value of `1.0`.

### Syntax

`BOOST(expr, boost)`

`expr` (expression): A valid search expression.
`boost` (number): Numeric boost value.

### Example

The following example searches for documents that contain either "foo" or "bar" and sorts the results based on their relevance using the BM25 scoring function:

```c8ql
FOR doc IN viewName
  SEARCH ANALYZER(BOOST(doc.text == "foo", 2.5) OR doc.text == "bar", "text_en")
  LET score = BM25(doc)
  SORT score DESC
  RETURN { text: doc.text, score }
```

## Implementing TF-IDF Scoring Function

The TF-IDF scoring function employs the [term frequency–inverse document frequency algorithm](https://en.wikipedia.org/wiki/TF-IDF) to sort documents according to their relevance.

### Syntax

`TFIDF(doc, normalize) → score`

`doc` (document): Specified by `FOR ... IN viewName`.
`normalize` (bool): Specifies whether scores should be normalized. Default is `false`.

### Examples

This example shows how to search for documents and sort by relevance using the TF-IDF score:

```c8ql
FOR doc IN viewName
  SEARCH ...
  SORT TFIDF(doc) DESC
  RETURN doc
```

The following example demonstrates how to search for documents and sort by relevance using a normalized TF-IDF score:

```c8ql
FOR doc IN viewName
  SEARCH ...
  SORT TFIDF(doc, true) DESC
  RETURN doc
```

This example illustrates how to search for documents, sort by the `text` attribute in ascending order, and then sort by the TFIDF score in descending order where the attribute values are equivalent:

```c8ql
FOR doc IN viewName
  SEARCH ...
  SORT doc.text, TFIDF(doc) DESC
  RETURN doc
```
