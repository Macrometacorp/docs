---
title: distinctCount (Aggregate Function)
---

This returns the count of distinct occurrences for a given arg.

Syntax

```js
    <LONG> distinctCount(<INT|LONG|DOUBLE|FLOAT|STRING> arg)
```

QUERY PARAMETERS

| Name | Description                                                                 | Default Value | Possible Data Types          | Optional | Dynamic |
|------|-----------------------------------------------------------------------------|---------------|------------------------------|----------|---------|
| arg  | The object for which the number of distinct occurences needs to be counted. |               | INT LONG DOUBLE FLOAT STRING | No       | Yes     |

## Example 1

```js
    insert into barStream
    select distinctcount(pageID) as count
    from fooStream;
```

distinctcount(pageID) for the following output returns `3` when the available values are as follows.  

* WEB_PAGE_1
* WEB_PAGE_1
* WEB_PAGE_2
* WEB_PAGE_3
* WEB_PAGE_1
* WEB_PAGE_2


The three distinct occurences identified are `WEB_PAGE_1`, `WEB_PAGE_2`, and `WEB_PAGE_3`.