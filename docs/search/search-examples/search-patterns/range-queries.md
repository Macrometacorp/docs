---
sidebar_position: 40
title: Range Queries
---

Range queries allow for searching data that are above, below, or within two values. You can compare ranges to a number, numeric range, or strings. This is useful for finding numeric values across many documents.

Since range queries are not processed by analyzers, you must modify the provided cURL command as follows. Note the empty array for the `analyzers` value:

```bash
curl --location --request PUT 'https://<HOST>/_fabric/Hotels/_api/search/view/sample_view/properties' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: <BEARER_TOKEN>' \
--data-raw '{
   "links": {
       "hotel_reviews": {
           "analyzers": [],
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

## Compare to a Number

This example queries all hotels with a rating of 5 stars.

```sql
FOR review IN sample_view
  SEARCH review.Review_Rating == 5
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

This result displays:

| Property_Name | Review_Rating |
| --- | --- |
| Apex London Wall Hotel | 5 |
| Corinthia Hotel London | 5 |
| The Savoy | 5 |
| The Savoy | 5 |
| ... | ... |

Alternatively, this example queries all hotels with 3, 4, or 5 star ratings.

```sql
FOR review IN sample_view
  SEARCH review.Review_Rating IN [3, 4, 5]
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

To simplify the query, you can search for all hotels with a star rating greater than 2:

```sql
FOR review IN sample_view
  SEARCH review.Review_Rating > 2
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```



## Compare to a Numeric Range

You can use the _range operator_ to search for values within a range.

This example queries all hotels with star ratings of 3, 4, and 5.

```sql
FOR review IN sample_view
  SEARCH review.Review_Rating IN 3..5
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

The _IN\_RANGE()_ function enables you to streamline the query as follows:

```sql
FOR review IN sample_view
  SEARCH IN_RANGE(review.Review_Rating, 3, 5, true, true)
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

You can also make the query more complex. This example returns all reviews with ratings less than or equal to 2, greater than 4, but not equal to 1:

```sql
FOR review IN sample_view
  SEARCH (review.Review_Rating <= 2 OR review.Review_Rating > 4) AND review.Review_Rating != 1
  SORT review.Review_Rating
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```