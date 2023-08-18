Vector C8QL functions

vector_add(vector1, vector2, ..) - Adds respective elements of the vectors
return vector_add([1, 2, 3, 4], [5, 6, 7, 8], [9, 10,11,12]) -> [15,18,21,24]

vector_substract(vector1, vector2) - subtracts respective elements of the two vectors
return vector_subtract([10, 20, 30, 40], [5, 6, 7, 8]) -> [5,14,23,32]

vector_multiply(vector1, vector2) - multiplies respective elements of the two vectors
return vector_multiply([10, 20, 30, 40], [5, 6, 7, 8]) -> [50,120,210,320]

vector_divide(vector1, vector2) - divides respective elements of the two vectors
return vector_divide([10, 20, 30, 40], [5, 6, 7, 8]) -> [2,3.33,4.28,5]

Vector_normalize(vector1) - divides each element by square root  of sum of the squares of the elements and returns the resultant vector
return vector_normalize([10, 20, 30, 40]) -> [0.18, 0.36, 0.54, 0.73]

Requirements - Vector Operations
Support following Vector Operations in C8QL
1. VECTOR_ADD([Vectors]) → Vector
a. Scenario: Creating a "composite" user profile. Suppose you're trying to recommend a movie to a group of users, you might add the user vectors
of everyone in the group to create a "composite" user, and then make recommendations based on this composite.
b. Example: If user1 has vector [1,2,3] and user2 has vector [2,3,4], the composite user could be [(1+2), (2+3), (3+4)] = [3,5,7 ].
2. VECTOR_SUBTRACT(Vector1, Vector2) → Vector
a. Scenario: Finding the difference between two items or users. This can help you understand what aspects make two items differe nt or similar,
and could be used to explain the recommendations you're making.
b. Example: If movie1 has vector [5,2,1] and movie2 has vector [3,2,1], the difference is [(5 -3), (2-2), (1-1)] = [2,0,0]. This could tell you that
movie1 has a higher value in the first feature compared to movie2.
3. VECTOR_DIVIDE(Vector1, Vector2) → Vector
a. If a user vector represents the count of interactions with different item categories, you might want to divide the correspond ing vector elements
and return resulting vector. If user1 has vector [10,20,30] and user2 has vector [2,4,5], the resultant vector would be [10/2 , 20/4, 30/5] =
[5,5,6]
4. VECTOR_MULTIPLY(Vector1, Vector2) → Vector
a. Scenario: Measuring similarity or relevance. In item-based collaborative filtering, the dot product is often used to measure the similarity
between a user's preference vector and an item's feature vector.
b. Example: If a user's preference vector is [3, 0, 5] (representing the ratings they've given to three different attributes of items) and an item's
feature vector is [1, 1, 1] (representing whether the item has each of the three attributes), then the resultant vector [3*1, 0*1, 5*1] = [3,0,5]
can represent the user's overall predicted rating or relevance of the item.
5. VECTOR_NORMALIZE(Vector) → Vector
a. Scenario: Preparing vectors for comparison. Normalizing a vector re-scales it to have a length of one, which can be useful when you want to
compare vectors of different magnitudes. In many cases, you care more about the direction of the vector (what it represents) rather than its
length (the magnitude of its values).
b. Example: If a user's preference vector is [3, 0, 5], the normalized vector would be [3/sqrt(34), 0/sqrt(34), 5/sqrt(34)] ≈ [0 .52, 0, 0.87].