---
title: substr (Function)
---

Returns a substring of the input string by considering a subset or all
of the following factors: starting index, length, regular expression,
and regex group number.

## Syntax

```sql
<STRING> str:substr(<STRING> input.string, <INT> begin.index)
<STRING> str:substr(<STRING> input.string, <INT> begin.index, <INT> length)
<STRING> str:substr(<STRING> input.string, <STRING> regex)
<STRING> str:substr(<STRING> input.string, <STRING> regex, <INT> group.number)
```

## Query Parameters

| Name     | Description    | Default Value    | Possible Data Types | Optional | Dynamic |
|----------|----------------|------------------|---------------------|----------|---------|
| input.string | The input string to be processed. |          | STRING | No   | Yes   |
| begin.index | Starting index to consider for the substring.  | -  | INT   | Yes  | Yes |
| length      | The length of the substring.  | input.string.length - begin.index | INT    | Yes      | Yes     |
| regex       | The regular expression that should be matched with the input string. | -  | STRING | Yes      | Yes     |
| group.number | The regex group number.     | 0   | INT   | Yes      | Yes     |

## Example 1

```sql
@info(name = 'substringExample')
SELECT str:substr('Hello World', 0, 5) AS substringResult;
```

The `substringExample` demonstrates the use of the `str:substr()` function to extract a substring from a given input string. In this example, the input string is 'Hello World', and the substring is extracted from index 0 to index 4 (the length of the substring is 5). The function returns 'Hello' as the output.

## Example 2

```sql
@info(name = 'substringExample2')
SELECT str:substr('Hello World', 6, 5) AS substringResult;
```

The `substringExample2` uses the `str:substr()` function to extract a substring from a given input string. In this example, the input string is 'Hello World', and the substring is extracted from index 6 to index 10 (the length of the substring is 5). The function returns 'World' as the output.

## Example 3

```sql
@info(name = 'substringExample3')
SELECT str:substr('Hello World', 0, 11) AS substringResult;
```

The `substringExample3` uses the `str:substr()` function to extract a substring from a given input string. In this example, the input string is 'Hello World', and the substring is extracted from index 0 to index 10 (the length of the substring is 11). The function returns 'Hello World' as the output.

## Example 4

```sql
@info(name = 'substringExample4')
SELECT str:substr('Hello World', 3, 4) AS substringResult;
```

The `substringExample4` uses the `str:substr()` function to extract a substring from a given input string. In this example, the input string is 'Hello World', and the substring is extracted from index 3 to index 6 (the length of the substring is 4). The function returns 'lo W' as the output.

## Example 5

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string, startIndex int, length int);
CREATE SINK STREAM OutputStream (eventTime long, substringResult string);

@info(name = 'substringStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:substr(inputString, startIndex, length) AS substringResult
FROM InputDataStream;
```

The `substringStreamWorker` processes events from the `InputDataStream` and uses the `str:substr()` function to extract a substring from the `inputString` attribute, starting at the specified `startIndex` and having the specified `length`. The query outputs the `eventTime` and the resulting `substringResult` for each event to the `OutputStream`.
