---
sidebar_position: 20
title: BOOST
---

The BOOST scoring function tailors the importance of a specific search expression within a query, offering a boost to its relevance. It defaults to a value of `1.0`.

### Syntax

`BOOST(expr, boost)`

`expr` (expression): A valid search expression.
`boost` (number): Numeric boost value.

### Example

The following example searches for documents that contain either "foo" or "bar" and sorts the results based on their relevance using the BM25 scoring function:

```sql
FOR doc IN viewName
  SEARCH ANALYZER(BOOST(doc.text == "foo", 2.5) OR doc.text == "bar", "text_en")
  LET score = BM25(doc)
  SORT score DESC
  RETURN { text: doc.text, score }
```
