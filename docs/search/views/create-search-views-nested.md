---
sidebar_position: 30
title: Create a Search View with Nested Fields
---

From the GDN console, you can only create search views for top-level fields. You can use the GDN API with JSON to create search views for lower-level fields.

:::note

We recommend familiarizing yourself with JSON and the GDN API before continuing.

:::

## Create JSON Object

1. 


`https://api-gdn.paas.macrometa.io/_fabric/{your-fabric-name}/_api/search/view`


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

