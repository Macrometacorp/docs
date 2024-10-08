---
title: PHRASE()
---

Search for a phrase in the referenced attribute. It only matches documents in which the tokens appear in the specified order. To search for tokens in any order, use [TOKENS()](tokens.md).

## Syntax

`PHRASE(path, phrasePart, analyzer)`

`PHRASE(path, phrasePart1, skipTokens1, ... phrasePartN, skipTokensN, analyzer)`

The phrase can be expressed as an arbitrary number of `phraseParts` separated by `skipTokens_number` of tokens (wildcards).

| Key         | Type      | Description            |
|-------------|-----------|------------------------|
| path        | attribute path expression | The path to the attribute in the document.      |
| phrasePart  | string                  | Text to search for in tokens.        |
| skipTokens  | number (optional)     | Number of words or tokens to treat as wildcards.        |
| analyzer    | string (optional)     | Name of an [analyzer](../../analyzers/index.md). If not specified, uses the analyzer of a wrapping `ANALYZER()` call. Otherwise, defaults to `identity`. |

## Example 1

Given a view indexing an attribute `text` with the `"text_en"` analyzer and a document `{ "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit" }`, the following query would match it:

```js
FOR doc IN viewName
  SEARCH PHRASE(doc.text, "lorem ipsum", "text_en")
  RETURN doc.text
```

However, this search expression does not because the tokens `"ipsum"` and `"lorem"` do not appear in this order:

```js
PHRASE(doc.text, "ipsum lorem", "text_en")
```

## Example 2

To match `"ipsum"` and `"amet"` with any two tokens in between, you can use the
following search expression:

```js
PHRASE(doc.text, "ipsum", 2, "amet", "text_en")
```

The `skipTokens` value of `2` defines how many wildcard tokens have to appear between _ipsum_ and _amet_. A `skipTokens` value of `0` means that the tokens must be adjacent. Negative values are allowed, but not very useful. These three search expressions are equivalent:

```js
PHRASE(doc.text, "lorem ipsum", "text_en")
PHRASE(doc.text, "lorem", 0, "ipsum", "text_en")
PHRASE(doc.text, "ipsum", -1, "lorem", "text_en")
```

## Example 3

The `PHRASE()` function also accepts an array as second argument with `phrasePart` and `skipTokens` parameters as elements. This syntax variation enables the usage of computed expressions:

```js
LET proximityCondition = [ "foo", ROUND(RAND()*10), "bar" ]
FOR doc IN viewName
  SEARCH PHRASE(doc.text, proximityCondition, "text_en")
  RETURN doc
```
