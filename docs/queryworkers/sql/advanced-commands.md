---
sidebar_position: 10
title: Advanced SQL Queries
---

## Case Sensitivity
Case-sensitivity is supported for attribute names using `"<attribute name>"`.
Case-sensitive collections names can be used as well.

Example:

```sql
SELECT "CaseSens" FROM case_sens;
```

## Join Support
Macrometa SQL has full support for `left outer join`.

Example:

```sql
SELECT category.name, avg(film.length)
FROM film
LEFT OUTER JOIN film_category ON (film.film_id= film_category.film_id)
LEFT OUTER JOIN category ON (film_category.category_id = category.category_id)
GROUP BY category.name
ORDER BY avg(film.length) DESC
```

## WHERE and EXISTS operators
`WHERE...EXISTS` operators also supported. It has two variants:
- `WHERE EXISTS`
- `WHERE NOT EXISTS`
Both variants can be used to check subquery result.

Example:

```sql
SELECT inventory.inventory_id
FROM inventory JOIN store ON (inventory.store_id = store.store_id)
JOIN film ON (inventory.film_id = film.film_id)
JOIN rental ON (inventory.inventory_id = rental.inventory_id)
WHERE film.title = 'Academy Dinosaur'
AND store.store_id = 1
AND NOT EXISTS (
SELECT *
FROM rental
WHERE rental.inventory_id = inventory.inventory_id
AND rental.return_date IS NULL)
```

## HAVING clause
`HAVING` clause is supported.

Example:

```sql
SELECT inventory.inventory_id
FROM inventory JOIN store ON (inventory.store_id = store.store_id)
JOIN film ON (inventory.film_id = film.film_id)
JOIN rental ON (inventory.inventory_id = rental.inventory_id)
WHERE film.title = 'Academy Dinosaur'
AND store.store_id = 1
AND NOT EXISTS (
SELECT *
FROM rental
WHERE rental.inventory_id = inventory.inventory_id
AND rental.return_date IS NULL)
```

:::note
Users can't use  `HAVING` clause with subqueries.
:::

## SQL Functions
Macrometa SQL supports following functions:
- STDDEV
- STDDEV_POP
- STDDEV_SAMP
- VAR_POP
- VAR_SAMP
- MEDIAN
- PERCENTILE
- PERCENTILE_CONT

:::note
Users can use mathematical functions such as degrees and logarithm with arbitrary base.
:::

Examples:

```sql
SELECT fl.title, FLOOR(fl.length/2.34) fl, fl.length/2.34 nfl, fl.length
FROM film AS fl;
```

```sql
SELECT fl.title, FLOOR(fl.length/2.34) fl, ROUND(fl.length/2.34) rnd,
fl.length/2.34 nfl, fl.length, LOG(fl.length, 2) lg2, DEGREES(pi()) pi,
DEGREES(pi()/4) deg45
FROM film AS fl;
```

```sql
SELECT STDDEV(fl.length) div, VAR_POP(fl.length) var
FROM film AS fl;
```

:::note
Percentile function is no **aggregation function**. We can't use it in groupings in the similar manner `STDDEV` and `VAR_POP`.
:::

Example on how to use percentile function:

```sql
select PERCENTILE((select fl.length from film as fl), 0.5) med;
```

Absolute value operator is supported.

Example:

```sql
SELECT @ -123.45;
```