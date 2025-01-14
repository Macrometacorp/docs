---
sidebar_position: 50
title: Fulltext Search vs. Fulltext Index
---

Macrometa offers both fulltext search views and fulltext indexing. While similar, these features are not identical.

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

Search views ensure optimal execution plans (merge join) for multi-attribute queries. For more on full-text indexes, see [Indexing](../../../../database/collections/indexing/fulltext-indexes.md).
