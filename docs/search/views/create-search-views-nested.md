---
sidebar_position: 30
title: Create a Search View with Nested Fields
---

In the GDN console, you can only create search views for top-level fields. If you want to create search views for lower-level fields, you can use the GDN API with JSON.

:::note

We recommend familiarizing yourself with JSON and the GDN API before continuing.

:::

Create a search view by making a call to this GDN API endpoint:

`https://api-gdn.paas.macrometa.io/_fabric/{your-fabric-name}/_api/search/view`

## Create JSON Object

Create a JSON object with these fields:

- `links` (object):

  - `collection-name` (string): 

    - `analyzers` (array of strings): The list of analyzers to be used for indexing of string values (default: ["identity"]).

    - `fields` (object):

      - `field-name` (object/string): This is a recursive structure for the specific attribute path, potentially containing any of the following attributes: analyzers, include all fields, trackListPositions, storeValuesAny attributes not specified are inherited from the parent.

  - `includeAllFields` (boolean): A flag that determines whether or not to index all fields on a particular level of depth (default: false).

  - `trackListPositions` (boolean): A flag that determines whether or not values in a list should be treated separately (default: false).

  - `storeValues`: How should the view track the attribute values, this setting allows for additional value retrieval optimizations, one of:

  - `none`: Do not store values by the view

  - `id`: Store only information about value presence, to allow the use of the EXISTS() function(default "none")

- `name` (string): The name of the view.

- `primarySort` (array of strings): The default sort for the view.

- `type`: The type of the view. The value must be "search".



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

## 

There are two options for accessing the nested data.

- Use the top-level field and set the includeAllFields parameter to true. When the view is created all sub-fields of the top-level field will be included. As previously stated, the default value is false.
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

  This option is more optimized because it will only index on the specified fields, `subLevelField` in this case. The first option could be a good choice if you may add more sub-fields in the future.

## Example

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