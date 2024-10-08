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
@info(name = 'regexGroupExample1')
SELECT regex:group('\\d\\d(.*)(gdn.*)(gdn.*)', '21 products are produced within 10 years by gdn currently by gdn employees', 3) AS groupResult;
```

The `regexGroupExample1` demonstrates the use of the `regex:group()` function to extract a specific group from the input string, based on the provided regular expression pattern and the group ID. In this example, the regular expression pattern is `\\d\\d(.*)(gdn.*)(gdn.*)`, the input string is `'21 products are produced within 10 years by gdn currently by gdn employees'`, and the group ID is `3`. The function returns `'gdn employees'` because it matches group 3 in the input string.

## Example 2

```sql
@info(name = 'regexGroupExample2')
SELECT regex:group('a(\\d+)([a-zA-Z]+)([a-zA-Z]+)', 'a1234xyzabc', 2) AS groupResult;
```

The `regexGroupExample2` demonstrates the use of the `regex:group()` function to extract a specific group from the input string, based on the provided regular expression pattern and the group ID. In this example, the regular expression pattern is `a(\\d+)([a-zA-Z]+)([a-zA-Z]+)`, the input string is `'a1234xyzabc'`, and the group ID is `2`. The function returns `'xyz'` because it matches group 2 in the input string.

## Example 3

```sql
CREATE STREAM InputStream (eventTime long, inputText string, regexPattern string, groupNumber int);
CREATE SINK STREAM OutputStream (eventTime long, extractedGroup string);

@info(name = 'regexGroupStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, regex:group(regexPattern, inputText, groupNumber) AS extractedGroup
FROM InputStream;
```

The `regexGroupStreamWorker` processes events from the `InputStream` and uses the `regex:group()` function to extract a specific group from the `inputText` attribute, based on the provided `regexPattern` attribute and the `groupNumber` attribute. The query outputs the `eventTime` and the extracted group as the `extractedGroup` attribute for each event to the `OutputStream`.
