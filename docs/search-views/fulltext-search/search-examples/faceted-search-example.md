---
sidebar_position: 40
title: Faceted Fulltext Search Example
---

Faceted search enables you to retrieve how frequently values occur.

Use the following cURL example to add an identity analyzer to an existing search view. In this example, we use the search view `sample_view`.

```bash
curl --location --request POST 'https://<HOST>/_fabric/Hotels/_api/search/view' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: <BEARER_TOKEN>' \
--data-raw '{
    "name": "sample_view",
  "links": {
    "hotel_reviews": {
                    "analyzers": [],
      "fields": {
        "Review_Text": {
          "analyzers": [
            "identity"
          ]
        }
      }
    }
  },
  "type": "search"
}
'
```

This query returns the number of reviews each hotel has:

```sql
FOR review IN sample_view
  COLLECT name = review.Property_Name WITH COUNT INTO count
  RETURN { name, count}
```

The displayed results:

| Property_Name | Review_Rating |
| --- | --- |
| 45 Park Lane - Dorchester Collection | 80 |
| Ridgemount HotelA To Z Hotel | 82 |
| Apex London Wall Hotel | 806 |
| Bulgari Hotel, London | 169 |
| ... | ... |

This query displays the number of review titles that exactly match the string `Very good`:

```sql
FOR review IN sample_view
      SEARCH ANALYZER(review.Review_Title == "Very good", "identity")
COLLECT WITH COUNT INTO count
  RETURN count
```

The result is `3` records.

Alternatively, you can expand the script to include alternative strings:

```sql
Let alternatives = ["Very good", "Very Good", "very good"]
FOR alternative in alternatives
LET count = FIRST(
FOR review IN sample_view
      SEARCH ANALYZER(review.Review_Title == alternative, "identity")
      OPTIONS { countApproximate: "cost" }
COLLECT WITH COUNT INTO count
  RETURN count
  ) RETURN {alternative, count}
```

The displayed result:

| alternative | count |
| --- | --- |
| Very good | 3 |
| Very Good | 1 |
| very good | 1 |
