---
sidebar_position: 10
---

# Miscellaneous functions

## Control flow functions

### NOT_NULL()

`NOT_NULL(alternative, ...) → value`

Return the first element that is not *null*, and *null* if all alternatives are *null* themselves. It is also known as `COALESCE()` in SQL.

- **alternative** (any, *repeatable*): input of arbitrary type
- returns **value** (any): first non-null parameter, or *null* if all arguments are *null*

### FIRST_LIST()

Return the first alternative that is an array, and *null* if none of the alternatives is an array.

- **alternative** (any, *repeatable*): input of arbitrary type
- returns **list** (array\|null): array / list or null

### FIRST_DOCUMENT()

`FIRST_DOCUMENT(value) → doc`

Return the first alternative that is a document, and *null* if none of the alternatives is a document.

- **alternative** (any, *repeatable*): input of arbitrary type
- returns **doc** (object\|null): document / object or null

### Ternary operator

For conditional evaluation, check out the [ternary operator](../operators.md#ternary-operator).

## Database functions

### COLLECTION_COUNT()

`COLLECTION_COUNT(coll) → count`

Determine the amount of documents in a collection. [LENGTH()](#length) is preferred.

### COLLECTIONS()

`COLLECTIONS() → docArray`

Return an array of collections.

- returns **docArray** (array): each collection as a document with attributes
  *name* and *_id* in an array

### COUNT()

This is an alias for [LENGTH()](#length).

### CURRENT_USER()

`CURRENT_USER() → userName`

Return the name of the current user.

The current user is the user account name specified in the *Authorization* HTTP header of the request. If you ran the query as a request, authentication must be enabled on the server. Otherwise, the return value is *null*.

- returns **userName** (string\|null): the current user name.

### CURRENT_USER_ATTRIBUTE()

`CURRENT_USER_ATTRIBUTE() → attribute`

Returns attributes that are assigned to a user.

You can use these attributes to restrict access to documents. For example, you can add a document with an attribute `Department: finance` and create a similar `{ Department: finance }` attribute for an authorized user, then write the following query:

```js
FOR d IN data
FILTER CURRENT_USER_ATTRIBUTE(“Department”) == d.Department
RETURN d
```

To ensure security, verify that accounts who can access this query cannot also modify it and circumvent the attribute.

### CURRENT_APIKEY_ATTRIBUTE()

`CURRENT_APIKEY_ATTRIBUTE() → attribute`

Returns attributes that are assigned to an API key.

You can use these attributes to restrict access to documents. For example, you can add a document with an attribute `Department: finance` and create a similar `{ Department: finance }` attribute for an API key, then write the following query:

```js
FOR d IN data
FILTER CURRENT_USER_ATTRIBUTE(“Department”) == d.Department
RETURN d
```

To ensure security, verify that accounts who can access this query cannot also modify it and circumvent the attribute.

### DECODE_REV()

`DECODE_REV(revision) → details`

Decompose the specified `revision` string into its components. The resulting object has a `date` and a `count` attribute. This function is supposed to be called with the `_rev` attribute value of a database document as argument.

- **revision** (string): revision ID string
- returns **details** (object\|null): object with two attributes *date* (string in ISO 8601 format) and *count* (integer number), or *null*

If the input revision ID is not a string or cannot be processed, the function issues a warning and returns *null*.

Please note that the *date* value in the current result provides the date and time of when the document record was put together on the server, but not necessarily the time of insertion into the underlying storage engine. Therefore in case of concurrent document operations the exact document storage order cannot be derived unambiguously from the revision value. It should thus be treated as a rough estimate of when a document was created or last updated.

```js
DECODE_REV( "_YU0HOEG---" )
// { "date" : "2019-03-11T16:15:05.314Z", "count" : 0 }
```

### DOCUMENT()

`DOCUMENT(collection, id) → doc`

Return the document which is uniquely identified by its *id*. GDN will try to find the document using the *_id* value of the document in the specified collection. 

If there is a mismatch between the *collection* passed and the collection specified in *id*, then *null* will be returned. Additionally, if the *collection* matches the collection value specified in *id* but the document cannot be found, *null* will be returned.

This function also allows *id* to be an array of ids. In this case, the function will return an array of all documents that could be found.

It is also possible to specify a document key instead of an id, or an array of keys to return all documents that can be found.

- **collection** (string): name of a collection
- **id** (string\|array): a document handle string (consisting of collection name and document key), a document key, or an array of both document handle strings and document keys
- returns **doc** (document\|array\|null): the content of the found document, an array of all found documents or *null* if nothing was found

```js
DOCUMENT( users, "users/john" )
DOCUMENT( users, "john" )

DOCUMENT( users, [ "users/john", "users/amy" ] )
DOCUMENT( users, [ "john", "amy" ] )
```

`DOCUMENT(id) → doc`

The function can also be used with a single parameter *id* as follows:

- **id** (string\|array): either a document handle string (consisting of
  collection name and document key) or an array of document handle strings
- returns **doc** (document\|null): the content of the found document
  or *null* if nothing was found

```js
DOCUMENT("users/john")
DOCUMENT( [ "users/john", "users/amy" ] )
```

Please also consider to use
[`DOCUMENT` in conjunction with `WITH`](../operations/with.md)

### LENGTH()

`LENGTH(coll) → documentCount`

Determine the amount of documents in a collection.

It calls [COLLECTION_COUNT()](#collection_count) internally.

- **coll** (collection): a collection (not string)
- returns **documentCount** (number): the total amount of documents in *coll*

*LENGTH()* can also determine the [number of elements](array.md#length) in an array,
the [number of attribute keys](document.md#length) of an object / document and
the [character length](string.md#length) of a string.

## Hash functions

### HASH()

`HASH(value) → hashNumber`

Calculate a hash value for *value*.

- **value** (any): an element of arbitrary type
- returns **hashNumber** (number): a hash value of *value*

*value* is not required to be a string, but can have any data type. The calculated hash value will take the data type of *value* into account, so for example the number *1* and the string *"1"* will have different hash values. For arrays the hash values will be equal if the arrays contain exactly the same values (including value types) in the same order. For objects the same hash values will be created if the objects have exactly the same attribute names and values (including value types). The order in which attributes appear inside objects is not important for hashing.

The hash value returned by this function is a number. The hash algorithm is not guaranteed to remain the same in future versions of GDN. The hash values should therefore be used only for temporary calculations, e.g. to compare if two documents are the same, or for grouping values in queries.

### String-based hashing

See the following string functions:

- [CRC32()](string.md#crc32)
- [FNV64()](string.md#fnv64)
- [MD5()](string.md#md5)
- [SHA1()](string.md#sha1)
- [SHA512()](string.md#sha512)

## Function calling

### APPLY()

`APPLY(functionName, arguments) → retVal`

Dynamically call the function *funcName* with the arguments specified. Arguments are given as array and are passed as separate parameters to the called function.

Both built-in and user-defined functions can be called. 

- **funcName** (string): a function name
- **arguments** (array, *optional*): an array with elements of arbitrary type
- returns **retVal** (any): the return value of the called function

```js
APPLY( "SUBSTRING", [ "this is a test", 0, 7 ] )
// "this is"
```

### ASSERT() / WARN()

`ASSERT(expr, message) → retVal`<br />
`WARN(expr, message) → retVal`

The two functions evaluate an expression. In case the expression evaluates to *true* both functions will return *true*. If the expression evaluates to *false* *ASSERT* will throw an error and *WARN* will issue a warning and return *false*. This behavior allows the use of *ASSERT* and *WARN* in `FILTER` conditions.

- **expr** (expression): AQL expression to be evaluated
- **message** (string): message that will be used in exception or warning if expression evaluates to false
- returns **retVal** (bool): returns true if expression evaluates to true

```js
FOR i IN 1..3 FILTER ASSERT(i > 0, "i is not greater 0") RETURN i
FOR i IN 1..3 FILTER WARN(i < 2, "i is not smaller 2") RETURN i
```

### CALL()

`CALL(funcName, arg1, arg2, ... argN) → retVal`

Dynamically call the function *funcName* with the arguments specified. Arguments are given as multiple parameters and passed as separate parameters to the called function.

Both built-in and user-defined functions can be called.

- **funcName** (string): a function name
- **args** (any, *repeatable*): an arbitrary number of elements as
  multiple arguments, can be omitted
- returns **retVal** (any): the return value of the called function

```js
CALL( "SUBSTRING", "this is a test", 0, 4 )
// "this"
```
