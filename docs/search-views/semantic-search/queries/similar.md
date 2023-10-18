---
title: Similar Search Queries
---

These functions are valuable in finding the similarity between vectors, and they offer different options for comparing against a specific view or a set of vectors with the specified distance type.

## SIMILAR()

Search for documents most similar to the input vector.

### SIMILAR Syntax

- **For a specific view:**
  `SIMILAR(view_name, search_vector, [limit=100])`

### Parameters

| Key            | Type         | Description                   |
|----------------|--------------|-------------------------------|
| view_name      | string       | Name of the view used for similarity search.                                |
| search_vector  | array        | The input vector to search for.                                             |
| limit          | number       | (Optional) The maximum number of results to return. Default is `100`.       |

### SIMILAR Examples

The examples below illustrate different use cases of the `SIMILAR()` function, demonstrating how it can be applied to find similarities against a specified view using different distance types and limits.

#### Example 1

```c8ql
RETURN SIMILAR("hnsw_cosine", [30, 60, 60, 20])
```

This query searches for documents most similar to the input vector `[30, 60, 60, 20]` in the view named `"hnsw_cosine"`. The result will include up to 100 matches, as the limit is not specified and defaults to 100.

#### Example 2

```c8ql
RETURN SIMILAR("hnsw_cosine", [30, 60, 60, 20], 5)
```

This query is similar to the first but includes a limit of 5, meaning it will return up to 5 documents most similar to the input vector.

## SIMILAR_TO_ARRAY()

Compute the similarity between an input vector and an array of data vectors.

### SIMILAR_TO_ARRAY Syntax

`SIMILAR_TO_ARRAY(search_vector, input_vectors, distance_type, [limit=100])`


### Parameters

| Key             | Type         | Description                   |
|-----------------|--------------|-------------------------------|
| search_vector   | array        | The input vector to search for.          |
| input_vectors   | array        | The array of vectors to compute similarity with.     |
| distance_type   | string       | Type of distance to compute similarity. Can be `"l2"`, `"ip"`, `"cosine"`.    |
| limit      | number       | (Optional) The maximum number of results to return. Default is `100`.       |

### SIMILAR_TO_ARRAY Examples

The examples below illustrate different use cases of the `SIMILAR_TO_ARRAY()` function. This function computes the similarity between an input vector and an array of data vectors and returns a list of IDs and scores sorted by the highest score, where the ID is the index in the data array.

#### Example 1

```c8ql
RETURN SIMILAR_TO_ARRAY([100, 200, 150, 100], [[30,50,60,70],[10,20,15,10],[4,5,6,7]], "cosine")
```

This query computes the cosine similarity between the input vector `[100, 200, 150, 100]` and an array of data vectors `[[30,50,60,70],[10,20,15,10],[4,5,6,7]]`. It returns a list of IDs and scores sorted by the highest score, where the ID is the index in the data array. Since the limit is not specified, it defaults to 100, meaning up to 100 most similar matches will be returned.

#### Example 2

```c8ql
RETURN SIMILAR_TO_ARRAY([100, 200, 150, 100], [[30,50,60,70],[10,20,15,10],[4,5,6,7]], "l2", 2)
```

This query is similar to the first example but uses the L2 distance to compute the similarity between the input vector `[100, 200, 150, 100]` and the same array of data vectors. It includes a limit of `2`, meaning it will return up to two most similar matches, sorted by the highest score.
