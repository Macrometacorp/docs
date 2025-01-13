---
sidebar_position: 4
title: FILTER
---

The `FILTER` statement can be used to restrict the results to elements that match an arbitrary logical condition.

General syntax
--------------

```js
FILTER expression
```

`expression` must be a condition that evaluates to either _false_ or _true_. If the condition result is false, the current element is skipped, so it will not be processed further and not be part of the result. If the condition is true, the current element is not skipped and can be further processed.

See [Operators](../operators.md) for a list of comparison operators, logical operators etc. that you can use in conditions.

```js
FOR u IN users
  FILTER u.active == true && u.age < 39
  RETURN u
```

It is allowed to specify multiple `FILTER` statements in a query, even in the same block. If multiple `FILTER` statements are used, their results will be combined with a logical AND, meaning all filter conditions must be true to include an element.

```js
FOR u IN users
  FILTER u.active == true
  FILTER u.age < 39
  RETURN u
```

In the above example, all array elements of _users_  that have an attribute _active_ with value _true_ and that have an attribute _age_ with a value less than _39_ (including _null_ ones) will be included in the result. All other elements of _users_ will be skipped and not be included in the result produced by `RETURN`. Refer to [Queries with Null Attributes](../queries-null-attributes.md) for a description of the impact of non-existent or null attributes.

Order of operations
-------------------

:::note
The positions of `FILTER` statements can influence the result of a query. There are 16 active users in the [test data](../../query-examples/index.md#example-data) for instance:
:::

```js
FOR u IN users
  FILTER u.active == true
  RETURN u
```

We can limit the result set to 5 users at most:

```js
FOR u IN users
  FILTER u.active == true
  LIMIT 5
  RETURN u
```

This may return the user documents of Jim, Diego, Anthony, Michael and Chloe for instance. Which ones are returned is undefined, since there is no `SORT` statement to ensure a particular order. If we add a second `FILTER` statement to only return women.

```js
FOR u IN users
  FILTER u.active == true
  LIMIT 5
  FILTER u.gender == "f"
  RETURN u
```

This might just return the Chloe document, because the `LIMIT` is applied before the second `FILTER`. No more than 5 documents arrive at the second `FILTER` block, and not all of them fulfill the gender criterion, even though there are more than 5 active female users in the collection. A more deterministic result can be achieved by adding a `SORT` block:

```js
FOR u IN users
  FILTER u.active == true
  SORT u.age ASC
  LIMIT 5
  FILTER u.gender == "f"
  RETURN u
```

This will return the users Mariah and Mary. If sorted by age in _DESC_ order, then the Sophia, Emma and Madison documents are returned. A `FILTER` after a `LIMIT` is not very common however, and you probably want such a query instead:

```js
FOR u IN users
  FILTER u.active == true AND u.gender == "f"
  SORT u.age ASC
  LIMIT 5
  RETURN u
```

The significance of where `FILTER` blocks are placed allows that this single keyword can assume the roles of two SQL keywords, _WHERE_ as well as _HAVING_. C8QL's `FILTER` thus works with `COLLECT` aggregates the same as with any other intermediate result, document attribute etc.
