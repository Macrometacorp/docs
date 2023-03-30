---
title: MIN_MATCH()
---

Match documents where at least `minMatchCount` of the specified search expressions are satisfied.

`MIN_MATCH(expr1, ... exprN, minMatchCount)`

- `expr` (expression, _repeatable_): any valid search expression
- `minMatchCount` (number): minimum number of search expressions that should be satisfied

Assuming a view with a text analyzer, you may use it to match documents where the attribute contains at least two out of three tokens:

```js
FOR doc IN viewName
  SEARCH ANALYZER(MIN_MATCH(doc.text == 'quick', doc.text == 'brown', doc.text == 'fox', 2), "text_en")
  RETURN doc.text
```

This will match `{ "text": "the quick brown fox" }` and `{ "text": "some brown fox" }`, but not `{ "text": "snow fox" }` which only fulfills one of the conditions.
