---
title: Ad Hoc Queries
sidebar_position: 1
---

Ad hoc queries are on-demand queries that can be used to perform operations on tables (stores or collections), named windows, and named aggregations. You can send ad hoc queries and fetch data from stores and named windows.

## Purpose

Ad hoc queries allow you to execute the following operations on tables (collections), windows, and aggregators without the intervention of streams.

Queries supported for tables:

- INSERT
- SELECT
- DELETE
- UPDATE
- UPDATE OR INSERT

Queries supported for windows and aggregators:

- SELECT

## Syntax

Ad hoc queries use the following syntax:

```js
	select * from SampleAdhocQueryInputTableOneMinTimeWindow;
	
	SELECT * FROM SampleAdhocQueryTable;
```

In order to execute ad hoc queries, the stream worker you are using should have a sink or defined that contains the table, window, or aggregator to be queried.

## Next Steps

- [Perform ad hoc queries](perform-ad-hoc-queries.md).
- [Look at ad hoc query examples](ad-hoc-examples.md).
