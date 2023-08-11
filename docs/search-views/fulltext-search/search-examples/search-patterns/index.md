---
sidebar_position: 1
title: Common Fulltext Search Patterns
---

This section lists different search patterns that are frequently found in Macrometa GDN.

Use the following cURL example to add an identity analyzer to an existing search view. In this example, the search view is named `sample_view`.

```bash
curl --location --request PUT 'https://<HOST>/_fabric/Hotels/_api/search/view/sample_view/properties' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: <BEARER_TOKEN>' \
--data-raw '{
   "links": {
       "hotel_reviews": {
           "analyzers": [
               "identity"
           ],
           "fields": {
            "Property_Name": {}
           },
           "includeAllFields": true,
           "storeValues": "none",
           "trackListPositions": true
       }
   }
}'
```

After defining the analyzer, use a [query](../../queries/) to retrieve a list for Rhodes Hotel.
