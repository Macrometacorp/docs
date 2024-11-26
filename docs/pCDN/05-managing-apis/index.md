---
title: Manage APIs
---

pCDN offers its numerous endpoints that allow you to interact with their Stargate instance and perform tasks with these features:

- [Routes](#routes)
- [Upstreams](#upstreams)
- [Services](#services)
- [Plugins](#plugins)
- Cache
- Jobs

## Configuration

This API listens on port `9080` and starts with the URL `/api/stargate/v1/`. Obtain an API key from the Stargate team to authenticate the API. 

## Parameters

- **ID:** A unique string identifier used by the API. 
    - **Syntax:** IDs must only contain uppercase, lowercase, numbers and no special characters apart from dashes ( - ), periods ( . ) and underscores ( _ ).

## Routes

These are entry points for requests and direct these requests to upstream destination addresses.

### Request Methods

| **Methods** | **Request URI**                  | **Request body** | **Description**                                                                |   |
|---------|------------------------------|--------------|----------------------------------------------------------------------------|---|
| GET     | `/api/stargate/v1/routes`      | Null         | Retrieves a list of all configured routes                                  |   |
| POST    | `/api/stargate/v1/routes`      | {...}           | Creates a new route and assigns it a random ID                             |   |
| GET     | `/api/stargate/v1/routes/{id}` | Null         | Fetches a specific route by ID                                             |   |
| PUT     | `/api/stargate/v1/routes/{id}` | {...}           | Updates a specific route                                                   |   |
| DELETE  | `/api/stargate/v1/routes/{id}` | Null         | Deletes a specific route                                                   |   |
| PATCH   | `/api/stargate/v1/routes/{id}` | {...}           | Partially update a route with the specified attributes in the request body |   |

### Request body parameters

### Sample requests

1. Get a list of all the routes

- **Request**

```c
curl -X 'GET' \
  'https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes' \
  -H 'accept: application/json' \
  -H 'X-API-KEY: xxx'
```

- **Response**

```json

{"total": 4,
  "list": [
    {"route1"}, {"route2"}, {..}
  ]
}
```

2. Create a new route

- **Request**

```c
curl -X 'POST' \
  'https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes' \
  -H 'accept: application/json' \
  -H 'X-API-KEY: xxx' \
  -H 'Content-Type: application/json' \
  -d '{
  "uri": "/api/v1/products",
  "name": "product-service",
  "desc": "Product service API route",
  "priority": 0,
  "methods": [
    "GET"
  ],
  "host": "api.example.com",
  "remote_addr": "192.168.1.0/24",
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:8080": 1
    },
    "timeout": {
      "connect": 6,
      "send": 6,
      "read": 6
    }
  },
  "enable_websocket": false,
  "status": 1
}'
```

- **Response**

```json
{
  "key": "/apisix/routes/00000000000000000023",
  "value": {
    "remote_addr": "192.168.1.0/24",
    "name": "product-service",
    "uri": "/api/v1/products",
    "create_time": 1732619112,
    "methods": [
      "GET"
    ],
    "update_time": 1732619112,
    "id": "00000000000000000023",
    "priority": 0,
    "upstream": {
      "type": "roundrobin",
      "timeout": {
        "connect": 6,
        "send": 6,
        "read": 6
      },
      "pass_host": "pass",
      "nodes": {
        "127.0.0.1:8080": 1
      },
      "hash_on": "vars",
      "scheme": "http"
    },
    "enable_websocket": false,
    "status": 1,
    "desc": "Product service API route",
    "host": "api.example.com"
  }
}
```

3. Next, we'll retrieve our newly created route with its ID

- **Request**

```c
curl -X 'GET' \
  'https://adrsearche-us-east.photoniq.macrometa.io:9080/api/stargate/v1/routes/00000000000000000023' \
  -H 'accept: application/json' \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1'
```

- **Response**

This returns the route we created in sample request 2.

4. Now, let's change some attributes of our new route. 

- **Request**

```c

```

- **Response**

## Upstreams

The destination address for a route that uses a set of nodes for load balancing.

### Request methods

| **Methods** | **Request URI**                     | **Request body** | **Description**                                                           |   |
|---------|---------------------------------|--------------|-----------------------------------------------------------------------|---|
| GET     | `/api/stargate/v1/upstreams`      | Null         | Retrieves a list of all configured upstreams                          |   |
| POST    | `/api/stargate/v1/upstreams`      | {...}           | Creates a new upstream and assigns it a random ID                     |   |
| GET     | `/api/stargate/v1/upstreams/{id}` | Null         | Fetches a specific upstream by ID                                     |   |
| PUT     | `/api/stargate/v1/upstreams/{id}` | {...}           | Updates the attributes of a specific upstream                         |   |
| DELETE  | `/api/stargate/v1/upstreams/{id}` | Null         | Deletes a specific upstream                                           |   |
| PATCH   | `/api/stargate/v1/upstreams/{id}` | {...}           | Partially update an upstream with the specified attributes in the request body. |   |

## Services



### Request methods

| **Methods** | **Request URI**                            | **Request body** | **Description**                                      |   |
|---------|----------------------------------------|--------------|--------------------------------------------------|---|
| GET     | `/api/stargate/v1/services`              | Null         | Retrieves a list of all configured services      |   |
| POST    | `/api/stargate/v1/services`              | {...}           | Creates a new service and assigns it a random ID |   |
| GET     | `/api/stargate/v1/services/{id}`         | Null         | Fetches a specific service by ID                 |   |
| PUT     | `/api/stargate/v1/services/{id}`         | {...}           | Updates the attributes of a specific service     |   |
| DELETE  | `/api/stargate/v1/services/{id}`         | Null         | Deletes a specific service                       |   |
| PATCH   | `/api/stargate/v1/services/{id}`         | {...}           | Partially update a specific service              |   |
| GET     | `/api/stargate/vi/services/{id}/plugins` | Null         | Lists all the plugins for a specific service     |   |

## Plugins

Customizable components that enables you to extend the functionalities of the pCDN service.

### Request methods

| **Methods** | **Request URI**                            | **Request body** | **Description**                                      |   |
|---------|----------------------------------------|--------------|--------------------------------------------------|---|
| GET     | `/api/stargate/v1/services`              | Null         | Retrieves a list of all configured services      |   |
| POST    | `/api/stargate/v1/services`              | {...}           | Creates a new service and assigns it a random ID |   |
| GET     | `/api/stargate/v1/services/{id}`         | Null         | Fetches a specific service by ID                 |   |
| PUT     | `/api/stargate/v1/services/{id}`         | {...}           | Updates the attributes of a specific service     |   |
| DELETE  | `/api/stargate/v1/services/{id}`         | Null         | Deletes a specific service                       |   |
| PATCH   | `/api/stargate/v1/services/{id}`         | {...}           | Partially update a specific service              |   |
| GET     | `/api/stargate/vi/services/{id}/plugins` | Null         | Lists all the plugins for a specific service     |   |

## Cache

Store API responses according to content needs for faster loading times and improved performance.

### Request methods

| Methods | Request URI                          | Request body                        | Description                                                     |   |
|---------|--------------------------------------|-------------------------------------|-----------------------------------------------------------------|---|
| GET     | /api/stargate/v1/caches/{cache_zone} | Null                                | Lists cache entries in the specified cache zone                 |   |
| DELETE  | /api/stargate/v1/caches/{cache_zone} | {... }              | Purges cache entries matching the regex in the given cache zone |   |
| POST    | /api/stargate/v1/caches/warmer       | {"urls": [...]} | Initiates a job to warm up the cache with the specified URLs    |   |

### Sample requests

1. List all cache entries

- **Request**

`GET /api/stargate/v1/caches/my-cache-zone HTTP/1.1Host: api.example.comX-API-KEY: your-api-key`

- **Response** 

```json
{  "total": 3,  "entries": [    { "name": "cache-key-1", "size": 1024 },    { "name": "cache-key-2", "size": 2048 },    { "name": "cache-key-3", "size": 512 }  ]}
```

2. Purge cache entries

- **Request**

`DELETE /api/stargate/v1/caches/my-cache-zone HTTP/1.1Host: api.example.comX-API-KEY: your-api-keyContent-Type: application/json{  "pattern": "user-session-*"}`

- **Response**

```json
{  "jobId": "job-12345",  "message": "Cache purge job started."}
```

3. Warm up cache

- **Request**

`POST /api/stargate/v1/caches/warmer HTTP/1.1Host: api.example.comX-API-KEY: your-api-keyContent-Type: application/json{  "urls": [    "https://example.com/page1",    "https://example.com/page2"  ]}`

- **Response**

```json
{  "jobId": "job-67890",  "message": "Cache warming job started."}
```

## Jobs

### Request methods

| **Methods** | **Request URI**                   | **Request body** | **Description**                                                |   |
|---------|-------------------------------|--------------|------------------------------------------------------------|---|
| GET     | /api/stargate/v1/jobs         | Null         | Retrieves a list of all jobs                               |   |
| GET     | /api/stargate/v1/jobs/{jobId} | Null         | Fetches the status and details of a specific job by its ID |   |

### Sample requests

1. List all jobs

- **Request**

```rest
GET /api/stargate/v1/jobs HTTP/1.1Host: api.example.comX-API-KEY: your-api-key
```



- **Response**

```json
{  "total": 2,  "jobs": [    { "id": "job-12345", "type": "cache_purge", "status": "completed", "created_at": "2024-11-20T10:00:00Z" },    { "id": "job-67890", "type": "cache_warm", "status": "running", "created_at": "2024-11-25T12:00:00Z" }  ]}
```

2. Get job status

- **Request**

```
GET  /api/stargate/v1/jobs/job-12345 HTTP/1.1Host: api.example.comX-API-KEY: your-api-key`
```

- **Response**

```json
{  "id": "job-12345",  "type": "cache_purge",  "status": "completed",  "created_at": "2024-11-20T10:00:00Z",  "updated_at": "2024-11-20T10:05:00Z"}
```

