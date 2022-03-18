---
sidebar_position: 6
---

# Regex

This extension provides basic RegEx execution capabilities such as `find`, `match`, etc.

## Features

* **[find (Function)](#find)**

    Finds the subsequence that matches the given regex pattern.

* **[group (Function)](#group)**

    Returns the subsequence captured by the given group during the regex match operation.

* **[lookingAt (Function)](#lookingat)**

    Matches the input.sequence from the beginning against the regex pattern, and unlike regex:matches() it does not require that the entire input.sequence be matched.

* **[matches (Function)](#matches)**

    Matches the entire input.sequence against the regex pattern.

## find

Finds the subsequence that matches the given regex pattern.

**Syntax:**

```bash

<BOOL> regex:find(<STRING> regex, <STRING> input.sequence)
<BOOL> regex:find(<STRING> regex, <STRING> input.sequence, <INT> starting.index)

```

**Query Parameters:**

|Name |Default Value | Possible Data Types | Optional | Dynamic |
|---|---|---|---|----|
| regex | A regular expression that is matched to a sequence in order to find the subsequence of the same. For example, `\d\d(.*)macrometa`. | STRING  | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, `2 products are produced by Macrometa`. | STRING  | No | Yes |
| starting.index | The starting index of the input sequence from where the input sequence ismatched with the given regex pattern.For example, `10`. | INT  | Yes | Yes |

EXAMPLE 1

```bash

regex:find("\d\d(.*)Macrometa", "2 products are produced by Macrometa currently")

```

This method attempts to find the subsequence of the input.sequence that matches the regex pattern, `\d\d(.*)Macrometa`. It returns `true` as a subsequence exists.

EXAMPLE 2

```bash

regex:find("\d\d(.*)Macrometa", "2 products are produced by Macrometa.", 4)

```

This method attempts to find the subsequence of the input.sequence that matches the regex pattern, `\d\d(.*)Macrometa` starting from index `4`. It returns 'false' as subsequence does not exists.

## group

Returns the subsequence captured by the given group during the regex match operation.

**Syntax:**

```bash

<STRING> regex:group(<STRING> regex, <STRING> input.sequence, <INT> group.id)

```

**Query Parameters:**

|Name |Default Value | Possible Data Types | Optional | Dynamic |
|---|---|---|---|----|
| regex | A regular expression. For example, `\d\d(.*)Macrometa.` | STRING  | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, 2`1 products are produced by Macrometa` | STRING  | No | Yes |
| group.id | The given group id of the regex expression. For example, `2` | INT  | No | Yes |

EXAMPLE 1

```bash

regex:group("\d\d(.*)(Macrometa.*)(Macrometa.*)", "2 products are produced within 2 years by Macrometa currently by Macrometa employees", 3)

```

Function returns 'Macrometa employees', the subsequence captured by the  groupID 3 according to the regex pattern, `\d\d(.*)(Macrometa.*)(Macrometa.*)`.

## lookingAt

Matches the input.sequence from the beginning against the regex pattern, and unlike `regex:matches() it does not require that the entire input.sequence be matched.`.

**Syntax:**

```bash

<BOOL> regex:lookingAt(<STRING> regex, <STRING> input.sequence)

```

**Query Parameters:**

|Name |Default Value | Possible Data Types | Optional | Dynamic |
|---|---|---|---|----|
| regex | A regular expression. For example, `\d\d(.*)Macrometa.` | STRING  | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, 2`1 products are produced by Macrometa` | STRING  | No | Yes |

EXAMPLE 1

```bash

regex:lookingAt("\d\d(.*)(Macrometa.*)", "21 products are produced by Macrometa currently in Sri Lanka")

```

Function matches the input.sequence against the regex pattern, `\d\d(.*)(Macrometa.*)` from the beginning, and as it matches it returns `true`.

EXAMPLE 2

```bash

regex:lookingAt("Macrometa(.*)middleware(.*)", "sample test string and Macrometa is situated in trace and it's a middleware company")

```

Function matches the input.sequence against the regex pattern, `Macrometa(.*)middleware(.*)` from the beginning, and as it does not match it returns `false`.

## matches

Matches the entire input.sequence against the regex pattern.

**Syntax:**

```bash

<BOOL> regex:matches(<STRING> regex, <STRING> input.sequence)

```

**Query Parameters:**

|Name |Default Value | Possible Data Types | Optional | Dynamic |
|---|---|---|---|----|
| regex | A regular expression. For example, `\d\d(.*)Macrometa.` | STRING  | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, `2 products are produced by Macrometa` | STRING  | No | Yes |

EXAMPLE 1

```bash

regex:matches("Macrometa(.*)middleware(.*)", "Macrometa is situated in trace and its a middleware company")

```

Function matches the entire input.sequence against `Macrometa(.*)middleware(.*)` regex pattern, and as it matches it returns `true`.


EXAMPLE 2

```bash

regex:matches("Macrometa(.*)middleware", "Macrometa is situated in trace and its a middleware company")

```

Function matches the entire input.sequence against `Macrometa(.*)middleware` regex pattern. As it does not match it returns `false`.
