---
sidebar_position: 50
title: Primary Sort Order
---

When you create a search view, you can choose a primary sort order for each uniquely named attribute, enabling better optimization for iterated C8QL queries that sort by one or more attributes. If the fields match the sorting directions, the search view can read data from the index without a sorting operation. 

To customize the primary sort order, you must create the search view with HTTP or JavaScript API. You cannot change the `primarySort` option after creating a search view. 

The following example shows a search view definition paired with a C8QL query.

- Search view definition:

```json
{
  "links": {
    "coll1": {
      "fields": {
        "text": {
        }
      }
    },
    "coll2": {
      "fields": {
        "text": {
      }
    }
  },
  "primarySort": [
    {
      "field": "text",
      "direction": "asc"
    }
  ]
}
```

- C8QL query:

```js
FOR doc IN viewName
  SORT doc.text
  RETURN doc
```

The following examples show two alternative execution plans.

- Without a sorted index:

```bash
Execution plan:
 Id   NodeType            Est.   Comment
  1   SingletonNode          1   * ROOT
  2   EnumerateViewNode      1     - FOR doc IN viewName   /* view query */
  3   CalculationNode        1       - LET #1 = doc.`val`   /* attribute expression */
  4   SortNode               1       - SORT #1 ASC   /* sorting strategy: standard */
  5   ReturnNode             1       - RETURN doc
```

- With a primary sort order index:

```bash
Execution plan:
 Id   NodeType            Est.   Comment
  1   SingletonNode          1   * ROOT
  2   EnumerateViewNode      1     - FOR doc IN viewName SORT doc.`val` ASC   /* view query */
  5   ReturnNode             1       - RETURN doc
```

To define multiple sort attributes, add sub-objects to the `primarySort` array. For example:

```json
  "primarySort": [
    {
      "field": "date",
      "direction": "desc"
    },
    {
      "field": "text",
      "direction": "asc"
    }
  ]
```

In this example, we optimize a search view query to sort by text and by descending date (`SORT doc.date DESC, doc.text`). Priority is given to the first field, so queries that sort by text only are ineligible (`SORT doc.text`). This is conceptually similar to a skiplist index, except the search view index does not provide inverted sorting directions (`SORT doc.date, doc.text DESC`).
