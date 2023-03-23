---
sidebar_position: 20
title: Full-Text Token Search
---

You can search for tokens in full-text occurring in any order. The searched words must be contained in the source string. 

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
            "text_en"
          ]
        }
      }
    }
  },
  "type": "search"
}
'
```

Once the view is ready we can specify a token search query which searches for the occurrence of at least one of the praising words `Awesome` or `Excellent` or `Lovely` in a review text and select its review score as the result as shown in the following example.

```sql
FOR review IN sample_view
  SEARCH ANALYZER(review.Review_Text IN TOKENS("Awesome Excellent Lovely", "text_en"), "text_en")
  RETURN review.Review_Rating
```

This should query 3,803 review ratings:

| Review_Rating |
| --- |
| 5 |
| 5 |
| 1 |
| 5 |
| ... |