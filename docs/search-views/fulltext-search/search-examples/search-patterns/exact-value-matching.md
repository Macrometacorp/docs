---
sidebar_position: 10
title: Exact Value Matching
---

The simplest way to search is finding an exact value. The exact value can be strings, numbers, number ranges, or Booleans.

This example searches for strings using an identity analyzer:

```sql
FOR review IN sample_view
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
FOR review IN sample_view
SEARCH review.Property_Name == "Rhodes Hotel"
RETURN review.Property_Name
```
