---
title: distinctCount (Aggregate Function)
---

This returns the count of distinct occurrences for a given arg.

## Syntax

```sql
    <LONG> distinctCount(<INT|LONG|DOUBLE|FLOAT|STRING> arg)
```

## Query Parameters

| Name | Description       | Default Value | Possible Data Types          | Optional | Dynamic |
|------|-------------------|---------------|------------------------------|----------|---------|
| arg  | The object for which the number of distinct occurences needs to be counted. |               | INT LONG DOUBLE FLOAT STRING | No       | Yes     |

## Example 1

```sql
@info(name = 'query1')
INSERT INTO barStream
SELECT DISTINCTCOUNT(pageID) AS count
FROM fooStream;
```

This query, named 'query1', selects records from the `fooStream` and uses the `DISTINCTCOUNT` function to calculate the count of distinct `pageID` values. The resulting distinct count is aliased as `count` and inserted into the `barStream`.

Essentially, this query processes records in the `fooStream` and creates new records in the `barStream` with the distinct count of `pageID` values.

`distinctcount(pageID)` for the following output returns `3` when the available values are as follows.  

- WEB_PAGE_1
- WEB_PAGE_1
- WEB_PAGE_2
- WEB_PAGE_3
- WEB_PAGE_1
- WEB_PAGE_2

The three distinct occurrences identified are `WEB_PAGE_1`, `WEB_PAGE_2`, and `WEB_PAGE_3`.
