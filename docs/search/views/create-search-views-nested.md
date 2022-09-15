---
sidebar_position: 30
title: Search View with Nested Fields
---

If you want to create search views for lower-level fields, then you can use the GDN API with JSON.

:::note

We recommend familiarizing yourself with JSON and the GDN API before continuing.

:::

Create a search view by making a call to this GDN API endpoint:

`https://api-gdn.paas.macrometa.io/_fabric/{your-fabric-name}/_api/search/view`

## Create JSON Object

Create a JSON object with these fields:

- `links` (object): An array with the following values:

  - `testCollection` (string): Replace `testCollection` with the a name for your collection.

    - `analyzers` (array of strings): The list of analyzers to be used for indexing of string values (default: ["identity"]).

    - `fields` (object):

      - `field-name` (object/string): This is a recursive structure for the specific attribute path, potentially containing any of the following attributes: analyzers, include all fields, trackListPositions, storeValuesAny attributes not specified are inherited from the parent.

  - `includeAllFields` (boolean): A flag that determines whether or not to index all fields on a particular level of depth (default: `false`).

  - `trackListPositions` (boolean): A flag that determines whether or not values in a list should be treated separately (default: `false`).

  - `storeValues`: Method of tracking attribute values. Set to `id` to store values and enable the `EXISTS()` function, or set to `none` to disable (default: `none`).

- `name` (string): The name of the search view.

- `primarySort` (array of strings): The default sort for the view.

- `type`: Must be `search`.

The following example shows how to format the JSON object:

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

There are two options for accessing the nested data:

- Use the top-level field and set the `includeAllFields` parameter to `true`. Once created, the seach view will include all sub-fields of the top-level field.
  `"includeAllFields": true`
- Set a path to the sub-field. The following example demonstrates how to set a path to the following nested field `topLevelField.subLevelField`.
  ```json
  "fields": { 
  "topLevelField": {
    "fields": {
      "subLevelField": {}
      }
    }
  }
  ```

  This option is more optimized because it only indexes the specified fields, `subLevelField` in this case. The first option could be a good choice if you may add more sub-fields in the future.

## Example cURL Request

The following example shows a complete cURL request to create the nested search field.

```cURL
curl -X 'POST' \
  'https://api-gdn.paas.macrometa.io/_fabric/<your-fabric-name>/_api/search/view' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: bearer <JWT_TOKEN>' \
  -d '{
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
}'
```