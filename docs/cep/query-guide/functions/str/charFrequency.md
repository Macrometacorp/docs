---
title: charFrequency (Function)
---

Gives the frequency of a char in `input string`.

## Syntax

    <LONG> str:charFrequency(<STRING> input.string, <STRING> char)

## Query Parameters

| Name         | Description                                        | Default Value | Possible Data Types | Optional | Dynamic |
|--------------|----------------------------------------------------|---------------|---------------------|----------|---------|
| input.string | The input string to be processed.                  |               | STRING              | No       | Yes     |
| char         | The char's number of occurrences to be calculated |               | STRING              | No       | Yes     |

## Example 1

```sql
@info(name = 'charFrequencyExample')
SELECT str:charFrequency('gdn,ABM,NSFT', ',') AS commaCount;
```

The `charFrequencyExample` demonstrates the use of the `str:charFrequency` function to count the number of occurrences of a specific character (in this case, ',') in a given input string ('gdn,ABM,NSFT'). In this example, the output is `2`, as there are two commas in the input string.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, symbolsList string);

CREATE SINK STREAM OutputStream (eventTime long, commaCount int);

@info(name = 'charFrequencyStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:charFrequency(symbolsList, ',') AS commaCount
FROM InputDataStream;
```

The `charFrequencyStreamWorker` processes events from the `InputDataStream` and uses the `str:charFrequency` function to count the number of occurrences of a specific character (in this case, ',') in the `symbolsList` attribute. The query outputs the `eventTime` and the calculated `commaCount` for each event to the `OutputStream`.
