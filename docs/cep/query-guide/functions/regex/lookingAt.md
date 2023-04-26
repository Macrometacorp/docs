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
@info(name = 'regexLookingAtExample1')
SELECT regex:lookingAt('\\d\\d(.*)(gdn.*)', '21 products are produced by gdn currently in Sri Lanka') AS lookingAtResult;
```

The `regexLookingAtExample1` demonstrates the use of the `regex:lookingAt()` function to check if the input string matches the provided regular expression pattern from the beginning. In this example, the input string is `'21 products are produced by gdn currently in Sri Lanka'`, and the regular expression pattern is `\\d\\d(.*)(gdn.*)`. The function returns `true` because the input string matches the pattern from the beginning.

## Example 2

```sql
@info(name = 'regexLookingAtExample2')
SELECT regex:lookingAt('gdn(.*)middleware(.*)', 'sample test string and gdn is situated in trace and it''s a middleware company') AS lookingAtResult;
```

The `regexLookingAtExample2` demonstrates the use of the `regex:lookingAt()` function to check if the input string matches the provided regular expression pattern from the beginning. In this example, the input string is `'sample test string and gdn is situated in trace and it's a middleware company'`, and the regular expression pattern is `gdn(.*)middleware(.*)`. The function returns `false` because the input string does not match the pattern from the beginning.

## Example 3

```sql
CREATE STREAM InputStream (eventTime long, inputText string, regexPattern string);
CREATE STREAM OutputStream (eventTime long, lookingAtRegex bool);

@info(name = 'regexLookingAtStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, regex:lookingAt(regexPattern, inputText) AS lookingAtRegex
FROM InputStream;
```

The `regexLookingAtStreamWorker` processes events from the `InputStream` and uses the `regex:lookingAt()` function to check if the `inputText` attribute matches the specified `regexPattern` attribute from the beginning of the string. The query outputs the `eventTime` and a boolean value `lookingAtRegex` for each event to the `OutputStream`. The boolean value is `true` if the input string matches the regular expression pattern from the beginning, and `false` otherwise.
