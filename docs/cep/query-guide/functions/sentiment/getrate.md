---
title: getRate
---

This provides the sentiment value for a given string as per the AFINN word list.

## Syntax

```sql
<INT> sentiment:getRate(<String> text)
```

## Query Parameters

| Name | Description  | Default Value | Possible Data Types | Optional | Dynamic |
|------|--------------|---------------|---------------------|----------|---------|
| text | The input text for which the sentiment value should be derived. |       | STRING | No | No  |

## Example 1

```sql
sentiment:getRate("George is a good person")
```

The `sentiment:getRate` function calculates the sentiment score for the given input string, "George is a good person," by referring to the AFINN word list. The AFINN word list is a collection of words with assigned sentiment scores ranging from -5 (very negative) to 5 (very positive). In this case, the sentiment score for the input string is 3, which represents a positive sentiment.
