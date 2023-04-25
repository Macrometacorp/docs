---
title: hex (Function)
---

This function returns a hexadecimal string by converting each byte of
each character in the input string to two hexadecimal digits.

## Syntax

```sql
<STRING> str:hex(<STRING> input.string)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| input.string | The input string to derive the hexadecimal value. |       | STRING  | No | Yes |

## Example 1

```sql
@info(name = 'hexExample')
SELECT hex('MySQL') AS hexadecimalValue;
```

The `hexExample` demonstrates the use of the `hex()` function to convert a given input string to its hexadecimal representation. In this example, the input string is 'MySQL'. The function returns '4D7953514C', which is the hexadecimal representation of the input string.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string);

CREATE STREAM OutputStream (eventTime long, hexadecimalValue string);

@info(name = 'hexStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, hex(inputString) AS hexadecimalValue
FROM InputDataStream;
```

The `hexStreamWorker` processes events from the `InputDataStream` and uses the `hex()` function to convert the `inputString` attribute to its hexadecimal representation. The query outputs the `eventTime` and the calculated `hexadecimalValue` for each event to the `OutputStream`.
