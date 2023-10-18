---
title: Distance Functions
---

Distance functions in C8QL provide various ways to calculate distances and similarities between two vectors.

## L2 Distance

The `l2` function computes the Euclidean (L2) distance between two vectors.

### L2 Syntax

`l2(vector1, vector2)`

| Key      | Type  | Description                             |
|----------|-------|-----------------------------------------|
| vector1  | array | The first vector for comparison.        |
| vector2  | array | The second vector for comparison.       |

### L2 Example

```c8ql
RETURN l2([10, 20, 30, 40], [5, 6, 7, 8]) -> 42.11
```

This query calculates the Euclidean (L2) distance between the vectors.

## Dot Product

The `dot_product` function calculates the dot product of two vectors.

### Dot Product Syntax

`dot_product(vector1, vector2)`

| Key      | Type  | Description                             |
|----------|-------|-----------------------------------------|
| vector1  | array | The first vector for comparison.        |
| vector2  | array | The second vector for comparison.       |

#### Dot Product Example

```c8ql
RETURN dot_product([10, 20, 30, 40], [5, 6, 7, 8]) -> 700
```

This query calculates the dot product of the vectors.

## Cosine Similarity

The `cosine_sim` function computes the cosine similarity between two vectors.

### Cosine Syntax

`cosine_sim(vector1, vector2)`

| Key      | Type  | Description                             |
|----------|-------|-----------------------------------------|
| vector1  | array | The first vector for comparison.        |
| vector2  | array | The second vector for comparison.       |

### Cosine Example

```c8ql
RETURN cosine_sim([10, 20, 30, 40], [5, 6, 7, 8]) -> 0.96
```

This query calculates the cosine similarity between the vectors.
