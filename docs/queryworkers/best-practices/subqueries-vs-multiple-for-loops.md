---
sidebar_position: 120
title: Subqueries vs Multiple FOR Loops
---

For queries containing multiple `FOR` loops, the number of iterations to evaluate the query is equal to the number of documents in each collection multiplied by one another. 

For example, if there are `x`, `y`, and `z` number of documents in `collection1`, `collection2`, and `collection3`, respectively, there will be `x * y * z` number of iterations done to evaluate the query.

```sql
FOR x in collection1
	FOR y in collection2
		FOR z in collection3
				return x * y * z;
```

Instead of multiple nested `FOR` loops, we can store the results of a [subquery](/docs/queryworkers/c8ql/examples/subqueries) in a variable. Using a variable in a `FOR` loop will decrease the number of iterations. Additionally, we can take a projection of documents returned in each loop based on `FILTER` criteria. Using the expected record count in each `FOR` loop, it can be determined which subquery returns the fewest documents. 

## Example of Query with No Subqueries

Below is an example of an unoptimized query with multiple `FOR` loops. Here we can see the `FILTER` conditions are applied after the last `FOR` loop. This is inefficient and potentially difficult to understand.

```sql
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

## Example of Query with Subqueries

In this optimized example, we use a subquery to retrieve a projection of a smaller subset of data. By assigning variables to hold the results of the subqueries we reduce the number of iterations required to return the final results.

```sql
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
## Example with FILTER for each FOR Loop

An approach without using subqueries is to `FILTER` on each collection as the query is built. This way each `FOR` loop reduces the number of records to be scanned in subsequent `FOR` loops. This will reduce the number of iterations.

```sql
FOR customer in Accounts
  FILTER customer.id == 123
  FOR car IN Cars
    FILTER customer.id == car.customer_id
    FILTER car.type == "Truck"
    FOR job IN Orders
      FILTER car._id == job.car_id
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