---
sidebar_position: 10
---

REMOVE
======

The `REMOVE` keyword can be used to remove documents from a collection. On a single server, the document removal is executed transactionally in an all-or-nothing fashion. 

For sharded collections, the entire query and/or remove operation may not be transactional, especially if it involves different shards and/or DB-Servers.

Each `REMOVE` operation is restricted to a single collection, and the [collection name](remove.md) must not be dynamic. Only a single `REMOVE` statement per collection is allowed per C8QL query, and it cannot be followed by read or write operations that access the same collection, by traversal operations, or C8QL functions that can read documents.

The syntax for a remove operation is:

```js
REMOVE keyExpression IN collection options
```

*collection* must contain the name of the collection to remove the documents from. *keyExpression* must be an expression that contains the document identification. This can either be a string (which must then contain the [document key](remove.md)) or a document, which must contain a *_key* attribute.

The following queries are thus equivalent:

```js
FOR u IN users
  REMOVE { _key: u._key } IN users

FOR u IN users
  REMOVE u._key IN users

FOR u IN users
  REMOVE u IN users
```

**Note**: A remove operation can remove arbitrary documents, and the documents do not need to be identical to the ones produced by a preceding `FOR` statement:

```js
FOR i IN 1..1000
  REMOVE { _key: CONCAT('test', i) } IN users

FOR u IN users
  FILTER u.active == false
  REMOVE { _key: u._key } IN backup
```

A single document can be removed as well, using a document key string or a
document with `_key` attribute:

```js
REMOVE 'john' IN users
```

```js
LET doc = DOCUMENT('users/john')
REMOVE doc IN users
```

The restriction of a single remove operation per query and collection applies. The following query causes an *access after data-modification* error because of the third remove operation:

```js
REMOVE 'john' IN users
REMOVE 'john' IN backups // OK, different collection
REMOVE 'mary' IN users   // Error, users collection again
```

Setting query options
---------------------

*options* can be used to suppress query errors that may occur when trying to remove non-existing documents. For example, the following query will fail if one of the to-be-deleted documents does not exist:

```js
FOR i IN 1..1000
  REMOVE { _key: CONCAT('test', i) } IN users
```

By specifying the *ignoreErrors* query option, these errors can be suppressed so 
the query completes:

```js
FOR i IN 1..1000
  REMOVE { _key: CONCAT('test', i) } IN users OPTIONS { ignoreErrors: true }
```

To make sure data has been written to disk when a query returns, there is the *waitForSync* 
query option:

```js
FOR i IN 1..1000
  REMOVE { _key: CONCAT('test', i) } IN users OPTIONS { waitForSync: true }
```

In order to not accidentially remove documents that have been updated since you last fetched them, you can use the option *ignoreRevs* to either let GDN compare the `_rev` values and only succeed if they still match, or let GDN ignore them (default):

```js
FOR i IN 1..1000
  REMOVE { _key: CONCAT('test', i), _rev: "1287623" } IN users OPTIONS { ignoreRevs: false }
```

The DB engine does not require collection-level locks. Different write operations on the same collection do not block each other, as long as there are no _write-write conficts_ on the same documents. From an application development perspective it can be desired to have exclusive write access on collections, to simplify the development. Note that writes do not block reads in DB.

Exclusive access can also speed up modification queries, because we avoid conflict checks.

Use the *exclusive* option to achieve this  effect on a per query basis:

```js
    FOR doc IN collection
      REPLACE doc._key 
      WITH { replaced: true } 
      OPTIONS { exclusive: true }
```


Returning the removed documents
-------------------------------

The removed documents can also be returned by the query. In this case, the `REMOVE` statement must be followed by a `RETURN` statement (intermediate `LET` statements are allowed, too).`REMOVE` introduces the pseudo-value `OLD` to refer to the removed documents:

```js
REMOVE keyExpression IN collection options RETURN OLD
```

Following is an example using a variable named `removed` for capturing the removed documents. For each removed document, the document key will be returned.

```js
FOR u IN users
  REMOVE u IN users 
  LET removed = OLD 
  RETURN removed._key
```
