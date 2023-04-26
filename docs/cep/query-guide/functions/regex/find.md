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
@info(name = 'regexFindExample1')
SELECT regex:find('\\d\\d(.*)gdn', '21 products are produced by gdn currently') AS findResult;
```

The `regexFindExample1` demonstrates the use of the `regex:find()` function to search for a pattern within a given input string. In this example, the regular expression pattern is `\\d\\d(.*)gdn` and the input string is `'21 products are produced by gdn currently'`. The function returns `true` because the pattern matches a subsequence in the input string.

## Example 2

```sql
@info(name = 'regexFindExample2')
SELECT regex:find('\\d\\d(.*)gdn', '21 products are produced by gdn.', 4) AS findResult;
```

The `regexFindExample2` demonstrates the use of the `regex:find()` function to search for a pattern within a given input string, starting from a specified index. In this example, the regular expression pattern is `\\d\\d(.*)gdn`, the input string is `'21 products are produced by gdn.'`, and the starting index is `4`. The function returns `false` because the pattern cannot be found starting from the specified index.

## Example 3

```sql
CREATE STREAM InputStream (eventTime long, inputText string, regexPattern string, startIndex int);
CREATE STREAM OutputStream (eventTime long, findResult bool);

@info(name = 'regexFindStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, regex:find(regexPattern, inputText, startIndex) AS findResult
FROM InputStream;
```

The `regexFindStreamWorker` processes events from the `InputStream` and uses the `regex:find()` function to search for a pattern within the `inputText` attribute, starting from the `startIndex` attribute, based on the provided `regexPattern` attribute. The query outputs the `eventTime` and a boolean value indicating whether the pattern was found as the `findResult` attribute for each event to the `OutputStream`.
