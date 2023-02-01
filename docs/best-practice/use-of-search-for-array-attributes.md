---
sidebar_position: 50
title: Use of SEARCH for array attributes
---

If the user wants to `FILTER` against an array of values the `ALL`, `ANY`, and `NONE` operators are used. Array indexes would not help because those are not utilized. Users can create `SEARCH VIEW` to optimize these queries.

To filter attributes against an array of values you would commonly use the array comparison operators, `ALL`, `ANY`, or `NOT`, as a prefix in conjunction with the common comparison operator `IN`. However, this is not an optimized approach and will not utilize any indexes.

The optimized approach used the `SEARCH` feature. An index is created on the attributes defined in the search view. You can read more about `SEARCH` and search views here, [search](https://macrometa.com/docs/search/search).

```
/* Query on a collection with FILTER */

LET carMakes = ["Ford", "Audi", "Mazda"]
   FOR car in cars
       FILTER car.make ANY IN carMakes
       FILTER car.type == "SUV"
   RETURN { car : car}

/* Query on Search view with SEARCH */
/* Search VIEW is created with the required attributes. */

LET carMakes = ["Ford", "Audi", "Mazda"]
   FOR car in CARS_VIEW
     SEARCH ANALYZER(car.make ANY IN carMakes), "identity")
	 RETURN car
```