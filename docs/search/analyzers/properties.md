---
sidebar_position: 40
title: Properties
---

The properties available for an Analyzer depend on its [type](/types.md):

- [Identity](#identity)
- [Delimiter](#delimiter)
- [Stem](#stem)
- [Norm](#norm)
- [N-gram](#n-gram)
- [Text](#text)

All properties with default settings are optional.

## Identity

An identity Analyzer returns the input unmodified and supports no properties.

## Delimiter

Breaks text into tokens per [RFC 4180](https://tools.ietf.org/html/rfc4180) without starting new records on new lines.

`delimiter` (string): List the delimiting characters.

## Stem

Stems location names in supported languages and treat it as a single token.

`locale` (string): A locale in the format `language[_COUNTRY][.encoding][@variant]` where square brackets are optional. For example, `"en_US.utf-8"` for American English. Refer to [Supported Languages](#supported-languages) for more information.

## Norm

Normalizes text and treats as a single token by converting casing and removing accent marks.

- `locale` (string): A locale in the format `language[_COUNTRY][.encoding][@variant]` where square brackets are optional. For example, `"en_US.utf-8"` for American English. Refer to [Supported Languages](#supported-languages) for more information.
- `accent` (Boolean):
  - Set `true` (default) to preserve accented characters.
  - Set `false` to convert accented characters to their base characters.
- `case` (string):
  - `"none"`: Do not change character casing. This is the default setting.
  - `"upper"`: Convert all upper-case characters to lower-case.
  - `"lower"`: Convert all lower-case characters to upper-case.

## N-gram

Produces [n-grams](https://en.wikipedia.org/wiki/N-gram) from a specified input. Optionally, you can include the full original input. You can use this Analyzer to implement sub-string matching. Only single-byte characters are supported.

- `min` (number): An unsigned integer for the minimum n-gram length. This value is inclusive.
- `max` (number): An unsigned integer for the maximum n-gram length. This value is inclusive.
- `preserveOriginal` (Boolean):
  - Set `true` to include the original value.  
  - Set `false` to produce n-grams based on the specified values only.

### Example

If you set `min`: `4` and `max`: `5`, the Analyzer produces the following n-grams for the string `"foobar"`:

- `"foobar"` if `preserveOriginal` is `true`
- `"fooba"`
- `"foob"`
- `"oobar"`
- `"ooba"`
- `"obar"`

A string `"foo"` does not produce an n-gram because it's shorter than the minimum.

## Text

Breaks strings into individual words. Optionally, you can filter out stop-words, extract word stems, and apply case conversion and accent removal.

- `locale` (string): A locale in the format `language[_COUNTRY][.encoding][@variant]` where square brackets are optional. For example, `"en_US.utf-8"` for American English. Refer to [Supported Languages](#supported-languages) for more information.
- `accent` (Boolean):
  - Set `true` (default) to preserve accented characters.
  - Set `false` to convert accented characters to their base characters.
- `case` (string):
  - `"none"` (default): Do not change character casing.
  - `"upper"`: Convert all upper-case characters to lower-case.
  - `"lower"`: Convert all lower-case characters to upper-case.
- `stemming` (Boolean):
  - Set `true` (default) to stem returned words.
  - Set `false` to leave tokenized words as-is.

There are two methods of stop-word filtering: `stopwords` and `stopwordsPath`. Use `stopwords` to choose specific words to omit from results, or use `stopwordsPath` to choose a path with language sub-directories such as `en` that contain files with words to omit. You can combine these options to increase your word sources.

By default, the value of the environment variable `IRESEARCH_TEXT_STOPWORD_PATH` determines the path containing language sub-directories. If the environment variable is undefined, the current working directory is used instead.

- `stopwords` (array): Specify words to omit from the result. To disable stop-word filtering, set `[]`. By default, this array loads words from `stopwordsPath`. If you add a value to this property, you must specify a path for `stopwordsPath` if you want to use files in sub-directories.
- `stopwordsPath` (string): Specify a path that contains language sub-directories such as `en` containing files with words to omit. Analyzer creation will fail if the specified path is inaccessible, missing language sub-directories, or has no valid files for a required language. If an existing Analyzer encounters one of these issues, the server will fail to start up.

