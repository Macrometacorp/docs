---
title: unhex (Function)
---

Returns a string by converting the hexadecimal characters in the input string.

## Syntax

```sql
<STRING> str:unhex(<STRING> input.string)
```

## Query Parameters

| Name | Description | Default Value | Possible Data Types | Optional | Dynamic |
|------|-------------|---------------|---------------------|----------|---------|
| input.string | The hexadecimal input string that needs to be converted to string. |               | STRING              | No       | Yes     |

## Example 1

```sql
@info(name = 'unhexExample')
SELECT unhex('4d7953514c') AS unhexedText;
```

The `unhexExample` demonstrates the use of the `unhex()` function, which converts a hexadecimal value into a string. In this example, the input hexadecimal value is `'4d7953514c'`. After applying the `unhex()` function, the resulting output is `'MySQL'`.

## Example 2

```sql
CREATE STREAM InputStream (eventTime long, hexValue string);

CREATE STREAM OutputStream (eventTime long, unhexedText string);

@info(name = 'unhexStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, unhex(hexValue) AS unhexedText
FROM InputStream;
```

The `unhexStreamWorker` processes events from the `InputStream` and applies the `unhex()` function to the `hexValue` attribute, converting the hexadecimal value to a string. The query outputs the `eventTime` and the converted `hexValue` as `unhexedText` for each event to the `OutputStream`.
