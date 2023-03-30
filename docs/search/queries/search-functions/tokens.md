---
title: TOKENS()
---

The `TOKENS()` function is the only function that you can use freely in the query without a `SEARCH` statement.

`TOKENS(input, analyzer) → tokenArray`

Split the `input` string with the help of the specified `analyzer` into an array. The resulting array can be used in `FILTER` or `SEARCH` statements with the `IN` operator, but also be assigned to variables and returned. This can be used to better understand how a specific analyzer processes an input value.

It has a regular return value unlike all other search functions and is thus not limited to `SEARCH` operations. It is independent of views. A wrapping `ANALYZER()` call in a search expression does not affect the _analyzer_ argument nor allow you to omit it.

- `input` (string): text to tokenize
- `analyzer` (string): name of an [analyzer](../../analyzers/index.md).
- returns `tokenArray` (array): array of strings with zero or more elements, each element being a token.

Example query showcasing the `"text_de"` analyzer (tokenization with stemming, case conversion and accent removal for German text):

```js
RETURN TOKENS("Lörem ipsüm, DOLOR SIT Ämet.", "text_de")
```

```json
[
  [
    "lor",
    "ipsum",
    "dolor",
    "sit",
    "amet"
  ]
]
```

To search a view for documents where the `text` attribute contains certain words/tokens in any order, you can use the function like this:

```js
FOR doc IN viewName
  SEARCH ANALYZER(doc.text IN TOKENS("dolor amet lorem", "text_en"), "text_en")
  RETURN doc
```

It will match `{ "text": "Lorem ipsum, dolor sit amet." }` for instance. If you want to search for tokens in a particular order, use [PHRASE()](phrase.md) instead.