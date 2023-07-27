---
sidebar_position: 1
title: Search Views
---

# Macrometa Search Views

Search views in Macrometa are structured ways to query your global data network. They improve the speed and accuracy of data retrieval. Macrometa offers two types of search views: fulltext search and semantic search.

## Fulltext Search Views

Fulltext search is a method that searches for exact matches of terms or phrases in your query. It uses an index, which lists each word in the document and its location. Fulltext search is effective when the requirement is to find documents containing specific words or phrases.

For example, in a customer support system, you can use fulltext search views to index a collection of common issues and their resolutions. This allows the support staff to quickly find resolutions by searching for exact terms or phrases that appear in the customer's problem description.

## Semantic Search Views - Beta

Semantic search is a different approach that understands the intent behind a search query and the meanings of words. Macrometa semantic search currently provides similarity search, with more functionality planned in future releases.

An example is a large e-commerce website where you can use semantic search views to index product collections and enable customers to find products based on descriptions, reviews, and other attributes, not just the product name.

## Working with Multiple Collections

One of the strengths of Macrometa search views is the ability to work with multiple collections, either document or edge collections. This provides the flexibility to structure your data in ways that best suit your application needs.

In the context of fulltext search views, consider a news website with a large archive of articles. Each article is a document in a collection, and by creating a fulltext search view linked to this collection, users can find articles containing specific words or phrases.

On the other hand, semantic search views offer the ability to work with complex datasets spanning multiple collections. Consider a social networking application, where users and posts are document collections, and the relationships are edge collections. By linking these collections to a semantic search view, you can perform advanced searches on user profiles or post content, and then use the edge collections to traverse the graph for related data.
