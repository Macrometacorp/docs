---
title: equalsIgnoreCase (Function)
---

This returns a boolean value by comparing two strings lexicographically without considering the letter case.

## Syntax

```sql
<BOOL> str:equalsIgnoreCase(<STRING> arg1, <STRING> arg2)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| arg1 | The first input string argument.  |      | STRING  | No       | Yes     |
| arg2 | The second input string argument. This is compared with the first argument. |        | STRING      | No       | Yes     |

## Example 1

```sql
@info(name = 'equalsIgnoreCaseExample')
SELECT equalsIgnoreCase('gdn', 'GDN') AS isEqual;
```

The `equalsIgnoreCaseExample` demonstrates the use of the `equalsIgnoreCase()` function to check if two given strings are equal, ignoring the case of the characters. In this example, the input strings are 'gdn' and 'GDN'. The function returns `true` because the input strings are equal, ignoring the case.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, string1 string, string2 string);

CREATE SINK STREAM OutputStream (eventTime long, isEqual bool);

@info(name = 'equalsIgnoreCaseStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, equalsIgnoreCase(string1, string2) AS isEqual
FROM InputDataStream;
```

The `equalsIgnoreCaseStreamWorker` processes events from the `InputDataStream` and uses the `equalsIgnoreCase()` function to check if the `string1` attribute is equal to the `string2` attribute, ignoring the case of the characters. The query outputs the `eventTime` and a boolean value `isEqual` for each event to the `OutputStream`. The boolean value is `true` if the input strings are equal, ignoring the case, and `false` otherwise.
