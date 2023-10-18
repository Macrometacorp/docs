---
sidebar_position: 30
title: Phrase and Proximity Search
---

Phrase search enables you to search for phrases and nearby words in full text.

Use the following cURL example to add an identity analyzer to an existing search view. In this example, the search view is `sample_view`.

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

This example queries all reviews that mention `rooms are small` and displays the hotel name and rating:

```sql
FOR review IN sample_view
  SEARCH ANALYZER(PHRASE(review.Review_Text, "rooms are small"), "text_en")
  RETURN {
  Property_Name: review.Property_Name,
  Review_Rating: review.Review_Rating
  }
```

The displayed result:

| Property_Name | Review_Rating |
| --- | --- |
| The Savoy | 2 |
| Ridgemount Hotel | 4 |
| Marble Arch Hotel | 3 |
| Hotel Xenia, Autograph Collection | 5 |
| ... | ... |

Alternatively, you can use the `PHRASE()` function to specify wild card tokens between words. This example queries reviews which specify the number of nights the reviewer has stayed in the hotel:

```sql
FOR review IN sample_view
  SEARCH ANALYZER(PHRASE(review.Review_Text, "for", 1, "nights"), "text_en")
  RETURN {
  Property_Name: review.Property_Name,
  Review_Rating: review.Review_Rating
  }
```
