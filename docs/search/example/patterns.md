---
sidebar_position: 10
title: Common Search Patterns
---

This section lists different search patterns that are frequently found in GDN.

## Exact Value Matching

In the most basic version of search is to match the presence of an exact value. The exact value can be either strings, numbers, number ranges, or booleans. Here we can index and search strings using an identity analyzer. 

The view used for exact value matching can be defined as shown in the following example:

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
'
```

After defining the search view, we can retrieve the list of _Rhodes Hotel_ reviews:

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

When using the default Analyzer, you do not need to set the Analyzer context with the ANALYZER() function. The same results can be obtained by running the following query:

```sql
FOR review IN sample1_view1
SEARCH review.Property_Name == "Rhodes Hotel"
RETURN review.Property_Name
```

## Matching with Negations

You can search for items that do not have exact matching with specified criteria using the negations. In this scenario inequality can be checked with the `!=` operator to return everything from the view index except the documents which do not satisfy the criterion.

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

### Matching Multiple Strings

Exact value matching can be conducted considering several item values. You can use the logical `OR` operator, `IN` operator, or bind parameters.

The following examples query the same results:

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

```sql
{
  "hotel_names": [
    "Apex London Wall Hotel",
    "Corinthia Hotel London"
  ]
}
```

For the following example, you must specify the bind parameter:

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(review.Property_Name IN @hotel_names, "identity")
  RETURN review.Property_Name
```

These examples query a list of items (1,860 items in total) as shown below.

| Property_Name |
| --- |
| Apex London Wall Hotel |
| Corinthia Hotel London |
| Corinthia Hotel London |
| Apex London Wall Hotel |
| ... |

## Prefix Matching

You can search for strings or tokens that start with one or more substrings with the _prefix_ feature of Macrometa GDN.

In the following example, we want to find all hotels starting with the word `The `.

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(STARTS_WITH(review.Property_Name, "The "), "identity")
  RETURN review.Property_Name
```

This example queries a list of 3,963 records as shown below.

| Property_Name |
| --- |
| The Savoy |
| The Savoy |
| The Savoy |
| The Savoy |
| ... |

You can also include multiple prefixes. In the following example, we want to find all hotels starting with `The ` or `Hotel ``

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(STARTS_WITH(review.Property_Name, "The ") OR STARTS_WITH(review.Property_Name, "Hotel "), "identity")
  RETURN review.Property_Name
```

This example queries a list of 4,524 reviews that satisfy these criteria.

The following example shows how prefix matching is conducted on multiple attributes. In this scenario, we want to find all hotels starting with `The ` and the review titles that start with `Awesome `.

```sql
FOR review IN sample1_view1
  SEARCH ANALYZER(STARTS_WITH(review.Property_Name, "The ") AND STARTS_WITH(review.Review_Title, "Awesome "), "identity")
  RETURN {
  Property_Name : review.Property_Name,
  Review_Title : review.Review_Title
  }
```

This should result in the following three reviews:

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

