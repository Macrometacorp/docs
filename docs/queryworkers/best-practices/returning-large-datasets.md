---
sidebar_position: 50
title: Returning Large Datasets
---

Queries that return large volumes of data may require more than one response to provide the complete results. A common method is using the [`LIMIT`](/docs/queryworkers/c8ql/operations/limit) and `OFFSET` statements in the query. However, this is not the optimized approach. When these options are used, each time the query is invoked query processing is performed. 

A better approach is to use the [`cursor` API](/docs/api#/operations/createQueryCursor).  The response from the cursor API call contains a boolean attribute, `hasMore`. If `hasMore` is true, the next batch of records will be ready on the server. In subsequent calls, the records are returned from the last position. 

The `batchSize` parameter can be set in the `cursor` API to configure the number of documents returned per request. The `batchSize` default is `100` and the maximum value is `1000`. 

## Query with `LIMIT` and `OFFSET`

```sql
FOR car in Cars
FILTER car.type == 'SUV'
SORT car._key DESC
LIMIT 0, 3
RETURN car
```

## Query without `LIMIT` and `OFFSET`

```sql
FOR car in Cars
FILTER car.type == 'SUV'
SORT car._key DESC
RETURN car
```

## Cursor API Request Example (create cursor)

The request body has attributes for `batchSize`, `bindVars`, `count`,  `query`, and `options`. The `options` attribute can receive several different key/value pairs. To utilize `hasMore` we will need to include the `stream` attribute set to `true`. Note the default value for `stream` is `false`.

```json
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

## Cursor API Response Example (create cursor)

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

## Cursor API Request Example (read next batch)

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

**API Reference Docs:**

[Create Query Cursor](https://macrometa.com/docs/api#/operations/createQueryCursor)

[Modify Query Cursor](https://macrometa.com/docs/api#/operations/modifyQueryCursor)