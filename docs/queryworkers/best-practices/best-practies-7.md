---
sidebar_position: 7
title: Composite Indexes
---
## **Practice 7: Use of composite index**

If there are multiple attributes used in `FILTER` criteria, it’s recommended to create a composite index with all the attributes. For e.g, if there are `3` attributes used in `FILTER`, the `composite index` created on these 3 attributes will give better query performance than `3` separate indexes.
