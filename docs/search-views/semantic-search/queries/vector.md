---
sidebar_position: 1
title: Vector Queries
---

Vector C8QL functions offer various operations to manipulate and analyze vectors within C8QL. These functions allow for vector addition, subtraction, multiplication, division, and normalization, supporting use cases such as creating composite user profiles, measuring similarity, and preparing vectors for comparison.

## VECTOR_ADD

`VECTOR_ADD` is a function designed to sum two or more vectors element-wise. This operation is often used when trying to combine multiple vectors for analysis, like creating a composite user profile for recommendations.

### VECTOR_ADD Syntax

`vector_add(vector1, vector2, ...)`

| Key        | Type  | Description                               |
|------------|-------|-------------------------------------------|
| vector1,2..| array | Vectors to be added.                      |

### VECTOR_ADD Example

```c8ql
RETURN vector_add([1, 2, 3, 4], [5, 6, 7, 8], [9, 10,11,12]) -> [15,18,21,24]
```

This query adds respective elements of the given vectors.

*Scenario:* Creating a "composite" user profile for group recommendations.

## VECTOR_SUBTRACT

`VECTOR_SUBTRACT` allows for the element-wise subtraction of two vectors. This is particularly useful in scenarios where the difference between data points is of interest, such as comparing the attributes of two items or users.

### VECTOR_SUBTRACT Syntax

`vector_subtract(vector1, vector2)`

| Key      | Type  | Description                             |
|----------|-------|-----------------------------------------|
| vector1  | array | The first vector for subtraction.       |
| vector2  | array | The second vector for subtraction.      |

### VECTOR_SUBTRACT Example

```c8ql
RETURN vector_subtract([10, 20, 30, 40], [5, 6, 7, 8]) -> [5,14,23,32]
```

This query subtracts respective elements of the two vectors.

*Scenario:* Finding the difference between two items or users to understand aspects of similarity or difference.

## VECTOR_MULTIPLY

`VECTOR_MULTIPLY` performs an element-wise multiplication of two vectors. It's a versatile function used in various scenarios, including measuring the similarity or relevance between vectors.

### VECTOR_MULTIPLY Syntax

`vector_multiply(vector1, vector2)`

| Key      | Type  | Description                             |
|----------|-------|-----------------------------------------|
| vector1  | array | The first vector for multiplication.    |
| vector2  | array | The second vector for multiplication.   |

### VECTOR_MULTIPLY Example

```c8ql
RETURN vector_multiply([10, 20, 30, 40], [5, 6, 7, 8]) -> [50,120,210,320]
```

This query multiplies respective elements of the two vectors.

*Scenario:* Measuring similarity or relevance in item-based collaborative filtering.

## VECTOR_DIVIDE

`VECTOR_DIVIDE` divides the elements of one vector by the elements of another, useful in scenarios that require proportion or ratio calculations between two vectors.

### VECTOR_DIVIDE Syntax

`vector_divide(vector1, vector2)`

| Key      | Type  | Description                             |
|----------|-------|-----------------------------------------|
| vector1  | array | The first vector for division.          |
| vector2  | array | The second vector for division.         |

### VECTOR_DIVIDE Example

```c8ql
RETURN vector_divide([10, 20, 30, 40], [5, 6, 7, 8]) -> [2,3.33,4.28,5]
```

This query divides respective elements of the two vectors.

*Scenario:* Dividing corresponding vector elements for specific analysis.

## VECTOR_NORMALIZE

`VECTOR_NORMALIZE` processes a vector so that its magnitude (or length) becomes one. It's a crucial function for preparing vectors for comparison, especially when magnitude differences might obscure the data's direction or meaning.

### VECTOR_NORMALIZE Syntax

`vector_normalize(vector1)`

| Key       | Type  | Description                             |
|-----------|-------|-----------------------------------------|
| vector1   | array | The vector to be normalized.            |

### VECTOR_NORMALIZE Example

```c8ql
RETURN vector_normalize([10, 20, 30, 40]) -> [0.18, 0.36, 0.54, 0.73]
```

This query normalizes the vector, dividing each element by the square root of the sum of the squares of the elements.

*Scenario:* Preparing vectors for comparison by re-scaling them to have a length of one.
