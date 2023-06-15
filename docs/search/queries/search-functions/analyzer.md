---
title: ANALYZER()
---

Sets an analyzer for the search query. The analyzer applies to all nested functions which do not have an analyzer argument. If a nested function has its own analyzer, then that analyzer takes precedence over what you choose here.

The default analyzer is `identity`.

### Syntax

`ANALYZER(expr, analyzer)`

| Key       | Type    | Description              |
|-----------|---------|--------------------------|
| expr      | expression | A valid search expression. |
| analyzer  | string  | Name of the analyzer.    |


### Examples

Using the `ANALYZER()` function, you can specify an analyzer type. For example:

```js
FOR doc IN viewName
  SEARCH ANALYZER(doc.text == "bar", "text_en")
  RETURN doc
```

The second argument in the `ANALYZER()` function specifies a `text_en` analyzer. The expression `doc.text == "bar"` must be wrapped by the `ANALYZER()` function. Otherwise, the expression would be evaluated with the default `identity` analyzer. 

In the following query, the search expression is swapped by `ANALYZER()` to set the `text_en` analyzer for both `PHRASE()` functions:

```js
FOR doc IN viewName
  SEARCH ANALYZER(PHRASE(doc.text, "foo") OR PHRASE(doc.text, "bar"), "text_en")
  RETURN doc
```

Without a specified `ANALYZER()`:

```js
FOR doc IN viewName
  SEARCH PHRASE(doc.text, "foo", "text_en") OR PHRASE(doc.text, "bar", "text_en")
  RETURN doc
```

In this example, `ANALYZER()` sets a default `text_en` analyzer. In the nested function that searches for `bar`, the `identity` analyzer overrides the higher-level choice.

```js
FOR doc IN viewName
  SEARCH ANALYZER(PHRASE(doc.text, "foo") OR PHRASE(doc.text, "bar", "identity"), "text_en")
  RETURN doc
```
