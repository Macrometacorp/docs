---
title: ANALYZER()
---

Sets an analyzer for the search query. The analyzer applies to all nested functions which do not have an analyzer argument. If a nested function has its own analyzer set, it takes precedence over what you choose here.

The default analyzer is `identity`.

Syntax:

`ANALYZER(expr, analyzer)`

- `expr` (expression): any valid search expression
- `analyzer` (string): name of an analyzer.

In this example, the analyzer uses `|` as a delimiter.

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

Using the `ANALYZER()` function, you can specify a delimiter in several ways. For example:

```js
FOR doc IN viewName
  SEARCH ANALYZER(doc.text == "bar", "delimiter")
  RETURN doc
```

The second argument specifies the analyzer called `delimiter` which is configured with the [delimiter property](../../analyzers/properties.md).

The expression `doc.text == "bar"` must be wrapped by the `ANALYZER()` function. Otherwise the expression would be evaluated with the default `identity` analyzer. 

`"foo|bar|baz" == "bar"` would not match, but the view does not even process the indexed fields with the `identity` analyzer. The following query would also return an empty result because of the analyzer mismatch:

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
