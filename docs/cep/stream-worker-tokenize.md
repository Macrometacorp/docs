---
sidebar_position: 130
title: Real-time Tokenization
---

# Real-time Text Tokenization with Macrometa Stream Workers

Real-time text tokenization is a crucial step in natural language processing, allowing businesses and organizations to analyze and process textual data efficiently. Macrometa's stream workers offer a robust way to tokenize text data in real-time using various tokenization functions. This page will discuss the benefits of using text tokenization and provide example stream worker queries for different industries.

## Understanding Text Tokenization

Text tokenization is the process of breaking down a large piece of text into smaller units, called tokens. These tokens can be words, phrases, or sentences, depending on the specific tokenization method used. Tokenization is a crucial step in natural language processing (NLP) as it helps transform unstructured text data into a more structured and manageable format.

Tokenization is crucial in various NLP tasks, such as sentiment analysis, text classification, and information retrieval. It allows for efficient searching, indexing, and analysis of textual data, enabling machines to process and understand human language more effectively.

Macrometa's stream workers offer several tokenization functions that can be used to tokenize text data in real-time. These functions cater to different tokenization needs and can be integrated into your data processing pipelines. Tokenization functions available in Macrometa's stream workers include:

I apologize for the confusion. Here are the correct definitions for the provided list:

- [json:tokenizeAsObject](../cep/query-guide/functions/json/tokenizeAsObject): Tokenizes a JSON string and returns the result as an object.
- [json:tokenize](../cep/query-guide/functions/json/tokenize): Tokenizes a JSON string and returns the result as a string.
- [list:tokenize](../cep/query-guide/functions/list/tokenize): Tokenizes a list by splitting it into smaller lists of a specified size.
- [map:tokenize](../cep/query-guide/functions/map/tokenize): Tokenizes a map by splitting it into smaller maps of a specified size.
- [str:tokenize](../cep/query-guide/functions/str/tokenize): Tokenizes a text string using a specified delimiter and returns the tokens as a string array.

## Why Use Text Tokenization?

Text tokenization is an essential component of many natural language processing and data analysis tasks. Implementing text tokenization in your data processing pipelines can lead to various benefits, such as:

### Preprocessing Data for Sentiment Analysis

Tokenization helps to preprocess textual data before sentiment analysis, ensuring that the input is in a structured format that can be easily understood and processed by sentiment analysis algorithms.

### Analyzing Customer Feedback and Reviews

Tokenizing customer feedback and reviews allows you to break down large volumes of text into smaller, more manageable units. This facilitates the analysis of individual words or phrases, making it easier to identify patterns and trends in customer sentiment.

### Processing Large Volumes of Textual Data

Tokenization enables the efficient processing of large volumes of textual data by breaking it down into smaller, more manageable units. This can significantly reduce the time and computational resources required for data analysis and processing tasks.

### Facilitating Efficient Searching and Indexing of Text Data

Tokenization plays a crucial role in the searching and indexing of text data. By breaking down text into tokens, tokenization allows for more efficient searching and indexing processes, leading to faster and more accurate search results.

## Example: Tokenizing Player Chat Messages in Gaming

In gaming and esports, player chat messages can contain valuable data for understanding user behavior, sentiment, and engagement. Tokenizing these messages allows for easier data analysis and processing.

In this example, a stream worker processes player chat messages from a gaming platform to tokenize each chat message into individual words.

```sql
CREATE STREAM PlayerChatStream (timestamp long, rawChatMessage string);
CREATE SINK STREAM TokenizedPlayerChatStream (timestamp long, word string);

@info(name = 'tokenizePlayerChat')
INSERT INTO TokenizedPlayerChatStream
SELECT timestamp, token AS word
FROM PlayerChatStream#str:tokenize(rawChatMessage, ' ');
```

The `tokenizePlayerChat` stream worker query processes incoming events from the `PlayerChatStream` source, which contains raw chat messages. It tokenizes each chat message into individual words using the `str:tokenize` function with a space (' ') as the delimiter. The query then selects the `timestamp` and `word` fields for output. The results are inserted into the `TokenizedPlayerChatStream` sink using the `INSERT INTO` action.

## Example: Tokenizing Video Metadata in OTT Streaming

In video streaming, video metadata, including titles and descriptions, are rich sources of data that can be used to understand user preferences, enhance content recommendations, and improve the overall user experience. Tokenizing this metadata allows for easier data analysis and processing.

In this example, a stream worker processes video metadata from an OTT video streaming service to tokenize and extract video titles and descriptions.

```sql
CREATE STREAM VideoMetadataStream (videoId string, metadataJson string);
CREATE STREAM IntermediateTitleStream (videoId string, title string);
CREATE STREAM IntermediateDescriptionStream (videoId string, description string);
CREATE SINK STREAM TokenizedMetadataStream (videoId string, title string, description string);

@info(name = 'tokenizeVideoTitle')
INSERT INTO IntermediateTitleStream
SELECT videoId, jsonElement AS title
FROM VideoMetadataStream#json:tokenize(metadataJson, '$.title');

@info(name = 'tokenizeVideoDescription')
INSERT INTO IntermediateDescriptionStream
SELECT videoId, jsonElement AS description
FROM VideoMetadataStream#json:tokenize(metadataJson, '$.description');

@info(name = 'combineTokenizedMetadata')
INSERT INTO TokenizedMetadataStream
SELECT t.videoId, t.title, d.description
FROM IntermediateTitleStream AS t JOIN IntermediateDescriptionStream AS d ON t.videoId = d.videoId;
```

The `tokenizeVideoTitle` and `tokenizeVideoDescription` stream worker queries process incoming events from the `VideoMetadataStream` source, which contains video metadata in JSON format. They tokenize the metadata by extracting the `title` and `description` fields using the `json:tokenize` function with the appropriate JSON path expressions (`'$.title'` and `'$.description'`). These tokenized data are then inserted into the intermediate streams `IntermediateTitleStream` and `IntermediateDescriptionStream`.

The `combineTokenizedMetadata` query then joins these two intermediate streams on the `videoId` and inserts the `videoId`, `title`, and `description` into the `TokenizedMetadataStream` sink
