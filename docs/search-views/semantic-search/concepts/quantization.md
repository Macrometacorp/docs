---
sidebar_position: 40
title: Quantization
---

This page provides basic information about values in the **Quantization Type** field, which is used in defining semantic search views in Macrometa Global Data Network (GDN).

Quantization is a process that transforms high-dimensional vectors into compact codes, and it's used to reduce the memory usage and speed up distance computations in large-scale vector search. Macrometa Semantic Search Views offer the following quantization types.

## None

No quantization is applied. The raw vectors are stored and used as they are. While this might offer the most accurate results, it also requires the most memory and computational resources.

## PQ (Product Quantization)

This is a popular method for quantization in the context of large-scale vector search. Product quantization involves dividing the high-dimensional vector into smaller, lower-dimensional 'subvectors', and then quantizing each subvector separately. This results in a compact code for each vector, which reduces memory usage and speeds up distance computations, while still providing a good approximation of the original vector.

One of the most significant advantages of PQ is that it allows for fast distance computation between a query vector and the compressed vectors directly, without needing to decompress the vectors.

## SQ (Scalar Quantization)

Scalar quantization involves treating each dimension of the vector separately and mapping each value to the nearest value in a set of representative values. It's a simpler form of quantization compared to PQ. SQ might not offer as much compression or as fast distance computations, but it can still provide a useful balance between accuracy and efficiency.

## Which Type to Use

The best quantization type to use depends on your specific use case and the characteristics of your data. For example, if memory usage is a critical concern, then you might opt for a more aggressive quantization method like PQ. If accuracy is more important and memory usage is less of a concern, then you might choose no quantization or a less aggressive method like SQ.