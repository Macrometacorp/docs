---
sidebar_position: 30
title: Prefix Matching
---

You can use prefix substrings to search for strings or tokens starting with specific strings.

This example searches for all hotels starting with the word `The `:

```sql
FOR review IN sample_view
  SEARCH ANALYZER(STARTS_WITH(review.Property_Name, "The "), "identity")
  RETURN review.Property_Name
```

The result is a list starting with:

| Property_Name |
| --- |
| The Savoy |
| The Savoy |
| The Savoy |
| The Savoy |
| ... |

You can expand the search to include `Hotel `:

```sql
FOR review IN sample_view
  SEARCH ANALYZER(STARTS_WITH(review.Property_Name, "The ") OR STARTS_WITH(review.Property_Name, "Hotel "), "identity")
  RETURN review.Property_Name
```

You can also expand the search to include prefixes for multiple attributes. For example, all hotels starting with `The ` and reviews starting with `Awesome `:

```sql
FOR review IN sample_view
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
