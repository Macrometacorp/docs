---
sidebar_position: 160
title: Troubleshoot Indexes
---

When in doubt about whether and which indexes will be used for executing a given C8QL query, click **Execution Plan** in the web interface in the Queries view.

If any of the explain methods shows that a query is not using indexes, the following steps may help:

- Check if the attribute names in the query are correctly spelled. In a schema-free database, documents in the same collection can have varying structures. There is no such thing as a `non-existing attribute` error. A query that refers to attribute names not present in any of the documents will not return an error, and obviously will not benefit from indexes.

- Check the value of the `Indexes Used` method for the collections used in the query and validate that indexes are actually present on the attributes used in the query filter conditions.

- If indexes are present but not used by the query, the indexes may have the wrong type. For example, a hash index will only be used for equality comparisons (i.e. `==`) but not for other comparison types such as `<`, `<=`, `>`, `>=`. Additionally hash indexes will only be used if all of the index attributes are used in the query's FILTER conditions. A skiplist index will only be used if at least its first attribute is used in a FILTER condition. If additionally of the skiplist index attributes are specified in the query (from left-to-right), they may also be used and allow to filter more documents.

- Using indexed attributes as function parameters or in arbitrary expressions will likely lead to the index on the attribute not being used. For example, the following queries will not use an index on `value`:

```sql
      FOR doc IN collection FILTER TO_NUMBER(doc.value) == 42 RETURN doc
      FOR doc IN collection FILTER doc.value - 1 == 42 RETURN doc
```

  In these cases the queries should be rewritten so that only the index attribute is present on one side of the operator, or additional filters and indexes should be used to restrict the amount of documents otherwise.

- Certain C8QL functions such as `WITHIN()` or `FULLTEXT()` do utilize indexes internally, but their use is not mentioned in the query explanation for functions in general. These functions will raise query errors (at runtime) if no suitable index is present for the collection in question.

- The query optimizer will in general pick one index per collection in a query. It can pick more than one index per collection if the FILTER condition contains multiple branches combined with logical `OR`.  For example, the following queries can use indexes:

```sql
      FOR doc IN collection FILTER doc.value1 == 42 || doc.value1 == 23 RETURN doc
      FOR doc IN collection FILTER doc.value1 == 42 || doc.value2 == 23 RETURN doc
      FOR doc IN collection FILTER doc.value1 < 42 || doc.value2 > 23 RETURN doc
```

  The two `OR`s in the first query will be converted to an `IN` list, and if there is a suitable index on `value1`, it will be used. The second query requires two separate indexes on `value1` and `value2` and will use them if present. The third query can use the indexes on `value1` and `value2` when they are sorted.
