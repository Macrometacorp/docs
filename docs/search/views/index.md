---
sidebar_position: 1
title: Search Views
---

# Macrometa Global Data Network: Search Feature

The Macrometa Global Data Network offers a powerful Search feature through the use of _search views_. This allows users to perform fast and sophisticated full-text search queries on unstructured data in documents across multiple linked collections. Search views enable filtering by document attributes, sorting results by relevance, and ranking results by similarity using popular scoring algorithms.

Each search view represents an inverted index containing the search configuration and all document attributes in the linked collections. A search view index consists of multiple segments, each treated as a standalone index.

## What is a Search View?

A search view represents all documents available in a specified set of source collections. It is an abstraction of some transformation applied to documents in the collections, with the transformation type specific to the search view implementation. 

Search views combine Boolean and generalized ranking retrieval, ranking each Boolean-approved document. They use the Vector Space Model (VSM) for text retrieval, which represents documents and queries as vectors in a space formed by the query's _terms_. Terms include single words, keywords, and phrases. [Analyzers](../analyzers.md) can be used to boost value analysis with tokenization.

Relevance is determined by the cosine similarity between the document and query vectors. Probability and statistical weighting models implemented in C8Search include [Okapi BM25](https://en.wikipedia.org/wiki/Okapi_BM25) and [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf). Both models rely on term frequency (TF) and inverse document frequency (IDF) components. The searching and ranking capabilities are provided by the [IResearch library](https://github.com/iresearch-toolkit/iresearch).

## Object Definition

Search views are defined by an object containing a set of search view configuration directives and a map of link configuration directives. Different directives apply during the creation and modification of search views:

- Creating a search view applies directives like **name**, **type**, and any from [search view properties](optional-properties.md#search-view-properties).
- Modifying a search view applies directives like **links** and any from [search view properties](optional-properties.md#search-view-properties).

## Search View vs. Full-Text Index

Search views offer several advantages over full-text indexes, such as support for range searches, phrase searches, relevance ranking, configurable analyzers, and C8QL composable language constructs. They also allow for unlimited indexed attributes and collections. 

Here is a comparison between search views and a full-text index:

Feature                             | Search       | Full-text Index
:-----------------------------------|:-------------|:---------------
Term search                         | Yes          | Yes
Prefix search                       | Yes          | Yes
Boolean expressions                 | Yes          | Restricted
Range search                        | Yes          | No
Phrase search                       | Yes          | No
Relevance ranking                   | Yes          | No
Configurable Analyzers              | Yes          | No
C8QL composable language construct  | Yes          | No
Indexed attributes per collection   | Unlimited    | 1
Indexed collections                 | Unlimited    | 1

Search views guarantee the best execution plan (merge join) when querying multiple attributes.

For more details about full-text indexes, refer to [Indexing](../../collections/indexing/fulltext-indexes.md).
