---
sidebar_position: 1
title: Analyzers
---

_Analyzers_ enable you to break search inputs into sets of sub-values that C8Search can use for improved searching and sorting. When you use an Analyzer in a View, C8Search gathers the attributes of all documents in collections linked to the view, and creates appropriate sub-values and metadata. We provide built-in Analyzers and enable you to create custom Analyzers to suit the needs of your application.

You can use the [`TOKENS()` function](../../queries/c8ql/functions/search.md#tokens) to tokenize phrases and turn them into strings for C8QL search queries.

An Analyzer processes values based on its [type](types.md), [properties](properties.md), and [features](features.md).

## Built-in Analyzers

We provide a set of built-in Analyzers that cannot be removed.

The identity Analyzer uses the `frequency` and `norm` features. All text Analyzers tokenize strings with stemming enabled, no stop-words configured, case conversion set to `lower`, and accent mark removal enabled. The text Analyzers use the `frequency`, `norm`, and `position` features.

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

:::note
C8Search does not acknowledge the alphabetical order of characters in different languages. For example, a range query performed against a View will not follow language rules defined in the Analyzer locale.
:::

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
