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
@info(name = 'sentimentScoreExample')
SELECT sentiment:getRate('George is a good person') AS sentimentScore;
```

The `sentimentScoreExample` demonstrates the use of the `sentiment:getRate` function to calculate the sentiment score for a given input string, 'George is a good person.' The function refers to the AFINN word list, a collection of words with assigned sentiment scores ranging from -5 (very negative) to 5 (very positive). In this example, the sentiment score for the input string is 3, indicating a positive sentiment.

## Example 2

```sql
CREATE STREAM InputDataStream (eventTime long, message string);

CREATE STREAM OutputStream (eventTime long, sentimentScore double);

@info(name = 'sentimentAnalysisQuery')
INSERT INTO OutputStream
SELECT eventTime, sentiment:getRate(message) AS sentimentScore
FROM InputDataStream;
```

The `sentimentAnalysisQuery` processes events from the `InputDataStream` and calculates the sentiment score for the `message` attribute using the `sentiment:getRate()` function. This function refers to the AFINN word list, a collection of words with assigned sentiment scores ranging from -5 (very negative) to 5 (very positive). The query outputs the `eventTime` and the calculated `sentimentScore` of the events to the `OutputStream`.
