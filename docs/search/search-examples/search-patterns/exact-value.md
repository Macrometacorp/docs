---
sidebar_position: 10
title: Exact Value Matching
---

The simplest way to search is finding an exact value. The exact value can be strings, numbers, number ranges, or Booleans. Here we can index and search strings using an identity analyzer. 

This example indexes and searches for strings using an identity analyzer:

```bash
curl --location --request PUT 'https://<HOST>/_fabric/Hotels/_api/search/view/sample1_view1/properties' \
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
}
```

After defining the search view, use a [query](../../../queries/index.md) to retrieve a list for Rhodes Hotel:

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(review.Property_Name == "Rhodes Hotel", "identity")
  RETURN review.Property_Name
```

| Property_Name |
| --- |
| Rhodes Hotel |
| Rhodes Hotel |
| Rhodes Hotel |
| Rhodes Hotel |
| ... |

You only need the ANALYZER() function to use a custom analyzer. The default analyzer retrieves the same results:

```sql
FOR review IN sample1_view1
SEARCH review.Property_Name == "Rhodes Hotel"
RETURN review.Property_Name
```