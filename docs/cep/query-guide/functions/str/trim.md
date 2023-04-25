---
title: trim (Function)
---

Returns a copy of the input string without the leading and trailing whitespace (if any).

## Syntax

```sql
<STRING> str:trim(<STRING> input.string)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| input.string | The input string that needs to be trimmed. |               | STRING   | No       | Yes  |

## Example 1

```sql
@info(name = 'trimExample')
SELECT trim('  AbCDefghiJ KLMN  ') AS trimmedText;
```

The `trimExample` demonstrates the use of the `trim()` function, which removes leading and trailing white spaces from the input string. In this example, the input string is `'  AbCDefghiJ KLMN  '`. After applying the `trim()` function, the resulting output is `'AbCDefghiJ KLMN'`.

## Example 2

```sql
CREATE STREAM InputStream (eventTime long, text string);

CREATE STREAM OutputStream (eventTime long, trimmedText string);

@info(name = 'trimStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, trim(text) AS trimmedText
FROM InputStream;
```

The `trimStreamWorker` processes events from the `InputStream` and applies the `trim()` function to the `text` attribute, removing leading and trailing white spaces. The query outputs the `eventTime` and the trimmed `text` as `trimmedText` for each event to the `OutputStream`.
