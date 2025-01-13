---
sidebar_position: 2
title: Counting
---

To return the count of documents that currently exist in a collection, you can call the [LENGTH() function](../c8ql/functions/array.md#length):

```js
RETURN LENGTH(collection)
```

Internally, [COLLECTION_COUNT()](../c8ql/functions/database.md#count) is called.
