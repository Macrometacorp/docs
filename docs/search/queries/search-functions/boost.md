---
title: BOOST()
---

Override boost in the context of a search expression with a specified value, making it available for scorer functions. By default, the context has a boost value equal to `1.0`.

`BOOST(expr, boost)`

- **expr** (expression): any valid search expression
- **boost** (number): numeric boost value
- returns nothing: the function can only be called in a [search query](../../queries/index.md) and throws an error otherwise

```js
FOR doc IN viewName
  SEARCH ANALYZER(BOOST(doc.text == "foo", 2.5) OR doc.text == "bar", "text_en")
  LET score = BM25(doc)
  SORT score DESC
  RETURN { text: doc.text, score }
```

Assuming a view with the following documents indexed and processed by the
`text_en` analyzer:

```js
{ "text": "foo bar" }
{ "text": "foo" }
{ "text": "bar" }
{ "text": "foo baz" }
{ "text": "baz" }
```

… the result of above query would be:

```json
[
  {
    "text": "foo bar",
    "score": 2.787301540374756
  },
  {
    "text": "foo baz",
    "score": 1.6895781755447388
  },
  {
    "text": "foo",
    "score": 1.525835633277893
  },
  {
    "text": "bar",
    "score": 0.9913395643234253
  }
]
```
