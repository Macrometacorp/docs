---
title: IN_RANGE()
---

`IN_RANGE(path, low, high, includeLow, includeHigh)`

Match documents where the attribute at **path** is greater than (or equal to) **low** and less than (or equal to) **high**.

_low_ and _high_ can be numbers or strings (technically also `null`, `true` and `false`), but the data type must be the same for both.

:::warning
The alphabetical order of characters is not taken into account by Search, i.e. range queries in SEARCH operations against views will not follow the language rules as per the defined analyzer locale.
:::

- **path** (attribute path expression): the path of the attribute to test in the document
- **low** (number\|string): minimum value of the desired range
- **high** (number\|string): maximum value of the desired range
- **includeLow** (bool): whether the minimum value shall be included in the range (left-closed interval) or not (left-open interval)
- **includeHigh** (bool): whether the maximum value shall be included in the range (right-closed interval) or not (right-open interval)
- returns nothing: the function can only be called in a [search query](../../queries/index.md) and throws an error otherwise

If _low_ and _high_ are the same, but _includeLow_ and/or _includeHigh_ is set to `false`, then nothing will match. If _low_ is greater than _high_ nothing will match either.

To match documents with the attribute `value >= 3` and `value <= 5` using the default `"identity"` analyzer you would write the following query:

```js
FOR doc IN viewName
  SEARCH IN_RANGE(doc.value, 3, 5, true, true)
  RETURN doc.value
```

This will also match documents which have an array of numbers as `value` attribute where at least one of the numbers is in the specified boundaries.

Using string boundaries and a text analyzer allows to match documents which have at least one token within the specified character range:

```js
FOR doc IN valView
  SEARCH ANALYZER(IN_RANGE(doc.value, "a","f", true, false), "text_en")
  RETURN doc
```

This will match `{ "value": "bar" }` and `{ "value": "foo bar" }` because the _b_ of _bar_ is in the range (`"a" <= "b" < "f"`), but not `{ "value": "foo" }` because the _f_ of _foo_ is excluded (_high_ is "f" but _includeHigh_ is false).
