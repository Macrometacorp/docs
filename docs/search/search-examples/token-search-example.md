---
sidebar_position: 20
title: Full-Text Token Search
---

When searching strings it is highly useful to search for tokens in full-text which can occur in any order. Text Analyzers tokenize the full-text strings so that each token can get indexed separately. There are two ways for searching for tokens called Token search and Phrase search. While the former is described in this section the latter is presented in Section 2.5.

This approach searches for token which can appear in any order. The words that are searched for has to be contained in the source string. First, a text analyzer view has to be defined via invoking a cURL command as follows:

```bash
curl --location --request POST 'https://<HOST>/_fabric/Hotels/_api/search/view' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: <BEARER_TOKEN>' \
--data-raw '{
    "name": "sample1_view8",
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
FOR review IN sample1_view8
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