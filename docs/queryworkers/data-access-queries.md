---
title: Data Access Queries
---

Retrieving data from the database with C8QL does always include a **RETURN** operation. It can be used to return a static value, such as a string:

```js
RETURN "Hello C8!"
```

The query result is always an array of elements, even if a single element was returned and contains a single element in that case: `["Hello C8!"]`

The function `DOCUMENT()` can be called to retrieve a single document via its document handle, for instance:

```js
RETURN DOCUMENT("users/phil")
```

`RETURN` is usually accompanied by a `FOR` loop to iterate over the documents of a collection. 

The following query executes the loop body for all documents of a collection called `users`. Each document is returned unchanged in this example:

```js
FOR doc IN users
    RETURN doc
```

Instead of returning the raw `doc`, one can easily create a projection:

```js
FOR doc IN users
    RETURN { user: doc, newAttribute: true }
```

For every user document, an object with two attributes is returned. The value of the attribute `user` is set to the content of the user document, and `newAttribute` is a static attribute with the boolean value *true*.

Operations like **FILTER**, **SORT** and **LIMIT** can be added to the loop body to narrow and order the result. Instead of above shown call to `DOCUMENT()`, one can also retrieve the document that describes user `phil` like so:

```js
FOR doc IN users
    FILTER doc._key == "phil"
    RETURN doc
```

The document key is used in this example, but any other attribute could equally be used for filtering. Since the document key is guaranteed to be unique, no more than a single document will match this filter. For other attributes this may not be the case.

To return a subset of active users (determined by an attribute called `status`), sorted by name in ascending order, you can do:

```js
FOR doc IN users
    FILTER doc.status == "active"
    SORT doc.name
    LIMIT 10
```

:::note
Operations do not have to occur in a fixed order and that their order can influence the result significantly. Limiting the number of documents before a filter is usually not what you want, because it easily misses a lot of documents that would fulfill the filter criterion, but are ignored because of a premature `LIMIT` clause.  Because of the aforementioned reasons, `LIMIT` is usually put at the very end, after `FILTER`, `SORT` and other operations.
:::

Refer to [C8QL Operations](../c8ql/operations/index.md) for more information.
