---
sidebar_position: 17
---

# C8QL Examples

**Assumptions**

- Collection Name (should exist): `demo_queries`

**Sample Queries**

* Insert 10 documents into the `demo_queries` collection, using a bindvar to pass in a name prefix for the `name` field of the data in the new documents to be inserted:

    ```js
    FOR i IN 1..10 
        INSERT { name: CONCAT(@user_prefix, i), gender: (i % 2 == 0 ? "f" : "m"), likes: ROUND(RAND()*100), follows: ROUND(RAND() * 100) } 
        INTO demo_queries
	```

* View all the docs in the collection, sorted in ascending order of the document key:

    ```js
    FOR doc IN demo_queries 
        SORT doc._key 
        RETURN {"Key":doc._key, "Name":doc.name, "Gender":doc.gender, "Likes":doc.likes, "Follows":doc.follows} 
	```

* Update all documents in the `demo_queries` collection. The `gender`, `likes` and `follows` fields are updated with values accepted from the bindvars. If no bindvar values are specified, the fields are blanked. All documents will be updated to have the same value for these fields.

    ```js
    FOR doc IN demo_queries 
        UPDATE { _key:doc._key, gender:@gender, likes:@likes, follows:@follows} 
        IN demo_queries
	```

* Remove all documents in the `demo_queries` collection. The collection will continue to exist but will be empty.

    ```js
    FOR doc IN demo_queries 
        REMOVE doc 
        IN demo_queries
	```
