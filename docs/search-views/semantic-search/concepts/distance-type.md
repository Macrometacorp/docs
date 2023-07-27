---
sidebar_position: 20
title: Distance Type
---

This page provides basic information about distance type, which is used in defining semantic search views in Macrometa Global Data Network (GDN).

You have several distance type options. The different distance or similarity measures can have different impacts on search results, and the best one to use can depend on the specific characteristics of the data and the problem you're trying to solve.

## IP (Inner Product)

The inner product (also known as the dot product) between two vectors is the sum of the products of their corresponding components. In the context of semantic search, inner product similarity is a measure of similarity that computes the dot product of the query vector and each document vector. High inner product values indicate high similarity. It's especially useful when dealing with vectors that represent things like user and item embeddings in recommendation systems.

## L2 (Euclidean Distance)

The L2 norm or Euclidean distance is probably the most commonly known metric. It represents the shortest straight line distance between two points in a space and is calculated as the square root of the sum of the squared differences between the corresponding elements of the two vectors. In high-dimensional spaces, this distance can become less intuitive due to the "curse of dimensionality", but it's often still a useful measure.

## COSINE (Cosine Similarity)

Cosine similarity measures the cosine of the angle between two vectors. This metric is not concerned with the magnitude of the vectors, only the angle between them, which makes it particularly useful when the "length" of the data (e.g., the number of words in a document) is not a relevant factor for the comparison. A cosine similarity of 1 means that the vectors have the same orientation (not necessarily the same magnitude), and a cosine similarity of -1 means they have opposite orientations.
