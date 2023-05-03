---
title: repeat (Function)
---

Repeats the input string for a specified number of times.

## Syntax

```sql
<STRING> str:repeat(<STRING> input.string, <INT> times)
```

## Query Parameters

| Name | Description    | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------|---------------|---------------------|----------|---------|
| input.string | The input string that is repeated the number of times as defined by the user. |               | STRING              | No       | Yes     |
| times  | The number of times the input.string needs to be repeated. |           | INT  | No  | Yes  |

## Example 1

```sql
@info(name = 'repeatExample')
SELECT str:repeat('StRing 1', 3) AS repeatedString;
```

The `repeatExample` demonstrates the use of the `str:repeat()` function to repeat a given input string a specified number of times. In this example, the input string is 'StRing 1', and the specified number of repetitions is `3`. The function returns 'StRing 1StRing 1StRing 1', which is the input string repeated three times.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string, repetitions int);
CREATE SINK STREAM OutputStream (eventTime long, repeatedString string);

@info(name = 'repeatStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:repeat(inputString, repetitions) AS repeatedString
FROM InputDataStream;
```

The `repeatStreamWorker` processes events from the `InputDataStream` and uses the `str:repeat()` function to repeat the `inputString` attribute a specified number of times, as provided by the `repetitions` attribute. The query outputs the `eventTime` and the resulting `repeatedString` for each event to the `OutputStream`.
