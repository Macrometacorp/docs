---
title: upper (Function)
---

Converts the simple letters in the input string to the equivalent
capital/block letters.

## Syntax

```sql
<STRING> str:upper(<STRING> input.string)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| input.string | The input string that should be converted to the upper case (equivalent capital/block letters). |               | STRING              | No       | Yes     |

## Example 1

```sql
@info(name = 'upperExample')
SELECT upper('Hello World') AS upperText;
```

The `upperExample` demonstrates the use of the `upper()` function, which converts lowercase letters in a given string to uppercase letters. In this example, the input string is `'Hello World'`. After applying the `upper()` function, the resulting output is `'HELLO WORLD'`.

## Example 2

```sql
CREATE STREAM InputStream (eventTime long, originalText string);

CREATE STREAM OutputStream (eventTime long, upperText string);

@info(name = 'upperStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, upper(originalText) AS upperText
FROM InputStream;
```

The `upperStreamWorker` processes events from the `InputStream` and applies the `upper()` function to the `originalText` attribute, converting all lowercase letters to uppercase letters. The query outputs the `eventTime` and the converted `originalText` as `upperText` for each event to the `OutputStream`.
