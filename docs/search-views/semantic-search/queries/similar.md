Similarity search C8QL functions

Similar(view_name, search_vector, [limit=100]), .e.g
return similar("hnsw_cosine", [30, 60, 60, 20])
return similar("hnsw_cosine", [30, 60, 60, 20], 5)

Similar_to_array(search_vector, input_vectors, distance type, [limit=100]), e.g.
return similar_to_array([100, 200, 150, 100], [[30,50,60,70],[10,20,15,10],[4,5,6,7]], \"cosine\")
return similar_to_array([100, 200, 150, 100], [[30,50,60,70],[10,20,15,10],[4,5,6,7]], \"l2\", 3)
Distance types can be “l2”, “ip” and “cosine” (same values as used for view creation)
