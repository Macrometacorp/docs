---
title: find (Function)
---

Finds the subsequence that matches the given regex pattern.

## Syntax

```sql
<BOOL> regex:find(<STRING> regex, <STRING> input.sequence)
<BOOL> regex:find(<STRING> regex, <STRING> input.sequence, <INT> starting.index)
```

## Query Parameters

| Name   | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|--------|---------------|---------------|---------------------|----------|---------|
| regex  | A regular expression that is matched to a sequence in order to find the subsequence of the same. For example, `\d\d(.*)gdn`.    |         | STRING  | No       | Yes  |
| input.sequence | The input sequence to be matched with the regular expression. For example, `21 products are produced by gdn`.  |        | STRING   | No       | Yes     |
| starting.index | The starting index of the input sequence from where the input sequence is matched with the given regex pattern.For example, `10`. | 0  | INT   | Yes   | Yes   |

## Example 1

```sql
regex:find('\d\d(.*)gdn', '21 products are produced by gdn currently')
```

The `regex:find()` function is used to search for a pattern within a given input string. In this example, the regular expression pattern is `\d\d(.*)gdn` and the input string is `'21 products are produced by gdn currently'`.

The regular expression pattern `\d\d(.*)gdn` can be broken down as follows:
- `\d\d`: Two consecutive digits.
- `(.*)`: Any sequence of characters (including none).
- `gdn`: The string "gdn".

In the given input string, the pattern matches the subsequence "21 products are produced by gdn". Because there is a match, the function returns `true`.

## Example 2

```sql
regex:find('\d\d(.*)gdn', '21 products are produced by gdn.', 4)
```

The `regex:find()` function is used to search for a pattern within a given input string, starting from a specified index. In this example, the regular expression pattern is `\d\d(.*)gdn`, the input string is `'21 products are produced by gdn.'`, and the starting index is `4`.

The regular expression pattern `\d\d(.*)gdn` can be broken down as follows:
- `\d\d`: Two consecutive digits.
- `(.*)`: Any sequence of characters (including none).
- `gdn`: The string "gdn".

Because the search starts from index `4` (0-based), which corresponds to the character `'p'` in the input string, the pattern cannot be found. As a result, the function returns `false`.
