---
sidebar_position: 2
---

# Overview

Macrometa GDN Search (or *C8Search*) is a full-text search engine that supports key values, documents, and graphs as data models. Compared to a a [full-text index](../collections/documents/indexing/working-with-indexes#fulltext-indexes) C8Search is more configurable and customizable, combining Boolean and generalized ranking retrieval techniques to refine your search results. All Boolean-approved results are ranked by relevance to the respective query using the Vector Space Model in conjunction with BM25 or TF-IDF weighting schemes.

C8Search provides the following capabilities:

* Complex searches with Boolean operators
* Relevance-based matching
* Phrase and prefix matching
* Custom ranking and relevance tuning
* Configurable analyzers and tokenization
* Retrieval of both documents and projections of documents
* Combinable search queries with multiple supported data models & access patterns
* Geo-replicated search indexes for instant results


We provide *Views* and *Analyzers* that boost the efficiency of your search queries:

* A [View](../../docs/Search/Views) is a virtual collection that provides fast full-text searching over multiple linked collections.
* An [Analyzer](../../docs/Search/Analyzers) parses input values and transforms them into sets of sub-values for the following use cases:
	* Tokenization (splitting text into words and normalizing them).
	* Language-specific word stemming.
	* Case conversion.
	* Removal of diacritical (accent) marks.

C8Search features are integrated into C8QL as a SEARCH operation and a set of C8QL functions. Some use cases include:

* Perform federated full-text searches over product descriptions in a web shop with product documents stored in collections.
* Retrieve information in a research database and rank it by relevance based on term frequency (TF-IDF) using case and accent insensitive stemmed phrases with irrelevant terms filtered out.
* Query a data set of movies for titles with words in a particular order and optional wild cards. Sort the results by best matching (BM25) but favor movies with longer duration.
