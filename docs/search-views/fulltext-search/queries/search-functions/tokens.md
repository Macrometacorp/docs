---
title: TOKENS()
---

The `TOKENS()` function is the only function that you can use freely in the query without a `SEARCH` statement. A wrapping `ANALYZER()` call in a search expression does not affect the `analyzer` argument nor allow you to omit it.

## Syntax

`TOKENS(input, analyzer) → tokenArray`

Split the `input` string with the help of the specified `analyzer` into an array. You can use the resulting array in `FILTER` or `SEARCH` statements with the `IN` operator.

| Key      | Type    | Description                                 |
|----------|---------|---------------------------------------------|
| input    | string  | Text to tokenize.                            |
| analyzer | string  | Name of an [analyzer](../../analyzers/index.md). |

## Example 1

Example query showcasing the `"text_de"` analyzer, which features tokenization with stemming, case conversion, and accent removal for German text:

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

## Example 2

This example searches for documents where the `text` attribute contains certain tokens in any order:

```js
FOR doc IN viewName
  SEARCH ANALYZER(doc.text IN TOKENS("dolor amet lorem", "text_en"), "text_en")
  RETURN doc
```

Alternatively, if you want to search for tokens in a particular order, use [PHRASE()](phrase.md) instead.

## Example 3

When calling a `TOKENS()` function, you must always specify the analyzer name:

```js
FOR doc IN viewName
  SEARCH ANALYZER(doc.text IN TOKENS("foo", "text_en"), "text_en")
  RETURN doc
```
