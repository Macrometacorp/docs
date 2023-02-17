---
sidebar_position: 70
title: Indexing Collect Operations
---

If there is a `COLLECT` operation in the query, the records with similar attribute values are grouped.  Persistent index on the attribute value on which `COLLECT` operation is performed helps to optimize the query. In the following example, the persistent index on the `country` attribute will help to optimize the query.

```sql
FOR p IN players
  COLLECT country = p.country
  RETURN {
    "country" : country
  }
```

## Execution Plan without Index

You can see in the execution plan that no indexes were used resulting in a full collection scan.

```json
Query String:
 FOR p in players
 COLLECT country = p.country
 RETURN {
     "country": country
 } 

Execution plan:
 Id   NodeType                  Est.   Comment
  1   SingletonNode                1   * ROOT
  2   EnumerateCollectionNode      4     - FOR p IN players   /* full collection scan, projections: `country` */
  3   CalculationNode              4       - LET #2 = p.`country`   /* attribute expression */   /* collections used: p : players */
  4   CollectNode                  4       - COLLECT country = #2   /* hash */
  7   SortNode                     4       - SORT country ASC   /* sorting strategy: standard */
  5   CalculationNode              4       - LET #4 = { "country" : country }   /* simple expression */
  6   ReturnNode                   4       - RETURN #4

Indexes used:
 none
```

## Execution Plan with Index

With a [Persistent Index](/docs/collections/indexing/persistent-indexes) created on the "country" attribute the execution plan is now using the index. Using the index applies optimization rules to increase performance.

```json
Query String:
 FOR p in players
 COLLECT country = p.country
 RETURN {
     "country": country
 } 

Execution plan:
 Id   NodeType          Est.   Comment
  1   SingletonNode        1   * ROOT
  8   IndexNode            4     - FOR p IN players   /* persistent index scan, index only, projections: `country` */
  3   CalculationNode      4       - LET #2 = p.`country`   /* attribute expression */   /* collections used: p : players */
  4   CollectNode          4       - COLLECT country = #2   /* sorted */
  5   CalculationNode      4       - LET #4 = { "country" : country }   /* simple expression */
  6   ReturnNode           4       - RETURN #4

Indexes used:
 By   Name         Type         Collection   Unique   Sparse   Selectivity   Fields          Ranges
  8   countryIdx   persistent   players      false    false       100.00 %   [ `country` ]   *

Optimization rules applied:
 Id   RuleName
  1   use-indexes
  2   use-index-for-sort
  3   reduce-extraction-to-projection
```