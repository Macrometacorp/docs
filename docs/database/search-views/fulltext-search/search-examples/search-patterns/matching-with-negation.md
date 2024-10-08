---
sidebar_position: 20
title: Matching with Negations
---

Negations enable you to search for items that do not have exact matching. In this scenario, check for inequality with the `!=` operator.

```sql
FOR review IN sample_view
SEARCH ANALYZER(review.Property_Name != "Rhodes Hotel", "identity")
RETURN review.Property_Name
```

The returned results:

| Property_Name |
| --- |
| Apex London Wall Hotel |
| Corinthia Hotel London |
| The Savoy |
| ... |

You can expand this to include multiple values. Use the logical `OR` operator, `IN` operator, or bind parameters.

For example, these queries all return the same result:

```sql
FOR review IN sample_view
  SEARCH ANALYZER(review.Property_Name == "Apex London Wall Hotel" OR review.Property_Name == "Corinthia Hotel London", "identity")
  RETURN review.Property_Name
```

```sql
FOR review IN sample_view
  SEARCH ANALYZER(review.Property_Name IN ["Apex London Wall Hotel", "Corinthia Hotel London"], "identity")
  RETURN review.Property_Name
```

This example uses a bind parameter (`@hotel_names`):

```sql
FOR review IN sample_view
  SEARCH ANALYZER(review.Property_Name IN @hotel_names, "identity")
  RETURN review.Property_Name
```

These examples query a list of items starting with:

| Property_Name |
| --- |
| Apex London Wall Hotel |
| Corinthia Hotel London |
| Corinthia Hotel London |
| Apex London Wall Hotel |
| ... |
