---
sidebar_position: 2
---

# Counting

To return the count of documents that currently exist in a collection, you can call the [LENGTH() function](../functions/array.md#length):

```
RETURN LENGTH(collection)
```

Internally, [COLLECTION_COUNT()](../functions/miscellaneous.md#count) is called.
