---
title: replaceAll (Function)
---

Finds all the substrings of the input string that matches with the given
expression, and replaces them with the given replacement string.

## Syntax

```sql
<STRING> str:replaceAll(<STRING> input.string, <STRING> regex, <STRING> replacement.string)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| input.string  | The input string to be replaced.  |               | STRING  | No       | Yes     |
| regex    | The regular expression to be matched with the input string.  |               | STRING   | No       | Yes     |
| replacement.string | The string with which each substring that matches the given expression should be replaced. |               | STRING    | No       | Yes     |

## Example 1

```sql
@info(name = 'replaceAllExample')
SELECT str:replaceAll('hello hi hello', 'hello', 'test') AS replacedString;
```

The `replaceAllExample` demonstrates the use of the `str:replaceAll()` function to replace all occurrences of a specified substring in the input string with a replacement string. In this example, the input string is 'hello hi hello', the substring to replace is 'hello', and the replacement string is 'test'. The function returns 'test hi test', which is the input string with all occurrences of 'hello' replaced by 'test'.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string, targetSubstring string, replacement string);
CREATE STREAM OutputStream (eventTime long, replacedString string);

@info(name = 'replaceAllStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:replaceAll(inputString, targetSubstring, replacement) AS replacedString
FROM InputDataStream;
```

The `replaceAllStreamWorker` processes events from the `InputDataStream` and uses the `str:replaceAll()` function to replace all occurrences of the `targetSubstring` attribute in the `inputString` attribute with the provided `replacement` attribute. The query outputs the `eventTime` and the resulting `replacedString` for each event to the `OutputStream`.
