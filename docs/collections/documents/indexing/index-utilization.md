---
sidebar_position: 3
title: Index Utilization
---


# Index Utilization

In most cases GDN will use a single index per collection in a given query. C8QL queries can use more than one index per collection when multiple FILTER conditions are combined with a logical `OR` and these can be covered by indexes. C8QL queries will use a single index per collection when FILTER conditions are combined with logical `AND`.

Creating multiple indexes on different attributes of the same collection may give the query optimizer more choices when picking an index. Creating multiple indexes on different attributes can also help in speeding up different queries, with FILTER conditions on different attributes.

It is often beneficial to create an index on more than just one attribute. By adding more attributes to an index, an index can become more selective and thus reduce the number of documents that queries need to process.

GDN's primary indexes, edges indexes and hash indexes will automatically provide selectivity estimates. Index selectivity estimates are provided in the web interface, the `getIndexes()` return value and in the `explain()` output for a given query. 

The more selective an index is, the more documents it will filter on average. The index selectivity estimates are therefore used by the optimizer when creating query execution plans when there are multiple indexes the optimizer can choose from. The optimizer will then select a combination of indexes with the lowest estimated total cost. In general, the optimizer will pick the indexes with the highest estimated selectivity.

Sparse indexes may or may not be picked by the optimizer in a query. As sparse indexes do not contain `null` values, they will not be used for queries if the optimizer cannot safely determine whether a FILTER condition includes `null` values for the index attributes. The optimizer policy is to produce correct results, regardless of whether or which index is used to satisfy FILTER conditions. If it is unsure about whether using an index will violate the policy, it will not make use of the index.
