---
sidebar_position: 30
title: TFIDF
---

The TF-IDF scoring function uses the [term frequency–inverse document frequency algorithm](https://en.wikipedia.org/wiki/TF-IDF) to sort documents according to their relevance.

### Syntax

`TFIDF(doc, normalize) → score`

`doc` (document): Specified by `FOR ... IN viewName`.
`normalize` (bool): Specifies whether scores should be normalized. Default is `false`.

### Examples

This example shows how to search for documents and sort by relevance using the TF-IDF score:

```sql
FOR doc IN viewName
  SEARCH ...
  SORT TFIDF(doc) DESC
  RETURN doc
```

The following example demonstrates how to search for documents and sort by relevance using a normalized TF-IDF score:

```sql
FOR doc IN viewName
  SEARCH ...
  SORT TFIDF(doc, true) DESC
  RETURN doc
```

This example illustrates how to search for documents, sort by the `text` attribute in ascending order, and then sort by the TFIDF score in descending order where the attribute values are equivalent:

```sql
FOR doc IN viewName
  SEARCH ...
  SORT doc.text, TFIDF(doc) DESC
  RETURN doc
```
