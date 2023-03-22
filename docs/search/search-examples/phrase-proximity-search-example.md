---
sidebar_position: 30
title: Phrase and Proximity Search
---

Phrase search allows for searching for phrases and nearby words in full text. One may also specify how many arbitrary tokens may occur between the defined tokens for word proximity searches. We can use the same search view defined in the previous section here as well.

Let's search for hotel review comments which say `rooms are small` and select the hotel names and their review ratings.

```sql
FOR review IN sample_view
  SEARCH ANALYZER(PHRASE(review.Review_Text, "rooms are small"), "text_en")
  RETURN {
  Property_Name: review.Property_Name,
  Review_Rating: review.Review_Rating
  }
```

This should query 75 review comments:

| Property_Name | Review_Rating |
| --- | --- |
| The Savoy | 2 |
| Ridgemount Hotel | 4 |
| Marble Arch Hotel | 3 |
| Hotel Xenia, Autograph Collection | 5 |
| ... | ... |

The `PHRASE()` function allows for specifying tokens and the number of wild card tokens in alternating order. This can be effectively utilized for two words with one arbitrary word in between the two words. For example, one could search for review comments specifying the number of nights the reviewer has stayed in the hotel as follows,

```sql
FOR review IN sample_view
  SEARCH ANALYZER(PHRASE(review.Review_Text, "for", 1, "nights"), "text_en")
  RETURN {
  Property_Name: review.Property_Name,
  Review_Rating: review.Review_Rating
  }
```

This example should query 859 results.