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

Let's take the scenario where we want to select all the hotel reviews which have a rating of 5. This can be accomplished using the following query.

```sql
FOR review IN sample_view
  SEARCH review.Review_Rating == 5
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

When executed the above query results in the following list of items (6764 in total).

| Property_Name | Review_Rating |
| --- | --- |
| Apex London Wall Hotel | 5 |
| Corinthia Hotel London | 5 |
| The Savoy | 5 |
| The Savoy | 5 |
| ... | ... |

The range query can be executed considering a set of numeric items. For example, the following query finds all the reviews which had ratings 3, 4, or 5.

```sql
FOR review IN sample_view
  SEARCH review.Review_Rating IN [3, 4, 5]
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

Since the hotel review rating values specified in the data set are in the range 1...5, the same query can be specified using the > symbol as follows.

```sql
FOR review IN sample_view
  SEARCH review.Review_Rating > 2
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

Each of the above queries should result in the same number of 9506 records.

## Compare to a Numeric Range

Rather than specifying each and every item in a continuous numeric range the same can be specified using the _range operator_. For example, the query in Listing 15 can be rewritten as follows,

```sql
FOR review IN sample_view
  SEARCH review.Review_Rating IN 3..5
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

The _IN\_RANGE()_ function allows for specifying a more advanced version of the query shown in Listing 17 by allowing us to specify the boundary conditions. When executed this should result in 9506 records.

```sql
FOR review IN sample_view
  SEARCH IN_RANGE(review.Review_Rating, 3, 5, true, true)
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

Range search queries can be further augmented by using the standard comparison operators to search for values below and above a range. For example, one could specify a range query to collect all the reviews having ratings less than or equal to 2, greater than 4, and not equals to 1 as follows.

```sql
FOR review IN sample_view
  SEARCH (review.Review_Rating <= 2 OR review.Review_Rating > 4) AND review.Review_Rating != 1
  SORT review.Review_Rating
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

When executed the above query should result in 7035 records.