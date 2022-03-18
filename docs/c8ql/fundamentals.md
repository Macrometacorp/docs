---
sidebar_position: 5
---

# C8QL Fundamentals

|   Section    |    Description    |
|-------|--------|
| [Query Syntax](#c8ql-syntax) | Explains the structure of the C8QL language. |
| [Data Types](#data-types) | Describes the primitive and compound data types supported by C8QL. |
| [Bind Parameters](#bind-parameters) | C8QL supports the usage of bind parameters. This allows to separate the query text from literal values used in the query. |
| [Type and Value order](#type-and-value-order) | C8QL uses a set of rules (using values and types) for  equality checks and comparisons. |
| [Accessing Data](#accessing-data) | Describes the impact of non-existent or null attributes for selection queries. |
| [Query Results](#query-results) | The result of a C8QL query is an array of values.|
| [Query Errors](#query-errors) | Errors may arise from the C8QL parsing or execution.|

## Query Syntax

### Query types

A C8QL query must either return a result (indicated by usage of the `RETURN` keyword) or execute a data-modification operation (indicated by usage of one of the keywords `INSERT`, `UPDATE`, `REPLACE`, `REMOVE` or `UPSERT`).

The C8QL parser will return an error if it detects more than one data-modification operation in the same query or if it cannot figure out if the query is meant to be a data retrieval or a modification operation.

C8QL only allows *one* query in a single query string; thus semicolons to indicate the end of one query and separate multiple queries (as seen in SQL) are not allowed.

### Whitespace

Whitespaces (blanks, carriage returns, line feeds, and tab stops) can be used in the query text to increase its readability. Tokens have to be separated by any number of whitespaces. Whitespace within strings or names must be enclosed in quotes in order to be preserved.

### Comments

Comments can be embedded at any position in a query. The text contained in the comment is ignored by the C8QL parser.

Multi-line comments cannot be nested, which means subsequent comment starts within comments are ignored, comment ends will end the comment.

C8QL supports two types of comments:

- Single line comments: These start with a double forward slash and end at the end of the line, or the end of the query string (whichever is first).

- Multi line comments: These start with a forward slash and asterisk, and end with an asterisk and a following forward slash. They can span as many lines as necessary.

```js
    /* this is a comment */ RETURN 1
    /* these */ RETURN /* are */ 1 /* multiple */ + /* comments */ 1
    /* this is
       a multi line
       comment */
    // a single line comment
```

### Keywords

On the top level, C8QL offers the following operations:

- `FOR`: array iteration
- `RETURN`: results projection
- `FILTER`: results filtering
- `SORT`: result sorting
- `LIMIT`: result slicing
- `LET`: variable assignment
- `COLLECT`: result grouping
- `INSERT`: insertion of new documents
- `UPDATE`: (partial) update of existing documents
- `REPLACE`: replacement of existing documents
- `REMOVE`: removal of existing documents
- `UPSERT`: insertion or update of existing documents

Each of the above operations can be initiated in a query by using a keyword of the same name. A C8QL query can (and typically does) consist of multiple of the above operations.

An example C8QL query may look like this:

```js
FOR u IN users
  FILTER u.type == "newbie" && u.active == true
  RETURN u.name
```

In this example query, the terms `FOR`, `FILTER`, and `RETURN` initiate the higher-level operation according to their name. These terms are also keywords, meaning that they have a special meaning in the language.

For example, the query parser will use the keywords to find out which high-level operations to execute. That also means keywords can only be used at certain locations in a query. This also makes all keywords reserved words that must not be used for other purposes than they are intended for.

For example, it is not possible to use a keyword as a collection or attribute name. If a collection or attribute need to have the same name as a keyword, the collection or attribute name needs to be quoted.

Keywords are case-insensitive, meaning they can be specified in lower, upper, or mixed case in queries. In this documentation, all keywords are written in upper case to make them distinguishable from other query parts.

There are a few more keywords in addition to the higher-level operation keywords. Additional keywords may be added in future versions of C8.

The complete list of keywords is currently:

- ALL
- AND
- ANY
- ASC
- COLLECT
- DESC
- DISTINCT
- FALSE
- FILTER
- FOR
- GRAPH
- IN
- INBOUND
- INSERT
- INTO
- LET
- LIMIT
- NONE
- NOT
- NULL
- OR
- OUTBOUND
- REMOVE
- REPLACE
- RETURN
- SHORTEST_PATH
- SORT
- TRUE
- UPDATE
- UPSERT
- WITH

## Names

In general, names are used to identify objects (collections, attributes, variables, and functions) in C8QL queries.

The maximum supported length of any name is 64 bytes. Names in C8QL are always case-sensitive.

Keywords must not be used as names. If a reserved keyword should be used as a name, the name must be enclosed in backticks or forward ticks. Enclosing a name in backticks or forward ticks makes it possible to use otherwise reserved keywords as names. An example for this is:

```js
FOR f IN `filter`
  RETURN f.`sort`
```

Due to the backticks, *filter* and *sort* are interpreted as names and not as keywords here.

The example can alternatively written as:

```js
FOR f IN ´filter´
  RETURN f.´sort´
```

### Collection Names

Collection names can be used in queries as they are. If a collection happens to have the same name as a keyword, the name must be enclosed in backticks.

Please refer to the [Naming Conventions](../collections/documents/naming-conventions.md) about collection naming conventions.

C8QL currently has a limit of up to 256 collections used in one C8QL query. This limit applies to the sum of all involved document and edge collections.

### Attribute Names

When referring to attributes of documents from a collection, the fully qualified attribute name must be used. This is because multiple collections with ambiguous attribute names may be used in a query.  To avoid any ambiguity, it is not allowed to refer to an unqualified attribute name.

Please refer to the [Naming Conventions](../collections/documents/naming-conventions.md) for more information about the attribute naming conventions.

```js
FOR u IN users
  FOR f IN friends
    FILTER u.active == true && f.active == true && u.id == f.userId
    RETURN u.name
```

In the above example, the attribute names *active*, *name*, *id*, and *userId* are qualified using the collection names they belong to (*u* and *f* respectively).

### Variable Names

C8QL allows the user to assign values to additional variables in a query.  All variables that are assigned a value must have a name that is unique within the context of the query. Variable names must be different from the names of any collection name used in the same query.

```js
FOR u IN users
  LET friends = u.friends
  RETURN { "name" : u.name, "friends" : friends }
```

In the above query, *users* is a collection name, and both *u* and *friends* are variable names. This is because the *FOR* and *LET* operations need target variables to store their intermediate results.

Allowed characters in variable names are the letters *a* to *z* (both in lower and upper case), the numbers *0* to *9*, the underscore (*_*) symbol and the dollar (*$*) sign. A variable name must not start with a number. If a variable name starts with the underscore character, the underscore must be followed by least one letter (a-z or A-Z) or digit (0-9).

The dollar sign can be used only as the very first character in a variable name.

## Data Types

C8QL supports both primitive and compound data types. The following types are available:

- **Primitive types**: Consisting of exactly one value
    * `null`: An empty value, also, the absence of a value
    * `bool`: Boolean truth value with possible values *false* and *true*
    * `number`: Signed (real) number
    * `string`: UTF-8 encoded text value

- **Compound types**: Consisting of multiple values
    * `array`: Sequence of values, referred to by their positions
    * `object / document`: Sequence of values, referred to by their names

### Primitive types

#### Numeric literals

Numeric literals can be integers or real values. They can optionally be signed using the `+` or `-` symbols. The scientific notation is also supported.

```js
1
42
-1
-42
1.23
-99.99
0.1
-4.87e103
```

All numeric values are treated as 64-bit double-precision values internally. The internal format used is IEEE 754.

#### String literals

String literals must be enclosed in single or double quotes. If the used quote character is to be used itself within the string literal, it must be escaped using the backslash symbol.  Backslash literals themselves also be escaped using a backslash.

```
"yikes!"
"don't know"
"this is a \"quoted\" word"
"this is a longer string."
"the path separator on Windows is \\"

'yikes!'
'don't know'
'this is a longer string.'
'the path separator on Windows is \\'
```

All string literals must be UTF-8 encoded. It is currently not possible to use arbitrary binary data if it is not UTF-8 encoded. A workaround to use binary data is to encode the data using base64 or other algorithms on the application side before storing, and decoding it on application side after retrieval.

### Compound types

C8QL supports two compound types:

- `arrays`: A composition of unnamed values, each accessible by their positions
- `objects / documents`: A composition of named values, each accessible by their names

#### Arrays / Lists

The first supported compound type is the array type. Arrays are effectively sequences of (unnamed / anonymous) values. Individual array elements can be accessed by their positions. The order of elements in an array is important.

An *array-declaration* starts with the *[* symbol and ends with the *]* symbol. An *array-declaration* contains zero or many *expression*s, separated from each other with the *,* symbol.

In the easiest case, an array is empty and thus looks like:

```json
[ ]
```

Array elements can be any legal *expression* values. Nesting of arrays is supported.

```json
[ 1, 2, 3 ]
[ -99, "yikes!", [ true, [ "no"], [ ] ], 1 ]
[ [ "fox", "marshal" ] ]
```

Individual array values can later be accessed by their positions using the *[]* accessor. The position of the accessed element must be a numeric value. Positions start at 0. It is also possible to use negative index values to access array values starting from the end of the array. This is convenient if the length of the array is unknown and access to elements at the end of the array is required.

```js
// access 1st array element (elements start at index 0)
u.friends[0]

// access 3rd array element
u.friends[2]

// access last array element
u.friends[-1]

// access second to last array element
u.friends[-2]
```

#### Objects / Documents

The other supported compound type is the object (or document) type. Objects are a composition of zero to many attributes. Each attribute is a name/value pair. Object attributes can be accessed individually by their names.

Object declarations start with the *{* symbol and end with the *}* symbol. An object contains zero to many attribute declarations, separated from each other with the *,* symbol.  In the simplest case, an object is empty. Its declaration would then be:

```json
{ }
```

Each attribute in an object is a name / value pair. Name and value of an attribute are separated using the `:` symbol.

The attribute name is mandatory and must be specified as a quoted or unquoted string. If a keyword is used as an attribute name, the attribute name must be quoted:

```js
{ return : 1 }     /* won't work */
{ "return" : 1 }   /* works ! */
{ `return` : 1 }   /* works, too! */
```

Object attribute names can be computed using dynamic expressions, too. To disambiguate regular attribute names from attribute name expressions, computed attribute names must be enclosed in `[and]`:

```js
{ [ CONCAT("test/", "bar") ] : "someValue" }
```

There is also shorthand notation for attributes which is handy for returning existing variables easily:

```js
LET name = "Peter"
LET age = 42
RETURN { name, age }
```

The above is the shorthand equivalent for the generic form:

```js
LET name = "Peter"
LET age = 42
RETURN { name : name, age : age }
```

Any valid expression can be used as an attribute value. That also means nested objects can be used as attribute values:

```json
{ name : "Peter" }
{ "name" : "Vanessa", "age" : 15 }
{ "name" : "John", likes : [ "Swimming", "Skiing" ], "address" : { "street" : "Cucumber lane", "zip" : "94242" } }
```

Individual object attributes can later be accessed by their names using the `.` accessor:

```js
u.address.city.name
u.friends[0].name.first
```

Attributes can also be accessed using the `[]` accessor:

```js
u["address"]["city"]["name"]
u["friends"][0]["name"]["first"]
```

In contrast to the dot accessor, the square brackets allow for expressions:

```js
LET attr1 = "friends"
LET attr2 = "name"
u[attr1][0][attr2][ CONCAT("fir", "st") ]
```

:::note
If a non-existing attribute is accessed in one or the other way, the result will be `null`, without error or warning.
:::
## Bind parameters

C8QL supports the usage of bind parameters, thus allowing to separate the query text from literal values used in the query. It is good practice to separate the query text from the literal values because this will prevent (malicious) injection of keywords and other collection names into an existing query. This injection would be dangerous because it may change the meaning of an existing query.

Using bind parameters, the meaning of an existing query cannot be changed. Bind parameters can be used everywhere in a query where literals can be used.

The syntax for bind parameters is `@name` where `@` signifies that this is a bind parameter and `name` is the actual parameter name. Parameter names must start with any of the letters `a` to `z` (upper or lower case) or a digit (`0` to `9`), and can be followed by any letter, digit or the underscore symbol.

```js
FOR u IN users
  FILTER u.id == @id && u.name == @name
  RETURN u
```

The bind parameter values need to be passed along with the query when it is executed, but not as part of the query text itself. In the web interface, there is a pane next to the query editor where the bind parameters can be entered. 

```json
{
  "query": "FOR u IN users FILTER u.id == @id && u.name == @name RETURN u",
  "bindVars": {
    "id": 123,
    "name": "John Smith"
  }
}
```

Bind parameters that are declared in the query must also be passed a parameter value, or the query will fail. Specifying parameters that are not declared in the query will result in an error too.

Bind variables represent a value like a string, and must not be put in quotes in the C8QL code:

```js
FILTER u.name == "@name" // wrong
FILTER u.name == @name   // correct
```

If you need to do string processing (concatenation, etc.) in the query, you need to use [string functions](functions/string.md) to do so:

```js
FOR u IN users
  FILTER u.id == CONCAT('prefix', @id, 'suffix') && u.name == @name
  RETURN u
```

Bind paramers can be used for both, the dot notation as well as the square bracket notation for sub-attribute access. They can also be chained:

```js
LET doc = { foo: { bar: "baz" } }

RETURN doc.@attr.@subattr
// or
RETURN doc[@attr][@subattr]
```

```json
{
  "attr": "foo",
  "subattr": "bar"
}
```

Both variants in above example return `[ "baz" ]` as query result.

The whole attribute path, for highly nested data in particular, can also be specified using the dot notation and a single bind parameter, by passing an array of strings as parameter value. The elements of the array represent the attribute keys of the path:

```js
LET doc = { a: { b: { c: 1 } } }
RETURN doc.@attr
```

```json
{ "attr": [ "a", "b", "c" ] }
```

The example query returns `[ 1 ]` as result. Note that `{ "attr": "a.b.c" }` would return the value of an attribute called *a.b.c*, not the value of attribute *c* with the parents *a* and *b* as `[ "a", "b", "c" ]` would.

A special type of bind parameter exists for injecting collection names. This type of bind parameter has a name prefixed with an additional *@* symbol (thus when using the bind parameter in a query, two *@* symbols must be used).

```js
FOR u IN @@collection
  FILTER u.active == true
  RETURN u
```

```json
{ "@collection": "myCollection" }
```

Keywords can't be replaced by bind-values; i.e. `FOR`, `FILTER`, `IN`, `INBOUND` or function calls.

## Type and Value order

When checking for equality or inequality or when determining the sort order of values, C8QL uses a deterministic algorithm that takes both the data types and the actual values into account.

The compared operands are first compared by their data types, and only by their data values if the operands have the same data types.

The following type order is used when comparing data types:

```bash
    null < bool < number < string < array/list < object/document
```

This means `null` is the smallest type in C8QL and `document` is the type with the highest order. If the compared operands have a different type, then the comparison result is determined and the comparison is finished.

For example, the boolean `true` value will always be less than any numeric or string value, any array (even an empty array) or any object / document. Additionally, any string value (even an empty string) will always be greater than any numeric value, a boolean value, `true` or `false`.

```
    null < false
    null < true
    null < 0
    null < ''
    null < ' '
    null < '0'
    null < 'abc'
    null < [ ]
    null < { }

    false < true
    false < 0
    false < ''
    false < ' '
    false < '0'
    false < 'abc'
    false < [ ]
    false < { }

    true < 0
    true < ''
    true < ' '
    true < '0'
    true < 'abc'
    true < [ ]
    true < { }

    0 < ''
    0 < ' '
    0 < '0'
    0 < 'abc'
    0 < [ ]
    0 < { }

    '' < ' '
    '' < '0'
    '' < 'abc'
    '' < [ ]
    '' < { }

    [ ] < { }
```

If the two compared operands have the same data types, then the operands values are compared. For the primitive types (null, boolean, number, and string), the result is defined as follows:

- `null`: `null` is equal to `null`
- `boolean`: `false` is less than `true`
- `number`: numeric values are ordered by their cardinal value
- `string`: string values are ordered using a localized comparison

@(Info)(Note)(Unlike in SQL, `null` can be compared to any value, including `null`  itself, without the result being converted into `null` automatically.)

For compound, types the following special rules are applied:

Two array values are compared by comparing their individual elements position by position, starting at the first element. For each position, the element types are compared first.

* If the types are not equal, the comparison result is determined, and the comparison is finished. 
* If the types are equal, then the values of the two elements are compared.  If one of the arrays is finished and the other array still has an element at a compared position, then *null* will be used as the element value of the fully traversed array.

If an array element is itself a compound value (an array or an object / document), then the comparison algorithm will check the element's sub values recursively. The element's sub-elements are compared recursively.

```
    [ ] < [ 0 ]
    [ 1 ] < [ 2 ]
    [ 1, 2 ] < [ 2 ]
    [ 99, 99 ] < [ 100 ]
    [ false ] < [ true ]
    [ false, 1 ] < [ false, '' ]
```

Two object / documents operands are compared by checking attribute names and value. The attribute names are compared first. Before attribute names are compared, a combined array of all attribute names from both operands is created and sorted lexicographically.  This means that the order in which attributes are declared in an object / document is not relevant when comparing two objects / documents.

The combined and sorted array of attribute names is then traversed, and the respective attributes from the two compared operands are then looked up. If one of the objects / documents does not have an attribute with the sought name, its attribute value is considered to be *null*.  

Finally, the attribute value of both objects / documents is compared using the before mentioned data type and value comparison. The comparisons are performed for all object / document attributes until there is an unambiguous comparison result. If an unambiguous comparison result is found, the comparison is finished. If there is no unambiguous comparison result, the two compared objects / documents are considered equal.

```js
    { } < { "a" : 1 }
    { } < { "a" : null }
    { "a" : 1 } < { "a" : 2 }
    { "b" : 1 } < { "a" : 0 }
    { "a" : { "c" : true } } < { "a" : { "c" : 0 } }
    { "a" : { "c" : true, "a" : 0 } } < { "a" : { "c" : false, "a" : 1 } }
    { "a" : 1, "b" : 2 } == { "b" : 2, "a" : 1 }
```

## Accessing Data 

Collection data can be accessed by specifying a collection name in a query.  A collection can be understood as an array of documents, and that is how they are treated in C8QL. 

Documents from collections are normally accessed using the `FOR` keyword. 

:::note
When iterating over documents from a collection, the order of documents is undefined. To traverse documents in an explicit and deterministic order, the `SORT` keyword should be used in addition.)
:::

Data in collections is stored in documents, with each document potentially having different attributes than other documents. This is true even for documents of the same collection.

It is therefore quite normal to encounter documents that do not have some or all of the attributes that are queried in a C8QL query. In this case, the non-existing attributes in the document will be treated as if they would exist with a value of `null`. 

That means that comparing a document attribute to `null` will return true if the document has the particular attribute and the attribute has a value of `null`, or that the document does not have the particular attribute at all.

For example, the following query will return all documents from the collection  `users` that have a value of `null` in the attribute `name`, plus all documents from `users` that do not have the `name` attribute at all:

```js
    FOR u IN users
      FILTER u.name == null
      RETURN u
```

Furthermore, `null` is less than any other value (excluding `null` itself). That means documents with non-existing attributes may be included in the result when comparing attribute values with the less than or less equal operators.

For example, the following query will return all documents from the collection `users` that have an attribute `age` with a value less than `39`, but also all documents from the collection that do not have the attribute `age` at all.

```js
    FOR u IN users
      FILTER u.age < 39
      RETURN u
```

This behavior should always be taken into account when writing queries.

## Query Results

The result of a C8QL query is an array of values. The individual values in the result array may or may not have a homogeneous structure, depending on what is actually queried.

For example, when returning data from a collection with inhomogeneous documents (the individual documents in the collection have different attribute names) without modification, the result values will as well have an inhomogeneous structure. Each result value itself is a document:

```js
FOR u IN users
    RETURN u
```

```json
[ { "id": 1, "name": "John", "active": false }, 
  { "age": 32, "id": 2, "name": "Vanessa" }, 
  { "friends": [ "John", "Vanessa" ], "id": 3, "name": "Amy" } ]
```

However, if a fixed set of attributes from the collection is queried, then the query result values will have a homogeneous structure. Each result value is still a document:

```js
FOR u IN users
    RETURN { "id": u.id, "name": u.name }
```

```json
[ { "id": 1, "name": "John" }, 
  { "id": 2, "name": "Vanessa" }, 
  { "id": 3, "name": "Amy" } ]
```

It is also possible to query just scalar values. In this case, the result set is an array of scalars, and each result value is a scalar value:

```js
FOR u IN users
    RETURN u.id
```

```json
[ 1, 2, 3 ]
```

If a query does not produce any results because no matching data can be found, it will produce an empty result array:

```json
[ ]
```

## Query Errors

Issuing an invalid query to the server will result in a parse error if the query is syntactically invalid. C8 will detect such errors during query inspection and abort further processing. Instead, the error number and an error message are returned so that the errors can be fixed.

If a query passes the parsing stage, all collections referenced in the query will be opened. If any of the referenced collections is not present, query execution will again be aborted and an appropriate error message will be returned.

Under some circumstances, executing a query may also produce run-time errors that cannot be predicted from inspecting the query text alone. This is because queries may use data from collections that may also be inhomogeneous.  Some examples that will cause run-time errors are:

- `Division by zero`: Will be triggered when an attempt is made to use the value *0* as the divisor in an arithmetic division or modulus operation

- `Invalid operands for arithmetic operations`: Will be triggered when an attempt is made to use any non-numeric values as operands in arithmetic operations. This includes unary (unary minus, unary plus) and binary operations (plus, minus, multiplication, division, and modulus)

- `Invalid operands for logical operations`: Will be triggered when an attempt is made to use any non-boolean values as operand(s) in logical operations. This includes unary (logical not/negation), binary (logical and, logical or), and the ternary operators

Please refer to the [C8 Errors](fundamentals.md) page for a list of error codes and meanings.
