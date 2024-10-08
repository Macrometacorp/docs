---
sidebar_position: 110
title: Real-time Sentiment Analysis
---

# Sentiment Analysis with Macrometa Stream Workers

The sentiment function is an extension in Macrometa's Stream Workers that allows you to calculate the sentiment score of a given text. It uses the AFINN word list, a collection of words with assigned sentiment scores ranging from -5 (very negative) to 5 (very positive). By using this function, you can analyze the sentiment of a piece of text, such as a tweet or a news headline, in real-time.

For more technical information, refer to the [sentiment:getRate](query-guide/functions/sentiment/getrate) documentation.

## Why Use Sentiment Analysis?

Sentiment analysis can provide valuable insights into how people feel about a particular topic, product, or event. By analyzing the sentiment of text data, you can identify patterns, trends, and potential issues that might require further attention. Sentiment analysis is useful in the following situations:

- Monitor customer feedback and reviews
- Track public opinion on social media
- Analyze market trends and news headlines
- Evaluate customer support interactions
- Identify potential crisis situations

## Stream Worker Examples

These examples showcase how the sentiment function can be applied to various industries to analyze and process data in real-time. By understanding and implementing sentiment analysis in your stream workers, you can gain valuable insights and make better data-driven decisions.

### Example 1: News Headlines Sentiment Analysis

```sql
CREATE STREAM NewsHeadlinesStream (headline string);
CREATE SINK STREAM SentimentAnalysisStream (headline string, sentimentScore int);

@info(name = 'simpleSentimentAnalysis')
INSERT INTO SentimentAnalysisStream
SELECT headline, sentiment:getRate(headline) AS sentimentScore
FROM NewsHeadlinesStream;
```

In this example, a stream worker processes news headlines from the `NewsHeadlinesStream` source, computes their sentiment scores, and outputs the results to the `SentimentAnalysisStream` sink.

The `simpleSentimentAnalysis` stream worker query processes incoming events from the `NewsHeadlinesStream`. It calculates the sentiment score of each headline using the `sentiment:getRate(headline)` function and selects both the `headline` and the computed `sentimentScore` for output. The results are then inserted into the `SentimentAnalysisStream` using the `INSERT INTO` action.

### Example 2: Social Media Posts Sentiment Analysis

```sql
CREATE STREAM SocialMediaPostsStream (timestamp long, username string, post string);

CREATE SINK STREAM SentimentAnalysisStream (timestamp long, username string, post string, sentimentScore int);

@info(name = 'socialMediaSentimentAnalysis')
INSERT INTO SentimentAnalysisStream
SELECT timestamp, username, post, sentiment:getRate(post) AS sentimentScore
FROM SocialMediaPostsStream;
```

In this example, a stream worker processes social media posts from the `SocialMediaPostsStream` source, computes their sentiment scores, and outputs the results to the `SentimentAnalysisStream` sink.

The `socialMediaSentimentAnalysis` stream worker query processes incoming events from the `SocialMediaPostsStream`. It calculates the sentiment score of each post using the `sentiment:getRate(post)` function and selects the `timestamp`, `username`, `post`, and the computed `sentimentScore` for output. The results are then inserted into the `SentimentAnalysisStream` using the `INSERT INTO` action.

### Example 3: Customer Reviews Sentiment Analysis and Aggregation

```sql
CREATE STREAM CustomerReviewsStream (productId string, timestamp long, username string, review string);

CREATE TABLE AverageSentimentTable (_key string , avgSentiment double);

CREATE SINK STREAM SentimentAnalysisStream (productId string, timestamp long, username string, review string, sentimentScore int);

@info(name = 'customerReviewsSentimentAnalysis')
INSERT INTO SentimentAnalysisStream
SELECT productId, timestamp, username, review, sentiment:getRate(review) AS sentimentScore
FROM CustomerReviewsStream;

@info(name = 'averageSentimentPerProduct')
INSERT INTO AverageSentimentTable
SELECT productId as _key, avg(sentimentScore) AS avgSentiment
FROM SentimentAnalysisStream WINDOW TUMBLING_LENGTH(5)
GROUP BY productId;

@info(name = 'averageSentimentPerProductUpdate')
UPDATE AverageSentimentTable
SET AverageSentimentTable._key = _key, AverageSentimentTable.avgSentiment = avgSentiment
ON AverageSentimentTable._key == _key
SELECT productId as _key, avg(sentimentScore) AS avgSentiment
FROM SentimentAnalysisStream WINDOW TUMBLING_LENGTH(5)
GROUP BY productId;
```

In this example, a stream worker processes customer reviews from the `CustomerReviewsStream` source, computes their sentiment scores, and outputs the results to the `SentimentAnalysisStream` sink. Additionally, it calculates the average sentiment per product and updates the `AverageSentimentTable`.

The `customerReviewsSentimentAnalysis` stream worker query processes incoming events from the `CustomerReviewsStream`. It calculates the sentiment score of each review using the `sentiment:getRate(review)` function and selects the `productId`, `timestamp`, `username`, `review`, and the computed `sentimentScore` for output. The results are then inserted into the `SentimentAnalysisStream` using the `INSERT INTO` action.

The `averageSentimentPerProduct` stream worker query calculates the average sentiment score per product from the `SentimentAnalysisStream` within a tumbling window of length 5. It groups the results by `productId` and inserts the `productId` as `_key` and the `avgSentiment` into the `AverageSentimentTable` using the `INSERT INTO` action.

The `averageSentimentPerProductUpdate` stream worker query calculates the average sentiment score per product from the `SentimentAnalysisStream` within a tumbling window of length 5, similar to the previous query. However, instead of inserting new records, it updates the existing records in the `AverageSentimentTable` using the `UPDATE` action, based on the matching `_key` value (the `productId`).
