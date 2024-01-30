---
sidebar_position: 40
title: Quantization
---

This page provides basic information about values in the **Quantization Type** field, which is used in defining semantic search views in Macrometa Global Data Network (GDN).

Quantization is a technique used to reduce the memory usage and increase the speed of similarity searches by approximating and compressing high-dimensional vectors. Essentially, it involves mapping vectors from a large dataset to a smaller set of representative vectors, allowing for faster comparisons and reduced storage requirements.

## Why Quantization Matters in Semantic Search

- **Storage Efficiency**: High-dimensional vectors, especially in large datasets, can take up significant storage space. Quantization can significantly reduce this requirement.
- **Search Speed**: Reducing the size of the vectors or approximating them can speed up the search process.
- **Power Efficiency**: Especially relevant for devices with limited power resources, like mobile devices or IoT sensors.

## Types of Quantization

Macrometa Semantic Search Views offer the following quantization types.

## None

No quantization is applied. The raw vectors are stored and used as they are. While this might offer the most accurate results, it also requires the most memory and computational resources.

## PQ (Product Quantization)

This is a popular method for quantization in the context of large-scale vector search. Product quantization involves dividing the high-dimensional vector into smaller, lower-dimensional 'subvectors', and then quantizing each subvector separately. This results in a compact code for each vector, which reduces memory usage and speeds up distance computations, while still providing a good approximation of the original vector.

One of the most significant advantages of PQ is that it allows for fast distance computation between a query vector and the compressed vectors directly, without needing to decompress the vectors.

## SQ (Scalar Quantization)

Scalar quantization involves treating each dimension of the vector separately and mapping each value to the nearest value in a set of representative values. It's a simpler form of quantization compared to PQ. SQ might not offer as much compression or as fast distance computations, but it can still provide a useful balance between accuracy and efficiency.

## Comparison of Quantization Techniques

| Technique | Description                                             | Advantages                              | Limitations                                     |
|-----------|---------------------------------------------------------|-----------------------------------------|-------------------------------------------------|
| Scalar    | Quantizes each component of the vector separately       | Simple, easy to implement               | Might not be the most storage-efficient         |
| Product (PQ) | Splits the vector and quantizes each sub-vector separately | Better compression, balances accuracy and efficiency | Requires choosing optimal sub-vector sizes      |

## Which Type to Use

The best quantization type to use depends on your specific use case and the characteristics of your data. For example, if memory usage is a critical concern, then you might opt for a more aggressive quantization method like PQ. If accuracy is more important and memory usage is less of a concern, then you might choose no quantization or a less aggressive method like SQ.

## Examples of Quantization Use Cases

Here are some examples of when to use particular quantization types.

### Large-scale Image Databases

- **Technique**: Product Quantization
- **Reason**: With millions of high-dimensional image vectors, PQ offers a balance between search accuracy and storage efficiency.
- **Example**: A platform like Google Photos could employ PQ to efficiently manage and search through billions of images.

### Sensor Data in IoT Networks

- **Technique**: Scalar Quantization
- **Reason**: Given the large volume of data from IoT sensors, scalar quantization can simplify the data for transmission and processing.
- **Example**: A smart city's sensor network might use scalar quantization to reduce the data load sent to central servers.

### Text Document Retrieval

- **Technique**: Product Quantization
- **Reason**: Text documents, when vectorized (e.g., via embeddings), reside in high-dimensional spaces. PQ can compress these vectors efficiently.
- **Example**: A service like Arxiv might employ PQ to manage and search through large repositories of academic papers.
