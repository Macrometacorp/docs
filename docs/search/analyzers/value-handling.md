---
sidebar_position: 10
title: Value Handling
---

Analyzers are primarily focused on text processing, but you can use Views to index any type of data in the form of a text string which makes it compatible with an Analyzer. We index primitive data values as-is (`null`, `true`, `false`, and numbers).

Sub-nested elements of arrays are also unpacked and indexed individually, and all objects are indexed as sub-attributes. However, we do not add arrays or objects to the index, so they cannot be searched.

Refer to the following links for more information about value handling:

- [SEARCH operation](../../queries/c8ql/operations/search.md): How to query indexed values such as numbers and nested values.
- [Search views](index.md): How we index compound data types (`arrays`, `objects`).