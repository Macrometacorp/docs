---
sidebar_position: 30
title: Prerendering API Endpoints
---

This page shows you the API endpoints you can use to interact with Dynamic Prerendering.

## Purge the Prerender Cache

**Endpoint:** `/api/prerender/v1/purge`

- **Method:** POST
- **Description:** Purges the cache of prerendered pages.
- **Headers:**
  - **`x-photoniq-customer-id`**: The unique identifier for the customer. (Required)
  - **`x-photoniq-prerender-origin`**: The prerender origin. (Required)
- **Request Body (JSON):**

    ```json
    jsonCopy code
    {
      "origin": "string",
      "urls": ["string"]
    }
    ```

- **Responses:**
  - **`200`**: Cache purged successfully
  - **`400`**: Invalid origin provided
  - **`500`**: Internal server error

## Service Health Status

**Endpoint:** `/api/prerender/v1/health`

- **Method:** GET
- **Responses:**
  - **`200`**: Service is healthy
  - **`500`**: Internal server error

## List All Origins

**Endpoint:** `/api/prerender/v1/origins`

- **Method:** GET
- **Headers:**
  - **`x-photoniq-customer-id`**: The unique identifier for the customer. (Required)
  - **`x-photoniq-prerender-origin`**: The prerender origin. (Required)
- **Responses:**
  - **`200`**: Successfully retrieved all origins
  - **`500`**: Internal server error

## Create an Origin

**Endpoint:** `/api/prerender/v1/origin`

- **Method:** POST
- **Headers:**
  - **`x-photoniq-customer-id`**: The unique identifier for the customer. (Required)
  - **`x-photoniq-prerender-origin`**: The prerender origin. (Required)
- **Request Body (JSON):**

    ```json
    jsonCopy code
    {
    "_key": "string",
    "origin": "string",
    "siteMaps": ["string"],
    "ttl": "string",
    "caching": boolean,
    "allowOriginHeaderValue": "string",
    "identifyNotFound":"string",
    "passThroughHeaders":Array,
    "addResponseHeaders":Object,
    "created": Date,
    "lastUpdate": Object
    }
    ```

- **Responses:**
  - **`200`**: Successfully created origin settings
  - **`500`**: Internal server error

## Update Origin Settings

**Endpoint:** `/api/prerender/v1/origin`

- **Method:** PATCH
- **Headers:**
  - **`x-photoniq-customer-id`**: The unique identifier for the customer. (Required)
  - **`x-photoniq-prerender-origin`**: The prerender origin. (Required)
- **Request Body (JSON):**

    ```json
    jsonCopy code
    {
    "_key": "string",
    "origin": "string",
    "siteMaps": ["string"],
    "ttl": "string",
    "caching": boolean,
    "allowOriginHeaderValue": "string",
    "identifyNotFound":"string",
    "passThroughHeaders":Array,
    "addResponseHeaders":Object,
    "created": Date,
    "lastUpdate": Object
    }
    ```

- **Responses:**
  - **`200`**: Successfully updated origin settings
  - **`500`**: Internal server error

## Delete an Origin

**Endpoint:** `/api/prerender/v1/origin/{_key}`

- **Method:** DELETE
- **Path Parameters:**
  - **`_key`**: The key for the origin setting. (Required)
- **Headers:**
  - **`x-photoniq-customer-id`**: The unique identifier for the customer. (Required)
  - **`x-photoniq-prerender-origin`**: The prerender origin. (Required)
- **Responses:**
  - **`200`**: Successfully deleted origin settings
  - **`500`**: Internal server error

## Fetch Prerendered Page Content

**Endpoint:** `/api/prerender/v1/render`

- **Method:** GET
- **Headers:**
  - **`x-photoniq-customer-id`**: The unique identifier for the customer. (Required)
  - **`x-photoniq-prerender-origin`**: The prerender origin. (Required)
  - **`x-photoniq-prerender-mobile`**: (Optional)
  - **`x-photoniq-prerender-path`**: (Optional)
- **Query Parameters:**
  - **`origin`**: (Optional)
  - **`path`**: (Optional)
  - **`mobile`**: (Optional)
- **Responses:**
  - **`200`**: Successfully fetched the prerendered page content
  - **`500`**: Internal server error
