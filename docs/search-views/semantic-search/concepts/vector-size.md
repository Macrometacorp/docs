---
sidebar_position: 10
title: Vector Size
---

This page provides basic information about vector size, which is used in defining semantic search views in Macrometa Global Data Network (GDN).

The size of the vector in a vector space model typically refers to the dimensionality of the vector. For example, in the context of natural language processing and word embeddings like Word2Vec or GloVe, each word is typically represented as a vector with hundreds of dimensions - often 300 dimensions, but the exact number can vary based on the model and configuration.

The dimensionality of the vector is essentially the number of features that are being used to represent the item (in this case, a word or a document). Each dimension corresponds to a feature, and the value in each dimension can be thought of as representing the strength or importance of that feature for the represented item.

In more abstract terms, you can think of a vector as a point in a high-dimensional space, and each dimension is a different axis in that space. The number of dimensions is theoretically limitless, although in practice it's constrained by computational considerations and the complexity of the data.

In the context of semantic or vector search, the query and the items being searched all need to be represented as vectors in the same space, meaning that they all need to have the same number of dimensions. If you're using pre-trained word embeddings, then the size of your vectors will be determined by the size of those embeddings. If you're training your own embeddings or using some other method to convert items into vectors, then you have more flexibility to choose the size that works best for your application.
