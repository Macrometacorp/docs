---
title: C8QL Syntax
---

This page explains the structure of the C8QL language.

## Query types

A C8QL query must either return a result (indicated by usage of the `RETURN` keyword) or execute a data-modification operation (indicated by usage of one of the keywords `INSERT`, `UPDATE`, `REPLACE`, `REMOVE` or `UPSERT`).

The C8QL parser will return an error if it detects more than one data-modification operation in the same query or if it cannot figure out if the query is meant to be a data retrieval or a modification operation.

C8QL only allows _one_ query in a single query string; thus semicolons to indicate the end of one query and separate multiple queries (as seen in SQL) are not allowed.

## Whitespace

Whitespaces (blanks, carriage returns, line feeds, and tab stops) can be used in the query text to increase its readability. Tokens have to be separated by any number of whitespaces. Whitespace within strings or names must be enclosed in quotes in order to be preserved.

## Comments

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

## Keywords

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

Due to the backticks, _filter_ and _sort_ are interpreted as names and not as keywords here.

The example can alternatively written as:

```js
FOR f IN ´filter´
  RETURN f.´sort´
```

## Collection Names

Collection names can be used in queries as they are. If a collection happens to have the same name as a keyword, the name must be enclosed in backticks.

Refer to the [Naming Conventions](../references/naming-conventions.md) about collection naming conventions.

C8QL currently has a limit of up to 256 collections used in one C8QL query. This limit applies to the sum of all involved document and edge collections.

## Attribute Names

When referring to attributes of documents from a collection, the fully qualified attribute name must be used. This is because multiple collections with ambiguous attribute names may be used in a query.  To avoid any ambiguity, it is not allowed to refer to an unqualified attribute name.

Please refer to the [Naming Conventions](../references/naming-conventions.md) for more information about the attribute naming conventions.

```js
FOR u IN users
  FOR f IN friends
    FILTER u.active == true && f.active == true && u.id == f.userId
    RETURN u.name
```

In the above example, the attribute names _active_, _name_, _id_, and _userId_ are qualified using the collection names they belong to (_u_ and _f_ respectively).

## Variable Names

C8QL allows the user to assign values to additional variables in a query.  All variables that are assigned a value must have a name that is unique within the context of the query. Variable names must be different from the names of any collection name used in the same query.

```js
FOR u IN users
  LET friends = u.friends
  RETURN { "name" : u.name, "friends" : friends }
```

In the above query, _users_ is a collection name, and both _u_ and _friends_ are variable names. This is because the _FOR_ and _LET_ operations need target variables to store their intermediate results.

Allowed characters in variable names are the letters _a_ to _z_ (both in lower and upper case), the numbers _0_ to _9_, the underscore (___) symbol and the dollar (_$_) sign. A variable name must not start with a number. If a variable name starts with the underscore character, the underscore must be followed by least one letter (a-z or A-Z) or digit (0-9).

The dollar sign can be used only as the very first character in a variable name.
