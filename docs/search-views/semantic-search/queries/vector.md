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
