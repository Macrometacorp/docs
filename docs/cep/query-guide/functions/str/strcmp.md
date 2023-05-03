---
title: strcmp (Function)
---

Compares two strings lexicographically and returns an integer value.

- If both strings are equal, then 0 is returned.
- If the first string is lexicographically greater than the second string, then a positive value is returned.
- If the first string is lexicographically greater than the second string, then a negative value is returned.

## Syntax

```sql
<INT> str:strcmp(<STRING> arg1, <STRING> arg2)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| arg1 | The first input string argument.  |               | STRING | No       | Yes     |
| arg2 | The second input string argument that should be compared with the first argument lexicographically. |               | STRING | No       | Yes     |

## Example 1

```sql
@info(name = 'strcmpExample')
SELECT str:strcmp('AbCDefghiJ KLMN', 'Hello') AS compareResult;
```

The `strcmpExample` demonstrates the use of the `str:strcmp()` function to compare two strings lexicographically. In this example, the two input strings are 'AbCDefghiJ KLMN' and 'Hello'. The function returns an integer value that represents the lexicographic comparison of the two input strings.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, string1 string, string2 string);
CREATE SINK STREAM OutputStream (eventTime long, compareResult int);

@info(name = 'strcmpStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:strcmp(string1, string2) AS compareResult
FROM InputDataStream;
```

The `strcmpStreamWorker` processes events from the `InputDataStream` and uses the `str:strcmp()` function to compare the `string1` attribute with the `string2` attribute lexicographically. The query outputs the `eventTime` and the resulting `compareResult` (an integer value) for each event to the `OutputStream`.
