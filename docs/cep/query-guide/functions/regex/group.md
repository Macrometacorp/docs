---
title: group (Function)
---

Returns the subsequence captured by the given group during the regex match operation.

## Syntax

```sql
<STRING> regex:group(<STRING> regex, <STRING> input.sequence, <INT> group.id)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|-----|--------------|---------------|---------------------|----------|---------|
| regex | A regular expression. For example, `\d\d(.*)gdn.`  |      | STRING | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, 2`1 products are produced by gdn`. |               | STRING | No  | Yes |
| group.id       | The given group id of the regex expression. For example, `2`. |   | INT  | No       | Yes     |

## Example 1

```sql
regex:group('\d\d(.*)(gdn.*)(gdn.*)', '21 products are produced within 10 years by gdn currently by gdn employees', 3)
```

The `regex:group()` function is used to extract a specific group from the input string, based on the provided regular expression pattern and the group ID. In this example, the regular expression pattern is `\d\d(.*)(gdn.*)(gdn.*)`, the input string is `'21 products are produced within 10 years by gdn currently by gdn employees'`, and the group ID is `3`.

The regular expression pattern `\d\d(.*)(gdn.*)(gdn.*)` can be broken down as follows:
- `\d\d`: Two consecutive digits.
- `(.*?)`: Any sequence of characters (including none) - Group 1.
- `(gdn.*)`: The string "gdn" followed by any sequence of characters (including none) - Group 2.
- `(gdn.*)`: The string "gdn" followed by any sequence of characters (including none) - Group 3.

In this case, the pattern matches the input string, and group 3 captures the subsequence `'gdn employees'`. Therefore, the function returns `'gdn employees'`.
