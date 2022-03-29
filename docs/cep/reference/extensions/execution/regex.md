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

```
<BOOL> regex:find(<STRING> regex, <STRING> input.sequence)
<BOOL> regex:find(<STRING> regex, <STRING> input.sequence, <INT> starting.index)
```

**Query Parameters:**

|Name |Default Value | Possible Data Types | Optional | Dynamic |
|---|---|---|---|----|
| regex | A regular expression that is matched to a sequence in order to find the subsequence of the same. For example, <code>\d\d(.*)macrometa</code>. | STRING  | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, <code>2 products are produced by Macrometa</code>. | STRING  | No | Yes |
| starting.index | The starting index of the input sequence from where the input sequence ismatched with the given regex pattern.For example, <code>10</code>. | INT  | Yes | Yes |

EXAMPLE 1

```bash
regex:find('\d\d(.*)Macrometa', '2 products are produced by Macrometa currently')
```

This method attempts to find the subsequence of the input.sequence that matches the regex pattern, <code>\d\d(.*)Macrometa</code>. It returns <code>true</code> as a subsequence exists.

EXAMPLE 2

```bash
regex:find('\d\d(.*)Macrometa', '2 products are produced by Macrometa.', 4)
```

This method attempts to find the subsequence of the input.sequence that matches the regex pattern, <code>\d\d(.*)Macrometa</code> starting from index <code>4</code>. It returns 'false' as subsequence does not exists.

## group

Returns the subsequence captured by the given group during the regex match operation.

**Syntax:**

```bash
<STRING> regex:group(<STRING> regex, <STRING> input.sequence, <INT> group.id)
```

**Query Parameters:**

|Name |Default Value | Possible Data Types | Optional | Dynamic |
|---|---|---|---|----|
| regex | A regular expression. For example, <code>\d\d(.*)Macrometa.</code> | STRING  | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, 2<code>1 products are produced by Macrometa</code> | STRING  | No | Yes |
| group.id | The given group id of the regex expression. For example, <code>2</code> | INT  | No | Yes |

EXAMPLE 1

```bash
regex:group('\d\d(.*)(Macrometa.*)(Macrometa.*)', '2 products are produced within 2 years by Macrometa currently by Macrometa employees', 3)
```

Function returns 'Macrometa employees', the subsequence captured by the  groupID 3 according to the regex pattern, <code>\d\d(.*)(Macrometa.*)(Macrometa.*)</code>.

## lookingAt

Matches the input.sequence from the beginning against the regex pattern, and unlike <code>regex:matches() it does not require that the entire input.sequence be matched.</code>.

**Syntax:**

```bash
<BOOL> regex:lookingAt(<STRING> regex, <STRING> input.sequence)
```

**Query Parameters:**

|Name |Default Value | Possible Data Types | Optional | Dynamic |
|---|---|---|---|----|
| regex | A regular expression. For example, <code>\d\d(.*)Macrometa.</code> | STRING  | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, 2<code>1 products are produced by Macrometa</code> | STRING  | No | Yes |

EXAMPLE 1

```bash
regex:lookingAt('\d\d(.*)(Macrometa.*)', '21 products are produced by Macrometa currently in Sri Lanka')
```

Function matches the input.sequence against the regex pattern, <code>\d\d(.*)(Macrometa.*)</code> from the beginning, and as it matches it returns <code>true</code>.

EXAMPLE 2

```bash
regex:lookingAt('Macrometa(.*)middleware(.*)', 'sample test string and Macrometa is situated in trace and it's a middleware company')
```

Function matches the input.sequence against the regex pattern, <code>Macrometa(.*)middleware(.*)</code> from the beginning, and as it does not match it returns <code>false</code>.

## matches

Matches the entire input.sequence against the regex pattern.

**Syntax:**

```bash
<BOOL> regex:matches(<STRING> regex, <STRING> input.sequence)
```

**Query Parameters:**

|Name |Default Value | Possible Data Types | Optional | Dynamic |
|---|---|---|---|----|
| regex | A regular expression. For example, <code>\d\d(.*)Macrometa.</code> | STRING  | No | Yes |
| input.sequence | The input sequence to be matched with the regular expression. For example, <code>2 products are produced by Macrometa</code> | STRING  | No | Yes |

EXAMPLE 1

```bash
regex:matches('Macrometa(.*)middleware(.*)', 'Macrometa is situated in trace and its a middleware company')
```

Function matches the entire input.sequence against <code>Macrometa(.*)middleware(.*)</code> regex pattern, and as it matches it returns <code>true</code>.</p>


EXAMPLE 2

```bash
regex:matches('Macrometa(.*)middleware', 'Macrometa is situated in trace and its a middleware company')
```

Function matches the entire input.sequence against <code>Macrometa(.*)middleware</code> regex pattern. As it does not match it returns <code>false</code>.
