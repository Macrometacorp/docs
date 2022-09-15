---
sidebar_position: 1
title: Search Views
slug: views
---

We provide _search views_ that enable you to perform fast and sophisticated full-text search queries for unstructured data in documents across multiple linked collections. You can filter by document attributes, sort the results by relevance, and rank results by their similarity using popular scoring algorithms.

Each search view represents an inverted index that contains the search configuration and all document attributes in the linked collections. A search view index consists of multiple segments that are each treated as a standalone index.

## What is a Search View?

A search view represents all documents available in a specified set of source collections. Each search view is an abstraction of some transformation applied to documents in the collections. The type of transformation is specific to the search view implementation and can be as simple as an identity transformation. 

A search view combines Boolean and generalized ranking retrieval and ranks each Boolean-approved document. For ranking text retrieval, we use the Vector Space Model (VSM) which uses documents and queries to represent vectors in a space formed by the _terms_ of the query. A term can include single words, keywords, and phrases. You can use [Analyzers](../analyzers.md) to boost value analysis with tokenization.

The document vectors that are closer to a query vector are more relevant. The closeness is expressed as the cosine of the angle between two vectors ([cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity)). We evaluate the following expression to define how relevant document `d` is to query `q`:

`cos a = (d * q) / (|d| * |q|)`

- `d * q` is the dot product of the query vector `q` and document vector `d`
- `|d|` is the norm of vector `d`
- `|q|` is the norm of vector `q`

The vector components must be computed up front. Since space is formed by terms, you can use _term weights_ as coordinates. The following probability and statistical weighting models are implemented in C8Search:

- [Okapi BM25](https://en.wikipedia.org/wiki/Okapi_BM25)
- [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)

Both models rely on two components:

- _Term frequency_ (TF): The number of times term `t` appears in document `d`.
- _Inverse document frequency_ (IDF): How common or rare the term is across all documents.

Searching and ranking capabilities are provided by the [IResearch library](https://github.com/iresearch-toolkit/iresearch)

## Object Definition

A search view is defined by an object that contains the following:

- A set of search view configuration directives.
- A map of link configuration directives.

Different directives apply during creation and modification of search views. 

- Creating a search view applies these directives:
	- **name** (string, immutable): The name of the search view.
	- **type** (string, immutable): The value `"search"`.
	- Any directives from [search view properties](/optional-properties.md#search-view-properties).

- Modifying a search view applies these directives:
	- **links** (object, optional): A mapping of `collection-name` / `collection-identifier` to one of the following:
		- Link creation: Link definition according to [Link properties](/optional-properties.md#link-properties).
		- Link removal: JSON keyword `null` (e.g. nullify a link if present).
	- Any directives from [search view properties](/optional-properties.md#search-view-properties).

## Search View vs. Full-Text Index

The following table shows a comparison between search views and a full-text index:

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

For more information about full-text indexes, refer to [Indexing](../../collections/indexing/index.md#fulltext-index).