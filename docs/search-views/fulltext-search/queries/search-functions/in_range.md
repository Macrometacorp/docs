---
title: IN_RANGE()
---

Match documents where the attribute at `path` is greater than (or equal to) `low` and less than (or equal to) `high`.

## Syntax

`IN_RANGE(path, low, high, includeLow, includeHigh)`

The values `low` and `high` can be numbers or strings, but each value must have the same data type.

| Key        | Type                    | Description                                                  |
|------------|-------------------------|--------------------------------------------------------------|
| path       | attribute path expression | The path to the attribute in the document.                  |
| low        | number or string        | Minimum range value.                                         |
| high       | number or string        | Maximum range value.                                         |
| includeLow | bool                    | If `true`, the value specified in `low` is included in the range.  |
| includeHigh | bool                   | If `false`, the value specified in `high` is included in the range. |

The alphabetical order of characters is not taken into account by search. Range queries in `SEARCH` operations against views do not follow the language rules as defined by a locale analyzer.

## Example 1

This query returns documents with the attribute `value` between and including 3 to 5:

```js
FOR doc IN viewName
  SEARCH IN_RANGE(doc.value, 3, 5, true, true)
  RETURN doc.value
```

This also matches documents which have an array of numbers as `value` attribute where at least one number is within the specified boundaries.

## Example 2

You can also use string boundaries and a text analyzer to match documents which have at least one token within the specified character range:

```js
FOR doc IN valView
  SEARCH ANALYZER(IN_RANGE(doc.value, "a","f", true, false), "text_en")
  RETURN doc
```

Assume a collection contains the following values:

```json
{ "text": "foo bar" }
{ "text": "foo" }
{ "text": "bar" }
{ "text": "foo baz" }
{ "text": "baz" }
```

The previous example returns `bar` and `foo bar` because _b_ is within the specified range. However, `foo` is excluded because _f_ is excluded by `includehigh`.
