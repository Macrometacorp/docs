---
sidebar_position: 1
title: Cursor API
---

Queries that return large volumes of data require more than one response to provide a complete set of results. A common method is using consecutive queries with [LIMIT](../operations/limit.md) and OFFSET statements in the query. However,  using LIMIT and OFFSET requires incrementing the OFFSET value and processing the query each time the OFFSET value is changed.

A better approach is to use the Create cursor API. The response from the cursor API call contains a boolean attribute, `hasMore`. If `hasMore` is true, the next batch of records will be ready to be retrieved from the server. In subsequent calls, the next batch of records are returned from the last position. 

The `batchSize` parameter is set in the Create cursor API request body to configure the number of documents returned per request. The `batchSize` default is 100 and the maximum is 1,000.

### LIMIT and OFFSET
```sql
FOR car IN Cars
FILTER car.type == "SUV"
SORT car._key DESC
//First arg is the OFFSET the second arg is the LIMIT
LIMIT 0, 1000
RETURN car
```

This example query will return the first 1,000 results that match the filter conditions. To retrieve the next 1,000 results you would need to increment the OFFSET argument and then call the query again.

### Create cursor API
```sql
FOR car IN Cars
FILTER car.type == "SUV"
SORT car._key DESC
RETURN car
```
Next, we will make a call to the [Create Cursor endpoint](../../api#/operations/createQueryCursor). The request body has attributes for `batchSize`, `bindVars`, `count`, `query`, and `options`. The options attribute will accept several different key/value parameters. To utilize `hasMore` we will need to include the `stream` attribute set to `true`. Note the default value for stream is false.

### Create cursor API cURL Request
```shell
curl -X 'POST' \ 
'https://api-gdn.paas.macrometa.io/_fabric/_system/_api/cursor' \ 
-H 'accept: application/json' \ 
-H 'Content-Type: application/json' \ 
-H 'Authorization: bearer <token>' \ 
-d '{"batchSize": 100, 
     "bindVars": {}, 
     "options": { "stream": true }, 
"query": "FOR car in Cars FILTER car.type == '\''SUV'\'' SORT car._key DESC RETURN car",
"ttl": 30 }'
```
The response from the Create cursor API request will contain several attributes. The most important in this example are hasMore and id. The id identifies the cursor during subsequent requests and hasMore is a boolean value to indicate whether there are more results to be retrieved.

### Create cursor API Response
```json
{
  "result": [
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
  "hasMore": true,
  "id": "463970894",
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
You will see the response contains hasMore set to true and id with the value of **"463970894"**. We will use the id value as part of our next API request to retrieve the result of the results from the cursor until hasMore is false. Let's send the request to the [Read next batch from cursor](../../api#/operations/modifyQueryCursor) endpoint.

### Read next batch from cursor Request

```shell
curl -X PUT "https://api-gdn.pass.macrometa.io/_fabric/_system/_api/cursor/463970894"                                                     \
-H "Authorization: bearer <token>"
```
### Read next batch from cursor Response

```json
{
  "result": [
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
  "hasMore": true,
  "id": "463970894",
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

### Things to consider:

This approach works best with a short-running query. The query should not exceed per query memory limits or query execution time to ensure the results are returned without error.

As an example, with a document size of 15KB and a query memory limit of 256MB you could retrieve approximately 17,000 records before reaching the limit. To retrieve larger result sets the Export endpoint would be a better option.


#### Documentation Links

https://macrometa.com/docs/c8ql/operations/limit

https://macrometa.com/docs/api#/operations/createQueryCursor

https://macrometa.com/docs/api#/operations/modifyQueryCursor