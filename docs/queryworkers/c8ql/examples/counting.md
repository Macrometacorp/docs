---
sidebar_position: 2
title: Counting
---

To return the count of documents that currently exist in a collection, you can call the [LENGTH() function](../functions/array#length):

```js
RETURN LENGTH(collection)
```

Internally, [COLLECTION_COUNT()](../functions/database#count) is called.
