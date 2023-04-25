---
title: regexp (Function)
---

Returns a boolean value based whether an input string matches
and the given regular expression.

## Syntax

```sql
<BOOL> str:regexp(<STRING> input.string, <STRING> regex)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| input.string | The input string to match with the given regular expression. |       | STRING              | No       | Yes     |
| regex | The regular expression to be matched with the input string.  |               | STRING  | No       | Yes     |

## Example 1

```sql
@info(name = 'regexpExample')
SELECT str:regexp('gdn abcdh', 'gdn(.*h)') AS matchesRegexp;
```

The `regexpExample` demonstrates the use of the `str:regexp()` function to check if the given input string matches the provided regular expression pattern. In this example, the input string is 'gdn abcdh', and the regular expression pattern is 'gdn(.*h)'. The function returns `true` because the input string matches the regular expression pattern.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string, pattern string);
CREATE STREAM OutputStream (eventTime long, matchesRegexp bool);

@info(name = 'regexpStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:regexp(inputString, pattern) AS matchesRegexp
FROM InputDataStream;
```

The `regexpStreamWorker` processes events from the `InputDataStream` and uses the `str:regexp()` function to check if the `inputString` attribute matches the provided `pattern` attribute. The query outputs the `eventTime` and a boolean value `matchesRegexp` for each event to the `OutputStream`. The boolean value is `true` if the input string matches the regular expression pattern, and `false` otherwise.
