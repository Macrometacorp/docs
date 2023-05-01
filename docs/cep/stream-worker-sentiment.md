---
sidebar_position: 110
title: Real-time Sentiment Analysis
---

# Sentiment Analysis with Macrometa Stream Workers

The sentiment function is an extension in Macrometa's Stream Workers that allows you to calculate the sentiment score of a given text. It uses the AFINN word list, a collection of words with assigned sentiment scores ranging from -5 (very negative) to 5 (very positive). By using this function, you can analyze the sentiment of a piece of text, such as a tweet or a news headline, in real-time.

For more technical information, refer to the [sentiment:getRate](query-guide/functions/sentiment/getrate.md) documentation.

## Why Use Sentiment Analysis?

Sentiment analysis can provide valuable insights into how people feel about a particular topic, product, or event. By analyzing the sentiment of text data, you can identify patterns, trends, and potential issues that might require further attention. Sentiment analysis is useful in the following situations:

- Monitor customer feedback and reviews
- Track public opinion on social media
- Analyze market trends and news headlines
- Evaluate customer support interactions
- Identify potential crisis situations

## Stream Worker Examples

These examples showcase how the sentiment function can be applied to various industries to analyze and process data in real-time. By understanding and implementing sentiment analysis in your stream workers, you can gain valuable insights and make better data-driven decisions.

### Example 1

```sql
CREATE STREAM NewsHeadlinesStream (headline string);

CREATE STREAM SentimentAnalysisStream (headline string, sentimentScore int);

@info(name = 'simpleSentimentAnalysis')
INSERT INTO SentimentAnalysisStream
SELECT headline, sentiment:getRate(headline) AS sentimentScore
FROM NewsHeadlinesStream;
```

The `simpleSentimentAnalysis` processes news headlines from the `NewsHeadlinesStream` and calculates the sentiment score for each headline using the `sentiment:getRate()` function. The query outputs the headline and its calculated sentiment score to the `SentimentAnalysisStream`.

### Example 2

```sql
CREATE STREAM SocialMediaPostsStream (timestamp long, username string, post string);

CREATE STREAM SentimentAnalysisStream (timestamp long, username string, post string, sentimentScore int);

@info(name = 'socialMediaSentimentAnalysis')
INSERT INTO SentimentAnalysisStream
SELECT timestamp, username, post, sentiment:getRate(post) AS sentimentScore
FROM SocialMediaPostsStream;
```

The `socialMediaSentimentAnalysis` processes social media posts from the `SocialMediaPostsStream`, including timestamp and username. It calculates the sentiment score for each post using the `sentiment:getRate()` function. The query outputs the timestamp, username, post, and the calculated sentiment score to the `SentimentAnalysisStream`.

### Example 3

```sql
CREATE STREAM CustomerReviewsStream (productId string, timestamp long, username string, review string);

CREATE TABLE AverageSentimentTable (productId string PRIMARY KEY, avgSentiment double);

CREATE STREAM SentimentAnalysisStream (productId string, timestamp long, username string, review string, sentimentScore int);

@info(name = 'customerReviewsSentimentAnalysis')
INSERT INTO SentimentAnalysisStream
SELECT productId, timestamp, username, review, sentiment:getRate(review) AS sentimentScore
FROM CustomerReviewsStream;

@info(name = 'averageSentimentPerProduct')
INSERT INTO AverageSentimentTable
SELECT productId, avg(sentimentScore) AS avgSentiment
FROM SentimentAnalysisStream WINDOW TUMBLING_LENGTH(5)
GROUP BY productId;
```

The `customerReviewsSentimentAnalysis` processes customer reviews from the `CustomerReviewsStream`, including productId, timestamp, and username. It calculates the sentiment score for each review using the `sentiment:getRate()` function. The query outputs the productId, timestamp, username, review, and the calculated sentiment score to the `SentimentAnalysisStream`.

The `averageSentimentPerProduct` query calculates the average sentiment score for each product based on the last five reviews. It groups the sentiment scores by productId and inserts the average sentiment score into the `AverageSentimentTable`.
