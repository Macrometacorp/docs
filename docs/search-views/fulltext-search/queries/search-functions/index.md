---
sidebar_position: 1
title: Fulltext Search Functions
---

Fulltext search views use functions for processing and filtering data. These functions typically require either an expression or attribute path expression as an argument. Expressions, such as search functions and logical operators, enable you to create search conditions in C8QL syntax.

To set an analyzer for search expressions, use the ANALYZER() function. If no analyzer is set, then the search view uses the default `identity` analyzer.

If you need an attribute path expression, you can reference a document object (`FOR doc IN viewName`) and specify the desired attribute (`doc.attr` or `doc.nested.attr`). You can also use bracket notation (`doc["attr"]`).

Use search functions in a [search query](../../queries/index.md) to filter a view. The functions control the search functionality without having a returnable value in C8QL.
