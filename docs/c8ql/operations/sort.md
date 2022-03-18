---
sidebar_position: 6
---

SORT
====

The `SORT` statement will force a sort of the array of already produced intermediate results in the current block. `SORT` allows specifying one or multiple sort criteria and directions.  The general syntax is:

```js
SORT expression direction
```

Example query that is sorting by lastName (in ascending order), then firstName (in ascending order), then by id (in descending order):

```js
FOR u IN users
  SORT u.lastName, u.firstName, u.id DESC
  RETURN u
```

Specifying the *direction* is optional. The default (implicit) direction for a sort expression is the ascending order. To explicitly specify the sort direction, the keywords *ASC* (ascending) and *DESC* can be used. Multiple sort criteria can be separated using commas. In this case the direction is specified for each expression sperately. For example

```js
SORT doc.lastName, doc.firstName
```

will first sort documents by lastName in ascending order and then by firstName in ascending order.

```js
SORT doc.lastName DESC, doc.firstName
```

will first sort documents by lastName in descending order and then by firstName in ascending order.

```js
SORT doc.lastName, doc.firstName DESC
```

will first sort documents by lastName in ascending order and then by firstName in descending order.


:::note
When iterating over collection-based arrays, the order of documents is always undefined unless an explicit sort order is defined using `SORT`.
:::

:::note
Constant `SORT` expressions can be used to indicate that no particular sort order is desired. Constant `SORT` expressions will be optimized away by the C8QL optimizer during optimization, but specifying them explicitly may enable further optimizations if the optimizer does not need to take into account any particular sort order. This is especially the case after a `COLLECT` statement, which is supposed to produce a sorted result. Specifying an extra *SORT null* after the `COLLECT` statement allows to C8QL optimizer to remove the post-sorting of the collect results altogether.
:::