---
title: MIN_MATCH()
---

Return documents that satisfy multiple search expressions.

### Syntax

`MIN_MATCH(expr1, expr2, minMatchCount)`

- `expr` (expression): Each `expr` is a valid search expression. You can include as many as you want.
- `minMatchCount` (number): Minimum number of search expressions that must be satisfied.

### Example

In this example, at least two of the specified search expressions must be satisfied to return results:

```js
FOR doc IN viewName
  SEARCH ANALYZER(MIN_MATCH(doc.text == 'quick', doc.text == 'brown', doc.text == 'fox', 2), "text_en")
  RETURN doc.text
```

This returns `{ "text": "the quick brown fox" }` and `{ "text": "some brown fox" }`, but not `{ "text": "snow fox" }` which only fulfills one of the conditions.