---
title: STARTS_WITH()
---

Match the value of an attribute that starts with a prefix. If the attribute is tokenized or is an array, then a document only needs a single token or element to return in the query.

Syntax:

`STARTS_WITH(path, prefix)`

- `path` (attribute path expression): The path to the attribute in the document.
- `prefix` (string): A string to search for at the start of text.

The alphabetical order of characters is not taken into account by Search. Range queries in SEARCH operations against views do not follow the language rules as defined by a locale analyzer.

This example returns a `"lorem ipsum"` document using a prefix and an identity analyzer:

```js
FOR doc IN viewName
  SEARCH STARTS_WITH(doc.text, "lorem ip")
  RETURN doc
```

If a view indexes the `text` attribute and processes it with an English text analyzer, this query returns `"lorem ipsum"`and `"lorem", "ipsum"`:

```js
FOR doc IN viewName
  SEARCH ANALYZER(STARTS_WITH(doc.text, "ips"), "text_en")
  RETURN doc.text
```

The query does not return `"IPS (in-plane switching)"` because the analyzer has stemming enabled.

Assume you have an array of stemmed tokens which apply to `"IPS (in-plane switching)"`:

```json
[
  [
    "ip",
    "in",
    "plane",
    "switch"
  ]
]
```

In this example, the `s` is removed from `ips`, which causes the prefix `ips` not to match the indexed token `ip`. You can apply the stemming rules to the document attribute in addition to the prefix, increasing the likelihood of a match:

```js
FOR doc IN viewName
  SEARCH ANALYZER(STARTS_WITH(doc.text, TOKENS("ips", "text_en")[0]), "text_en")
  RETURN doc.text
```

