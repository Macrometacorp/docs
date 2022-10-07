---
title: Database Functions
---

C8QL includes database functions.

## COLLECTION_COUNT()

`COLLECTION_COUNT(coll) → count`

Determine the amount of documents in a collection. [LENGTH()](#length) is preferred.

## COLLECTIONS()

`COLLECTIONS() → docArray`

Return an array of collections.

- returns **docArray** (array): each collection as a document with attributes
  _name_ and __id_ in an array

## COUNT()

This is an alias for [LENGTH()](#length).

## CURRENT_USER()

`CURRENT_USER() → userName`

Return the name of the current user.

The current user is the user account name specified in the _Authorization_ HTTP header of the request. If you ran the query as a request, authentication must be enabled on the server. Otherwise, the return value is _null_.

- returns **userName** (string\|null): the current user name.

## CURRENT_USER_ATTRIBUTE()

`CURRENT_USER_ATTRIBUTE() → attribute`

Returns attributes that are assigned to a user.

You can use these attributes to restrict access to documents. For example, you can add a document with an attribute `Department: finance` and create a similar `{ Department: finance }` attribute for an authorized user, then write the following query:

```js
FOR d IN data
FILTER CURRENT_USER_ATTRIBUTE(“Department”) == d.Department
RETURN d
```

To ensure security, verify that accounts who can access this query cannot also modify it and circumvent the attribute.

## CURRENT_APIKEY_ATTRIBUTE()

`CURRENT_APIKEY_ATTRIBUTE() → attribute`

Returns attributes that are assigned to an API key.

You can use these attributes to restrict access to documents. For example, you can add a document with an attribute `Department: finance` and create a similar `{ Department: finance }` attribute for an API key, then write the following query:

```js
FOR d IN data
FILTER CURRENT_USER_ATTRIBUTE(“Department”) == d.Department
RETURN d
```

To ensure security, verify that accounts who can access this query cannot also modify it and circumvent the attribute.

## DECODE_REV()

`DECODE_REV(revision) → details`

Decompose the specified `revision` string into its components. The resulting object has a `date` and a `count` attribute. This function is supposed to be called with the `_rev` attribute value of a database document as argument.

- **revision** (string): revision ID string
- returns **details** (object\|null): object with two attributes _date_ (string in ISO 8601 format) and _count_ (integer number), or _null_

If the input revision ID is not a string or cannot be processed, the function issues a warning and returns _null_.

Please note that the _date_ value in the current result provides the date and time of when the document record was put together on the server, but not necessarily the time of insertion into the underlying storage engine. Therefore in case of concurrent document operations the exact document storage order cannot be derived unambiguously from the revision value. It should thus be treated as a rough estimate of when a document was created or last updated.

```js
DECODE_REV( "_YU0HOEG---" )
// { "date" : "2019-03-11T16:15:05.314Z", "count" : 0 }
```

## DOCUMENT()

`DOCUMENT(collection, id) → doc`

Return the document which is uniquely identified by its _id_. GDN will try to find the document using the __id_ value of the document in the specified collection.

If there is a mismatch between the _collection_ passed and the collection specified in _id_, then _null_ will be returned. Additionally, if the _collection_ matches the collection value specified in _id_ but the document cannot be found, _null_ will be returned.

This function also allows _id_ to be an array of ids. In this case, the function will return an array of all documents that could be found.

It is also possible to specify a document key instead of an id, or an array of keys to return all documents that can be found.

- **collection** (string): name of a collection
- **id** (string\|array): a document handle string (consisting of collection name and document key), a document key, or an array of both document handle strings and document keys
- returns **doc** (document\|array\|null): the content of the found document, an array of all found documents or _null_ if nothing was found

```js
DOCUMENT( users, "users/john" )
DOCUMENT( users, "john" )

DOCUMENT( users, [ "users/john", "users/amy" ] )
DOCUMENT( users, [ "john", "amy" ] )
```

`DOCUMENT(id) → doc`

The function can also be used with a single parameter _id_ as follows:

- **id** (string\|array): either a document handle string (consisting of
  collection name and document key) or an array of document handle strings
- returns **doc** (document\|null): the content of the found document
  or _null_ if nothing was found

```js
DOCUMENT("users/john")
DOCUMENT( [ "users/john", "users/amy" ] )
```

Please also consider to use
[`DOCUMENT` in conjunction with `WITH`](../operations/with.md)

## LENGTH()

`LENGTH(coll) → documentCount`

Determine the amount of documents in a collection.

It calls [COLLECTION_COUNT()](#collection_count) internally.

- **coll** (collection): a collection (not string)
- returns **documentCount** (number): the total amount of documents in _coll_

_LENGTH()_ can also determine the [number of elements](array.md#length) in an array,
the [number of attribute keys](document.md#length) of an object / document and
the [character length](string.md#length) of a string.
