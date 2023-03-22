---
sidebar_position: 40
title: Faceted Search
---

Faceted search allows for combining aggregation with search queries to retrieve how frequently values occur overall. We need to first define a view using the identity analyzer as follows:

```bash
curl --location --request POST 'https://<HOST>/_fabric/Hotels/_api/search/view' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: <BEARER_TOKEN>' \
--data-raw '{
    "name": "sample1_view9",
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

A number of reviews made for each and every hotel can be calculated using the faceted search query as follows.

```sql
FOR review IN sample1_view8
  COLLECT name = review.Property_Name WITH COUNT INTO count
  RETURN { name, count}
```

This should indicate the dataset has reviews on 20 hotels. The first few results are listed below,

| Property_Name | Review_Rating |
| --- | --- |
| 45 Park Lane - Dorchester Collection | 80 |
| Ridgemount HotelA To Z Hotel | 82 |
| Apex London Wall Hotel | 806 |
| Bulgari Hotel, London | 169 |
| ... | ... |

To look up how many times a review carries the title "Very good" the following query can be utilized. Note that the case of the term "Very good" is exactly matched. Hence although the title very good appears five times across this hotel review data set, only three reviews are listed as the result for the below query.

```sql
FOR review IN sample_view0
      SEARCH ANALYZER(review.Review_Title == "Very good", "identity")
COLLECT WITH COUNT INTO count
  RETURN count
```

The above query should result in 3 records. For a query like above which is having a simple single condition, there is an optimization that could accurately determine the count from index data faster than the standard COLLECT as follows,

```sql
FOR review IN sample_view0
      SEARCH ANALYZER(review.Review_Title == "Very good", "identity")
      OPTIONS { countApproximate: "cost" }
COLLECT WITH COUNT INTO count
  RETURN count
```

If we need all the five occurrences of the title "very good" we can write a query as follows,

```sql
Let alternatives = ["Very good", "Very Good", "very good"]
FOR alternative in alternatives
LET count = FIRST(
FOR review IN sample_view0
      SEARCH ANALYZER(review.Review_Title == alternative, "identity")
      OPTIONS { countApproximate: "cost" }
COLLECT WITH COUNT INTO count
  RETURN count
  ) RETURN {alternative, count}
```

Execution of the above query should result in three records as follows,

| alternative | count |
| --- | --- |
| Very good | 3 |
| Very Good | 1 |
| very good | 1 |