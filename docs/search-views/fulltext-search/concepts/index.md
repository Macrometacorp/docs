---
sidebar_position: 1
title: Fulltext Search Concepts
---

Macrometa GDN _search views_ provide fast and robust full-text queries on data across linked collections. You can filter by attributes, sort by relevance, and rank using well-known scoring algorithms. Each search view is comprised of an inverted index with search configurations and document attributes, divided into distinct segments treated as separate indexes.

## How Fulltext Search Works

Search uses Boolean and ranking retrieval to search for relevant documents by single words, keywords, and phrases. [Analyzers](../analyzers/index.md) can enhance value analysis with tokenization.

Search views use the Vector Space Model (VSM) to represent documents and queries as vectors based on query _terms_. Document relevance is determined by comparing the proximity of the document and query vectors. This is measured by the cosine similarity, which calculates the cosine of the angle between the two vectors. The expression for calculating relevance of document `d` to query `q` is:

`cos a = (d * q) / (|d| * |q|)`

Here, `d * q` represents the dot product of the document and query vectors, while `|d|` and `|q|` are the norms of these vectors, respectively.

Vector components are precomputed using _term weights_ as coordinates. Search views implement probability and statistical weighting models, such as [Okapi BM25](https://en.wikipedia.org/wiki/Okapi_BM25) and [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf), based on two components:

- _Term frequency_ (TF): The count of term `t` occurrences in document `d`.
- _Inverse document frequency_ (IDF): The rarity or commonness of term `t` across all documents.

## Search View Definition

A search view includes:

- Search view configuration directives.
- Link configuration directives map.

Different directives apply during creation and modification:

- Creating a search view:
  - **name** (string, immutable): Search view name.
  - **type** (string, immutable): Value `"search"`.
  - Directives from other optional properties.

- Modifying a search view:
  - **links** (object, optional): Map of `collection-name` / `collection-identifier` to one of the following:
    - Link creation: Link properties definition.
    - Link removal: JSON keyword `null`.
  - Directives from other optional properties.
