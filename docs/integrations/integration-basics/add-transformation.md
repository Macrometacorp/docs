---
title: Supported Transformations
sidebar_position: 30
---

## Supported Stream QL

Basically, we only allow the user to write a single query[1], and anything that can be written within the query will be allowed with the transformation except for the following restrictions;

We Support:
- Inline Windows.
- All the Functions mentioned in [2]
- Filters[3]
- Simple Aggregate Functions[4]
- HAVING|WHERE|GROUP BY|ORDER BY|LIMIT|OFFSET|OUTPUT Rate limit [5][6][7][8]&[9]

We don’t Support:
- Creation of any element such as TABLES, SOURCES, SINKS, TRIGGERS, and etc...
- Named Windows
- Named Aggregations
- Custom-script-functions.
- Any sort of joins
- Partitioning
- Ad Hoc Queries

[1] <https://www.macrometa.com/docs/cep/query-guide/query#syntax>
[2] <https://www.macrometa.com/docs/cep/query-guide/functions/>
[3] <https://www.macrometa.com/docs/cep/query-guide/filters/>
[4] <https://www.macrometa.com/docs/cep/query-guide/aggregate-functions>
[5] <https://www.macrometa.com/docs/cep/query-guide/having-where>
[6] <https://www.macrometa.com/docs/cep/query-guide/group-by>
[7] <https://www.macrometa.com/docs/cep/query-guide/order-by>
[8] <https://www.macrometa.com/docs/cep/query-guide/limit-and-offset>
[9] <https://www.macrometa.com/docs/cep/query-guide/output-rate-limiting>
