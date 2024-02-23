---
sidebar_position: 20
title: Distance Type
---

This page provides basic information about values in the **Distance Type** field, which is used in defining semantic search views in Macrometa Global Data Network (GDN).

In the context of semantic search, the "distance" between two entities is the extent of similarity between them. The greater the distance, the less similar the entities are. A similarity search returns the entities which have the least distance from the queried entity.

You have several distance type options. The different distance or similarity measures can have different impacts on search results, and the best one to use can depend on the specific characteristics of the data and the problem you're trying to solve.

## L2 (Euclidean Distance)

The L2 norm or Euclidean distance is probably the most commonly known metric. It represents the shortest straight line distance between two points in a space and is calculated as the square root of the sum of the squared differences between the corresponding elements of the two vectors.

Euclidean distance incorporates both magnitude and direction of the vectors. It is sensitive to the scale and coordinates of the vectors. Euclidean distance is useful when the absolute distances between data points matter, rather than just orientation. For example, if searching for similar retail stores, Euclidean distance works well since proximity of stores geographically is important.

A limitation of Euclidean distance is its sensitivity to scaling and noise. Vectors that are far apart in scale will have large distances even if oriented similarly. Outliers can also distort Euclidean distance.

**Syntax:**

```js
l2(vector1, vector2)
```

**Parameters:**

| Key     | Type  | Description        |
|---------|-------|-------------------------------|
| vector1 | array | The first vector for comparison. |
| vector2 | array | The second vector for comparison. |

**Example:** Imagine a scenario where you're comparing two geographical points or coordinates. The L2 distance would give you the distance between them.

*C8QL Sample - RETURN l2([10, 20, 30, 40], [5, 6, 7, 8]) -> 42.11*

## IP (Inner Product)

The inner product (also known as the dot product) between two vectors is the sum of the products of their corresponding components. In the context of semantic search, inner product similarity is a measure of similarity that computes the dot product of the query vector and each document vector. High inner product values indicate high similarity.

Inner product incorporates both vector orientation through cosine similarity and vector magnitudes. Inner product is useful when scale matters, such as search based on weighted vectors. It works well for dense vectors. It's especially useful when dealing with vectors that represent things like user and item embeddings in recommendation systems.

A limitation of inner product is sensitivity to noise and outliers, since large values are squared.

**Syntax:**
```js
dot_product(vector1, vector2)
```

**Parameters:**

| Key     | Type  | Description        |
|---------|-------|-------------------------------|
| vector1 | array | The first vector for comparison. |
| vector2 | array | The second vector for comparison. |

**Example:** If you're analyzing user preferences, where users have rated different movies, then inner product can help identify if two users have similar taste profiles.

*C8QL Sample - RETURN dot_product([10, 20, 30, 40], [5, 6, 7, 8]) -> 700*

## COSINE (Cosine Similarity)

Cosine similarity measures the cosine of the angle between two non-zero vectors. This metric is not concerned with the magnitude of the vectors, only the angle between them, which makes it particularly useful when the "length" of the data (e.g., the number of words in a document) is not a relevant factor for the comparison. A cosine similarity of 1 means that the vectors have the same orientation (not necessarily the same magnitude), and a cosine similarity of -1 means they have opposite orientations.

Cosine similarity ignores magnitudes and only considers the orientation of vectors. It measures similarity based on the angle between vectors. Cosine similarity works well for sparse vectors with lots of 0 values, like vectors representing text documents. It also provides scale invariance.

A drawback is that cosine similarity loses magnitude information which may be useful in some applications. For example, longer text documents may be more relevant even with similar orientation to shorter documents.

**Syntax:**

```js
cosine_sim(vector1, vector2)
```

**Parameters:**

| Key     | Type  | Description        |
|---------|-------|-------------------------------|
| vector1 | array | The first vector for comparison. |
| vector2 | array | The second vector for comparison. |

**Example:** When analyzing two text documents, cosine similarity can determine how similar their content topics are. For instance, two articles discussing artificial intelligence might have a high cosine similarity score, even if their word counts are different.

*C8QL Sample - RETURN cosine_sim([10, 20, 30, 40], [5, 6, 7, 8]) -> 0.96*

## Comparison of Distance Types

| Name    | Nature           | Best Used For            | Limitations     |
|---------|------------------|--------------------------|-----------------|
| L2 | Straight-line distance between two points in multi-dimensional space | Non-sparse data where absolute distances are meaningful (such as geographic locations) | Sensitive to scaling and noise        |
| IP     | Component-wise multiplication of two vectors      | Dense vectors where both magnitude and orientation matter (such as weighted vectors) | Requires equal length vectors; sensitive to outliers |
| COSINE  | Cosine of the angle between two vectors           | Sparse vectors like text documents where orientation is more important than magnitude | Loses magnitude information           |

## When to Use Which Distance Type

The key is choosing the distance metric that best matches the semantics of the vectors and the application. When in doubt, try multiple metrics on sample data and evaluate what works best.

Here are some real-world examples of when to use each distance type:

### L2 (Euclidean Distance) Examples

- **Finding similar stores based on location**: Euclidean distance between store geographic coordinates works well since proximity is important. The magnitude of distances matters.
- **Image recognition**: Pixel values in image vectors represent points in space. Euclidean distance between image vectors measures visual similarity effectively. Absolute distances are meaningful.
- **Recommending similar songs based on audio features** like tempo, keys, and so on. The magnitude of differences in these audio features impacts similarity.

### IP (Inner Product) Examples

- **Searching weighted product features**: Inner product matches products based on weighted relevance of features where scaling indicates importance.
- **Recommending content based on weighted user interactions**: Inner product considers both the magnitude of interactions and dimensions interacted with.
- **Image search with weighted visual features**: Some weighted visual features like color histograms are more important. Inner product matches on both weights and orientation.

### COSINE (Cosine Similarity) Examples

- **Document similarity**: Cosine similarity between sparse word count vectors excels since the orientation of vectors matters more than magnitude. Matches documents with similar word patterns.
- **Comparing user preferences**: Orientation of sparse vectors representing product ratings or content interests is more important than magnitude.
- **Querying semantically similar words**: The angle between sparse word vectors encapsulates semantic similarity well. Relative orientation is key.
