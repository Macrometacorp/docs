---
sidebar_position: 80
title: Composite Indexes
---

If there are multiple attributes used in [`FILTER`](/docs/queries/c8ql/operations/filte) criteria, it’s recommended to use a composite index by creating a [Persitent Index](/docs/collections/indexing/persistent-indexes) with a comma-separated list of the attributes. 

For example, if there are `3` attributes used in `FILTER`, the `composite index` created on these 3 attributes will give better query performance than `3` separate indexes. In the case of separate indexes for each attribute only one index of the indexes would be used, reducing the selectivity.

## Example Query with Multiple Filter Conditions

```sql
FOR p IN players
FILTER p.country == "United Kingdom" 
  AND p.age == 28 
  AND p.rank == 3
RETURN p
```

## Example Execution Plan with Separate Persistent Indexes

```json
Query String:
 FOR p IN players
 FILTER p.country == "United Kingdom" AND p.age == 28 AND p.rank == 3
 RETURN p 

Execution plan:
 Id   NodeType          Est.   Comment
  1   SingletonNode        1   * ROOT
  6   IndexNode            1     - FOR p IN players   /* persistent index scan */
  7   CalculationNode      1       - LET #1 = ((p.`age` == 28) && (p.`rank` == 3))   /* simple expression */   /* collections used: p : players */
  4   FilterNode           1       - FILTER #1
  5   ReturnNode           1       - RETURN p

Indexes used:
 By   Name         Type         Collection   Unique   Sparse   Selectivity   Fields          Ranges
  6   countryIdx   persistent   players      false    false       100.00 %   [ `country` ]   (p.`country` == "United Kingdom")

Optimization rules applied:
 Id   RuleName
  1   use-indexes
  2   remove-filter-covered-by-index
```

## Example Execution Plan with Composite Persistent Index

```json
Query String:
 FOR p IN players
 FILTER p.country == "United Kingdom" AND p.age == 28 AND p.rank == 3
 RETURN p 

Execution plan:
 Id   NodeType        Est.   Comment
  1   SingletonNode      1   * ROOT
  6   IndexNode          1     - FOR p IN players   /* persistent index scan */
  5   ReturnNode         1       - RETURN p

Indexes used:
 By   Name           Type         Collection   Unique   Sparse   Selectivity   Fields                         Ranges
  6   compositeIdx   persistent   players      false    false       100.00 %   [ `country`, `age`, `rank` ]   ((p.`country` == "United Kingdom") && (p.`age` == 28) && (p.`rank` == 3))

Optimization rules applied:
 Id   RuleName
  1   use-indexes
  2   remove-filter-covered-by-index
  3   remove-unnecessary-calculations-2
```