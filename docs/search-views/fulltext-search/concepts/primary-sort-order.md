---
sidebar_position: 20
title: Understanding Primary Sort Order
---

Search views are a powerful tool for querying your data. However, the way you configure them can greatly impact their performance and efficiency. One significant way to enhance your search view is by defining a primary sort order.

## Why Primary Sort Order Matters

Primary sort order allows you to predefine the sort order for one or more attributes in your search view. This optimization can significantly enhance the performance of C8QL queries that sort by these attributes, as the search view can read data directly from the index without requiring an additional sort operation.

## Defining the Primary Sort Order

To customize the primary sort order, you'll need to [create a search view](../tasks/create-search-views). Note that the `primarySort` option cannot be changed after creating a search view.

When you view the search view using the API, CLI, or SDK, it is presented in a JSON format. Here's an example of a search view definition with a primary sort order:

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

This configuration will optimize a C8QL query that sorts by the 'text' attribute:

```sql
FOR doc IN viewName
  SORT doc.text
  RETURN doc
```

## Impact on Query Execution Plans

To illustrate the difference a primary sort order can make, consider the following two execution plans for the C8QL query provided above:

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

By using a primary sort order index, the sort operation is eliminated, streamlining the query execution.

## Defining Multiple Sort Attributes

You can also optimize for multiple sort attributes by adding sub-objects to the `primarySort` array. Here's an example:

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

In this example, a search view query is optimized to sort by both 'text' and by 'date' in descending order (`SORT doc.date DESC, doc.text`). Priority is given to the first field, so queries that sort by 'text' only will not benefit from the optimization (`SORT doc.text`). This mechanism is similar to a skiplist index, but note that the search view index does not support inverted sorting directions (`SORT doc.date, doc.text DESC`).

By defining a thoughtful primary sort order, you can optimize your search views and improve your applications' performance and efficiency.
