---
sidebar_position: 130
title: Execution Plan to Optimize Indexes
---

Proper indexing is key to query performance. [C8QL](/docs/queries/c8ql/) provides an [`Execution Plan`](/docs/queries/running-queries#execution-plan) for all valid queries to show optimization rules and indexes being used.  Click the `Execution Plan` button,  below the Query Workers editor, to view the plan. The same information is available from the [Explain an C8QL API endpoint](/docs/api#/operations/explainQuery)

The `Indexes used` section of the execution plan shows which indexes are utilized by the query. If there are no indexes used, or there are no fields matching the `FILTER` attributes, you should create a new index with those attributes. Indexes can be created from the Macrometa Web Console collection page or the [Create index API endpoints](/docs/api#/operations/createIndex:general).

## Example Query with FILTER

```sql
FOR car IN cars
FILTER car.type == 'SUV'
SORT car._key DESC
RETURN car
```
## Example Query Execution Plan Before Indexing
The image below shows the execution plan before indexing. You can see the primary index, which is created with the collection is the only index being utilized.

```json
Query String:
 FOR car IN Cars
 FILTER car.type == 'SUV'
 SORT car._key DESC
 RETURN car 

Execution plan:
 Id   NodeType          Est.   Comment
  1   SingletonNode        1   * ROOT
  8   IndexNode            1     - FOR car IN Cars   /* reverse primary index scan */
  3   CalculationNode      1       - LET #1 = (car.`type` == "SUV")   /* simple expression */   /* collections used: car : Cars */
  4   FilterNode           1       - FILTER #1
  7   ReturnNode           1       - RETURN car

Indexes used:
 By   Name      Type      Collection   Unique   Sparse   Selectivity   Fields       Ranges
  8   primary   primary   Cars         true     false       100.00 %   [ `_key` ]   *

Optimization rules applied:
 Id   RuleName
  1   move-calculations-up
  2   move-filters-up
  3   move-calculations-up-2
  4   move-filters-up-2
  5   use-indexes
  6   use-index-for-sort
  7   remove-unnecessary-calculations-2
```

 ## Example Query Execution Plan After Indexing

After reviewing the `Indexes used` section we have created a persistent index on the `type` attribute being used in the `FILTER` expression. The new index, we have named `car_type_idx`, is now being utilized in the `Execution Plan`. 

```json
Query String:
 FOR car IN cars
 FILTER car.type == 'SUV'
 SORT car._key DESC
 RETURN car 

Execution plan:
 Id   NodeType          Est.   Comment
  1   SingletonNode        1   * ROOT
  8   IndexNode            1     - FOR car IN cars   /* persistent index scan */
  5   CalculationNode      1       - LET #3 = car.`_key`   /* attribute expression */   /* collections used: car : cars */
  6   SortNode             1       - SORT #3 DESC   /* sorting strategy: standard */
  7   ReturnNode           1       - RETURN car

Indexes used:
 By   Name           Type         Collection   Unique   Sparse   Selectivity   Fields       Ranges
  8   car_type_idx   persistent   cars         false    false        66.67 %   [ `type` ]   (car.`type` == "SUV")

Optimization rules applied:
 Id   RuleName
  1   move-calculations-up
  2   move-filters-up
  3   move-calculations-up-2
  4   move-filters-up-2
  5   use-indexes
  6   remove-filter-covered-by-index
  7   remove-unnecessary-calculations-2
```

The following is the link to the index documentation. Based on your needs, select the attribute(s) and the correct type of index.
[Working With Indexes](https://macrometa.com/docs/collections/indexing/working-with-indexes).