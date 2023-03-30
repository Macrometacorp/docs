---
title: STARTS_WITH()
---

Match the value of the attribute that starts with `prefix`. If the attribute is processed by a tokenizing analyzer (type `"text"` or `"delimiter"`) or if it is an array, then a single token/element starting with the prefix is sufficient to match the document.

`STARTS_WITH(path, prefix)`

:::warning
The alphabetical order of characters is not taken into account by Search, i.e. range queries in SEARCH operations against views will not follow the language rules as per the defined analyzer locale.
:::

- `path` (attribute path expression): the path of the attribute to compare against in the document
- `prefix` (string): a string to search at the start of the text

To match a document `{ "text": "lorem ipsum..." }` using a prefix and the `"identity"` analyzer you can use it like this:

```js
FOR doc IN viewName
  SEARCH STARTS_WITH(doc.text, "lorem ip")
  RETURN doc
```

This query will match `{ "text": "lorem ipsum" }` as well as `{ "text": [ "lorem", "ipsum" ] }` given a view which indexes the `text` attribute and processes it with the `"text_en"` analyzer:

```js
FOR doc IN viewName
  SEARCH ANALYZER(STARTS_WITH(doc.text, "ips"), "text_en")
  RETURN doc.text
```

Note that it will not match `{ "text": "IPS (in-plane switching)" }` because the analyzer has stemming enabled, but the prefix was passed in as-is:

```js
RETURN TOKENS("IPS (in-plane switching)", "text_en")
```

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

The _s_ is removed from _ips_, which leads to the prefix _ips_ not matching the indexed token _ip_. You may either create a custom text analyzer with stemming disabled to avoid this issue, or apply stemming to the prefix:

```js
FOR doc IN viewName
  SEARCH ANALYZER(STARTS_WITH(doc.text, TOKENS("ips", "text_en")[0]), "text_en")
  RETURN doc.text
```