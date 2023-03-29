---
sidebar_position: 50
title: Use subqueries in place of multiple for loops
---

For a query containing multiple `FOR` loops, the number of iterations to evaluate the query is equal to the number of documents in each collection multiplied by one another. 

For example,  if there are `x`, `y`, and `z` documents in `collection1`, `collection2`, and `collection3` respectively, then there will be `x * y * z` iterations done to evaluate the query.

```
FOR i in collection1
	FOR j in collection2
		FOR k in collection3
				return i * j * k;
```

Instead of multiple nested `FOR` loops, we can store the results of a subquery in a variable. Using that variable in a `FOR` loop will decrease the number of iterations. Additionally, we can take a projection of documents returned in each loop based on `FILTER` criteria. Using the expected record count in each `FOR` loop, it can be determined which subquery returns the fewest documents. 

An example of an unoptimized query with multiple `FOR` loops. Here we can see the `FILTER` conditions are applied after the last `FOR` loop. This is inefficient and possibly difficult to understand.

```
FOR customer in Accounts
  FOR car IN Cars
    FOR job IN Orders
      FILTER customer.id == 123
      FILTER customer.id == car.customer_id
      FILTER car._id == job.car_id
      FILTER car.type == "TRUCK"
      FILTER job.staff_id == 553
RETURN {
  "customer": {
  "id": customer.id,
	"first_name": customer.first_name,
	"last_name": customer.last_name				
},
  "order": job.invoice_number,
  "make": car.make,
  "year": car.year,
  "date": job.date,
  "price": job.price
}
```

In this optimized example, we use a subquery to retrieve a projection of a smaller subset of data. This reduces the number of iterations required to return the final results.

```
LET customerCars = (
  FOR customer IN Accounts 
    FILTER customer.id == 123
    FOR car IN Cars 
      FILTER car.customer_id == customer.id
      FILTER car.type == "Truck"
  RETURN { "car_id": car._id,
           "customer_id": customer.id,
           "customer_first_name": customer.first_name,
           "customer_last_name": customer.last_name
  }
)

FOR car IN customerCars
  FOR job in Orders
    FILTER car.car_id == job.car_id
    FILTER job.staff_id == 553
RETURN {
  "customer": {
  "id": car.customer_id,
	"first_name": car.customer_first_name,
	"last_name": car.customer_last_name				
},
  "order": job.invoice_number,
  "make": car.make,
  "year": car.year,
  "date": job.date,
  "price": job.price
}
```

Another approach is to place the `FILTER` before each `FOR` loop. This also reduces the number of iterations.