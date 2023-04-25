---
title: matches (Function)
---

Matches the entire input.sequence against the regex pattern.

## Syntax

```sql
<BOOL> regex:matches(<STRING> regex, <STRING> input.sequence)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| regex   | A regular expression. For example, `\d\d(.*)gdn`. |       | STRING  | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, `21 products are produced by gdn`. |               | STRING  | No    | Yes |

## Example 1

```sql
regex:matches('gdn(.*)middleware(.*)', 'gdn is situated in trace and its a middleware company')
```

The `regex:matches()` function checks if the entire input sequence matches the provided regular expression pattern. In this example, the regular expression pattern is `gdn(.*)middleware(.*)`, and the input string is `'gdn is situated in trace and its a middleware company'`.

The regular expression pattern `gdn(.*)middleware(.*)` can be broken down as follows:

- `gdn`: The string "gdn".
- `(.*)`: Any sequence of characters (including none) - Group 1.
- `middleware`: The string "middleware".
- `(.*)`: Any sequence of characters (including none) - Group 2.

The input string `'gdn is situated in trace and its a middleware company'` matches the regular expression pattern `gdn(.*)middleware(.*)` entirely. Therefore, the function returns `true`.

## Example 2

```sql
regex:matches('gdn(.*)middleware', 'gdn is situated in trace and its a middleware company')
```

The `regex:matches()` function checks if the entire input sequence matches the provided regular expression pattern. In this example, the regular expression pattern is `gdn(.*)middleware`, and the input string is `'gdn is situated in trace and its a middleware company'`.

The regular expression pattern `gdn(.*)middleware` can be broken down as follows:
- `gdn`: The string "gdn".
- `(.*)`: Any sequence of characters (including none).
- `middleware`: The string "middleware".

The input string `'gdn is situated in trace and its a middleware company'` does not match the regular expression pattern `gdn(.*)middleware` entirely because the input sequence contains additional characters after "middleware". Therefore, the function returns `false`.
