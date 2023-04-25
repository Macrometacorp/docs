---
title: lookingAt (Function)
---

Matches the input.sequence from the beginning against the regex pattern, and unlike `regex:matches() it does not require that the entire input.sequence be matched.`

## Syntax

```sql
<BOOL> regex:lookingAt(<STRING> regex, <STRING> input.sequence)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| regex  | A regular expression. For example, `\d\d(.*)gdn`. |               | STRING   | No  | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, `21 products are produced by gdn`. |               | STRING  | No | Yes |

## Example 1

```sql
regex:lookingAt('\d\d(.*)(gdn.*)', '21 products are produced by gdn currently in Sri Lanka')
```

The `regex:lookingAt()` function checks if the input sequence matches the provided regular expression pattern from the beginning of the string. In this example, the regular expression pattern is `\d\d(.*)(gdn.*)`, and the input string is `'21 products are produced by gdn currently in Sri Lanka'`.

The regular expression pattern `\d\d(.*)(gdn.*)` can be broken down as follows:
- `\d\d`: Two consecutive digits.
- `(.*?)`: Any sequence of characters (including none) - Group 1.
- `(gdn.*)`: The string "gdn" followed by any sequence of characters (including none) - Group 2.

Because the input string `'21 products are produced by gdn currently in Sri Lanka'` starts with two digits, followed by a sequence of characters and then the string "gdn" with any sequence of characters, it matches the regular expression pattern `\d\d(.*)(gdn.*)` from the beginning. As a result, the function returns `true`.

## Example 2

```sql
regex:lookingAt('gdn(.*)middleware(.*)', 'sample test string and gdn is situated in trace and it's a middleware company')
```

The `regex:lookingAt()` function checks if the input sequence matches the provided regular expression pattern from the beginning of the string. In this example, the regular expression pattern is `gdn(.*)middleware(.*)`, and the input string is `'sample test string and gdn is situated in trace and it's a middleware company'`.

The regular expression pattern `gdn(.*)middleware(.*)` can be broken down as follows:
- `gdn`: The string "gdn".
- `(.*)`: Any sequence of characters (including none) - Group 1.
- `middleware`: The string "middleware".
- `(.*)`: Any sequence of characters (including none) - Group 2.

The input string `'sample test string and gdn is situated in trace and it's a middleware company'` does not start with the string "gdn". As a result, it does not match the regular expression pattern `gdn(.*)middleware(.*)` from the beginning. Therefore, the function returns `false`.
