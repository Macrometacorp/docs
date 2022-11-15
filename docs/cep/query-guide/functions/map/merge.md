---
title: merge (Aggregate Function)
---

Collect multiple maps to merge as a single map. Only distinct keys are collected, if a duplicate key arrives, it overrides the old value.

Syntax

    <OBJECT> map:merge(<OBJECT> map)

## Query Parameters

| Name | Description          | Default Value | Possible Data Types | Optional | Dynamic |
|------|----------------------|---------------|---------------------|----------|---------|
| map  | Maps to be collected |               | OBJECT              | No       | Yes     |

## Example 1

    insert into OutputStream
    select map:merge(map) as stockDetails
    from StockStream WINDOW TUMBLING_LENGTH(2);

For the window expiration of 2 events, the merge() function will collect attributes of `map` and merge them to a single map, returned as stockDetails.
