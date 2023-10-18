---
sidebar_position: 1
title: Analyzers
---

_Analyzers_ enable you to break search inputs into sets of sub-values that search views can use for improved searching and sorting. When you use an analyzer, the search view gathers the attributes of all documents in liked collections, and creates appropriate sub-values and metadata.

You can use the [`TOKENS()` function](../queries/search-functions/tokens.md) to tokenize phrases and turn them into strings for C8QL search queries.

## Built-in Analyzers

Macrometa provides a set of built-in analyzers.

The identity analyzer uses the `frequency` and `norm` features. All text analyzers tokenize strings with stemming enabled, no stop-words configured, case conversion set to `lower`, and accent mark removal enabled. The text analyzers use the `frequency`, `norm`, and `position` features.

Name       | Type       | Language
-----------|------------|-----------
`identity` | `identity` | none
`text_de`  | `text`     | German
`text_en`  | `text`     | English
`text_es`  | `text`     | Spanish
`text_fi`  | `text`     | Finnish
`text_fr`  | `text`     | French
`text_it`  | `text`     | Italian
`text_nl`  | `text`     | Dutch
`text_no`  | `text`     | Norwegian
`text_pt`  | `text`     | Portuguese
`text_ru`  | `text`     | Russian
`text_sv`  | `text`     | Swedish

## Supported Languages

Analyzers rely on [ICU](http://site.icu-project.org/) for language dependent tokenization and normalization. GDN ships with a data file, `icudtl.dat`, which contains information for supported languages.

C8DB only supports UTF-8 encoding.

Search views do not support alphabetical ordering in different languages. For example, a range query performed against a search view will not follow language rules defined in the analyzer locale.

[Snowball](https://snowballstem.org/) provides stemming capabilities and supports the following languages:

Code  | Language
------|-----------
`de`  | German
`en`  | English
`es`  | Spanish
`fi`  | Finnish
`fr`  | French
`it`  | Italian
`nl`  | Dutch
`no`  | Norwegian
`pt`  | Portuguese
`ru`  | Russian
`sv`  | Swedish

## Value Handling

Analyzers are primarily focused on text processing, but you can use search views to index any type of data in the form of a text string which makes it compatible with an analyzer. We index primitive data values as-is (`null`, `true`, `false`, and numbers).

Sub-nested elements of arrays are also unpacked and indexed individually, and all objects are indexed as sub-attributes. However, we do not add arrays or objects to the index, so they cannot be searched.

Refer to the following links for more information about value handling:

- [Search Query](../queries/index.md): How to query indexed values such as numbers and nested values.
- [Search Views](index.md): How we index compound data types (`arrays`, `objects`).
