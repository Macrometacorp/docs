---
sidebar_position: 10
title: Common Search Patterns
---

This section lists different search patterns that are frequently found in GDN.

## Exact Value Matching

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

After defining the search view, use a [query](../../queries/index.md) to retrieve a list of for Rhodes Hotel:

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

## Matching with Negations

Negations enable you to search for items that do not have exact matching. In this scenario, check for inequality with the `!=` operator.

```sql
FOR review IN sample1_view1
SEARCH ANALYZER(review.Property_Name != "Rhodes Hotel", "identity")
RETURN review.Property_Name
```

| Property_Name |
| --- |
| Rhodes Hotel |
| Rhodes Hotel |
| Rhodes Hotel |
| Rhodes Hotel |
| ... |

You can expand this to include multiple values. Use the logical `OR` operator, `IN` operator, or bind parameters.

For example, these queries both return the same result:

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(review.Property_Name == "Apex London Wall Hotel" OR review.Property_Name == "Corinthia Hotel London", "identity")
  RETURN review.Property_Name
```

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(review.Property_Name IN ["Apex London Wall Hotel", "Corinthia Hotel London"], "identity")
  RETURN review.Property_Name
```

The returned result:

```sql
{
  "hotel_names": [
    "Apex London Wall Hotel",
    "Corinthia Hotel London"
  ]
}
```

This example uses a bind parameter (`@hotel_names`):

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(review.Property_Name IN @hotel_names, "identity")
  RETURN review.Property_Name
```

These examples query a list of 1,860 items.

| Property_Name |
| --- |
| Apex London Wall Hotel |
| Corinthia Hotel London |
| Corinthia Hotel London |
| Apex London Wall Hotel |
| ... |

## Prefix Matching

You can search for strings or tokens that start with one or more substrings with the _prefix_ feature of Macrometa GDN.

This example searches for all hotels starting with the word `The `:

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(STARTS_WITH(review.Property_Name, "The "), "identity")
  RETURN review.Property_Name
```

The result is a list of 3,963 reviews.

| Property_Name |
| --- |
| The Savoy |
| The Savoy |
| The Savoy |
| The Savoy |
| ... |

You can expand the search to include `Hotel `:

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(STARTS_WITH(review.Property_Name, "The ") OR STARTS_WITH(review.Property_Name, "Hotel "), "identity")
  RETURN review.Property_Name
```

The result is a list of 4,524 reviews.

You can also expand the search to include prefixes for multiple attributes. For example, all hotels starting with `The ` and reviews starting with `Awesome `:

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(STARTS_WITH(review.Property_Name, "The ") AND STARTS_WITH(review.Review_Title, "Awesome "), "identity")
  RETURN {
  Property_Name : review.Property_Name,
  Review_Title : review.Review_Title
  }
```

The results display three reviews:

| Property_Name | Review_Title |
| --- | --- |
| The Dorchester | Awesome luxury hotel |
| The Dorchester | Awesome Bathroom, great location, Superb service |
| The Savoy | Awesome Again |

## Range Queries

Range queries allow for searching data that are above, below, or between a minimum and a maximum value. The main use case for range queries is to search numeric values in documents.

Range queries can be specified comparing to a number, comparing to a numeric range, as well as comparing between strings. 

When developing range queries in GDN we need not specify any Analyzers. This is because range queries deal with numeric values and those are not processed by Analyzers. We first need to remove the identity analyzer which we created in the [Exact Value Matching](#exact-value-matching) section. This can be achieved via the following cURL command:

```bash
curl --location --request PUT 'https://<HOST>/_fabric/Hotels/_api/search/view/sample1_view1/properties' \
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
'
```

### Comparing to a Number

Let's take the scenario where we want to select all the hotel reviews which have a rating of 5. This can be accomplished using the following query.

```sql
FOR review IN sample1_view1
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
FOR review IN sample1_view1
  SEARCH review.Review_Rating IN [3, 4, 5]
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

Since the hotel review rating values specified in the data set are in the range 1...5, the same query can be specified using the > symbol as follows.

```sql
FOR review IN sample1_view1
  SEARCH review.Review_Rating > 2
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

Each of the above queries should result in the same number of 9506 records.

### Comparing to a Numeric Range

Rather than specifying each and every item in a continuous numeric range the same can be specified using the _range operator_. For example, the query in Listing 15 can be rewritten as follows,

```sql
FOR review IN sample1_view1
  SEARCH review.Review_Rating IN 3..5
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

The _IN\_RANGE()_ function allows for specifying a more advanced version of the query shown in Listing 17 by allowing us to specify the boundary conditions. When executed this should result in 9506 records.

```sql
FOR review IN sample1_view1
  SEARCH IN_RANGE(review.Review_Rating, 3, 5, true, true)
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

Range search queries can be further augmented by using the standard comparison operators to search for values below and above a range. For example, one could specify a range query to collect all the reviews having ratings less than or equal to 2, greater than 4, and not equals to 1 as follows.

```sql
FOR review IN sample1_view1
  SEARCH (review.Review_Rating <= 2 OR review.Review_Rating > 4) AND review.Review_Rating != 1
  SORT review.Review_Rating
  RETURN {
    Property_Name: review.Property_Name,
    Review_Rating: review.Review_Rating
    }
```

When executed the above query should result in 7035 records.

### Comparing Strings

The examples in the previous subsection were purely based on numeric values. However, range comparisons can be made on strings using the standard comparison operators as well as the `IN_RANGE()` function. Before running such string comparison identity search Analyzer has to be defined by invoking the cURL command shown in Listing 2. For example, the following query selects all the hotel names which start with Apex until (exclusive of) hotel names which start with the letter D.

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(IN_RANGE(review.Property_Name, "Apex", "D", true, false), "identity")
  SORT review.Review_Rating
  RETURN review.Property_Name
```

The execution of the above query results in a list of items (2037 items in total) as follows. 

| Property_Name |
| --- |
| Apex London Wall Hotel |
| Corinthia Hotel London |
| City View Hotel |
| City View Hotel |
| ... |

