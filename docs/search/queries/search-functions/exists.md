---
title: EXISTS()
---

:::info
`EXISTS()` will only match values when the specified attribute has been processed with the link property **storeValues** set to `"id"` in the view definition (the default is `"none"`).
:::
`EXISTS(path)`

Match documents where the attribute at **path** is present.

- **path** (attribute path expression): the attribute to test in the document
- returns nothing: the function can only be called in a [search query](../../queries/index.md) and throws an error otherwise

```js
FOR doc IN viewName
  SEARCH EXISTS(doc.text)
  RETURN doc
```

`EXISTS(path, type)`

Match documents where the attribute at **path** is present _and_ is of the specified data type.

- **path** (attribute path expression): the attribute to test in the document
- **type** (string): data type to test for, can be one of:
  - `"null"`
  - `"bool"` / `"boolean"`
  - `"numeric"`
  - `"string"`
  - `"analyzer"` (see below)
- returns nothing: the function can only be called in a [search query](../../queries/index.md) and throws an error otherwise

```js
FOR doc IN viewName
  SEARCH EXISTS(doc.text, "string")
  RETURN doc
```

`EXISTS(path, "analyzer", analyzer)`

Match documents where the attribute at **path** is present _and_ was indexed by the specified **analyzer**.

- **path** (attribute path expression): the attribute to test in the document
- **type** (string): string literal `"analyzer"`
- **analyzer** (string, _optional_): name of an [analyzer](../../analyzers/index.md). Uses the analyzer of a wrapping `ANALYZER()` call if not specified or defaults to `"identity"`
- returns nothing: the function can only be called in a [search query](../../queries/index.md) and throws an error otherwise

```js
FOR doc IN viewName
  SEARCH EXISTS(doc.text, "analyzer", "text_en")
  RETURN doc
```
