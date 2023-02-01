---
sidebar_position: 50
title: Array operators ANY, ANY IN, IN, ==
---

If there is an index created on array attributes then the following `FILTER` conditions will not use the array index

```
FOR doc IN posts
  FILTER 'JAPAN' IN doc.tags[*]
  RETURN doc

FILTER doc.tags ANY == 'JAPAN'
FILTER doc.tags ANY IN 'JAPAN'
FILTER doc.tags IN 'JAPAN'
FILTER doc.tags == 'JAPAN'
FILTER 'JAPAN' == doc.tags
```

[https://support.macrometa.com/hc/en-us/articles/7935771264269](https://support.macrometa.com/hc/en-us/articles/7935771264269)