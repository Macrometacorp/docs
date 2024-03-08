---
sidebar_position: 1
title: Vector Queries
---

Vector C8QL functions offer various operations to manipulate and analyze vectors within C8QL. These functions allow for vector addition, subtraction, multiplication, division, and normalization, supporting use cases such as creating composite user profiles, measuring similarity, and preparing vectors for comparison.

## VECTOR_ADD

`VECTOR_ADD` is a function designed to sum two or more vectors element-wise. This operation is often used when trying to combine multiple vectors for analysis, like creating a composite user profile to enhance group-based recommendations.

### VECTOR_ADD Syntax

`vector_add(vector1, vector2, ...)`

| Key        | Type  | Description                               |
|------------|-------|-------------------------------------------|
| vector1,2... | array | Vectors to be added.                      |

### VECTOR_ADD Example

Consider an online bookstore looking to create a composite user profile for a book club. The goal is to recommend books that reflect the group's collective preferences. By combining individual user vectors into a single composite vector, the bookstore can achieve more targeted recommendations.

```c8ql
RETURN vector_add([1, 2, 3, 4], [5, 6, 7, 8], [9, 10,11,12]) -> [15,18,21,24]
```

This query demonstrates how `VECTOR_ADD` performs an element-wise addition of the specified vectors, resulting in a new vector where each element is the sum of the corresponding elements from the input vectors. This operation is particularly useful for tasks like creating a composite user profile for group recommendations, illustrating the practical application of `VECTOR_ADD` in data analysis and recommendation systems.

## VECTOR_SUBTRACT

`VECTOR_SUBTRACT` is a function designed for the element-wise subtraction of two vectors. This is particularly useful in scenarios where the difference between data points is of interest, such as comparing user preferences or analyzing differences in items' attributes..

### VECTOR_SUBTRACT Syntax

`vector_subtract(vector1, vector2)`

| Key      | Type  | Description                             |
|----------|-------|-----------------------------------------|
| vector1 | array | The first vector from which the second is subtracted. |
| vector2 | array | The second vector to be subtracted from the first.    |

### VECTOR_SUBTRACT Example

Consider an online clothing store aiming to discern the difference between two products based on user reviews. By employing `VECTOR_SUBTRACT`, the store can effectively compare the vector representation of reviews for each product, highlighting the unique or differing aspects between them.

```c8ql
RETURN vector_subtract([10, 20, 30, 40], [5, 6, 7, 8]) -> [5,14,23,32]
```

This query shows how `VECTOR_SUBTRACT` performs an element-wise subtraction between two vectors, producing a new vector that represents the difference between the elements of the input vectors. Such an operation is useful for analytical tasks that involve comparison or differentiation, like evaluating product preferences through user reviews.

## VECTOR_MULTIPLY

`VECTOR_MULTIPLY` performs an element-wise multiplication of two vectors. It's a versatile function used in scenarios that involve determining vector relevance or assessing similarity between data points.

### VECTOR_MULTIPLY Syntax

`vector_multiply(vector1, vector2)`

| Key      | Type  | Description                             |
|----------|-------|-----------------------------------------|
| vector1 | array | The first vector to be multiplied.        |
| vector2 | array | The second vector to be multiplied.       |

### VECTOR_MULTIPLY Example

Consider a music streaming platform that employs item-based collaborative filtering to recommend songs. To measure the similarity between songs, `VECTOR_MULTIPLY` could be used to evaluate how features of one song relate to another, aiding in the identification of similar tracks.

```c8ql
RETURN vector_multiply([10, 20, 30, 40], [5, 6, 7, 8]) -> [50,120,210,320]
```

This query illustrates `VECTOR_MULTIPLY` in action, where each element of the first vector is multiplied by the corresponding element of the second vector. The result is a new vector where each position reflects the product of the elements from the input vectors. Such operations are invaluable in applications like collaborative filtering, where understanding the relationship between items based on their attributes is crucial.

## VECTOR_DIVIDE

`VECTOR_DIVIDE` divides the elements of one vector by the elements of another, useful in scenarios that require proportion or ratio calculations between two vectors.

### VECTOR_DIVIDE Syntax

`vector_divide(vector1, vector2)`

| Key      | Type  | Description                             |
|----------|-------|-----------------------------------------|
| vector1 | array | The numerator vector in the division.   |
| vector2 | array | The denominator vector in the division. |

### VECTOR_DIVIDE Example

Imagine a stock market analysis platform where analysts need to understand the ratio of daily stock volumes to make informed decisions. By dividing today's stock volume vector by yesterday's, they can obtain valuable insights into stock trends and market dynamics.

```c8ql
RETURN vector_divide([10, 20, 30, 40], [5, 6, 7, 8]) -> [2,3.33,4.28,5]
```

This query demonstrates how `VECTOR_DIVIDE` performs an element-wise division between two vectors, resulting in a new vector where each position is the quotient of the corresponding elements from the input vectors. Such an operation is particularly useful in fields like stock market analysis, where understanding the proportionate changes between different sets of data can provide insights into market trends.

## VECTOR_NORMALIZE

`VECTOR_NORMALIZE` processes a vector so that its magnitude (or length) becomes one. It's a crucial function for preparing vectors for comparison, especially when magnitude differences might obscure the data's direction or meaning.

### VECTOR_NORMALIZE Syntax

`vector_normalize(vector1)`

| Key       | Type  | Description                             |
|-----------|-------|-----------------------------------------|
| vector1   | array | The vector to be normalized.            |

### VECTOR_NORMALIZE Example

Consider a dating app that matches user profiles based on shared interests, hobbies, and other features. Normalizing feature vectors ensures a fair and accurate comparison by preventing longer feature lists from overpowering shorter ones, making the matching process more equitable and reflective of true compatibility.

```c8ql
RETURN vector_normalize([10, 20, 30, 40]) -> [0.18, 0.36, 0.54, 0.73]
```

This query normalizes the vector, dividing each element by the square root of the sum of the squares of the elements. This normalization is essential in applications like user profile matching on dating apps, where it ensures that comparisons between different profiles are not biased by the length of the feature vectors, thus facilitating a more accurate and meaningful comparison.
