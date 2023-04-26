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

The `regex:matches()` function checks if the entire input sequence matches the provided regular expression pattern. In this example, the regular expression pattern is `gdn(.*)middleware(.*)`, and the input string is `'gdn is situated in trace and its a middleware company'`. The function returns `true` because the input string matches the pattern entirely.

## Example 2

```sql
regex:matches('gdn(.*)middleware', 'gdn is situated in trace and its a middleware company')
```

The `regex:matches()` function checks if the entire input sequence matches the provided regular expression pattern. In this example, the regular expression pattern is `gdn(.*)middleware`, and the input string is `'gdn is situated in trace and its a middleware company'`. The function returns `false` because the input string does not match the pattern entirely.

## Example 3

```sql
CREATE STREAM InputStream (eventTime long, inputText string, regexPattern string);
CREATE STREAM OutputStream (eventTime long, matchesRegex bool);

@info(name = 'regexMatchesStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, regex:matches(regexPattern, inputText) AS matchesRegex
FROM InputStream;
```

The `regexMatchesStreamWorker` processes events from the `InputStream` and uses the `regex:matches()` function to check if the `inputText` attribute matches the specified `regexPattern` attribute entirely. The query outputs the `eventTime` and a boolean value `matchesRegex` for each event to the `OutputStream`. The boolean value is `true` if the input string matches the regular expression pattern entirely, and `false` otherwise.
