---
sidebar_position: 50
title: Create Search Views with Nested Fields
---

This page explains how you can create search views for lower-level fields, also called nested fields. You can achieve this in two steps:

1. Construct a JSON object, as outlined below.
2. Use this JSON object to create a search view using the [Create Search View](https://www.macrometa.com/docs/api#/operations/createView) API endpoint.

## Step 1: Construct the JSON Object

Your JSON object should have the following structure:

- **`links` (object)**:
  - **`[Collection Name]` (string)**: Replace `[Collection Name]` with your collection's name.
    - **`analyzers` (array of strings)**: Indexing analyzers for string values (default: `["identity"]`).
    - **`fields` (object)**: Defines attributes and nested structures for indexing.
    - **`includeAllFields` (boolean)**: Whether to index all fields at a specific depth level (default: `false`).
    - **`trackListPositions` (boolean)**: Whether list values should be indexed individually (default: `false`).
    - **`storeValues`**: Method to track attribute values. Options are `id` (to store values and enable `EXISTS()`) or `none` (default).

- **`name` (string)**: Name of the search view.
- **`primarySort` (array of strings)**: Default sorting order for the view.
- **`type`**: Always set this to `search`.

**JSON Example:**

```json
{
 "links": { 
   "testCollection": {            
     "analyzers": [ "text_en" ],
     "fields": {                
       "parties": { 
         "fields": {            
           "name": {} 
         } 
       } 
     },
     "includeAllFields": false,
     "storeValues": "none",
     "trackListPositions": false
    } 
  },
 "name": "testView",
 "primarySort": [],
 "type": "search" 
}
```

### Accessing Nested Data

You have two primary methods for accessing nested data.

#### Include All Fields

Index all sub-fields of the primary field.

```json
"includeAllFields": true
```

#### Specify Nested Field Paths

This approach is more efficient, as it only indexes the specified fields. It's recommended if you know exactly which nested fields you want to index.
    
```json
"fields": { 
  "topLevelField": {
    "fields": {
      "subLevelField": {}
    }
  }
}
```

If you anticipate adding more sub-fields later, then the first option provides more flexibility.

## Step 2: Creating the Search View

Access the endpoint using your preferred method.

Here's a cURL request example to create a search view using the previously constructed JSON:

```bash
curl -X 'POST' \
  'https://api-play.paas.macrometa.io/_fabric/<your-fabric-name>/_api/search/view' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: bearer <JWT_TOKEN>' \
  -d '<YOUR_JSON_OBJECT_HERE>'
```

Replace `<YOUR_JSON_OBJECT_HERE>` with the JSON you constructed in Step 1 and `<JWT_TOKEN>` with your JWT token.
