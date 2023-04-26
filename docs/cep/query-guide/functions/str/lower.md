---
title: lower (Function)
---

Converts the capital letters in the input string to the equivalent simple letters.

## Syntax

```sql
<STRING> str:lower(<STRING> input.string)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| input.string | The input string to convert to the lower case (i.e., equivalent simple letters). |       | STRING              | No       | Yes     |

## Example 1

```sql
@info(name = 'lowerExample')
SELECT str:lower('GDN cep') AS lowerCaseString;
```

The `lowerExample` demonstrates the use of the `str:lower()` function to convert all uppercase letters in the given input string to their lowercase equivalents. In this example, the input string is 'GDN cep'. The function returns 'gdn cep'.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string);
CREATE STREAM OutputStream (eventTime long, lowerCaseString string);

@info(name = 'lowerStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:lower(inputString) AS lowerCaseString
FROM InputDataStream;
```

The `lowerStreamWorker` processes events from the `InputDataStream` and uses the `str:lower()` function to convert all uppercase letters in the `inputString` attribute to their lowercase equivalents. The query outputs the `eventTime` and the converted `lowerCaseString` for each event to the `OutputStream`.
