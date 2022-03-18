---
sidebar_position: 4
---

# Analyzers

*Analyzers* enable you to break search inputs into sets of sub-values that C8Search can use for improved searching and sorting. When you use an Analyzer in a View, C8Search gathers the attributes of all documents in collections linked to the view, and creates appropriate sub-values and metadata. We provide built-in Analyzers and enable you to create custom Analyzers to suit the needs of your application.

You can use the [`TOKENS()` function](../c8ql/functions/search#tokens) to tokenize phrases and turn them into strings for C8QL search queries.

An Analyzer processes values based on its [type](#types), [properties](#properties), and [features](#features). 


## Value Handling

Analyzers are primarily focused on text processing, but you can use Views to index any type of data in the form of a text string which makes it compatible with an Analyzer. We index primitive data values as-is (`null`, `true`, `false`, and numbers). 

Sub-nested elements of arrays are also unpacked and indexed individually, and all objects are indexed as sub-attributes. However, we do not add arrays or objects to the index, so they cannot be searched.

Refer to the following links for more information about value handling:

* [SEARCH operation](../c8ql/operations/search): How to query indexed values such as numbers and nested values.
* [Search Views](../../docs/search/views): How we index compound data types (`arrays`, `objects`).

## Naming Conventions

Analyzers uses name conventions similar to collections. Each name can use the following:

* Letters of the English alphabet (upper or lower case).
* Numbers (`0` through `9`).
* Underscore (`_`) or dash (`-`).

The first character must be a letter. Analyzer names are case sensitive. The maximum name length is 64 bytes. Empty spaces and non-ASCII characters are invalid. 

Custom Analyzers are named differently depending on whether they're global or specific to a database.

### Global Analyzers

You can store custom Analyzers in the `_system` database so they can be referenced in queries against any other database. For example, `_system::globalAnalyzer` where `globalAnalyzer` is the name of the custom Analyzer you want to be globally accessible.

### Database Analyzers

Each database has an `_analyzers` collection for storing custom Analyzers. All Analyzers in a collection are prefixed by the database name and two colons. For example, `myDatabase::myAnalyzer` where `myDatabase` is your database name and `myAnalyzer` is your Analyzer name. [Built-in Analyzers](#built-in-analyzers) are not stored in these collections because they are globally available. 



## Types

The following list of Analyzer types are available:

* `identity`: Do not transform the query.
* `delimiter`: Split query into tokens at configurable level.
* `stem`: Apply stemming to a whole query.
* `norm`: Apply normalization to a whole query.
* `ngram`: Create n-grams from a whole query with configurable lengths.
* `text`: Tokenize query into words with optional stemming, normalization, and stop-word filtering.


This table shows the availability of tokenization, stemming, and normalization for each Analyzer type:


|					| Tokenization | Stemming | Normalization |
|:------------------|:-------------|:---------|:--------------|
| **Identity**		| No			| No		| No		|
| **Delimiter**		| Yes			| No		| No		|
| **Stem**			| No			| Yes		| No		|
| **Norm**			| No			| No		| Yes		|
| **N-gram**		| No			| No		| No		|
| **Text**			| Yes			| Yes		| Yes		|


## Properties

The properties available for an Analyzer depend on its type:

* [Identity](#identity)
* [Delimiter](#delimiter)
* [Stem](#stem)
* [Norm](#norm)
* [N-gram](#n-gram)
* [Text](#text)

All properties with default settings are optional.

### Identity

An identity Analyzer returns the input unmodified and supports no properties.


### Delimiter

Breaks text into tokens per [RFC 4180](https://tools.ietf.org/html/rfc4180) without starting new records on new lines.

`delimiter` (string): List the delimiting characters.


### Stem

Stems location names in supported languages and treat it as a single token.

`locale` (string): A locale in the format `language[_COUNTRY][.encoding][@variant]` where square brackets are optional. For example, `"en_US.utf-8"` for American English. Refer to [Supported Languages](#supported-languages) for more information.




### Norm

Normalizes text and treats as a single token by converting casing and removing accent marks.

* `locale` (string): A locale in the format `language[_COUNTRY][.encoding][@variant]` where square brackets are optional. For example, `"en_US.utf-8"` for American English. Refer to [Supported Languages](#supported-languages) for more information.
* `accent` (Boolean): 
	* Set `true` (default) to preserve accented characters.
	* Set `false` to convert accented characters to their base characters.
* `case` (string):
	* `"none"`: Do not change character casing. This is the default setting.
	* `"upper"`: Convert all upper-case characters to lower-case.
	* `"lower"`: Convert all lower-case characters to upper-case.


### N-gram

Produces [n-grams](https://en.wikipedia.org/wiki/N-gram) from a specified input. Optionally, you can include the full original input. You can use this Analyzer to implement sub-string matching. Only single-byte characters are supported. 

* `min` (number): An unsigned integer for the minimum n-gram length. This value is inclusive.
* `max` (number): An unsigned integer for the maximum n-gram length. This value is inclusive.
* `preserveOriginal` (Boolean): 
	* Set `true` to include the original value.  
	* Set `false` to produce n-grams based on the specified values only.

#### Example

If you set `min`: `4` and `max`: `5`, the Analyzer produces the following n-grams for the string `"foobar"`:

* `"foobar"` if `preserveOriginal` is `true`
* `"fooba"`
* `"foob"`
* `"oobar"`
* `"ooba"`
* `"obar"`


A string `"foo"` does not produce an n-gram because it's shorter than the minimum.


### Text

Breaks strings into individual words. Optionally, you can filter out stop-words, extract word stems, and apply case conversion and accent removal.

* `locale` (string): A locale in the format `language[_COUNTRY][.encoding][@variant]` where square brackets are optional. For example, `"en_US.utf-8"` for American English. Refer to [Supported Languages](#supported-languages) for more information.
* `accent` (Boolean): 
	* Set `true` (default) to preserve accented characters.
	* Set `false` to convert accented characters to their base characters.
* `case` (string):
	* `"none"` (default): Do not change character casing.
	* `"upper"`: Convert all upper-case characters to lower-case.
	* `"lower"`: Convert all lower-case characters to upper-case.
* `stemming` (Boolean): 
	* Set `true` (default) to stem returned words.
	* Set `false` to leave tokenized words as-is.

There are two methods of stop-word filtering: `stopwords` and `stopwordsPath`. Use `stopwords` to choose specific words to omit from results, or use `stopwordsPath` to choose a path with language sub-directories such as `en` that contain files with words to omit. You can combine these options to increase your word sources. 

By default, the value of the environment variable `IRESEARCH_TEXT_STOPWORD_PATH` determines the path containing language sub-directories. If the environment variable is undefined, the current working directory is used instead.

* `stopwords` (array): Specify words to omit from the result. To disable stop-word filtering, set `[]`. By default, this array loads words from `stopwordsPath`. If you add a value to this property, you must specify a path for `stopwordsPath` if you want to use files in sub-directories.
* `stopwordsPath` (string): Specify a path that contains language sub-directories such as `en` containing files with words to omit. Analyzer creation will fail if the specified path is inaccessible, missing language sub-directories, or has no valid files for a required language. If an existing Analyzer encounters one of these issues, the server will fail to start up.



## Features

An Analyzer's *features* determine the available term matching capabilities. These features are not applicable with custom Views.

We support the following features for Search Views:

* `frequency`: How often a term is seen. Required for `PHRASE()`.
* `norm`:  The [normalization constant](https://en.wikipedia.org/wiki/Normalizing_constant) of the term.
* `position`: Position of the term in an increasing sequence. Required for `PHRASE()`. If used, `frequency` is also required.

Feature availability depends on the following:

* The type of Analyzer being used.
* The query filtering and sorting functions required by the result.

For example, a `text` Analyzer uses `frequency`, `norm`, and `position`, and the `PHRASE()` C8QL function requires `frequency` and `position`.

## Built-in Analyzers

We provide a set of built-in Analyzers that cannot be removed. 

The `identity` Analyzer uses the `frequency` and `norm` features. All `text` Analyzers tokenize strings with stemming enabled, no stop-words configured, case conversion set to `lower`, and accent mark removal enabled. The `text` Analyzers use the `frequency`, `norm`, and `position` features.


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
`text_zh`  | `text`     | Chinese

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
`zh`  | Chinese
