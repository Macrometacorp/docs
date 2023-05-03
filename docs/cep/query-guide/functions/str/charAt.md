---
title: charAt (Function)
---

This function returns the `char` value that is present at the given index position. of the input string.

## Syntax

```sql
<STRING> str:charAt(<STRING> input.value, <INT> index)
```

## Query Parameters

| Name    | Description   | Default Value | Possible Data Types | Optional | Dynamic |
|---------|---------------|---------------------|----------|---------|
| input.value | The input string of which the char value at the given position needs to be returned. |               | STRING              | No       | Yes     |
| index  | The variable that specifies the index of the char value that needs to be returned.   |               | INT                 | No       | Yes     |

## Example 1

```sql
CREATE STREAM InputDataStream (eventTime long, symbol string, volume long);

CREATE SINK STREAM OutputStream (eventTime long, firstChar string, volume long);

@info(name = 'charAtQuery')
INSERT INTO OutputStream
SELECT eventTime, charAt(symbol, 0) AS firstChar, volume
FROM InputDataStream;
```

The `charAtQuery` processes events from the `InputDataStream` and extracts the first character of the `symbol` attribute using the `charAt()` function. The query outputs the `eventTime`, the first character of the `symbol`, and the `volume` of the events to the `OutputStream`.
