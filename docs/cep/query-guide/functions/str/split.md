---
title: split (Function)
---

Splits the `input.string` into substrings using the value parsed in the
`split.string` and returns the substring at the position specified in
the `group.number`.

## Syntax

```sql
<STRING> str:split(<STRING> input.string, <STRING> split.string, <INT> group.number)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| input.string | The input string to be replaced.  |               | STRING  | No   | Yes  |
| split.string | The string value to be used to split the `input.string`. |               | STRING              | No       | Yes     |
| group.number | The index of the split group.    |               | INT | No  | Yes     |

## Example 1

```sql
@info(name = 'splitExample')
SELECT str:split('gdn,ABM,NSFT', ',', 0) AS splitAtIndex;
```

The `splitExample` demonstrates the use of the `str:split()` function to split the input string by a specified delimiter and return the string at the given index. In this example, the input string is 'gdn,ABM,NSFT', the delimiter is ',', and the index is 0. The function returns 'gdn', which is the string at index 0 after splitting the input string by the specified delimiter.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, inputString string, delimiter string, indexToReturn int);
CREATE STREAM OutputStream (eventTime long, splitAtIndex string);

@info(name = 'splitStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:split(inputString, delimiter, indexToReturn) AS splitAtIndex
FROM InputDataStream;
```

The `splitStreamWorker` processes events from the `InputDataStream` and uses the `str:split()` function to split the `inputString` attribute by the specified `delimiter` attribute and return the string at the given `indexToReturn` attribute. The query outputs the `eventTime` and the resulting `splitAtIndex` for each event to the `OutputStream`.
