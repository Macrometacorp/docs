---
title: length (Function)
---

Returns the length of the input string.

## Syntax

```sql
<INT> str:length(<STRING> input.string)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| input.string | The input string to derive the length. |               | STRING   | No | Yes     |

## Example 1

```sql
@info(name = 'lengthExample')
SELECT str:length('Hello World') AS stringLength;
```

The `lengthExample` demonstrates the use of the `str:length()` function to calculate the length of the given input string. In this example, the input string is 'Hello World'. The function returns `11`, which is the length of the input string.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string);
CREATE SINK STREAM OutputStream (eventTime long, stringLength int);

@info(name = 'lengthStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:length(inputString) AS stringLength
FROM InputDataStream;
```

The `lengthStreamWorker` processes events from the `InputDataStream` and uses the `str:length()` function to calculate the length of the `inputString` attribute. The query outputs the `eventTime` and the calculated `stringLength` for each event to the `OutputStream`.
