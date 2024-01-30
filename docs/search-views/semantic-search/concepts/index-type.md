---
sidebar_position: 30
title: Index Type
---

This page provides basic information about values in the **Index Type** field, which is used in defining semantic search views in Macrometa Global Data Network (GDN).

Vector indexes are the backbone of semantic search. They dictate how vectors are stored, managed, and searched. Depending on the nature of the data and the specific requirements, different indexing techniques might be more suitable.

You have several distance type options. These options, HNSW, IVF, and FLAT, relate to the kind of index that is being used to facilitate a fast and efficient semantic search view. Here's a brief overview of each.

## HNSW (Hierarchical Navigable Small World)

HNSW is a method designed to accelerate nearest neighbor search, particularly in high-dimensional spaces. It constructs a graph-based index that allows for faster search operations by navigating through the graph to find the closest vectors. It is an efficient and popular method for large scale similarity search.

**Key Features:**

- Provides a balance between accuracy and speed.
- Scales well with high-dimensional data.
- Can be used in memory-constrained environments.

**When to Use:**

- Datasets where there's a need for a trade-off between speed and precision.
- High-dimensional data spaces.
- Text-based semantic searches where understanding context and nuances is vital.

## IVF (Inverted File)

IVF is a traditional indexing method used in information retrieval systems, where each item is associated with a list of documents (or in this case, vectors) where it appears.

The IVF index partitions the dataset into multiple clusters, where each cluster is represented by its centroid. When a search is executed, it does not search the whole dataset but only looks into a few clusters that are likely to contain the answer, thus speeding up the search.

When used for vector search, IVF is typically combined with some kind of quantization (like product quantization, or PQ) to create a two-level system where the first level groups vectors into coarse clusters, and the second level uses quantization to compress the residual vectors within each cluster. This provides a balance of efficiency and accuracy in the search.

**Key Features:**

- Supports billions of vectors.
- GPU-accelerated for enhanced performance.
- Offers several indexing methods to optimize for specific use-cases.

**When to Use:**

- Large-scale datasets.
- Situations demanding real-time responses.
- Multimedia content search, like image or video databases.

## FLAT

In a FLAT search, every item in the database is compared to the query to find the nearest neighbors. This approach is simple and guarantees finding the exact nearest neighbors, but it can be very slow for large databases or high-dimensional data.

The FLAT index type is the most straightforward method for conducting searches in semantic search applications. Unlike more complex indexing strategies, FLAT does not rely on any pre-processing or clustering of data. Instead, it performs a brute-force search by comparing the query vector against every single vector in the dataset. This method ensures the highest accuracy in finding the nearest neighbors but can be computationally intensive.

This straightforward approach makes the FLAT index type a reliable option for applications where precision is paramount, and the dataset characteristics allow for the manageable execution of exhaustive search operations. It is especially useful in situations where the introduction of approximation or error from more complex indexing methods is unacceptable.

**Key Features:**

- Ensures maximum accuracy by checking every possible option.
- Simple to implement, with no additional overhead for constructing and maintaining complex index structures.
- Ideal for datasets where absolute precision is more critical than search speed.

**When to Use:**

- Small to medium-sized datasets where search speed is not a primary concern.
- Scenarios where the utmost accuracy in search results is required.
- Use cases where the dataset size or dimensionality does not warrant the overhead of more complex indexing methods.

## Which to Use

The selection between these index types depends on your specific use case. For example, if your primary concern is the speed of the query and you have a lot of data, then HNSW or IVF may be more suitable. If you need the highest possible accuracy and the database is not too large, FLAT could be the way to go.

The table below compares the index types to help you decide which to use.

| Parameter         | IVF (Faiss)     | HNSW          | FLAT             |
|-------------------|-----------------|---------------|------------------|
| Nature            | Partitioning-based                                                 | Graph-based                                | Brute-force                                |
| Search Speed      | Generally very fast due to partitioning. Speed can vary based on the number of partitions | Consistently fast because of the efficient graph navigation | Slower due to exhaustive search            |
| Indexing Speed    | Moderate, especially for large partitions                          | Faster, especially for datasets with moderate sizes | Fast, as no complex index structure is needed |
| Memory Consumption| Can be higher because of the need to store centroids for each partition | Lower, as it relies on the hierarchical structure of graphs | Varies, generally higher due to the need to store all vectors |
| Scalability       | Scales well for very large datasets                                | Works best for medium to large datasets    | Ideal for small to medium-sized datasets   |
| Flexibility       | Supports GPU acceleration, can be integrated with other vector quantization techniques | CPU-based, doesn't support GPU out-of-the-box | Simple and flexible, no additional hardware requirements |
