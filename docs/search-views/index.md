---
sidebar_position: 1
title: Search Views
---

# Macrometa Search Views

Search views in Macrometa are structured ways to query your global data network. They improve the speed and accuracy of data retrieval. Macrometa offers two types of search views: fulltext search and semantic search.

## Fulltext Search

Fulltext search is a method that searches for exact matches of terms or phrases in your query. It uses an index, which lists each word in the document and its location. Fulltext search is effective when the requirement is to find documents containing specific words or phrases.

## Semantic Search - Beta

Semantic search is a different approach that understands the intent behind a search query and the meanings of words. Macrometa semantic search currently provides similarity search, with more functionality planned in future releases.

## Fulltext vs. Semantic Search Views

Choosing between fulltext and semantic search views depends on your specific needs. Fulltext search is efficient for exact keyword searches. Semantic search is useful when understanding context, synonyms, and user intent matters.

| Criteria | Fulltext Search View | Semantic Search View |
|--------------|--------------------------|--------------------------|
| Type of search | Keyword-based | Contextual, based on intent |
| Accuracy | High for exact keyword matches | High for contextual relevance |
| Understanding synonyms | Does not match synonyms | Matches synonyms |
| Natural language understanding | Limited | High |
| Memory usage | Lower, stores keywords | Higher, stores vector representations of words |
| Speed | Fast for exact matches | Can be slower due to complexity, but optimized with HNSW, IVF, and FLAT |
