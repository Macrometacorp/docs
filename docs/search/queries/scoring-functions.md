---
sidebar_position: 30
title: Scoring Functions
---

Scoring functions return a ranking value for the documents found by a [search query](../queries/index.md). The better the documents match the search expression the higher the returned number.

The first argument to any scoring function is always the document emitted by a `FOR` operation over a search view.

To sort the result set by relevance, with the more relevant documents coming first, sort in **descending order** by the score (e.g. `SORT BM25(...) DESC`).

You may calculate custom scores based on a scoring function using document attributes and numeric functions (e.g. `TFIDF(doc) * LOG(doc.value)`):

```js
FOR movie IN imdbView
  SEARCH PHRASE(movie.title, "Star Wars", "text_en")
  SORT BM25(movie) * LOG(movie.runtime + 1) DESC
  RETURN movie
```

Sorting by more than one score is allowed. You may also sort by a mix of scores and attributes from multiple views as well as collections:

```js
FOR a IN viewA
  FOR c IN coll
    FOR b IN viewB
      SORT TFIDF(b), c.name, BM25(a)
      ...
```

## BM25()

`BM25(doc, k, b) → score`

Sorts documents using the [**Best Matching 25** algorithm](https://en.wikipedia.org/wiki/Okapi_BM25){:target="_blank"} (BM25).

- **doc** (document): must be emitted by `FOR ... IN viewName`
- **k** (number, _optional_): calibrates the text term frequency scaling. The default is `1.2`. A _k_ value of `0` corresponds to a binary model (no term frequency), and a large value corresponds to using raw term frequency
- **b** (number, _optional_): determines the scaling by the total text length. The default is `0.75`. At the extreme values of the coefficient _b_, BM25 turns into the ranking functions known as:
  - BM11 for _b_ = `1` (corresponds to fully scaling the term weight by the total text length)
  - BM15 for _b_ = `0` (corresponds to no length normalization)
- returns **score** (number): computed ranking value

Sorting by relevance with BM25 at default settings:

```js
FOR doc IN viewName
  SEARCH ...
  SORT BM25(doc) DESC
  RETURN doc
```

Sorting by relevance, with double-weighted term frequency and with full text length normalization:

```js
FOR doc IN viewName
  SEARCH ...
  SORT BM25(doc, 2.4, 1) DESC
  RETURN doc
```

## TFIDF()

`TFIDF(doc, normalize) → score`

Sorts documents using the [**term frequency–inverse document frequency** algorithm](https://en.wikipedia.org/wiki/TF-IDF){:target="_blank"} (TF-IDF).

- **doc** (document): must be emitted by `FOR ... IN viewName`
- **normalize** (bool, _optional_): specifies whether scores should be normalized. The default is _false_.
- returns **score** (number): computed ranking value

Sort by relevance using the TF-IDF score:

```js
FOR doc IN viewName
  SEARCH ...
  SORT TFIDF(doc) DESC
  RETURN doc
```

Sort by relevance using a normalized TF-IDF score:

```js
FOR doc IN viewName
  SEARCH ...
  SORT TFIDF(doc, true) DESC
  RETURN doc
```

Sort by the value of the `text` attribute in ascending order, then by the TFIDF score in descending order where the attribute values are equivalent:

```js
FOR doc IN viewName
  SEARCH ...
  SORT doc.text, TFIDF(doc) DESC
  RETURN doc
```
