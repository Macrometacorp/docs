---
title: String Functions
---

For string processing, C8QL offers the following functions:

## CHAR_LENGTH()

`CHAR_LENGTH(value) → length`

Return the number of characters in _value_ (not byte length).

| Input  | Length |
|--------|--------|
| String | Number of Unicode characters |
| Number | Number of Unicode characters that represent the number |
| Array  | Number of Unicode characters from the resulting stringification |
| Object | Number of Unicode characters from the resulting stringification |
| true   | 4 |
| false  | 5 |
| null   | 0 |

## CONCAT()

`CONCAT(value1, value2, ... valueN) → str`

Concatenate the values passed as _value1_ to _valueN_.

- **values** (any, _repeatable_): elements of arbitrary type (at least 1)
- returns **str** (string): a concatenation of the elements. _null_ values are ignored.

```js
CONCAT("foo", "bar", "baz") // "foobarbaz"
CONCAT(1, 2, 3) // "123"
CONCAT("foo", [5, 6], {bar: "baz"}) // "foo[5,6]{\"bar\":\"baz\"}"
```

`CONCAT(anyArray) → str`

If a single array is passed to _CONCAT()_, its members are concatenated.

- **anyArray** (array): array with elements of arbitrary type
- returns **str** (string): a concatenation of the array elements. _null_ values are ignored.

```js
CONCAT( [ "foo", "bar", "baz" ] ) // "foobarbaz"
CONCAT( [1, 2, 3] ) // "123"
```

## CONCAT_SEPARATOR()

`CONCAT_SEPARATOR(separator, value1, value2, ... valueN) → joinedString`

Concatenate the strings passed as arguments _value1_ to _valueN_ using the _separator_ string.

- **separator** (string): an arbitrary separator string
- **values** (string\|array, _repeatable_): strings or arrays of strings as multiple arguments (at least 1)
- returns **joinedString** (string): a concatenated string of the elements, using _separator_ as separator string. _null_ values are ignored. Array value arguments are expanded automatically, and their individual members will be concatenated. Nested arrays will be expanded too, but with their elements separated by commas if they have more than a single element.

```js
CONCAT_SEPARATOR(", ", "foo", "bar", "baz")
// "foo, bar, baz"

CONCAT_SEPARATOR(", ", [ "foo", "bar", "baz" ])
// "foo, bar, baz"

CONCAT_SEPARATOR(", ", [ "foo", [ "b", "a", "r" ], "baz" ])
// [ "foo, b,a,r, baz" ]

CONCAT_SEPARATOR("-", [1, 2, 3, null], [4, null, 5])
// "1-2-3-4-5"
```

## CONTAINS()

`CONTAINS(text, search, returnIndex) → match`

Check whether the string _search_ is contained in the string _text_. The string matching performed by _CONTAINS_ is case-sensitive.

- **text** (string): the haystack
- **search** (string): the needle
- **returnIndex** (bool, _optional_): if set to _true_, the character position of the match is returned instead of a boolean. The default is _false_.
- returns **match** (bool\|number): by default, _true_ is returned if _search_ is contained in _text_, and _false_ otherwise. With _returnIndex_ set to _true_, the position of the first occurrence of _search_ within _text_ is returned (starting at offset 0), or _-1_ if _search_ is not contained in _text_.

```js
CONTAINS("foobarbaz", "bar") // true
CONTAINS("foobarbaz", "horse") // false
CONTAINS("foobarbaz", "ba", true) // 3
CONTAINS("foobarbaz", "horse", true) // -1
```

To determine if or at which position a value is included in an array, see the [POSITION() array function](array.md#position).

## COUNT()

This is an alias for [LENGTH()](#length).

## CRC32()

`CRC32(text) → hash`

Calculate the CRC32 checksum for _text_ and return it in a hexadecimal string representation. The polynomial used is 0x1EDC6F41. The initial value used is 0xFFFFFFFF, and the final xor value is also 0xFFFFFFFF.

- **text** (string): a string
- returns **hash** (string): CRC32 checksum as hex string

```js
CRC32("foobar") // "D5F5C7F"
```

## ENCODE_URI_COMPONENT()

`ENCODE_URI_COMPONENT(value) → encodedURIComponentString`

Return the encoded uri component of _value_.

- **value** (string): a string
- returns **encodedURIComponentString** (string): an encoded uri component of _value_

## FIND_FIRST()

`FIND_FIRST(text, search, start, end) → position`

Return the position of the first occurrence of the string _search_ inside the string _text_. Positions start at 0.

- **text** (string): the haystack
- **search** (string): the needle
- *_start_* (number, _optional_): limit the search to a subset of the text, beginning at *start*
- *_end_* (number, _optional_): limit the search to a subset of the text, ending at *end*
- returns **position** (number): the character position of the match. If _search_ is not contained in _text_, -1 is returned. If **search** is empty, **start** is returned.

```js
FIND_FIRST("foobarbaz", "ba") // 3
FIND_FIRST("foobarbaz", "ba", 4) // 6
FIND_FIRST("foobarbaz", "ba", 0, 3) // -1
```

## FIND_LAST()

`FIND_LAST(text, search, start, end) → position`

Return the position of the last occurrence of the string _search_ inside the string _text_. Positions start at 0.

- **text** (string): the haystack
- **search** (string): the needle
- *_start_* (number, _optional_): limit the search to a subset of the text, beginning at *start*
- *_end_* (number, _optional_): limit the search to a subset of the text, ending at *end*
- returns **position** (number): the character position of the match. If _search_ is not contained in _text_, -1 is returned. If _search_ is empty, the string length is returned, or _end_ + 1.

```js
FIND_LAST("foobarbaz", "ba") // 6
FIND_LAST("foobarbaz", "ba", 7) // -1
FIND_LAST("foobarbaz", "ba", 0, 4) // 3
```

## FNV64()

`FNV64(text) → hash`

Calculate the FNV-1A 64 bit hash for _text_ and return it in a hexadecimal string representation.

- **text** (string): a string
- returns **hash** (string): FNV-1A hash as hex string

```js
FNV64("foobar") // "85944171F73967E8"
```

## JSON_PARSE()

`JSON_PARSE(text) → value`

Return an C8QL value described by the JSON-encoded input string.

- **text** (string): the string to parse as JSON
- returns **value** (mixed): the value corresponding to the given JSON text. For input values that are no valid JSON strings, the function will return _null_.

```js
JSON_PARSE("123") // 123
JSON_PARSE("[ true, false, 2 ]") // [ true, false, 2 ]
JSON_PARSE("\\\"abc\\\"") // "abc"
JSON_PARSE("{\\\"a\\\": 1}") // { a : 1 }
JSON_PARSE("abc") // null
```

## JSON_STRINGIFY()

`JSON_STRINGIFY(value) → text`

Return a JSON string representation of the input value.

- **value** (mixed): the value to convert to a JSON string
- returns **text** (string): the JSON string representing _value_. For input values that cannot be converted to JSON, the function will return _null_.

```js
JSON_STRINGIFY("1") // "1"
JSON_STRINGIFY("abc") // "\"abc\""
JSON_STRINGIFY("[1, 2, 3]") // "[1,2,3]"
```

## LEFT()

`LEFT(value, n) → substring`

Return the _n_ leftmost characters of the string _value_.

To return the rightmost characters, see [RIGHT()](#right).<br /> To take a part from an arbitrary position off the string, see [SUBSTRING()](#substring).

- **value** (string): a string
- **n** (number): how many characters to return
- returns **substring** (string): at most _n_ characters of _value_, starting on the left-hand side of the string

```js
LEFT("foobar", 3) // "foo"
LEFT("foobar", 10) // "foobar"
```

## LENGTH()

`LENGTH(str) → length`

Determine the character length of a string.

- **str** (string): a string. If a number is passed, it will be casted to string first.
- returns **length** (number): the character length of _str_ (not byte length)

```js
LENGTH("foobar") // 6
LENGTH("电脑坏了") // 4
```

_LENGTH()_ can also determine the [number of elements](array.md#length) in an array, the [number of attribute keys](document.md#length) of an object / document and the [amount of documents](database.md#length) in a collection.

## LEVENSHTEIN_DISTANCE()

`LEVENSHTEIN_DISTANCE(value1, value2) → levenshteinDistance`

Calculate the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance){:target="_blank"} between two strings.

- **value1** (string): a string
- **value2** (string): a string
- returns **levenshteinDistance** (number): calculated Levenshtein distance between the input strings _value1_ and _value2_

```js
LEVENSHTEIN_DISTANCE("foobar", "bar") // 3
LEVENSHTEIN_DISTANCE(" ", "") // 1
LEVENSHTEIN_DISTANCE("The quick brown fox jumps over the lazy dog", "The quick black dog jumps over the brown fox") // 13
LEVENSHTEIN_DISTANCE("der mötör trötet", "der trötet") // 6
```

## LIKE()

`LIKE(text, search, caseInsensitive) → bool`

Check whether the pattern _search_ is contained in the string _text_, using wildcard matching.

- **text** (string): the string to search in
- *_search_* (string): a search pattern that can contain the wildcard characters `%` (meaning any sequence of characters, including none) and `_` (any single character). Literal `%` and `_` must be escaped with two backslashes. *search* cannot be a variable or a document attribute. The actual value must be present at query parse time already.
- **caseInsensitive** (bool, _optional_): if set to _true_, the matching will be case-insensitive. The default is _false_.
- returns **bool** (bool): _true_ if the pattern is contained in _text_, and _false_ otherwise

```js
LIKE("cart", "ca_t")   // true
LIKE("carrot", "ca_t") // false
LIKE("carrot", "ca%t") // true

LIKE("foo bar baz", "bar")   // false
LIKE("foo bar baz", "%bar%") // true
LIKE("bar", "%bar%")         // true

LIKE("FoO bAr BaZ", "fOo%bAz")       // false
LIKE("FoO bAr BaZ", "fOo%bAz", true) // true
```

## LOWER()

`LOWER(value) → lowerCaseString`

Convert upper-case letters in _value_ to their lower-case counterparts. All other characters are returned unchanged.

- **value** (string): a string
- returns **lowerCaseString** (string): _value_ with upper-case characters converted to lower-case characters

## LTRIM()

`LTRIM(value, chars) → strippedString`

Return the string _value_ with whitespace stripped from the start only.

To strip from the end only, see [RTRIM()](#rtrim).<br />
To strip both sides, see [TRIM()](#trim).

- **value** (string): a string
- **chars** (string, _optional_): override the characters that should be removed from the string. It defaults to `\r\n \t` (i.e. `0x0d`, `0x0a`, `0x20` and `0x09`).
- returns **strippedString** (string): _value_ without _chars_ at the left-hand side

```js
LTRIM("foo bar") // "foo bar"
LTRIM("  foo bar  ") // "foo bar  "
LTRIM("--==[foo-bar]==--", "-=[]") // "foo-bar]==--"
```

## MD5()

`MD5(text) → hash`

Calculate the MD5 checksum for _text_ and return it in a hexadecimal string representation.

- **text** (string): a string
- returns **hash** (string): MD5 checksum as hex string

```js
MD5("foobar") // "3858f62230ac3c915f300c664312c63f"
```

## RANDOM_TOKEN()

`RANDOM_TOKEN(length) → randomString`

Generate a pseudo-random token string with the specified length. The algorithm for token generation should be treated as opaque.

- **length** (number): desired string length for the token. It must be greater or equal to 0 and at most 65536. A _lenght_ of 0 returns an empty string.
- returns **randomString** (string): a generated token consisting of lowercase letters, uppercase letters and numbers

```js
RANDOM_TOKEN(8) // "zGl09z42"
RANDOM_TOKEN(8) // "m9w50Ft9"
```

## REGEX_MATCHES()

`REGEX_MATCHES(text, regex, caseInsensitive) → stringArray`

Return the matches in the given string _text_, using the _regex_.

- **text** (string): the string to search in
- **regex** (string): a regular expression to use for matching the _text_ - returns **stringArray** (array): an array of strings containing the matches

The regular expression may consist of literal characters and the following characters and sequences:

- `.` – the dot matches any single character except line terminators.
  To include line terminators, use `[\s\S]` instead to simulate `.` with _DOTALL_ flag.
- `\d` – matches a single digit, equivalent to `[0-9]`
- `\s` – matches a single whitespace character
- `\S` – matches a single non-whitespace character
- `\t` – matches a tab character
- `\r` – matches a carriage return
- `\n` – matches a line-feed character
- `[xyz]` – set of characters. Matches any of the enclosed characters (here: _x_, _y_ or _z_)
- `[^xyz]` – negated set of characters. Matches any other character than the enclosed ones (i.e. anything but _x_, _y_ or _z_ in this case)
- `[x-z]` – range of characters. Matches any of the characters in the specified range, e.g. `[0-9A-F]` to match any character in _0123456789ABCDEF_
- `[^x-z]` – negated range of characters. Matches any other character than the ones specified in the range
- `(xyz)` – defines and matches a pattern group
- `(x|y)` – matches either _x_ or _y_
- `^` – matches the beginning of the string (e.g. `^xyz`)
- `$` – matches the end of the string (e.g. `xyz$`)

Note that the characters `.`, `*`, `?`, `[`, `]`, `(`, `)`, `{`, `}`, `^`, and `$` have a special meaning in regular expressions and may need to be escaped using a backslash, which requires escaping itself (`\\`). A literal backslash needs to be escaped using another escaped backslash, i.e. `\\\\`.

Characters and sequences may optionally be repeated using the following quantifiers:

- `x*` – matches zero or more occurrences of _x_
- `x+` – matches one or more occurrences of _x_
- `x?` – matches one or zero occurrences of _x_
- `x{y}` – matches exactly _y_ occurrences of _x_
- `x{y,z}` – matches between _y_ and _z_ occurrences of _x_
- `x{y,}` – matches at least _y_ occurrences of _x_

Note that `xyz+` matches _xyzzz_, but if you want to match _xyzxyz_ instead, you need to define a pattern group by wrapping the sub-expression in parentheses and place the quantifier right behind it: `(xyz)+`.

If the regular expression in _regex_ is invalid, a warning will be raised and the function will return _null_.

```js
REGEX_MATCHES("My-us3r_n4m3", "^[a-z0-9_-]{3,16}$", true) // ["My-us3r_n4m3"]
REGEX_MATCHES("#4d82h4", "^#?([a-f0-9]{6}|[a-f0-9]{3})$", true) // null
REGEX_MATCHES("john@doe.com", "^([a-z0-9_\.-]+)@([\da-z-]+)\.([a-z\.]{2,6})$", false) // ["john@doe.com", "john", "doe", "com"]
```

## REGEX_SPLIT()

`REGEX_SPLIT(text, splitExpression, caseInsensitive, limit) → stringArray`

Split the given string _text_ into a list of strings, using the _separator_.

- **text** (string): the string to split
- **splitExpression** (string): a regular expression to use for splitting the _text_
- **limit** (number, _optional_): limit the number of split values in the result.
  If no _limit_ is given, the number of splits returned is not bounded.
- returns **stringArray** (array): an array of strings

The regular expression may consist of literal characters and the following
characters and sequences:

- `.` – the dot matches any single character except line terminators.
  To include line terminators, use `[\s\S]` instead to simulate `.` with _DOTALL_ flag.
- `\d` – matches a single digit, equivalent to `[0-9]`
- `\s` – matches a single whitespace character
- `\S` – matches a single non-whitespace character
- `\t` – matches a tab character
- `\r` – matches a carriage return
- `\n` – matches a line-feed character
- `[xyz]` – set of characters. Matches any of the enclosed characters
  (here: _x_, _y_ or _z_)
- `[^xyz]` – negated set of characters. Matches any other character than the
enclosed ones (i.e. anything but _x_, _y_ or _z_ in this case)
- `[x-z]` – range of characters. Matches any of the characters in the
  specified range, e.g. `[0-9A-F]` to match any character in
  _0123456789ABCDEF_
- `[^x-z]` – negated range of characters. Matches any other character than the
ones specified in the range
- `(xyz)` – defines and matches a pattern group
- `(x|y)` – matches either _x_ or _y_
- `^` – matches the beginning of the string (e.g. `^xyz`)
- `$` – matches the end of the string (e.g. `xyz$`)

Note that the characters `.`, `*`, `?`, `[`, `]`, `(`, `)`, `{`, `}`, `^`,
and `$` have a special meaning in regular expressions and may need to be
escaped using a backslash, which requires escaping itself (`\\`). A literal
backslash needs to be escaped using another escaped backslash, i.e. `\\\\`.

Characters and sequences may optionally be repeated using the following
quantifiers:

- `x*` – matches zero or more occurrences of _x_
- `x+` – matches one or more occurrences of _x_
- `x?` – matches one or zero occurrences of _x_
- `x{y}` – matches exactly _y_ occurrences of _x_
- `x{y,z}` – matches between _y_ and _z_ occurrences of _x_
- `x{y,}` – matches at least _y_ occurrences of _x_

Note that `xyz+` matches _xyzzz_, but if you want to match _xyzxyz_ instead,
you need to define a pattern group by wrapping the sub-expression in parentheses
and place the quantifier right behind it: `(xyz)+`.

If the regular expression in _splitExpression_ is invalid, a warning will be raised
and the function will return _null_.

```js
REGEX_SPLIT("This is a line.\n This is yet another line\r\n This again is a line.\r Mac line ", "\.?(\n|\r|\r\n)", true, 4) // ["This is a line", "\n", " This is yet another lin", "\r"]
REGEX_SPLIT("hypertext language, programming", "[\s, ]+") // ["hypertext", "language", "programming"]
REGEX_SPLIT("ca,bc,a,bca,bca,bc", "a,b", true, 5) // ["c", "c,", "c", "c", "c"]
```

REGEX_TEST()
------------

`REGEX_TEST(text, search, caseInsensitive) → bool`

Check whether the pattern _search_ is contained in the string _text_,
using regular expression matching.

- **text** (string): the string to search in
- **search** (string): a regular expression search pattern
- returns **bool** (bool): _true_ if the pattern is contained in _text_,
  and _false_ otherwise
- **caseInsensitive** (bool, _optional_): if set to _true_, the matching will be
  case-insensitive. The default is _false_.

The regular expression may consist of literal characters and the following
characters and sequences:

- `.` – the dot matches any single character except line terminators.
  To include line terminators, use `[\s\S]` instead to simulate `.` with _DOTALL_ flag.
- `\d` – matches a single digit, equivalent to `[0-9]`
- `\s` – matches a single whitespace character
- `\S` – matches a single non-whitespace character
- `\t` – matches a tab character
- `\r` – matches a carriage return
- `\n` – matches a line-feed character
- `[xyz]` – set of characters. Matches any of the enclosed characters
  (here: _x_, _y_ or _z_)
- `[^xyz]` – negated set of characters. Matches any other character than the
  enclosed ones (i.e. anything but _x_, _y_ or _z_ in this case)
- `[x-z]` – range of characters. Matches any of the characters in the
  specified range, e.g. `[0-9A-F]` to match any character in
  _0123456789ABCDEF_
- `[^x-z]` – negated range of characters. Matches any other character than the
  ones specified in the range
- `(xyz)` – defines and matches a pattern group
- `(x|y)` – matches either _x_ or _y_
- `^` – matches the beginning of the string (e.g. `^xyz`)
- `$` – matches the end of the string (e.g. `xyz$`)

Note that the characters `.`, `*`, `?`, `[`, `]`, `(`, `)`, `{`, `}`, `^`,
and `$` have a special meaning in regular expressions and may need to be
escaped using a backslash, which requires escaping itself (`\\`). A literal
backslash needs to be escaped using another escaped backslash, i.e. `\\\\`.

Characters and sequences may optionally be repeated using the following
quantifiers:

- `x*` – matches zero or more occurrences of _x_
- `x+` – matches one or more occurrences of _x_
- `x?` – matches one or zero occurrences of _x_
- `x{y}` – matches exactly _y_ occurrences of _x_
- `x{y,z}` – matches between _y_ and _z_ occurrences of _x_
- `x{y,}` – matches at least _y_ occurrences of _x_

Note that `xyz+` matches _xyzzz_, but if you want to match _xyzxyz_ instead,
you need to define a pattern group by wrapping the sub-expression in parentheses
and place the quantifier right behind it: `(xyz)+`.

If the regular expression in _search_ is invalid, a warning will be raised
and the function will return _null_.

```js
REGEX_TEST("the quick brown fox", "the.*fox") // true
REGEX_TEST("the quick brown fox", "^(a|the)\s+(quick|slow).*f.x$") // true
REGEX_TEST("the\nquick\nbrown\nfox", "^the(\n[a-w]+)+\nfox$") // true
```

REGEX_REPLACE()
---------------

`REGEX_REPLACE(text, search, replacement, caseInsensitive) → string`

Replace the pattern _search_ with the string _replacement_ in the string
_text_, using regular expression matching.

- **text** (string): the string to search in
- **search** (string): a regular expression search pattern
- **replacement** (string): the string to replace the _search_ pattern with
- returns **string** (string): the string _text_ with the _search_ regex
  pattern replaced with the _replacement_ string wherever the pattern exists
  in _text_
- **caseInsensitive** (bool, _optional_): if set to _true_, the matching will be
  case-insensitive. The default is _false_.

For more details about the rules for characters and sequences refer
[REGEX_TEST()](#regex_test).

If the regular expression in _search_ is invalid, a warning will be raised
and the function will return _null_.

```js
REGEX_REPLACE("the quick brown fox", "the.*fox", "jumped over") // jumped over
REGEX_REPLACE("the quick brown fox", "o", "i") // the quick briwn fix
```

REVERSE()
---------

`REVERSE(value) → reversedString`

Return the reverse of the string _value_.

- **value** (string): a string
- returns **reversedString** (string): a new string with the characters in
  reverse order

```js
REVERSE("foobar") // "raboof"
REVERSE("电脑坏了") // "了坏脑电"
```

RIGHT()
-------

`RIGHT(value, length) → substring`

Return the _length_ rightmost characters of the string _value_.

To return the leftmost characters, see [LEFT()](#left).<br />
To take a part from an arbitrary position off the string,
see [SUBSTRING()](#substring).

- **value** (string): a string
- **length** (number): how many characters to return
- returns **substring** (string): at most _length_ characters of _value_,
  starting on the right-hand side of the string

```js
RIGHT("foobar", 3) // "bar"
RIGHT("foobar", 10) // "foobar"
```

RTRIM()
-------

`RTRIM(value, chars) → strippedString`

Return the string _value_ with whitespace stripped from the end only.

To strip from the start only, see [LTRIM()](#ltrim).<br />
To strip both sides, see [TRIM()](#trim).

- **value** (string): a string
- **chars** (string, _optional_): override the characters that should
  be removed from the string. It defaults to `\r\n \t` (i.e. `0x0d`, `0x0a`,
  `0x20` and `0x09`).
- returns **strippedString** (string): _value_ without _chars_ at the
  right-hand side

```js
RTRIM("foo bar") // "foo bar"
RTRIM("  foo bar  ") // "  foo bar"
RTRIM("--==[foo-bar]==--", "-=[]") // "--==[foo-bar"
```

SHA1()
------

`SHA1(text) → hash`

Calculate the SHA1 checksum for _text_ and returns it in a hexadecimal
string representation.

- **text** (string): a string
- returns **hash** (string): SHA1 checksum as hex string

```js
SHA1("foobar") // "8843d7f92416211de9ebb963ff4ce28125932878"
```

SHA512()
--------

`SHA512(text) → hash`

Calculate the SHA512 checksum for _text_ and returns it in a hexadecimal
string representation.

- **text** (string): a string
- returns **hash** (string): SHA512 checksum as hex string

```js
SHA512("foobar") // "0a50261ebd1a390fed2bf326f2673c145582a6342d523204973d0219337f81616a8069b012587cf5635f6925f1b56c360230c19b273500ee013e030601bf2425"
```

SPLIT()
-------

`SPLIT(value, separator, limit) → strArray`

Split the given string _value_ into a list of strings, using the _separator_.

- **value** (string): a string
- *_separator_* (string): either a string or a list of strings. If *separator* is
  an empty string, _value_ will be split into a list of characters. If no _separator_
  is specified, _value_ will be returned as array.
- **limit** (number, _optional_): limit the number of split values in the result.
  If no _limit_ is given, the number of splits returned is not bounded.
- returns **strArray** (array): an array of strings

```js
SPLIT( "foo-bar-baz", "-" ) // [ "foo", "bar", "baz" ]
SPLIT( "foo-bar-baz", "-", 1 ) // [ "foo" ]
SPLIT( "foo, bar & baz", [ ", ", " & " ] ) // [ "foo", "bar", "baz" ]
```

SOUNDEX()
-----------

`SOUNDEX(value) → soundexString`

Return the soundex fingerprint of _value_.

- **value** (string): a string
- returns **soundexString** (string): a soundex fingerprint of _value_

```js
SOUNDEX( "example" ) // "E251"
SOUNDEX( "ekzampul")  // "E251"
SOUNDEX( "soundex" ) // "S532"
SOUNDEX( "sounteks" ) // "S532"
```

SUBSTITUTE()
------------

`SUBSTITUTE(value, search, replace, limit) → substitutedString`

Replace search values in the string _value_.

- **value** (string): a string
- *_search_* (string\|array): if *search* is a string, all occurrences of
  _search_ will be replaced in _value_. If _search_ is an array of strings,
  each occurrence of a value contained in _search_ will be replaced by the
  corresponding array element in _replace_. If _replace_ has less list items
  than _search_, occurrences of unmapped _search_ items will be replaced by an
  empty string.
- **replace** (string\|array, _optional_): a replacement string, or an array of
  strings to replace the corresponding elements of _search_ with. Can have less
  elements than _search_ or be left out to remove matches. If _search_ is an array
  but _replace_ is a string, then all matches will be replaced with _replace_.
- **limit** (number, _optional_): cap the number of replacements to this value
- returns **substitutedString** (string): a new string with matches replaced
  (or removed)

```js
SUBSTITUTE( "the quick brown foxx", "quick", "lazy" )
// "the lazy brown foxx"

SUBSTITUTE( "the quick brown foxx", [ "quick", "foxx" ], [ "slow", "dog" ] )
// "the slow brown dog"

SUBSTITUTE( "the quick brown foxx", [ "the", "foxx" ], [ "that", "dog" ], 1 )
//  "that quick brown foxx"

SUBSTITUTE( "the quick brown foxx", [ "the", "quick", "foxx" ], [ "A", "VOID!" ] )
// "A VOID! brown "

SUBSTITUTE( "the quick brown foxx", [ "quick", "foxx" ], "xx" )
// "the xx brown xx"
```

`SUBSTITUTE(value, mapping, limit) → substitutedString`

Alternatively, _search_ and _replace_ can be specified in a combined value.

- **value** (string): a string
- **mapping** (object): a lookup map with search strings as keys and replacement
  strings as values. Empty strings and _null_ as values remove matches.
  Please note that no sequence of search strings can be warrantied by this;
  Means, if you have overlapping search results, one time the first may win,
  another time the second. If you need to ensure the precedence of the sequence
  choose the array based invocation method.
- **limit** (number, _optional_): cap the number of replacements to this value
- returns **substitutedString** (string): a new string with matches replaced
  (or removed)

```js
SUBSTITUTE("the quick brown foxx", {
  "quick": "small",
  "brown": "slow",
  "foxx": "ant"
})
// "the small slow ant"

SUBSTITUTE("the quick brown foxx", { 
  "quick": "",
  "brown": null,
  "foxx": "ant"
})
// "the   ant"

SUBSTITUTE("the quick brown foxx", {
  "quick": "small",
  "brown": "slow",
  "foxx": "ant"
}, 2)
// "the small slow foxx"
```

SUBSTRING()
-----------

`SUBSTRING(value, offset, length) → substring`

Return a substring of _value_.

To return the rightmost characters, see [RIGHT()](#right).<br />
To return the leftmost characters, see [LEFT()](#left).

- **value** (string): a string
- *_offset_* (number): start at *offset*, offsets start at position 0
- *_length_* (number, _optional_): at most *length* characters, omit to get the
  substring from _offset_ to the end of the string
- returns **substring** (string): a substring of _value_

TOKENS()
--------

See [Search Functions](search#tokens).

TO_BASE64()
-----------

`TO_BASE64(value) → toBase64String`

Return the base64 representation of _value_.

- **value** (string): a string
- returns **toBase64String** (string): a base64 representation of _value_

TO_HEX()
-----------

`TO_HEX(value) → toHexString`

Return the hex representation of _value_.

- **value** (string): a string
- returns **toHexString** (string): a hex representation of _value_

TRIM()
------

`TRIM(value, type) → strippedString`

Return the string _value_ with whitespace stripped from the start and/or end.

The optional _type_ parameter specifies from which parts of the string the
whitespace is stripped. [LTRIM()](#ltrim)
and [RTRIM()](#rtrim) are preferred
however.

- **value** (string): a string
- **type** (number, _optional_): strip whitespace from the
  - `0` – start and end of the string (default)
  - `1` – start of the string only
  - `2` – end of the string only

`TRIM(value, chars) → strippedString`

Return the string _value_ with whitespace stripped from the start and end.

- **value** (string): a string
- **chars** (string, _optional_): override the characters that should
  be removed from the string. It defaults to `\r\n \t` (i.e. `0x0d`, `0x0a`,
  `0x20` and `0x09`).
- returns **strippedString** (string): _value_ without _chars_ on both sides

```js
TRIM("foo bar") // "foo bar"
TRIM("  foo bar  ") // "foo bar"
TRIM("--==[foo-bar]==--", "-=[]") // "foo-bar"
TRIM("  foobar\t \r\n ") // "foobar"
TRIM(";foo;bar;baz, ", ",; ") // "foo;bar;baz"
```

UPPER()
-------

`UPPER(value) → upperCaseString`

Convert lower-case letters in _value_ to their upper-case counterparts.
All other characters are returned unchanged.

- **value** (string): a string
- returns **upperCaseString** (string): _value_ with lower-case characters converted
  to upper-case characters
  
UUID()
------

`UUID() → UUIDString`

Return a universally unique identifier value.

- returns **UUIDString** (string): a universally unique identifier
