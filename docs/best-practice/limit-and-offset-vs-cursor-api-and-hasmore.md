---
sidebar_position: 50
title: LIMIT and OFFSET vs Cursor API and hasMore
---


## **Practice 1: LIMIT and OFFSET vs Cursor API and hasMore**

Queries that return large volumes of data may require more than one response to provide the complete results. A common method is using the `LIMIT` and `OFFSET` statements in the query. However, this is not the optimized approach. When these options are used, each time the query is invoked query processing is performed. 

A better approach is to use the `cursor` API.  The response from the cursor API call contains a boolean attribute, `hasMore`. If `hasMore` is true, the next batch of records will be ready on the server. In subsequent calls, the records are returned from the last position. 

The `batchSize` parameter can be set in the `cursor` API to configure the number of documents returned per request. The `batchSize` default is `100` and the maximum value is `1000`. 

**Query with `LIMIT` and `OFFSET`**

```sql
FOR car in Cars
FILTER car.type == 'SUV'
SORT car._key DESC
LIMIT 0, 3
RETURN car
```

**Query without `LIMIT` and `OFFSET`**

```sql
FOR car in Cars
FILTER car.type == 'SUV'
SORT car._key DESC
RETURN car
```

**Cursor API Request Example (create cursor)**

The request body has attributes for `batchSize`, `bindVars`, `count`,  `query`, and `options`. The `options` attribute can receive several different key/value pairs. To utilize `hasMore` we will need to include the `stream` attribute set to `true`. Note the default value for `stream` is `false`.

```bash
curl -X 'POST' \
  'https://api-gdn.paas.macrometa.io/_fabric/_system/_api/cursor' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: bearer <token>' \
	-d '{
  "batchSize": 100,
  "bindVars": {},
  "options": {
    "stream": true
  },
  "query": "FOR car in Cars FILTER car.type == '\''SUV'\'' SORT car._key DESC RETURN car",
  "ttl": 30
}'
```

**Cursor API Response Example (create cursor)**

The response from the Cursor API request will contain several attributes. The most important to this example are `hasMore` and `id`. The `id` identifies the cursor during subsequent requests and `hasMore` is a boolean value to indicate whether there are more results to be retrieved.

```json
{
  "result": [
     {
        {
    "_id": "Cars/377189715",
    "_key": "377189715",
    "_rev": "_eWFT8Eu--_",
    "customer_id": 994,
    "make": "Jeep",
    "model": "Wagoneer",
    "type": "SUV",
    "year": 2022
  },
     ...
	     {
    "_id": "Cars/377187243",
    "_key": "377187243",
    "_rev": "_eWFTXbS--_",
    "customer_id": 890,
    "make": "Volkswagen",
    "model": "Atlas",
    "type": "SUV",
    "year": 2021
  }
  ],
  "hasMore": true, // shows if there are more results
  "id": "463970894", // identifies the cursor to return the next batch
  "count": 195,
  "extra": {
    "stats": {
      "writesExecuted": 0,
      "writesIgnored": 0,
      "scannedFull": 0,
      "scannedIndex": 195,
      "filtered": 0,
      "httpRequests": 0,
      "executionTime": 0.0004,
      "peakMemoryUsage": 100
    },
    "warnings": []
  },
  "cached": false,
  "error": false,
  "code": 201
}
```

**Cursor API Request Example (read next batch)**

```bash
curl -X PUT "https://api-gdn.pass.macrometa.io/_fabric/_system/_api/cursor/463970894"                                                     \
-H "Authorization: bearer <token>"
```

**Cursor API Response Example (read next batch)**

When the `hasMore` value is false there are no further results to return from the server.

```json
{
  "result": [
     {
    "_id": "Cars/377176738",
    "_key": "377176738",
    "_rev": "_eWFQ7di--_",
    "customer_id": 345,
    "make": "Toyota",
    "model": "RAV4",
    "type": "SUV",
    "year": 2022
  },
     ...
     {
    "_id": "Cars/349446110",
    "_key": "349446110",
    "_rev": "_eWFB8OW--_",
    "customer_id": 123,
    "make": "Audi",
    "model": "Q5",
    "type": "SUV",
    "year": 2019
  },
  ],
  "hasMore": false, // when false no more results can be returned
  "id": "463970894", // same cursor id from the initial response
  "count": 195,
  "extra": {
    "stats": {
      "writesExecuted": 0,
      "writesIgnored": 0,
      "scannedFull": 0,
      "scannedIndex": 195,
      "filtered": 0,
      "httpRequests": 0,
      "executionTime": 0.0004,
      "peakMemoryUsage": 100
    },
    "warnings": []
  },
  "cached": false,
  "error": false,
  "code": 201
}
```

API Reference Docs

[Create Query Cursor](https://macrometa.com/docs/api#/operations/createQueryCursor)

[Modify Query Cursor](https://macrometa.com/docs/api#/operations/modifyQueryCursor)

## **Practice 2: Use the Execution Plan to optimize indexes**

Proper indexing is key to query performance. C8QL provides an `Execution Plan` for all valid queries to show optimization rules and indexes being used.  Click the `Execution Plan` button,  below the query editor,  to view the plan. 

The `Indexes used` section of the execution plan shows which indexes are utilized by the query. If there are no indexes used or there are no fields matching the `FILTER` attributes create a new index with those attributes.

```sql
FOR car IN Cars
FILTER car.type == 'SUV'
SORT car._key DESC
RETURN car
```

The image below shows the execution plan before indexing. You can see the primary index, which is created with the collection is the only index being utilized.

```
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

After reviewing the `Indexes used` section we have created a persistent index on the `type` attribute being used in the `FILTER` expression. The new index, we have named `car_type_idx`, is now being utilized in the `Execution Plan`. 

```
Query String:
 FOR car IN Cars
 FILTER car.type == 'SUV'
 SORT car._key DESC
 RETURN car 

Execution plan:
 Id   NodeType          Est.   Comment
  1   SingletonNode        1   * ROOT
  8   IndexNode            1     - FOR car IN Cars   /* reverse primary index scan */
  3   CalculationNode      1       - LET #3 = (car.`type` == "SUV")   /* simple expression */   /* collections used: car : Cars */
  4   FilterNode           1       - FILTER #3       /* sorting strategy: standard */
  7   ReturnNode           1       - RETURN car

Indexes used:
 By   Name      Type      Collection   Unique   Sparse   Selectivity   Fields       Ranges
  8   primary   primary   Cars         false     false       50.00 %   [ `type` ]   (car.`type` == "SUV")

Optimization rules applied:
 Id   RuleName
  1   move-calculations-up
  2   move-filters-up
  3   move-calculations-up-2
  4   move-filters-up-2
  5   use-indexes
  6   remove-filter-coverd-by-index
  7   remove-unnecessary-calculations-2
```

Following is the link to the index documentation. Based on your needs, select the attribute(s) and the correct type of index.
[Working With Indexes](https://macrometa.com/docs/collections/indexing/working-with-indexes)

## **Practice 3: Use subqueries in place of multiple for loops**

For a query containing multiple `FOR` loops, the number of iterations to evaluate the query is equal to the number of documents in each collection multiplied by one another. 

For example,  if there are `x`, `y`, and `z` documents in `collection1`, `collection2`, and `collection3` respectively, then there will be `x * y * z` iterations done to evaluate the query.

```sql
FOR i in collection1
	FOR j in collection2
		FOR k in collection3
				return i * j * k;
```

Instead of multiple nested `FOR` loops, we can store the results of a subquery in a variable. Using that variable in a `FOR` loop will decrease the number of iterations. Additionally, we can take a projection of documents returned in each loop based on `FILTER` criteria. Using the expected record count in each `FOR` loop, it can be determined which subquery returns the fewest documents. 

An example of an unoptimized query with multiple `FOR` loops. Here we can see the `FILTER` conditions are applied after the last `FOR` loop. This is inefficient and possibly difficult to understand.

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

In this optimized example, we use a subquery to retrieve a projection of a smaller subset of data. This reduces the number of iterations required to return the final results.

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

Another approach is to place the `FILTER` before each `FOR` loop. This also reduces the number of iterations.

##**Practice 4: Multiple collections vs single large collection**

Query performance is linked, in part, to the number of documents in the collections and the indexes used. When a single collection contains a large number of complex documents optimizing for performance becomes difficult. Designing collections around purpose-built documents and indexes for returning specific results makes query writing simpler and improves performance.

In this example, we have a single collection, `Garage`. It contains `Account`, `Cars`, `Orders`, and `Staff` attributes with further nested attributes. This makes query writing and indexing difficult. Here is an example document for the `Garage` collection.

```
{
    "_id": "Garage/349351645",
    "_key": "349351645",
    "_rev": "_eUgrDn2--_",
    "account": {
      "first_name": "John",
      "id": 123,
      "joined_date": "2022-01-01",
      "last_name": "Doe",
      "phone": "555-555-5555"
    },
    "cars": {
      "car_a": {
        "make": "Audi",
        "model": "Q5",
        "year": "2019"
      },
      "car_b": {
        "make": "Ford",
        "model": "F-150",
        "year": "2021"
      }
    },
    "orders": {
      "account_id": 123,
      "car_id": "car_b",
      "customer_phone": "555-555-5555",
      "date": "2022-03-14",
      "invoice_number": 456,
      "price": "$100.00"
    },
    "staff": {
      "first_name": "Jane",
      "last_name": "Smith",
      "tech_id": 789
    }
  }
```

The next example shows how one might structure documents inside of individual collections. This approach can help in creating indexes on correct attributes in each collection and reduce record scan count.

```
//Account Document
{
    "_id": "Accounts/349491803",
    "_key": "349491803",
    "_rev": "_eUhBHmi--_",
    "car_ids": [
      "Cars/349434363",
      "Cars/349446110"
    ],
    "first_name": "John",
    "id": 123,
    "joined_date": "2022-01-01",
    "last_name": "Doe",
    "phone": "555-555-5555"
  }

//Car Document
{
    "_id": "Cars/349446110",
    "_key": "349446110",
    "_rev": "_eUg1Tl6--_",
    "customer_id": 123,
    "make": "Audi",
    "model": "Q5",
    "year": 2019
  },
  {
    "_id": "Cars/349434363",
    "_key": "349434363",
    "_rev": "_eUg1fJe--_",
    "customer_id": 123,
    "make": "Ford",
    "model": "F-150",
    "year": 2021
  }

// Order Document
{
    "_id": "Orders/349454643",
    "_key": "349454643",
    "_rev": "_eUg9dXS--_",
    "account_id": 123,
    "car_ids": [
      "Cars/349446110"
    ],
    "date": "2022-03-14",
    "invoice_number": 456,
    "price": "$100.00",
    "staff_id": 789
  }

// Staff Document
{
    "_id": "Staff/349422825",
    "_key": "349422825",
    "_rev": "_eUgvNOW--_",
    "first_name": "Jane",
    "last_name": "Smith",
    "tech_id": 789
  }
  ```

  ## **Practice 5: Use of SEARCH for array attributes**

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

## **Practice 6: Use of SEARCH for SORT operations**

Due to known limitations, if `SORT` operation is specified in the query, indexes are not used for attributes specified in `FILTER` part. The alternative to this is to create a `SEARCH VIEW` with the required attributes. The attribute on which sort need to be done, use it as a primary sort attribute in the `SEARCH VIEW` 
Note: Only `1` attribute can be added as a `Primary Sort` attribute
```
FOR city in cities
   FILTER city.continent == "ASIA" AND
          city.country == "CHINA" AND
          city.type == "RURAL" AND
          city.population > 40000
   SORT city.population DESC     
   return { city : city}

/* 
 * Query on Search view with SEARCH 
 * Search VIEW is created with the required attributes.
 * Add PrimarySort with the required attribute and order
 */
FOR city in CITIES_VIEW
   SEARCH ANALYZER(city.continent == "ASIA" AND
          city.country == "CHINA" AND
          city.type == "RURAL" AND
          city.population > 40000 ), "identity")
   return { city : city}
```

## **Practice 7: Use of composite index**

If there are multiple attributes used in `FILTER` criteria, it’s recommended to create a composite index with all the attributes. For e.g, if there are `3` attributes used in `FILTER`, the `composite index` created on these 3 attributes will give better query performance than `3` separate indexes.

## **Practice 8: Use of Stream Worker for optimization of reporting-related jobs**

For example, there is a scheduled reporting job at the end of the week on a collection with millions of records. In the report, it is expected to have records for each day of the week. It is not efficient to run the query on that big collection to get the data for all seven days.  To tackle this a `Stream Worker` can be used. A `Stream worker` can process data on the `Stream` associated with the collection. It can analyze it and generate the `staged` data and can store data in some `CACHE` collection.
E.g. Get the number of the `GET` requests each day from each `IP Address` Instead of scanning the huge `ACCESS LOG` collections, the `Stream worker` can analyze and store data in `CACHE` collection with `user information`, a number of `GET` requests, `Date`, `User name` As there are fewer records compare to that big `ACCESS LOG` collection in `CACHE` collection, query execution would be faster.

## **Practice 9: Use of indexes for COLLECT operation**

If there is a `COLLECT` operation in the query, the records with similar attribute values are grouped.  Persistent index on the attribute value on which `COLLECT` operation is performed helps to optimize the query. In the following example, the persistent index on the `country` attribute will help to optimize the query.

```sql
FOR p IN players
  COLLECT country = p.country
  RETURN {
    "country" : country
  }
```