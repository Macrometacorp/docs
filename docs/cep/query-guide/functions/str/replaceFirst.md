---
title: replaceFirst (Function)
---

Finds the first substring of the input string that matches with the given regular expression, and replaces it with the given replacement string.

## Syntax

```sql
<STRING> str:replaceFirst(<STRING> input.string, <STRING> regex, <STRING> replacement.string)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| input.string  | The input string that should be replaced.  |               | STRING  | No | Yes |
| regex | The regular expression with which the input string should be matched. |               | STRING              | No       | Yes     |
| replacement.string | The string with which the first substring of input string that matches the regular expression should be replaced. |           | STRING  | No  | Yes |

## Example 1

```sql
@info(name = 'replaceFirstExample')
SELECT str:replaceFirst('hello gdn A hello', 'gdn(.*)A', 'XXXX') AS replacedFirstString;
```

The `replaceFirstExample` demonstrates the use of the `str:replaceFirst()` function to replace the first occurrence of a specified substring in the input string with a replacement string. In this example, the input string is 'hello gdn A hello', the substring to replace is specified by the regular expression 'gdn(.*)A', and the replacement string is 'XXXX'. The function returns 'hello XXXX hello', which is the input string with the first occurrence of the specified substring replaced by 'XXXX'.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string, targetSubstring string, replacement string);
CREATE SINK STREAM OutputStream (eventTime long, replacedFirstString string);

@info(name = 'replaceFirstStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:replaceFirst(inputString, targetSubstring, replacement) AS replacedFirstString
FROM InputDataStream;
```

The `replaceFirstStreamWorker` processes events from the `InputDataStream` and uses the `str:replaceFirst()` function to replace the first occurrence of the `targetSubstring` attribute in the `inputString` attribute with the provided `replacement` attribute. The query outputs the `eventTime` and the resulting `replacedFirstString` for each event to the `OutputStream`.
