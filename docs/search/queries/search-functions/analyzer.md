---
title: BOOST()
---

Sets the analyzer for the given search expression. The default analyzer is `identity` for any Search expression. This utility function can be used to wrap a complex expression to set a particular analyzer. It also sets it for all the nested functions which require such an argument to avoid repeating the analyzer parameter. If an analyzer argument is passed to a nested function regardless, then it takes precedence over the analyzer set via `ANALYZER()`.

`ANALYZER(expr, analyzer)`

The `TOKENS()` function is an exception, it requires the analyzer name to be passed in all cases even if wrapped in an `ANALYZER()` call.

- `expr` (expression): any valid search expression
- `analyzer` (string): name of an analyzer.
- returns nothing: The function can only be called in a [search query](../../queries/index.md) and throws an error otherwise.

Assuming a view definition with an analyzer whose name and type is `delimiter`:

```json
{
  "links": {
    "coll": {
      "analyzers": [ "delimiter" ],
      "includeAllFields": true,
    }
  },
  ...
}
```

… with the analyzer properties `{ "delimiter": "|" }` and an example document `{ "text": "foo|bar|baz" }` in the collection `coll`, the following query would return the document:

```js
FOR doc IN viewName
  SEARCH ANALYZER(doc.text == "bar", "delimiter")
  RETURN doc
```

The expression `doc.text == "bar"` has to be wrapped by `ANALYZER()` in order to set the analyzer to `delimiter`. Otherwise the expression would be evaluated with the default `identity` analyzer. `"foo|bar|baz" == "bar"` would not match, but the view does not even process the indexed fields with the `identity` analyzer. The following query would also return an empty result because of the analyzer mismatch:

```js
FOR doc IN viewName
  SEARCH doc.text == "foo|bar|baz"
  //SEARCH ANALYZER(doc.text == "foo|bar|baz", "identity")
  RETURN doc
```

In below query, the search expression is swapped by `ANALYZER()` to set the `text_en` analyzer for both `PHRASE()` functions:

```js
FOR doc IN viewName
  SEARCH ANALYZER(PHRASE(doc.text, "foo") OR PHRASE(doc.text, "bar"), "text_en")
  RETURN doc
```

Without the usage of `ANALYZER()`:

```js
FOR doc IN viewName
  SEARCH PHRASE(doc.text, "foo", "text_en") OR PHRASE(doc.text, "bar", "text_en")
  RETURN doc
```

In the following example `ANALYZER()` is used to set the analyzer `text_en`, but in the second call to `PHRASE()` a different analyzer is set (`identity`) which overrules `ANALYZER()`. Therefore, the `text_en` analyzer is used to find the phrase _foo_ and the `identity` analyzer to find _bar_:

```js
FOR doc IN viewName
  SEARCH ANALYZER(PHRASE(doc.text, "foo") OR PHRASE(doc.text, "bar", "identity"), "text_en")
  RETURN doc
```

Despite the wrapping `ANALYZER()` function, the analyzer name can not be omitted in calls to the `TOKENS()` function. Both occurrences of `text_en` are required, to set the analyzer for the expression `doc.text IN ...` and for the `TOKENS()` function itself:

```js
FOR doc IN viewName
  SEARCH ANALYZER(doc.text IN TOKENS("foo", "text_en"), "text_en")
  RETURN doc
```
