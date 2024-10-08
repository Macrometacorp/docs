---
sidebar_position: 1
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
