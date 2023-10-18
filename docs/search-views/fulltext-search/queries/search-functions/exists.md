---
title: EXISTS()
---

Match documents where an attribute at `path` is present. To use this function, the fulltext search view definition must have `storeValues` set to `"id"`.

## Syntax

`EXISTS(path)`

| Key  | Type                    | Description                                 |
|------|-------------------------|---------------------------------------------|
| path | attribute path expression | The path to the attribute in the document. |

## Example 1

```js
FOR doc IN viewName
  SEARCH EXISTS(doc.text)
  RETURN doc
```

## Specify Data Type

Match documents where an attribute at `path` is present and also matches the specified data type.

### Syntax

`EXISTS(path, type)`

- `path` (attribute path expression): The path to the attribute in the document.
- `type` (string): Data type:
  - `"null"`
  - `"bool"` / `"boolean"`
  - `"numeric"`
  - `"string"`
  - `"analyzer"` (Refer to [Specify Analyzer](#specify-analyzer).)

### Example

```js
FOR doc IN viewName
  SEARCH EXISTS(doc.text, "string")
  RETURN doc
```

## Specify Analyzer

Match documents where an attribute at `path` is present and also indexed by a specified analyzer.

### Syntax

`EXISTS(path, "analyzer", analyzer)`

- `path` (attribute path expression): The path to the attribute in the document.
- `"analyzer"` (string): Specifies to look for an analyzer. Do not change.
- `analyzer` (string): Optionally, specify the name of an [analyzer](../../analyzers/index.md). Default is `identity`.

### Example

```js
FOR doc IN viewName
  SEARCH EXISTS(doc.text, "analyzer", "text_en")
  RETURN doc
```
