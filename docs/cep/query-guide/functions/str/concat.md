---
title: concat (Function)
---

This function returns a string value that is obtained as a result of concatenating two or more input string values.

## Syntax

```sql
<STRING> str:concat(<STRING> arg, <STRING> ...)
```

## Query Parameters

| Name | Description                                               | Default Value | Possible Data Types | Optional | Dynamic |
|------|-----------------------------------------------------------|---------------|---------------------|----------|---------|
| arg  | This can have two or more `string` type input parameters. |               | STRING              | No       | Yes     |

## Example 1

```sql
@info(name = 'concatExample')
SELECT concat('D533', '8JU^', 'XYZ') AS concatenatedString;
```

The `concatExample` demonstrates the use of the `concat()` function to concatenate two or more input arguments into a single string. In this example, the input arguments are 'D533', '8JU^', and 'XYZ'. The function returns 'D5338JU^XYZ', which is the concatenated result.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, part1 string, part2 string, part3 string);

CREATE SINK STREAM OutputStream (eventTime long, concatenatedString string);

@info(name = 'concatStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, concat(part1, part2, part3) AS concatenatedString
FROM InputDataStream;
```

The `concatStreamWorker` processes events from the `InputDataStream` and uses the `concat()` function to concatenate the `part1`, `part2`, and `part3` attributes into a single string. The query outputs the `eventTime` and the concatenated `concatenatedString` for each event to the `OutputStream`.
