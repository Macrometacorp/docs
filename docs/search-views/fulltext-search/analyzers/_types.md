---
sidebar_position: 30
title: Types
---

These analyzer types are available:

- `identity`: Do not transform the query.
- `delimiter`: Split query into tokens at configurable level.
- `stem`: Apply stemming to a whole query.
- `norm`: Apply normalization to a whole query.
- `ngram`: Create n-grams from a whole query with configurable lengths.
- `text`: Tokenize query into words with optional stemming, normalization, and stop-word filtering.

This table shows the availability of tokenization, stemming, and normalization for each analyzer type:

|					| Tokenization | Stemming | Normalization |
|:------------------|:-------------|:---------|:--------------|
| **Identity**		| No			| No		| No		|
| **Delimiter**		| Yes			| No		| No		|
| **Stem**			| No			| Yes		| No		|
| **Norm**			| No			| No		| Yes		|
| **N-gram**		| No			| No		| No		|
| **Text**			| Yes			| Yes		| Yes		|

