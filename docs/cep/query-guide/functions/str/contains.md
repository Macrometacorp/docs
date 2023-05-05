---
title: contains (Function)
---

This function returns `true` if the`input.string` contains the specified sequence of char values in the `search.string`.

## Syntax

```sql
<BOOL> str:contains(<STRING> input.string, <STRING> search.string)
```

## Query Parameters

| Name  | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|-------|--------------|---------------|---------------------|----------|---------|
| input.string  | Input string value.  |               | STRING   | No       | Yes  |
| search.string | The string value to be searched for in the `input.string`. |               | STRING  | No       | Yes     |

## Example 1

```sql
@info(name = 'containsExample')
SELECT str:contains('21 products are produced by gdn currently', 'gdn') AS containsGdn;
```

The `containsExample` demonstrates the use of the `str:contains()` function to check if a given string contains a specified substring. In this example, the input string is '21 products are produced by gdn currently', and the substring to check for is 'gdn'. The function returns `true` because the input string contains the specified substring.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, text string, substring string);

CREATE SINK STREAM OutputStream (eventTime long, containsSubstring bool);

@info(name = 'containsStreamWorker')
INSERT INTO OutputStream
SELECT eventTime, str:contains(text, substring) AS containsSubstring
FROM InputDataStream;
```

The `containsStreamWorker` processes events from the `InputDataStream` and uses the `str:contains()` function to check if the `text` attribute contains the specified `substring` attribute. The query outputs the `eventTime` and a boolean value `containsSubstring` for each event to the `OutputStream`. The boolean value is `true` if the input string contains the specified substring, and `false` otherwise.
