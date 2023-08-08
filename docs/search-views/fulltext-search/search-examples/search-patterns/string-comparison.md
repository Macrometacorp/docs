---
sidebar_position: 35
title: String Comparison
---

You can use the `IN_RANGE()` function to compare strings between a range of letters.

This example queries all hotel names starting with Apex through names starting with the letter D.

```sql
FOR review IN sample_view
  SEARCH ANALYZER(IN_RANGE(review.Property_Name, "Apex", "D", true, false), "identity")
  SORT review.Review_Rating
  RETURN review.Property_Name
```

The result displays:

| Property_Name |
| --- |
| Apex London Wall Hotel |
| Corinthia Hotel London |
| City View Hotel |
| City View Hotel |
| ... |

