---
sidebar_position: 20
title: Fulltext Token Search Example
---

You can search for tokens in text occurring in any order. The searched words must be contained in the source string.

Use the following cURL example to add an identity analyzer to an existing search view. In this example, the search view is named `sample_view`.

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

This example queries reviews that include praising words `Awesome`, `Excellent`, or `Lovely`, and displays the rating for each review.

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
