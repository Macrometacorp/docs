---
sidebar_position: 10
title: Create a Semantic Search View
---

This page explains how to create a new semantic search view.

## Prerequisites

- A [Macrometa account](https://auth-play.macrometa.io/) with sufficient permissions to create search views.
- At least one collection created.

## Create a Semantic Search View

Follow these instructions to create a new semantic search view using the GDN console web UI.

1. [Log in to your Macrometa account](https://auth-play.macrometa.io/).
2. Click **Data > Search Views**.
3. Click **New View**.
4. Enter a **Search View Name**.
5. In **Collection**, select a collection.
6. In **Field**, enter a field to be indexed in the search view. The field must correspond to an array of numbers in the documents in the collection, and the vector size (next field) must be the size of the array. 

   For example, if your document is `{"_key": "100", "name": "n1", "address": "a1", "vector_name": [30,40,50,60]}`, and you want to search for similar names based on `vector_name`, then use `vector_name` as the field and `4` as the vector size.

7. In **Vector Size**, enter the number of elements in the vector. For more information about this setting, refer to [Vector Size](../concepts/vector-size).
8.  In **Distance Type**, select the distance metric to determine the extent of similarity. For more information about this setting, refer to [Distance Type](../concepts/distance-type).
9.  In the Index section, enter index information:
   1.  In **Type**, select an index type. For more information about this setting, refer to [Index Type](../concepts/index-type).
   2.  Enter information in the rest of the index fields. Options vary depending on which index type you select.
10. In the Quantization section, select a type and the number of output bits. For more information about this setting, refer to [Quantization](../concepts/quantization).
11. Click **Create**.
