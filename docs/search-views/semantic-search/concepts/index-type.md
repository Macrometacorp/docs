---
sidebar_position: 30
title: Index Type
---

This page provides basic information about values in the **Index Type** field, which is used in defining semantic search views in Macrometa Global Data Network (GDN).

You have several distance type options. These options, HNSW, IVF, and FLAT, relate to the kind of index that is being used to facilitate a fast and efficient semantic search view. Here's a brief overview of each.

## HNSW (Hierarchical Navigable Small World)

HNSW is a method designed to accelerate nearest neighbor search, particularly in high-dimensional spaces. It constructs a graph-based index that allows for faster search operations by navigating through the graph to find the closest vectors. It is an efficient and popular method for large scale similarity search.

## IVF (Inverted File)

IVF is a traditional indexing method used in information retrieval systems, where each item is associated with a list of documents (or in this case, vectors) where it appears. When used for vector search, IVF is typically combined with some kind of quantization (like product quantization, or PQ) to create a two-level system where the first level groups vectors into coarse clusters, and the second level uses quantization to compress the residual vectors within each cluster. This provides a balance of efficiency and accuracy in the search.

## FLAT

In a FLAT search, every item in the database is compared to the query to find the nearest neighbors. This approach is simple and guarantees finding the exact nearest neighbors, but it can be very slow for large databases or high-dimensional data.

## Which to Use

The selection between these index types depends on your specific use case. For example, if your primary concern is the speed of the query and you have a lot of data, then HNSW or IVF may be more suitable. If you need the highest possible accuracy and the database is not too large, FLAT could be the way to go.
