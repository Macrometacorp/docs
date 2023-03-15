---
sidebar_position: 1
title: Search Views
---

Our _search views_ facilitate swift, advanced full-text queries on unstructured data in documents from multiple linked collections. You can filter by attributes, sort by relevance, and rank using well-known scoring algorithms. Each search view is comprised of an inverted index with search configurations and document attributes, divided into distinct segments treated as separate indexes.

## What is a Search View?


A search view represents documents in specified source collections and applies an implementation-specific transformation. Combining Boolean and generalized ranking retrieval, search views use the Vector Space Model (VSM) to represent documents and queries as vectors based on query _terms_, including single words, keywords, and phrases. [Analyzers](../analyzers.md) can enhance value analysis with tokenization.

Document relevance is determined by comparing the proximity of the document and query vectors. This is measured by the cosine similarity, which calculates the cosine of the angle between the two vectors. The expression for calculating relevance of document `d` to query `q` is:

`cos a = (d * q) / (|d| * |q|)`

Here, `d * q` represents the dot product of the document and query vectors, while `|d|` and `|q|` are the norms of these vectors, respectively.

Vector components are precomputed using _term weights_ as coordinates. C8Search implements probability and statistical weighting models, such as [Okapi BM25](https://en.wikipedia.org/wiki/Okapi_BM25) and [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf), based on two components:

- _Term frequency_ (TF): The count of term `t` occurrences in document `d`.
- _Inverse document frequency_ (IDF): The rarity or commonness of term `t` across all documents.

The [IResearch library](https://github.com/iresearch-toolkit/iresearch) provides searching and ranking capabilities.

## Object Definition

A search view object includes:

- Search view configuration directives.
- Link configuration directives map.

Different directives apply during creation and modification:

- Creating a search view:
  - **name** (string, immutable): Search view name.
  - **type** (string, immutable): Value `"search"`.
  - Directives from [search view properties](optional-properties.md#search-view-properties).

- Modifying a search view:
  - **links** (object, optional): Map of `collection-name` / `collection-identifier` to one of the following:
    - Link creation: [Link properties](optional-properties.md#link-properties) definition.
    - Link removal: JSON keyword `null`.
  - Directives from [search view properties](optional-properties.md#search-view-properties).

## Search View vs. Full-Text Index

This table compares search views and full-text indexes:

| Feature                          | Search | Full-text Index |
|:---------------------------------|:-------|:----------------|
| Term search                      | Yes    | Yes            |
| Prefix search                    | Yes    | Yes            |
| Boolean expressions              | Yes    | Restricted     |
| Range search                     | Yes    | No             |
| Phrase search                    | Yes    | No             |
| Relevance ranking                | Yes    | No             |
| Configurable Analyzers           | Yes    | No             |
| C8QL composable language         | Yes    | No             |
| Indexed attributes per collection| Unlimited| 1             |
| Indexed collections              | Unlimited| 1             |

Search views ensure optimal execution plans (merge join) for multi-attribute queries. For more on full-text indexes, see [Indexing](../../collections/indexing/fulltext-indexes.md).