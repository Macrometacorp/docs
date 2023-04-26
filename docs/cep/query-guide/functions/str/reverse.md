---
title: reverse (Function)
---

Returns the input string in the reverse order character-wise and string-wise.

## Syntax

```sql
<STRING> str:reverse(<STRING> input.string)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| input.string | The input string to be reversed. |      | STRING  | No       | Yes     |

## Example 1

```sql
@info(name = 'reverseExample')
SELECT str:reverse('Hello World') AS reversedString;
```

The `reverseExample` demonstrates the use of the `str:reverse()` function to reverse the input string. In this example, the input string is 'Hello World'. The function returns 'dlroW olleH', which is the input string reversed.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string);
CREATE STREAM OutputStream (eventTime long, reversedString string);

@info(name = 'reverseStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:reverse(inputString) AS reversedString
FROM InputDataStream;
```

The `reverseStreamWorker` processes events from the `InputDataStream` and uses the `str:reverse()` function to reverse the `inputString` attribute. The query outputs the `eventTime` and the resulting `reversedString` for each event to the `OutputStream`.
