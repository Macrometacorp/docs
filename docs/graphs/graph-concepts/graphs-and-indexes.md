---
title: Optimizing Graphs with Indexing
sidebar_position: 100
---

Indexing is a technique that enhances query performance by providing an efficient way to access data in the database. In the context of graph queries, indexing can considerably improve traversals, searches, and other operations involving vertices and edges. Indexes allow the database to quickly locate relevant data without scanning the entire collection.

For more information about indexes and indexing, refer to [Indexing](../../collections/indexing/).

## Key Indexing Aspects for Graph Queries

Here are some important aspects to consider when indexing for graph queries.

### Vertex-Centric Indexes

Vertex-centric indexes optimize queries involving filtering or sorting based on vertex properties. In Macrometa, create a "hash" or "skiplist" index on a vertex collection to expedite queries filtering vertices by specific attributes. For example, in a social network graph, if querying users by their email address is frequent, a "hash" index on the email attribute can enhance query performance.

### Edge-Centric Indexes

Edge-centric indexes optimize queries involving filtering or sorting based on edge properties. In Macrometa, create a "hash", "skiplist", or "persistent" index on an edge collection to expedite queries filtering edges by specific attributes. For example, if querying relationships in a social network graph by a "relationship type" attribute is common, a "hash" index on the relationship type can enhance query performance.

### Improving Traversal Performance

Traversal performance can be impacted by the choice of indexes on vertex and edge collections. Proper indexing can quickly locate traversal starting points and navigate the graph efficiently. Analyze your application's specific traversal patterns to determine the most beneficial indexes.

### Balancing Indexing

When creating indexes, balance the benefits of indexing with the overhead of maintaining them. Indexes improve query performance but consume storage space and require extra maintenance during data modifications. Create indexes selectively, concentrating on the properties and relationships frequently used in your application's queries.

## Choosing the Right Index Type for Graph Performance

Selecting the appropriate index type for your specific use case and query patterns is crucial for enhancing graph performance. Consider the following index types for graph data in Macrometa.

### Hash Index

A hash index is ideal for equality lookups on single attributes. It offers fast document access based on the indexed attribute but does not support range queries or sorting. If your graph queries involve filtering vertices or edges by a specific attribute's exact value, then a hash index can be useful.

**Use case**: Searching for users by their email address or finding edges with a specific relationship type.

### Skiplist Index

A skiplist index is suitable for single or multiple attributes, supporting both equality lookups and range queries. It also enables sorting by the indexed attribute(s). If your graph queries involve filtering or sorting vertices or edges based on one or multiple attributes' values, particularly when range queries are involved, a skiplist index can be helpful.

**Use case**: Locating posts within a specific date range or sorting edges by a weight attribute.

### Persistent Index

A persistent index is similar to a skiplist index in terms of supported queries, but it is stored on disk rather than in memory. This index type is useful for large datasets that do not fit in memory, but it might have slightly higher access latency compared to in-memory indexes. If your graph queries involve large datasets and require filtering or sorting based on attribute values, then a persistent index might be an appropriate choice.

**Use case**: Large graphs where the index size exceeds available memory, and queries involve sorting or filtering based on attribute values.

### Fulltext Index

A fulltext index is designed for text-based searches, supporting word or phrase searches within the indexed attributes. If your graph queries involve searching for vertices or edges based on text content, then a fulltext index can be useful.

**Use case**: Searching for posts containing specific keywords or finding users based on their interests.

## Example: Using Indexes with Graphs

In this theoretical example, a simple graph with two vertex collections and one edge collection is created, indexes are added to optimize query performance, and then a graph query is executed using those indexes. The graph represents a social network with users and posts, where users can create posts and follow other users.

### Creating Collections

Before traversing graphs, collections need to be created and data added to them:

- Vertex (document) collection `users` - stores user information.
- Vertex (document) collection `posts` - stores post information.
- Edge collection `relations` - stores relationships between users (follows) and user-post relationships (creates).

For more information about creating collections, refer to [Collections](../../collections/).

### Adding Indexes

After creating these collections and inserting sample data, indexes can be added to optimize query performance.

For more information on adding indexes, refer to [Working with Indexes](../../collections/indexing/working-with-indexes) or the [gdnsl index](../../cli/indexes-cli) command.

Add the following indexes:

- **email_index**: A "hash" index on the `email` attribute in the `users` collection. This index would speed up queries that filter users based on their email addresses.
- **from_index**: A "hash" index on the `_from` attribute in the `relations` collection. This index would optimize queries that involve traversing edges based on their starting vertices.

### Running the Query

With the added indexes, a graph query could be executed. Suppose the goal is to find all posts created by users followed by a specific user, identified by their email address. A C8QL query to achieve this might look like:

```sql
FOR follower IN users
  FILTER follower.email == 'example@example.com' // Use the email_index to quickly find the user
  FOR relation IN relations
    FILTER relation._from == follower._id // Use the from_index to find relevant edges
    FOR followee IN users
      FILTER followee._id == relation._to
      FOR postRelation IN relations
        FILTER postRelation._from == followee._id
        FOR post IN posts
          FILTER post._id == postRelation._to
          RETURN post
```

In this query, the user with the given email address is first found using the `email_index`. Then, the `relations` collection is traversed using the `from_index` to find edges that start from the follower. Next, the fol`lowee users and their associated posts are found by traversing the graph.

By using the appropriate indexes, this query would execute more efficiently, reducing the time it takes to search for relevant vertices and edges in the collections.

Keep in mind that the actual performance improvement depends on various factors, including the size of the collections, the complexity of the graph, and the specific query patterns used in an application. It is essential to analyze an application's query patterns and create indexes selectively, focusing on the properties and relationships that are most frequently used in your queries.
