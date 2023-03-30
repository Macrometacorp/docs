---
title: PHRASE()
---

Search for a phrase in the referenced attribute. It only matches documents in which the tokens appear in the specified order. To search for tokens in any order use [TOKENS()](tokens.md) instead.

`PHRASE(path, phrasePart, analyzer)`

`PHRASE(path, phrasePart1, skipTokens1, ... phrasePartN, skipTokensN, analyzer)`

The phrase can be expressed as an arbitrary number of _phraseParts_ separated by _skipTokens_ number of tokens (wildcards).

- `path` (attribute path expression): the attribute to test in the document
- `phrasePart` (string): text to search for in the tokens. May consist of several words/tokens, which will be split using the specified _analyzer_
- `skipTokens` (number, _optional_): amount of words/tokens to treat
  as wildcards
- `analyzer` (string, _optional_): name of an [analyzer](../../analyzers/index.md). Uses the analyzer of a wrapping `ANALYZER()` call if not specified or defaults to `"identity"`
- returns nothing: the function can only be called in a [search query](../../queries/index.md) and throws an error otherwise

Given a view indexing an attribute _text_ with the `"text_en"` analyzer and a document `{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit" }`, the following query would match it:

```js
FOR doc IN viewName
  SEARCH PHRASE(doc.text, "lorem ipsum", "text_en")
  RETURN doc.text
```

However, this search expression does not because the tokens `"ipsum"` and `"lorem"` do not appear in this order:

```js
PHRASE(doc.text, "ipsum lorem", "text_en")
```

To match `"ipsum"` and `"amet"` with any two tokens in between, you can use the
following search expression:

```js
PHRASE(doc.text, "ipsum", 2, "amet", "text_en")
```

The _skipTokens_ value of `2` defines how many wildcard tokens have to appear between _ipsum_ and _amet_. A _skipTokens_ value of `0` means that the tokens must be adjacent. Negative values are allowed, but not very useful. These three search expressions are equivalent:

```js
PHRASE(doc.text, "lorem ipsum", "text_en")
PHRASE(doc.text, "lorem", 0, "ipsum", "text_en")
PHRASE(doc.text, "ipsum", -1, "lorem", "text_en")
```

`PHRASE(path, [ phrasePart1, skipTokens1, ... phrasePartN, skipTokensN ], analyzer)`

The `PHRASE()` function also accepts an array as second argument with _phrasePart_ and _skipTokens_ parameters as elements. This syntax variation enables the usage of computed expressions:

```js
LET proximityCondition = [ "foo", ROUND(RAND()*10), "bar" ]
FOR doc IN viewName
  SEARCH PHRASE(doc.text, proximityCondition, "text_en")
  RETURN doc
```
